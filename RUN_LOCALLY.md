# How to Run Project Locally

## 🚀 Quick Start (5 minutes)

### **Step 1: Install Node.js**

First, check if you have Node.js installed:

```bash
node --version
npm --version
```

**If not installed:**
1. Go to [nodejs.org](https://nodejs.org/)
2. Download and install LTS version
3. Restart your terminal
4. Verify: `node --version`

---

### **Step 2: Navigate to Project Folder**

Open terminal/command prompt and go to your project:

```bash
cd /Users/takiacademy/Downloads/HTML-CSS-JS-Static
```

Or on Windows:
```bash
cd C:\Users\YourName\Downloads\HTML-CSS-JS-Static
```

---

### **Step 3: Install Dependencies**

Install required packages:

```bash
npm install
```

This will install:
- `express` (web server)
- `ejs` (templating engine)

**Wait for:** `added 50 packages in 5s` (or similar)

---

### **Step 4: (Optional) Set Calendly URL**

Create a `.env` file in the project root:

```bash
# On Mac/Linux
echo "CALENDLY_URL=https://calendly.com/YOUR_USERNAME/15min" > .env

# Or manually create .env file and add:
CALENDLY_URL=https://calendly.com/YOUR_USERNAME/15min
```

**Or edit directly in code:**
- Open `public/script.js`
- Line 1: Change `YOUR_USERNAME` to your actual Calendly username

---

### **Step 5: Start the Server**

Run the server:

```bash
npm start
```

**Or:**
```bash
node server.js
```

You should see:
```
Server running on http://0.0.0.0:5000
```

---

### **Step 6: Open in Browser**

Visit:
```
http://localhost:5000
```

**Or:**
```
http://127.0.0.1:5000
```

The site will automatically redirect to: `http://localhost:5000/en`

---

## ✅ That's It!

Your site should now be running locally! 🎉

---

## 📝 Step-by-Step Commands (Copy & Paste)

```bash
# 1. Navigate to project
cd /Users/takiacademy/Downloads/HTML-CSS-JS-Static

# 2. Install dependencies
npm install

# 3. Start server
npm start

# 4. Open browser
# Go to: http://localhost:5000
```

---

## 🌐 Available URLs

Once running, you can visit:

- **Homepage (English):** `http://localhost:5000/en`
- **Homepage (French):** `http://localhost:5000/fr`
- **Homepage (Arabic):** `http://localhost:5000/ar`
- **About:** `http://localhost:5000/en/about`
- **Services:** `http://localhost:5000/en/services`
- **Blog:** `http://localhost:5000/en/blog`
- **Contact:** `http://localhost:5000/en/contact`

---

## 🔧 Troubleshooting

### **Problem: "command not found: node"**

**Solution:**
- Install Node.js from [nodejs.org](https://nodejs.org/)
- Restart terminal after installation

---

### **Problem: "Cannot find module 'express'"**

**Solution:**
```bash
npm install
```

This installs all required packages.

---

### **Problem: "Port 5000 already in use"**

**Solution 1:** Change port in `server.js`:
```javascript
const PORT = process.env.PORT || 3000; // Change 5000 to 3000
```

**Solution 2:** Kill the process using port 5000:
```bash
# Mac/Linux
lsof -ti:5000 | xargs kill -9

# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

---

### **Problem: "Error: ENOENT: no such file or directory"**

**Solution:**
- Make sure you're in the correct directory
- Check that all files are present
- Run: `ls -la` (Mac/Linux) or `dir` (Windows)

---

### **Problem: Calendly not opening**

**Solution:**
1. Update Calendly URL:
   - Create `.env` file with `CALENDLY_URL=https://calendly.com/YOUR_USERNAME/15min`
   - Or edit `public/script.js` line 1

2. Restart server:
   ```bash
   # Stop server (Ctrl+C)
   npm start
   ```

---

### **Problem: Contact form not saving**

**Solution:**
1. Make sure server is running
2. Check browser console for errors
3. Check server terminal for errors
4. Verify `data/` folder is created (will be auto-created on first submission)

---

## 📂 Project Structure

```
HTML-CSS-JS-Static/
├── server.js              # Main server file
├── package.json           # Dependencies
├── .env                   # Environment variables (create this)
├── data/                  # Contact form submissions (auto-created)
│   └── contact-submissions.json
├── public/                # Static files (CSS, JS, images)
├── views/                 # EJS templates
├── locales/               # Translation files
└── node_modules/          # Dependencies (after npm install)
```

---

## 🎯 Testing Features

### **Test Homepage:**
1. Visit `http://localhost:5000/en`
2. Should see hero section
3. Click "Book Strategy Call" - intake form should open

### **Test Contact Form:**
1. Visit `http://localhost:5000/en/contact`
2. Fill out form
3. Submit
4. Should see success message
5. Check `data/contact-submissions.json` file

### **Test Multi-language:**
1. Visit `http://localhost:5000/en` (English)
2. Visit `http://localhost:5000/fr` (French)
3. Visit `http://localhost:5000/ar` (Arabic)
4. Use language switcher in navigation

### **Test Dark Mode:**
1. Click moon/sun icon in navigation
2. Should toggle between light/dark themes
3. Preference should save (check again after refresh)

---

## 🛑 Stop the Server

To stop the server:
- Press `Ctrl+C` in the terminal
- Or close the terminal window

---

## 🔄 Restart Server

After making changes:
1. Stop server: `Ctrl+C`
2. Start again: `npm start`

**Note:** Some changes require server restart (like environment variables)

---

## 💡 Development Tips

### **Watch for Changes (Optional):**

Install `nodemon` for auto-restart on file changes:

```bash
npm install -g nodemon
nodemon server.js
```

Now server restarts automatically when you save files!

---

### **Check Logs:**

Server logs appear in terminal:
- Form submissions
- Errors
- Request info

---

### **Clear Data (if needed):**

Delete contact submissions:
```bash
rm -rf data/
# Or on Windows: rmdir /s data
```

---

## 📋 Quick Checklist

- [ ] Node.js installed (`node --version`)
- [ ] Navigated to project folder
- [ ] Ran `npm install`
- [ ] Created `.env` file (optional)
- [ ] Ran `npm start`
- [ ] Opened `http://localhost:5000` in browser
- [ ] Site loads correctly
- [ ] Contact form works
- [ ] Calendly integration works

---

## 🎉 You're All Set!

Your project is now running locally. Make changes, test features, and when ready, deploy to production!

For deployment instructions, see `DEPLOYMENT_COMPARISON.md`
