# Railway Deployment Guide - Step by Step

## 🚀 Complete Guide for First-Time Deployment

This guide will walk you through deploying your website to Railway, step by step.

---

## 📋 Prerequisites Checklist

Before starting, make sure you have:

- [x] Code working locally
- [ ] GitHub account (free)
- [ ] Railway account (free to sign up)
- [ ] Git installed on your computer

**Let's check if you have Git installed:**

Open terminal and run:
```bash
git --version
```

**If you see a version number:** ✅ You ha ve Git installed!

**If you see "command not found":**
- **Mac:** Git comes pre-installed. Try restarting terminal.
- **Windows:** Download from [git-scm.com](https://git-scm.com/download/win)
- **Linux:** Run `sudo apt-get install git`

---

## 🎯 Step 1: Prepare Your Code

### **Step 1.1: Create .env File (Optional but Recommended)**

Create a `.env` file in your project root:

```bash
# In project folder
touch .env
```

Edit `.env` file and add (replace with your values):
```bash
ADMIN_PASSWORD=your-secure-admin-password-here
SESSION_SECRET=any-random-string-here-12345
CALENDLY_URL=https://calendly.com/YOUR_USERNAME/15min
PORT=5000
```

**Note:** `.env` file is already in `.gitignore`, so it won't be uploaded to GitHub (which is good for security).

---

### **Step 1.2: Test Locally First**

Make sure everything works locally:

```bash
# Install dependencies
npm install

# Start server
npm start
```

**Test these URLs:**
- `http://localhost:7890` - Should redirect to `/en`
- `http://localhost:7890/admin` - Should show login page
- `http://localhost:7890/en/contact` - Contact form should work

If everything works, you're ready to deploy! ✅

---

## 📦 Step 2: Create GitHub Repository

### **Step 2.1: Create GitHub Account (if you don't have one)**

1. Go to [github.com](https://github.com)
2. Click **Sign up** (top right)
3. Create free account
4. Verify your email

### **Step 2.2: Create New Repository**

1. Log into GitHub
2. Click **"+"** button (top right) → **"New repository"**
3. Fill in:
   - **Repository name:** `clickndbait-website` (or any name)
   - **Description:** (optional) "ClickndBait Agency Website"
   - **Visibility:** Choose **Private** or **Public**
   - **DO NOT** check "Initialize with README" (we already have code)
4. Click **"Create repository"**

### **Step 2.3: Upload Code to GitHub**

**Option A: Using GitHub Desktop (Easier for Beginners)**

1. Download [GitHub Desktop](https://desktop.github.com/)
2. Install and sign in
3. Click **File** → **Add Local Repository**
4. Click **Choose** and select your project folder
5. If asked to create repository, click **"Create a Repository"**
6. Fill in:
   - **Name:** `clickndbait-website`
   - **Description:** (optional)
   - Leave other settings default
7. Click **"Create Repository"**
8. In bottom left, add **Commit message:** "Initial commit"
9. Click **"Commit to main"**
10. Click **"Publish repository"** button (top center)
11. Make sure **"Keep this code private"** is unchecked (if you want public)
12. Click **"Publish repository"**

**Option B: Using Terminal (If you prefer command line)**

1. Open terminal in your project folder:
```bash
cd /Users/takiacademy/Downloads/HTML-CSS-JS-Static
```

2. Initialize Git (if not already done):
```bash
git init
```

3. Add all files:
```bash
git add .
```

4. Create first commit:
```bash
git commit -m "Initial commit"
```

5. Add GitHub repository (replace YOUR_USERNAME and REPO_NAME):
```bash
git remote add origin https://github.com/YOUR_USERNAME/clickndbait-website.git
```

6. Push to GitHub:
```bash
git branch -M main
git push -u origin main
```

You'll be asked for GitHub username and password/token.

**Your code is now on GitHub! ✅**

---

## 🚂 Step 3: Deploy to Railway

### **Step 3.1: Create Railway Account**

1. Go to [railway.app](https://railway.app)
2. Click **"Start a New Project"** or **"Login"**
3. Sign up with GitHub (recommended):
   - Click **"Login with GitHub"**
   - Authorize Railway
   - You're logged in! ✅

### **Step 3.2: Create New Project**

1. In Railway dashboard, click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. If prompted, authorize Railway to access GitHub
4. Select your repository: `clickndbait-website`
5. Railway will automatically detect Node.js and start deploying! ✅

**Railway automatically:**
- Detects your Node.js project
- Installs dependencies (`npm install`)
- Runs your app (`npm start`)

---

### **Step 3.3: Configure Environment Variables**

1. In Railway project, click on your **service** (the box that appeared)
2. Go to **"Variables"** tab (left sidebar)
3. Click **"+ New Variable"**
4. Add these variables one by one:

**Variable 1:**
- **Key:** `ADMIN_PASSWORD`
- **Value:** `your-secure-admin-password-here` (change this!)
- Click **Add**

**Variable 2:**
- **Key:** `SESSION_SECRET`
- **Value:** `any-random-string-here-12345` (any random text)
- Click **Add**

**Variable 3:**
- **Key:** `CALENDLY_URL`
- **Value:** `https://calendly.com/YOUR_USERNAME/15min` (your Calendly URL)
- Click **Add**

**Variable 4 (Optional):**
- **Key:** `PORT`
- **Value:** `5000`
- Railway sets this automatically, but you can add it if needed

**Important:** After adding each variable, Railway will automatically redeploy your app!

---

### **Step 3.4: Get Your Website URL**

1. In Railway project, click on your **service**
2. Go to **"Settings"** tab
3. Scroll down to **"Domains"** section
4. You'll see a URL like: `your-app-name.railway.app`
5. Click **"Generate Domain"** if you don't see one
6. **Copy this URL** - this is your live website! ✅

---

### **Step 3.5: Test Your Deployment**

1. Click on the URL Railway provided
2. Or visit: `https://your-app-name.railway.app`

**Test these URLs:**
- `/` - Should redirect to `/en`
- `/en` - English homepage
- `/fr` - French homepage
- `/ar` - Arabic homepage
- `/admin` - Admin login page
- `/en/contact` - Contact form

**Everything should work! ✅**

---

## 🔧 Step 4: Set Up Custom Domain (Optional)

If you want to use your own domain (like `yourdomain.com`):

### **Step 4.1: Add Domain in Railway**

1. In Railway project → **Settings** → **Domains**
2. Click **"+ Add Domain"**
3. Enter your domain: `yourdomain.com`
4. Railway will show you DNS records needed

### **Step 4.2: Update DNS in Hostinger**

1. Log into [Hostinger hPanel](https://hpanel.hostinger.com)
2. Go to **Domains** → Your domain → **DNS Zone Editor**
3. Add CNAME record:
   - **Type:** CNAME
   - **Name:** `@` (or leave blank)
   - **Value:** `your-app-name.railway.app` (from Railway)
   - **TTL:** 3600
4. Click **Add**
5. Wait 5-30 minutes for DNS to propagate

**See `DOMAIN_SETUP_GUIDE.md` for detailed instructions.**

---

## 📊 Step 5: Monitor Your Deployment

### **View Logs**

1. In Railway, click on your **service**
2. Go to **"Deployments"** tab
3. Click on latest deployment
4. You'll see build logs and runtime logs

### **View Metrics**

1. Go to **"Metrics"** tab
2. See CPU, Memory usage
3. See request logs

---

## 🐛 Troubleshooting

### **Problem: Build Failed**

**Check:**
1. Go to **Deployments** tab → Click failed deployment
2. Look at error message
3. Common issues:
   - Missing dependency → Check `package.json`
   - Port not set → Add `PORT` environment variable
   - Syntax error → Fix code locally first

**Solution:**
- Fix error locally
- Commit and push to GitHub
- Railway will auto-deploy again

---

### **Problem: Website Not Loading**

**Check:**
1. Check Railway logs (Deployments tab)
2. Verify environment variables are set
3. Check if service is running (should show green status)

**Solution:**
- Check logs for errors
- Verify `PORT` variable is set
- Try redeploying (Settings → Redeploy)

---

### **Problem: Admin Panel Not Working**

**Check:**
1. Environment variables set correctly?
2. `ADMIN_PASSWORD` matches what you're using?
3. Check logs for errors

**Solution:**
- Verify `ADMIN_PASSWORD` is set in Railway
- Verify `SESSION_SECRET` is set
- Clear browser cookies and try again

---

### **Problem: Contact Form Not Saving**

**Check:**
1. Check logs for file write errors
2. Railway allows file writes, so this should work

**Solution:**
- Check logs in Railway
- File should save to `/data/` folder (persists between deployments)

---

## ✅ Success Checklist

After deployment, verify:

- [ ] Website loads at Railway URL
- [ ] Homepage shows correctly
- [ ] All languages work (EN/FR/AR)
- [ ] Admin panel accessible at `/admin`
- [ ] Can login to admin panel
- [ ] Contact form works
- [ ] Can submit contact form
- [ ] Calendly integration works (if configured)
- [ ] Dark mode works
- [ ] Mobile responsive

---

## 💰 Railway Pricing

**Free Tier:**
- ✅ $5 credit per month
- ✅ 500 hours of usage
- ✅ Usually enough for small websites
- ✅ No credit card required

**If You Exceed Free Tier:**
- Charges only $5/month (Hobby plan)
- Pay-as-you-go after that
- Very affordable

**For Your Site:**
- Should fit in free tier easily
- Low traffic = free forever
- Higher traffic = ~$5/month

---

## 🔄 Updating Your Website

### **How to Update After Deployment:**

1. **Make changes locally**
2. **Test locally** (`npm start`)
3. **Commit changes:**
   ```bash
   git add .
   git commit -m "Description of changes"
   git push
   ```
4. **Railway automatically redeploys!** ✅
   - Usually takes 2-5 minutes
   - Watch progress in Railway dashboard

**No need to do anything in Railway - it's automatic!**

---

## 📝 Quick Reference

**Railway URLs:**
- Dashboard: [railway.app](https://railway.app)
- Project: `railway.app/project/YOUR_PROJECT_ID`
- Your Site: `your-app-name.railway.app`

**Important Files:**
- `package.json` - Dependencies
- `server.js` - Main server file
- `.env` - Environment variables (local)
- Railway Variables - Environment variables (production)

**Commands:**
```bash
# Local testing
npm install    # Install dependencies
npm start      # Start server

# Git (if using terminal)
git add .                           # Stage changes
git commit -m "Your message"        # Commit changes
git push                            # Push to GitHub
```

---

## 🎉 You're Done!

Your website is now live on Railway! 🚀

**Next Steps:**
1. ✅ Test everything thoroughly
2. ✅ Share URL with client
3. ✅ Set up custom domain (if needed)
4. ✅ Monitor first few days

**Congratulations on your first deployment!** 🎊

---

## 📞 Need Help?

If you encounter issues:
1. Check Railway logs first
2. Check this guide's troubleshooting section
3. Railway docs: [docs.railway.app](https://docs.railway.app)
4. Railway Discord: [discord.gg/railway](https://discord.gg/railway)

**You've got this!** 💪
