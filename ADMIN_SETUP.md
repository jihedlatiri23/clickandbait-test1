# Admin Panel Setup Guide

## ✅ Admin Panel is Ready!

A simple, free content management system has been added to your project.

---

## 🚀 Quick Start

### **Step 1: Install New Dependency**

Run this command in your project folder:

```bash
npm install
```

This will install `express-session` needed for admin authentication.

### **Step 2: Set Admin Password (Optional but Recommended)**

Create or edit `.env` file in project root:

```bash
ADMIN_PASSWORD=your-secure-password-here
SESSION_SECRET=your-session-secret-key-here
```

**If you don't set this, default password is:** `admin123`

**⚠️ IMPORTANT: Change this in production!**

### **Step 3: Start Server**

```bash
npm start
```

### **Step 4: Access Admin Panel**

Go to: `http://localhost:7890/admin`

Login with password (default: `admin123` or your custom password)

---

## 📍 Admin Panel URLs

- **Login:** `/admin/login`
- **Dashboard:** `/admin`
- **Edit Content:** `/admin/edit?lang=en` (or fr, ar)

---

## 🎯 How to Use

### **1. Login**
- Go to `/admin`
- Enter password
- Click Login

### **2. Select Language**
- Click on language card (English, French, or Arabic)
- You'll see editor interface

### **3. Edit Content**
- Use sidebar to navigate sections:
  - Hero Section
  - Navigation
  - Services
  - Stats
  - FAQ
  - About
  - Contact
  - Call to Action

### **4. Save Changes**
- Click "💾 Save Changes" button
- Wait for confirmation message
- Visit website to see changes immediately!

---

## 📝 What Can Be Edited

✅ **Hero Section:**
- Title
- Subtitle
- Button texts

✅ **Navigation Labels:**
- All menu items

✅ **Services:**
- Section title/subtitle
- All 4 service titles and descriptions

✅ **Statistics:**
- All stats numbers and labels

✅ **FAQ:**
- Section title
- All questions and answers

✅ **About Page:**
- Title, intro, story

✅ **Contact Page:**
- Title, subtitle, email, phone

✅ **Call to Action:**
- Title, subtitle, button text

---

## 🔒 Security

### **Change Default Password**

**Option 1: Environment Variable (Recommended)**
```bash
# In .env file
ADMIN_PASSWORD=your-strong-password-here
SESSION_SECRET=your-random-secret-key
```

**Option 2: Edit server.js**
Find this line and change:
```javascript
const password = process.env.ADMIN_PASSWORD || 'admin123';
```

### **For Production:**
1. ✅ Use strong password
2. ✅ Set environment variables
3. ✅ Use HTTPS (Railway provides this automatically)
4. ✅ Don't commit `.env` file to Git

---

## 🛠️ Troubleshooting

### **Problem: "Cannot find module 'express-session'"**

**Solution:**
```bash
npm install
```

### **Problem: Login not working**

**Solution:**
- Check password matches what you set
- Default is `admin123` if not set
- Clear browser cookies and try again

### **Problem: Changes not saving**

**Solution:**
- Check browser console for errors
- Make sure JSON format is valid
- Check file permissions on `locales/` folder

### **Problem: Can't access admin panel**

**Solution:**
- Make sure server is running
- Check URL: `http://localhost:7890/admin`
- Try clearing browser cache

---

## 📂 Files Added

**New files:**
- `views/admin/login.ejs` - Login page
- `views/admin/dashboard.ejs` - Dashboard
- `views/admin/editor.ejs` - Content editor
- `public/admin.css` - Admin styling

**Modified files:**
- `server.js` - Added admin routes
- `package.json` - Added express-session

**No changes to existing website code!** ✅

---

## 💡 Tips

1. **Backup Before Editing:**
   - Copy `locales/` folder before making major changes
   - Or use Git to track changes

2. **Test Changes:**
   - Use "Preview" button to see changes
   - Check all languages after editing

3. **Save Frequently:**
   - Don't wait too long between saves
   - Check for confirmation message

4. **Validation:**
   - System validates JSON before saving
   - If save fails, check error message

---

## 🎉 That's It!

Your admin panel is ready to use. Users can now edit website content easily without touching code!

**Access it at:** `http://yourdomain.com/admin`

---

## 📞 Need Help?

If you encounter any issues:
1. Check server logs for errors
2. Verify password is correct
3. Make sure all dependencies are installed
4. Check file permissions

Enjoy your new content management system! 🚀
