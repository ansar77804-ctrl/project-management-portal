Deployment Plan and Instructions
================================

Overview
--------
- Frontend: Deploy to Vercel (fast, static hosting for Vite build output).
- Backend: Deploy to Railway or Heroku (managed Node/Mongo service).

Files added
-----------
- `vercel.json` — Minimal Vercel config to build the `frontend` folder and rewrite `/api` requests to an external backend.

Required environment variables (set in the respective hosting dashboards)
------------------------------------------------------------------
- For Vercel (Project > Settings > Environment Variables):
  - `BACKEND_URL` — The base URL of your deployed backend (e.g. `project-backend.up.railway.app` or `https://my-app.herokuapp.com`).
  - `VITE_API_URL` — (optional) `https://<BACKEND_URL>/api` — used by frontend if configured via env.

- For Backend (Railway / Heroku / similar):
  - `MONGODB_URI` — MongoDB connection string, e.g. `mongodb://...` or MongoDB Atlas URI.
  - `JWT_SECRET` — Secret used to sign JWT tokens.
  - `PORT` — (optional) listening port (default 5001).

Deploy Frontend to Vercel
-------------------------
1. In your Vercel dashboard, import the GitHub repository `ansar77804-ctrl/project-management-portal`.
2. In the import settings set the root to the project root (the `vercel.json` we added builds from `frontend/package.json`).
3. Add Environment Variables (Project > Settings > Environment Variables):
   - `BACKEND_URL` = your backend host (without protocol) or full URL.
   - `VITE_API_URL` = `https://<BACKEND_URL>/api` (optional; your frontend code may read this).
4. Trigger a deploy (Vercel will run the build using the `frontend` package.json and publish the site).

Note about `vercel.json` and environment variables
-------------------------------------------------
- Some Vercel routing fields do not support runtime environment substitution inside `vercel.json` in all contexts. If the rewrite in `vercel.json` does not proxy to your backend as expected, instead configure a Vercel Redirect/Rewrite in the Vercel dashboard or update frontend to call the absolute backend URL using `VITE_API_URL`.

Deploy Backend to Railway (recommended)
--------------------------------------
1. Create a new project on Railway and link it to the GitHub repo (or deploy via Docker).
2. Set environment variables in Railway: `MONGODB_URI`, `JWT_SECRET`, (optional) `PORT`.
3. Set the Start command to `npm run dev` or `node server.js` (for production use `node server.js` and ensure a production build and process manager).
4. After deployment, copy the generated service URL (e.g. `https://your-service.up.railway.app`) and use it as `BACKEND_URL` in Vercel.

Alternative Backend: Heroku
---------------------------
1. Create a new Heroku app and connect the GitHub repo or push via `git push heroku main`.
2. Set Config Vars: `MONGODB_URI`, `JWT_SECRET`.
3. Scale a web dyno (Heroku automatically runs `npm start`/`Procfile`).

Local testing
-------------
- Start MongoDB locally or use Atlas and set `MONGODB_URI` in `backend/.env`.
- Start backend:
  cd backend
  npm install
  npm run dev
- Start frontend (new terminal):
  cd frontend
  npm install
  npm run dev

If you want, I can:
- Attempt to add Vercel project environment variables via the Vercel CLI (requires you to provide a Vercel token), or
- Create a sample `Procfile` for Heroku/production backend, or
- Modify frontend code to read `VITE_API_URL` by default and fall back to `/api`.
