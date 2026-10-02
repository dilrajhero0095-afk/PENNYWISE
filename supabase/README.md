# Connecting Pennywise to Supabase

1. **Create the table.** In your Supabase project open *SQL Editor → New query*, paste the contents of `setup.sql`, and click *Run*.
2. **Copy your keys.** In Supabase open *Project Settings → API* (or *Connect*) and copy the **Project URL** and the **publishable / anon** key. Never use the `service_role` / secret key in this app.
3. **Add them to Netlify.** In the Netlify dashboard open *Project configuration → Environment variables* and add:
   - `VITE_SUPABASE_URL` = your Project URL
   - `VITE_SUPABASE_PUBLISHABLE_KEY` = your publishable / anon key
   
   (If you installed the Netlify Supabase extension, its `SUPABASE_DATABASE_URL` / `SUPABASE_ANON_KEY` variables also work.)
4. **Redeploy.** Vite bakes these values in at build time, so trigger a new deploy (*Deploys → Trigger deploy*) after adding them.
5. **Allow your site URL for auth.** In Supabase open *Authentication → URL Configuration* and add your Netlify site URL (and deploy preview URLs, e.g. `https://*--pennywiseorg.netlify.app`) to the redirect allow list so email confirmation links work.
