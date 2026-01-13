# Where Contact Form Data is Saved

## 📍 Location

**All contact form submissions are saved to:**
```
data/contact-submissions.json
```

**Full path on your Mac:**
```
/Users/takiacademy/Downloads/HTML-CSS-JS-Static/data/contact-submissions.json
```

---

## 📂 File Structure

The `data/` folder is **automatically created** when the first form is submitted:

```
HTML-CSS-JS-Static/
├── server.js
├── data/                          ← Auto-created on first submission
│   └── contact-submissions.json  ← All submissions saved here
├── public/
├── views/
└── ...
```

---

## 📝 Data Format

The file contains a JSON array with all submissions:

```json
[
  {
    "name": "John Doe",
    "email": "john@example.com",
    "company": "Acme Corp",
    "message": "Hello, I'm interested in your services...",
    "timestamp": "2024-01-15T10:30:00.000Z",
    "lang": "en"
  },
  {
    "name": "Jane Smith",
    "email": "jane@example.com",
    "company": "Tech Startup",
    "message": "I need help with video production...",
    "timestamp": "2024-01-16T14:20:00.000Z",
    "lang": "en"
  }
]
```

**Fields saved:**
- `name` - User's name
- `email` - User's email
- `company` - Company name (optional)
- `message` - Message content
- `timestamp` - When it was submitted (ISO format)
- `lang` - Language used (en/fr/ar)

---

## 🔍 How to Access the Data

### **Method 1: View File in Finder/File Explorer**

1. Open Finder (Mac) or File Explorer (Windows)
2. Navigate to: `/Users/takiacademy/Downloads/HTML-CSS-JS-Static/data/`
3. Open `contact-submissions.json` with any text editor
4. View all submissions!

---

### **Method 2: View via Terminal/Command Line**

**On Mac/Linux:**
```bash
# View entire file
cat data/contact-submissions.json

# View with formatting (requires jq)
cat data/contact-submissions.json | jq .

# View latest submission
cat data/contact-submissions.json | jq '.[-1]'

# Count total submissions
cat data/contact-submissions.json | jq '. | length'

# View only emails
cat data/contact-submissions.json | jq '.[].email'
```

**On Windows (Command Prompt):**
```bash
# View entire file
type data\contact-submissions.json

# View with formatting (requires PowerShell)
Get-Content data\contact-submissions.json | ConvertFrom-Json | ConvertTo-Json -Depth 10
```

**On Windows (PowerShell):**
```powershell
# View entire file
Get-Content data\contact-submissions.json

# View as formatted JSON
Get-Content data\contact-submissions.json | ConvertFrom-Json | Format-List
```

---

### **Method 3: View in Your Code Editor**

1. Open VS Code or any editor
2. Open the file: `data/contact-submissions.json`
3. The file will show all submissions in JSON format
4. You can search, filter, or export as needed

---

### **Method 4: Check if File Exists**

**On Mac/Linux:**
```bash
ls -la data/contact-submissions.json
```

**On Windows:**
```bash
dir data\contact-submissions.json
```

**If file doesn't exist yet:**
- It will be created automatically when the first form is submitted
- The `data/` folder will also be auto-created

---

## 🧪 Testing - See Data Being Saved

### **Step 1: Make sure server is running**
```bash
npm start
```

### **Step 2: Submit a test form**
1. Go to: `http://localhost:5000/en/contact`
2. Fill out the form
3. Click Submit

### **Step 3: Check the file**

**Option A: Check in terminal**
```bash
cat data/contact-submissions.json
```

**Option B: Check in Finder**
- Navigate to `data/` folder
- Open `contact-submissions.json`

You should see your submission there! ✅

---

## 📊 View Data in Real-Time (Optional)

You can watch the file for new submissions:

**On Mac/Linux:**
```bash
# Watch file for changes
tail -f data/contact-submissions.json

# Or use jq to watch with formatting
watch -n 1 'cat data/contact-submissions.json | jq .'
```

**On Windows (PowerShell):**
```powershell
# Watch file for changes
Get-Content data\contact-submissions.json -Wait -Tail 5
```

Now when someone submits a form, you'll see it appear in real-time!

---

## 🔐 Privacy & Security

**Important Notes:**

1. **File is Local Only:**
   - Data is saved on your server only
   - Not accessible from the internet
   - Only you can see it

2. **File Permissions:**
   - File is readable/writable by server only
   - Add to `.gitignore` (already added!)
   - Don't commit to GitHub

3. **Data Backup:**
   - Regularly backup `data/contact-submissions.json`
   - Consider moving to database for production

---

## 🗑️ Clear/Delete Submissions

**Delete all submissions:**
```bash
# On Mac/Linux
rm data/contact-submissions.json

# On Windows
del data\contact-submissions.json
```

The file will be recreated when the next form is submitted.

**Delete specific submission:**
- Open file in editor
- Remove the entry from the JSON array
- Save file

---

## 🔄 Export Data

### **Export to CSV:**

**On Mac/Linux (requires jq):**
```bash
cat data/contact-submissions.json | jq -r '.[] | [.name, .email, .company, .message, .timestamp] | @csv' > submissions.csv
```

**Using Node.js script:**
```javascript
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('data/contact-submissions.json', 'utf8'));

const csv = data.map(sub => 
  `"${sub.name}","${sub.email}","${sub.company || ''}","${sub.message.replace(/"/g, '""')}","${sub.timestamp}"`
).join('\n');

fs.writeFileSync('submissions.csv', 'Name,Email,Company,Message,Timestamp\n' + csv);
```

---

## 📧 Future: Add Email Notifications

If you want to receive an email when someone submits the form:

See `SETUP_GUIDE.md` for instructions on adding email notifications using nodemailer.

---

## 🎯 Quick Access Commands

**Most common commands:**

```bash
# View all submissions
cat data/contact-submissions.json | jq .

# View latest submission
cat data/contact-submissions.json | jq '.[-1]'

# Count submissions
cat data/contact-submissions.json | jq '. | length'

# View file location
pwd
# Then navigate to: data/contact-submissions.json
```

---

## ✅ Summary

**Where:** `data/contact-submissions.json`  
**When:** Created automatically on first submission  
**Format:** JSON array  
**Access:** Via terminal, file explorer, or code editor  
**Privacy:** Local file only, not publicly accessible

**To see your data:**
1. Submit a test form at `http://localhost:5000/en/contact`
2. Run: `cat data/contact-submissions.json`
3. See your submission! 🎉

---

## 🚀 Production Note

For production deployments:
- File persists on most platforms (Railway, Render, etc.)
- For high traffic, consider moving to a database
- Regular backups recommended
- See `DEPLOYMENT_COMPARISON.md` for deployment options
