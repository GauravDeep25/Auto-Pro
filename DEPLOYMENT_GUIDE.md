# Auto Pro - Vercel Deployment Guide

This guide will walk you through deploying the Auto Pro garage management system on Vercel.

## Prerequisites

1. A [Vercel account](https://vercel.com/signup) (free tier works fine)
2. Your GitHub repository with the latest code
3. MongoDB Atlas database (already configured)

## Deployment Steps

### Step 1: Prepare Your Repository

1. Ensure all changes are committed and pushed to GitHub:
   ```bash
   git add -A
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

### Step 2: Deploy Backend (API) on Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository (`Auto-Pro`)
4. Configure the backend deployment:
   - **Project Name**: `auto-pro-backend` (or your preferred name)
   - **Framework Preset**: Other
   - **Root Directory**: `backend`
   - **Build Command**: Leave empty
   - **Output Directory**: Leave empty
   - **Install Command**: `npm install`

5. Add Environment Variables (click "Environment Variables"):
   ```
   NODE_ENV=production
   PORT=5000
   MONGO_URI=mongodb+srv://gaurav:gaurav2007@cluster0.28mzgrv.mongodb.net/autopro?retryWrites=true&w=majority&appName=Cluster0
   JWT_SECRET=autopro_secret_key_123!
   ```

6. Click **"Deploy"**
7. Wait for deployment to complete (2-3 minutes)
8. Copy the deployment URL (e.g., `https://auto-pro-backend.vercel.app`)

### Step 3: Update Frontend Configuration

Before deploying the frontend, you need to update the API URL:

1. Open `frontend/vite.config.js`
2. Update it to use environment variable for API URL:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3000,
    strictPort: true,
    open: true,
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
```

3. Commit and push this change:
   ```bash
   git add frontend/vite.config.js
   git commit -m "Update API configuration for production"
   git push origin main
   ```

### Step 4: Deploy Frontend on Vercel

1. Go back to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Import the same GitHub repository (`Auto-Pro`)
4. Configure the frontend deployment:
   - **Project Name**: `auto-pro-frontend` (or your preferred name)
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. Add Environment Variables:
   VITE_API_URL=https://auto-pro-backend.vercel.app
   ```
   (Replace with your actual backend URL from Step 2)

6. Click **"Deploy"**
7. Wait for deployment to complete (2-3 minutes)
8. Your frontend will be live at a URL like `https://auto-pro-frontend.vercel.app`

### Step 5: Update CORS in Backend

1. Update `backend/server.js` CORS configuration to allow your frontend URL:

```javascript
app.use(cors({
    origin: [
        'http://localhost:3000', 
     ```
      'http://localhost:3001',
        'https://auto-pro-frontend.vercel.app', // Add your frontend URL
        'https://your-custom-domain.com' // If you have a custom domain
    ],
    credentials: true 
}));
```

2. Commit and push:
   ```bash
   git add backend/server.js
   git commit -m "Update CORS for production"
   git push origin main
   ```

3. Vercel will automatically redeploy your backend

### Step 6: Configure Custom Domain (Optional)

1. In Vercel Dashboard, go to your project
2. Click **"Settings"** → **"Domains"**
3. Add your custom domain
4. Follow Vercel's instructions to configure DNS records

### Step 7: Test Your Deployment

1. Visit your frontend URL
2. Test the following:
   - Homepage loads correctly
   - Dark mode toggle works
   - User registration/login
   - Admin dashboard (if admin user)
   - Product browsing
   - Appointment booking
   - Contact page

### Step 8: MongoDB Atlas Network Access

Ensure MongoDB Atlas allows Vercel's IP addresses:

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Click **"Network Access"**
3. Add IP Address: `0.0.0.0/0` (Allow access from anywhere)
   - ⚠️ For production, consider using Vercel's IP ranges
4. Click **"Confirm"**

## Important Notes

- **Environment Variables**: Never commit `.env` file to GitHub
- **Database**: Your MongoDB Atlas database is already configured
- **API Routes**: All API calls from frontend go through `/api/*` which proxy to your backend
- **Auto Deployment**: Any push to `main` branch will trigger automatic redeployment
- **Logs**: View deployment logs in Vercel Dashboard → Your Project → Deployments

## Troubleshooting

### Frontend shows "Network Error"
- Check if backend is running: Visit `https://auto-pro-backend.vercel.app/`
- Verify CORS settings in backend
- Check browser console for specific errors

### Backend API not responding
- Check environment variables are set correctly in Vercel
- Verify MongoDB connection string is correct
- Check Vercel deployment logs for errors

### Authentication issues
- Ensure JWT_SECRET is set in backend environment variables
- Check cookie settings (Vercel may require secure cookies)
- Verify CORS credentials setting is `true`

## Maintenance

### Update Code
```bash
# Make changes locally
git add -A
git commit -m "Your update message"
git push origin main
# Vercel will auto-deploy
```

### View Logs
- Go to Vercel Dashboard
- Select your project
- Click "Deployments"
- Click on a deployment
- View "Functions" or "Runtime Logs"

## Success! 🎉

Your Auto Pro garage management system is now live on Vercel!

- Frontend: `https://auto-pro-frontend.vercel.app`
- Backend: `https://auto-pro-backend.vercel.app`

Share your live URL with users!
