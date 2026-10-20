// Blackwood Movie Log V7.10.8 inbound Emby webhook.
// Configure secret variables only in Supabase, never in browser files.
import { createClient } from 'npm:@supabase/supabase-js@2';

const encoder=new TextEncoder();
async function safeEqual(a: string,b: string): Promise<boolean>{
 const [x,y]=await Promise.all([crypto.subtle.digest('SHA-256',encoder.encode(a)),crypto.subtle.digest('SHA-256',encoder.encode(b))]);
 const aa=new Uint8Array(x),bb=new Uint8Array(y);let diff=0;
 for(let i=0;i<aa.length;i++)diff|=aa[i]^bb[i];
 return diff===0;
}
function reply(message: string,status=200){return new Response(JSON.stringify({message}),{status,headers:{'Content-Type':'application/json','Cache-Control':'no-store'}})}
function string(v:unknown){return typeof v==='string'?v.trim():v==null?'':String(v)}
function id(v:unknown){return string(v).slice(0,128)}
function timestamp(v:unknown){const d=new Date(string(v));return Number.isFinite(d.getTime())?d.toISOString():new Date().toISOString()}
async function parseRequest(req:Request){
 const type=req.headers.get('content-type')||'';
 if(type.includes('multipart/form-data')){const form=await req.formData();const raw=form.get('data')||form.get('payload');if(!raw)throw Error('Missing webhook data');return JSON.parse(String(raw))}
 if(type.includes('application/x-www-form-urlencoded')){const form=await req.formData();const raw=form.get('data')||form.get('payload');if(!raw)throw Error('Missing webhook data');return JSON.parse(String(raw))}
 const raw=await req.text();if(raw.length>256000)throw Error('Payload too large');
 const parsed=JSON.parse(raw);if(parsed&&typeof parsed.data==='string')return JSON.parse(parsed.data);
 return parsed;
}
Deno.serve(async(req:Request)=>{
 if(req.method!=='POST')return reply('POST required',405);
 const secret=Deno.env.get('BLACKWOOD_EMBY_WEBHOOK_SECRET')||'';
 const ownerId=Deno.env.get('BLACKWOOD_OWNER_USER_ID')||'';
 const embyUserId=Deno.env.get('BLACKWOOD_EMBY_USER_ID')||'';
 const configuredServer=Deno.env.get('BLACKWOOD_EMBY_SERVER_ID')||'';
 const adminKey=Deno.env.get('BLACKWOOD_ADMIN_KEY')||'';
 const supabaseUrl=Deno.env.get('SUPABASE_URL')||'';
 if(secret.length<32||!ownerId||!embyUserId||!adminKey||!supabaseUrl)return reply('Server configuration incomplete',503);
 // Emby's webhook UI commonly offers only a URL, so a revocable secret in
 // the query string is supported. Prefer X-Blackwood-Secret where available.
 const url=new URL(req.url);
 const provided=req.headers.get('X-Blackwood-Secret')||url.searchParams.get('bw_token')||'';
 if(!provided||!(await safeEqual(provided,secret)))return reply('Unauthorized',401);
 try{
  const p=await parseRequest(req);
  if(!p||typeof p!=='object')return reply('Invalid payload',400);
  const event=string(p.Event||p.event).toLowerCase();
  if(!['playback.start','playback.stop','playback.pause','playback.resume','playback.progress'].includes(event))return reply('Unrelated event ignored');
  const user=p.User||p.user||{};const item=p.Item||p.item||{};
  if(id(user.Id||user.id)!==embyUserId)return reply('Other user ignored');
  if(string(item.Type||item.type).toLowerCase()!=='movie')return reply('Non-movie ignored');
  const itemId=id(item.Id||item.id);if(!itemId)return reply('Missing Emby item ID',400);
  const serverId=id(item.ServerId||item.serverId||p.ServerId);
  if(configuredServer&&serverId&&configuredServer!==serverId)return reply('Other server ignored');
  const provider=item.ProviderIds||item.providerIds||{};
  const session=p.Session||p.session||{};
  const info=p.PlaybackInfo||p.PlaybackStopInfo||p.PlaybackProgressInfo||{};
  const played=event==='playback.stop'&&(
   p.PlayedToCompletion===true||info.PlayedToCompletion===true||p.IsPlayedToCompletion===true||item.UserData?.Played===true
  );
  const n=Number(p.PlaybackPositionTicks??p.PositionTicks??info.PositionTicks??session.PlayState?.PositionTicks??item.UserData?.PlaybackPositionTicks);
  const position=Number.isSafeInteger(n)&&n>=0?n:null;
  const occurred=timestamp(p.Date||p.Timestamp||p.TimeStamp||p.EventDate||p.DateCreated);
  const tmdb=id(provider.Tmdb||provider.TMDb||provider.tmdb);
  const imdb=id(provider.Imdb||provider.IMDB||provider.imdb);
  const year=Number(item.ProductionYear)||null;
  // Event IDs aren't always provided by Emby; use event content plus a
  // 30-second arrival bucket to suppress immediate webhook retries.
  const bucket=Math.floor(Date.now()/30000);
  const canonical=JSON.stringify([ownerId,embyUserId,event,itemId,id(p.SessionId||session.Id||p.DeviceId),position,played,occurred,bucket]);
  const digest=await crypto.subtle.digest('SHA-256',encoder.encode(canonical));
  const fingerprint=Array.from(new Uint8Array(digest)).map(v=>v.toString(16).padStart(2,'0')).join('');
  const client=createClient(supabaseUrl,adminKey,{auth:{persistSession:false,autoRefreshToken:false}});
  const row={user_id:ownerId,emby_user_id:embyUserId,emby_server_id:serverId||null,emby_item_id:itemId,item_title:string(item.Name).slice(0,350)||null,item_year:year,item_type:'Movie',tmdb_id:tmdb||null,imdb_id:imdb||null,event_type:event,position_ticks:position,played_to_completion:played,occurred_at:occurred,fingerprint};
  const {error}=await client.from('emby_sync_events').upsert(row,{onConflict:'fingerprint',ignoreDuplicates:true});
  if(error){console.error('Emby webhook insert:',error.code);return reply('Could not save event',503)}
  return reply('Event accepted',202);
 }catch(e){console.warn('Invalid Emby webhook:',e instanceof Error?e.message:String(e));return reply('Invalid webhook',400)}
});
