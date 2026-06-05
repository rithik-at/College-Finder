# Deployment Guide (Vercel)

This project is configured and ready to be deployed on Vercel. 

## Environment Variables

When importing this project into Vercel, make sure to add the following Environment Variables in the Vercel dashboard:

### 1. Database
- `DATABASE_URL`: Your production PostgreSQL connection string (e.g., from Supabase, Neon, or Railway).
  - **Important**: If you are using Prisma with a serverless environment like Vercel, ensure your connection string uses connection pooling (usually ends with `?pgbouncer=true` or similar depending on the provider).
- `DIRECT_URL`: (If applicable) The direct connection string for Prisma migrations.

### 2. NextAuth (Authentication)
- `NEXTAUTH_URL`: The canonical URL of your deployment (e.g., `https://your-app-name.vercel.app`).
- `NEXTAUTH_SECRET`: A random 32+ character string used to encrypt session tokens. You can generate one via terminal: `openssl rand -base64 32`.

### 3. OAuth Providers (Google & GitHub)
You will need to create OAuth apps in the Google Cloud Console and GitHub Developer Settings to get these keys. Set the callback URL to `https://your-app-name.vercel.app/api/auth/callback/[provider]`.
- `GOOGLE_CLIENT_ID`: Your Google OAuth Client ID
- `GOOGLE_CLIENT_SECRET`: Your Google OAuth Client Secret
- `GITHUB_CLIENT_ID`: Your GitHub OAuth Client ID
- `GITHUB_CLIENT_SECRET`: Your GitHub OAuth Client Secret

## Build Commands
The build is automatically handled by Vercel. We have configured the build command to `next build --webpack` to ensure compatibility with our PWA integration.

## Post-Deployment
After deploying, make sure to run your database migrations on the production database. You can do this by running `npx prisma db push` locally against your production `DATABASE_URL`.
