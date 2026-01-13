# Setup Guide: Calendly & Contact Form

## ✅ What Was Fixed

### 1. **Calendly Integration** ✓
- ✅ Now works with environment variable support
- ✅ Easy to configure
- ✅ Works with intake form pre-fill

### 2. **Contact Form** ✓
- ✅ Backend handler added
- ✅ Form submissions saved to file
- ✅ Success/error messages
- ✅ Input validation and sanitization

---

## 🚀 Quick Setup (5 minutes)

### **Step 1: Configure Calendly**

**Option A: Using Environment Variable (Recommended)**
```bash
# Create .env file in project root
echo "CALENDLY_URL=https://calendly.com/YOUR_USERNAME/15min" > .env
```

**Option B: Direct Edit**
Edit `public/script.js` line 1:
```javascript
const CALENDLY_URL = 'https://calendly.com/YOUR_ACTUAL_USERNAME/15min';
```

Replace `YOUR_ACTUAL_USERNAME` with your real Calendly username.

### **Step 2: Test It**

1. Start the server:
```bash
npm start
```

2. Click any "Book Strategy Call" or "Book Free Consultation" button
3. Fill out the intake form
4. Calendly popup should open with pre-filled data

---

## 📝 Contact Form Setup

### **How It Works**

1. User fills out contact form on `/en/contact` (or `/fr/contact`, `/ar/contact`)
2. Form submits to server
3. Data is validated and sanitized
4. Saved to `data/contact-submissions.json`
5. User sees success message

### **Where Data is Saved**

All contact form submissions are saved to:
```
data/contact-submissions.json
```

**File Structure:**
```json
[
  {
    "name": "John Doe",
    "email": "john@example.com",
    "company": "Acme Corp",
    "message": "Hello, I'm interested in your services...",
    "timestamp": "2024-01-15T10:30:00.000Z",
    "lang": "en"
  }
]
```

### **Accessing Form Submissions**

**Option 1: View File Directly**
```bash
cat data/contact-submissions.json
```

**Option 2: Create Admin Page (Future)**
You can create a simple admin page to view submissions if needed.

**Option 3: Email Notifications (Future)**
Add email sending using nodemailer (see Advanced Setup below).

---

## 🔧 Advanced Setup

### **Add Email Notifications**

If you want to receive emails when someone submits the contact form:

1. **Install nodemailer:**
```bash
npm install nodemailer
```

2. **Add to server.js** (after line 12):
```javascript
const nodemailer = require('nodemailer');

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // or your email service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
```

3. **Add email sending in contact form handler** (in server.js, after saving to file):
```javascript
// Send email notification
const mailOptions = {
  from: process.env.EMAIL_USER,
  to: 'your-email@example.com', // Your email
  subject: `New Contact Form Submission from ${sanitizedData.name}`,
  html: `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${sanitizedData.name}</p>
    <p><strong>Email:</strong> ${sanitizedData.email}</p>
    <p><strong>Company:</strong> ${sanitizedData.company || 'N/A'}</p>
    <p><strong>Message:</strong></p>
    <p>${sanitizedData.message}</p>
    <p><strong>Submitted:</strong> ${sanitizedData.timestamp}</p>
  `
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('Email error:', error);
  } else {
    console.log('Email sent:', info.response);
  }
});
```

4. **Add to .env:**
```
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

---

## 🌐 Deployment

### **Deployment Platforms**

#### **Option 1: Railway (Recommended)**
1. Push code to GitHub
2. Connect Railway to your repo
3. Add environment variable: `CALENDLY_URL=https://calendly.com/YOUR_USERNAME/15min`
4. Deploy!

**Railway automatically:**
- Detects Node.js
- Installs dependencies
- Runs `npm start`
- Provides URL

#### **Option 2: Render**
1. Create new Web Service
2. Connect GitHub repo
3. Add environment variable
4. Deploy!

#### **Option 3: Vercel**
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Add environment variable in dashboard
4. Deploy!

#### **Option 4: Heroku**
1. Install Heroku CLI
2. Run: `heroku create your-app-name`
3. Set env var: `heroku config:set CALENDLY_URL=https://calendly.com/YOUR_USERNAME/15min`
4. Deploy: `git push heroku main`

### **Environment Variables to Set**

In your deployment platform, set:
```
CALENDLY_URL=https://calendly.com/YOUR_USERNAME/15min
PORT=5000 (usually auto-set)
```

### **Important Notes for Deployment**

1. **Data Storage**: The `data/` folder will be created automatically on first submission
2. **File Persistence**: On platforms like Railway/Render, files persist between deployments
3. **Backup**: Consider backing up `data/contact-submissions.json` regularly
4. **Database**: For production, consider moving to a database (MongoDB, PostgreSQL) instead of JSON file

---

## 🧪 Testing

### **Test Calendly:**
1. Go to homepage
2. Click "Book Strategy Call"
3. Fill intake form
4. Submit
5. Calendly should open with pre-filled name/email

### **Test Contact Form:**
1. Go to `/en/contact`
2. Fill out form
3. Submit
4. Should see success message
5. Check `data/contact-submissions.json` file

---

## 📊 Monitoring Form Submissions

### **View Submissions via Terminal:**
```bash
# View all submissions
cat data/contact-submissions.json | jq .

# Count submissions
cat data/contact-submissions.json | jq '. | length'

# View latest submission
cat data/contact-submissions.json | jq '.[-1]'
```

### **Create Simple Admin View (Optional)**

You can create a simple admin page to view submissions:

**Add to server.js:**
```javascript
app.get('/admin/submissions', (req, res) => {
  const submissionsFile = path.join(__dirname, 'data', 'contact-submissions.json');
  if (fs.existsSync(submissionsFile)) {
    const submissions = JSON.parse(fs.readFileSync(submissionsFile, 'utf8'));
    res.json(submissions);
  } else {
    res.json([]);
  }
});
```

Then visit: `http://localhost:5000/admin/submissions`

---

## ⚠️ Troubleshooting

### **Calendly Not Opening:**
- ✅ Check `CALENDLY_URL` is correct
- ✅ Make sure Calendly widget script is loaded (check browser console)
- ✅ Verify your Calendly username is correct

### **Contact Form Not Working:**
- ✅ Check server logs for errors
- ✅ Make sure `data/` folder is writable
- ✅ Check form action URL matches route
- ✅ Verify all required fields are filled

### **Data Not Saving:**
- ✅ Check file permissions on `data/` folder
- ✅ Check server logs for errors
- ✅ Verify JSON file is valid (not corrupted)

---

## 📝 Summary

**Effort Required:**
- ✅ **Calendly**: 2 minutes (just update URL)
- ✅ **Contact Form**: Already working! Just test it

**What Works Now:**
- ✅ Calendly integration with intake form
- ✅ Contact form saves to file
- ✅ Success/error messages
- ✅ Input validation
- ✅ Ready for deployment

**Next Steps:**
1. Update Calendly URL
2. Test both features
3. Deploy to your hosting platform
4. (Optional) Add email notifications

---

## 🎯 Quick Checklist

- [ ] Update Calendly URL in `.env` or `script.js`
- [ ] Test Calendly booking flow
- [ ] Test contact form submission
- [ ] Check `data/contact-submissions.json` file
- [ ] Set environment variables in deployment platform
- [ ] Deploy and test on production

**Total Time: ~10 minutes** ⚡
