# Production Deployment Guide

## Issues Fixed

1. ✅ Removed `--turbopack` from build script (causes production issues)
2. ✅ Updated database from SQLite to PostgreSQL (SQLite doesn't work in production)
3. ✅ Added `output: 'standalone'` for better production builds

## Required Changes for Production

### 1. Database Setup

- **Change from SQLite to PostgreSQL** (already done in schema.prisma)
- Set up a PostgreSQL database (e.g., on Vercel, Railway, Supabase, or AWS RDS)
- Update your `DATABASE_URL` environment variable

### 2. Environment Variables

Create a `.env.local` file with:

```bash
DATABASE_URL="postgresql://username:password@host:port/database"
NODE_ENV="production"
```

### 3. Database Migration

Run these commands after setting up PostgreSQL:

```bash
npx prisma generate
npx prisma db push
# or for production: npx prisma migrate deploy
```

## Deployment Platforms

### Vercel (Recommended for Next.js)

1. Connect your GitHub repository
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

### Railway

1. Connect your repository
2. Add PostgreSQL service
3. Set environment variables
4. Deploy

### Netlify

1. Connect your repository
2. Set build command: `npm run build`
3. Set publish directory: `.next`
4. Add environment variables

## Common Production Issues

1. **Database Connection**: Ensure `DATABASE_URL` is accessible from your production environment
2. **Build Failures**: Remove `--turbopack` flag (already fixed)
3. **Environment Variables**: All required env vars must be set in production
4. **Database Migrations**: Run migrations before deploying

## Testing Production Build

Test locally before deploying:

```bash
npm run build
npm run start
```

## Next Steps

1. Set up a PostgreSQL database
2. Update your `DATABASE_URL`
3. Run database migrations
4. Deploy to your chosen platform
5. Set environment variables in production
