# My Movie Tracker — Version 2.1

This update adds optional Supabase email/password authentication and cloud sync while preserving the existing app and local browser storage. You control when to connect a backend. No paid service is required or authorized by this package.

## What's new

- Supabase project configuration in **Settings → Cloud account and sync**.
- Email/password sign-in and account creation.
- One private cloud data record per account, protected by PostgreSQL Row Level Security (RLS).
- Automatic cloud sync after local edits once the account is connected.
- Safe first-login behavior: if both the device and cloud already contain different data, the app pauses and asks which copy to keep rather than silently overwriting either one.
- Local data remains available after signing out or when the cloud is unavailable.
- `supabase-schema.sql` creates the table and security policies.

## Important limitations

- This is an early cloud-sync build. It stores the app's library as one JSON payload per user, suitable for a personal app, not a multi-user product.
- Conflict handling is intentionally conservative at initial connection. It does **not** yet merge concurrent edits made on multiple devices field-by-field.
- Automatic daily backups and 90-day retention are not implemented. Continue exporting JSON backups regularly.
- Metadata search, posters from a provider, background notifications, and complete offline change queues are not implemented by this update.
- Supabase Free projects can pause after a period of inactivity and the Free plan does not include automatic database backups. Do not treat the free cloud project as your only backup.
- The Supabase JavaScript library is loaded from jsDelivr when online. The core local app still remains available if cloud services cannot be reached, but cloud features need a connection.

## Setup: create the free cloud backend

1. Create a Supabase account and a new project at <https://supabase.com/>. Choose the **Free** plan. Do not add a paid plan or paid add-ons.
2. In the Supabase project, open **SQL Editor**, create a new query, paste the contents of `supabase-schema.sql`, and run it.
3. Open **Project Settings → API** (the exact navigation label may vary). Copy the **Project URL** and the public **publishable key** or legacy public **anon key**.
4. Publish the app files to the root of your GitHub Pages repository. Keep `index.html`, `manifest.webmanifest`, and `sw.js` together. Include this README and SQL file for reference.
5. Open the deployed app over HTTPS. Go to **Settings → Cloud account and sync**.
6. Paste the Project URL and public publishable/anon key, then choose **Save cloud settings**.
7. Enter your email and a strong password. Choose **Create account**. If Supabase requires email confirmation, open the confirmation email, then return to the app and sign in.
8. The app will upload your local library if the cloud account has no saved data. If both places already have data, carefully choose either **Use cloud copy on this device** or **Replace cloud with this device**. Export a JSON backup first if you are unsure.
9. Repeat the app URL on your other device and sign in to the same account. The cloud library should load there.

## Security notes

- **Never paste a Supabase `service_role` or secret key into this app.** Use only the public publishable key or legacy anon key. A public key is expected to be visible in a browser; RLS is what protects the rows.
- The provided SQL enables RLS and restricts read/insert/update to `auth.uid() = user_id`.
- Do not disable RLS. Do not create an anonymous policy for this table.
- Use a unique, strong password and keep account recovery email access secure.
- Before testing cloud sync with valuable records, export a JSON backup.

## Free-plan notes

Supabase's current free-plan quotas and restrictions can change. The official docs currently describe a 500 MB database limit per project, 50,000 monthly active users, 1 GB file storage and project pausing after a week of inactivity. Automatic backups are not included on Free. Check the official pages before setup:

- <https://supabase.com/pricing>
- <https://supabase.com/docs/guides/platform/billing-on-supabase>

No paid plan or add-on is necessary for this personal test setup, but you must stay within free quotas and periodically verify the project's status.

## Local testing

Open `index.html` directly for local-only use. For sign-in, cloud sync and service-worker testing, use HTTPS hosting such as GitHub Pages or a local HTTP development server. Supabase auth redirects may need the deployed URL added under **Authentication → URL Configuration** in the Supabase dashboard.
