# 🚀 Vercel Deployment - Quick Checklist

## ✅ Code Preparation (COMPLETED)
- [x] Created `backend/vercel.json` configuration
- [x] Updated CORS settings for production
- [x] Added environment variable support
- [x] Cleaned up console.log statements
- [x] Created `.env.example` file
- [x] Added proper `.gitignore` files
- [x] Updated README with documentation
- [x] Committed and pushed to GitHub

## 📋 Step-by-Step Deployment Process

### Step 1: Deploy Backend API
1. Go to https://vercel.com/dashboard
2. Click **"Add New..."** → **"Project"**
3. Select **"Import Git Repository"**
4. Choose your `Auto-Pro` repository
5. Configure:
   ```
   Project Name: auto-pro-backend
   Framework: Other
   Root Directory: backend
   Build Command: (leave empty)
   Output Directory: (leave empty)
   Install Command: npm install
   ```
6. Add Environment Variables:
   ```
   NODE_ENV=production
   PORT=5000
   MONGO_URI=mongodb+srv://gaurav:gaurav2007@cluster0.28mzgrv.mongodb.net/autopro?retryWrites=true&w=majority&appName=Cluster0
   JWT_SECRET=autopro_secret_key_123!
   ```
7. Click **"Deploy"**
8. Wait 2-3 minutes
9. **Copy your backend URL** (e.g., `https://auto-pro-backend.vercel.app`)

### Step 2: Deploy Frontend
1. In Vercel Dashboard, click **"Add New..."** → **"Project"**
2. Select the same `Auto-Pro` repository again
3. Configure:
   ```
   Project Name: auto-pro-frontend
   Framework: Vite
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```
4. Add Environment Variable:
   ```
   VITE_API_URL=https://auto-pro-backend.vercel.app
   ```
   *(Replace with your actual backend URL from Step 1)*

5. Click **"Deploy"**
6. Wait 2-3 minutes
7. **Copy your frontend URL** (e.g., `https://auto-pro-frontend.vercel.app`)

### Step 3: Update Backend CORS
1. In your code editor, open `backend/server.js`
2. Update CORS configuration:
   ```javascript
   app.use(cors({
       origin: [
           'http://localhost:3000',
           'https://auto-pro-frontend.vercel.app', // Add your frontend URL
       ],
       credentials: true 
   }));
   ```
3. Commit and push:
   ```bash
   git add backend/server.js
   git commit -m "Add production frontend URL to CORS"
   git push origin main
   ```
4. Vercel will automatically redeploy backend

### Step 4: Verify MongoDB Access
1. Go to https://cloud.mongodb.com
2. Navigate to **Network Access**
3. Ensure `0.0.0.0/0` is in the IP Access List
4. If not, click **"Add IP Address"** → **"Allow Access from Anywhere"**

### Step 5: Test Your Deployment
Visit your frontend URL and test:
- [ ] Homepage loads
- [ ] Dark mode toggle works
- [ ] E-Rickshaws page shows products
- [ ] Spare parts page shows products
- [ ] Contact page map loads
- [ ] User registration works
- [ ] User login works
- [ ] Admin login (admin@autopro.com / admin123)
- [ ] Admin dashboard accessible
- [ ] Add/edit/delete products (admin)
- [ ] View appointments (admin)
- [ ] Appointment booking works

## 🎯 Your Deployment URLs

Once deployed, fill in your URLs here:

```
Backend API: https://_____________________________.vercel.app
Frontend:    https://_____________________________.vercel.app
```

## 🔧 Post-Deployment

### Enable Auto-Deploy
Both projects are configured for automatic deployment on every push to `main` branch.

### Monitor Deployments
- View logs: Vercel Dashboard → Project → Deployments → Click deployment → View Logs
- Check errors: Runtime Logs tab

### Custom Domain (Optional)
1. Purchase domain from registrar
2. In Vercel → Project → Settings → Domains
3. Add domain and configure DNS

## 📞 Troubleshooting

### Frontend can't connect to backend
- Verify `VITE_API_URL` is set correctly in frontend environment variables
- Check backend CORS includes frontend URL
- Inspect browser console for errors

### Backend errors
- Check environment variables are set
- Verify MongoDB connection string
- Review deployment logs in Vercel

### Database connection failed
- Ensure MongoDB Atlas allows `0.0.0.0/0` in Network Access
- Verify MONGO_URI is correct
- Check if cluster is paused (Atlas free tier)

## 🎉 Success!

Your Auto Pro application is now live on Vercel!

Share your URLs:
- **Public Site**: Your frontend URL
- **API Docs**: Your backend URL

---

Need help? Check DEPLOYMENT_GUIDE.md for detailed instructions.
