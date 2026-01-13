const express = require('express');
const path = require('path');
const fs = require('fs');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 7890;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // For JSON form submissions

// Session management for admin
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key-change-this-in-production',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 } // 24 hours
}));

app.use((req, res, next) => {
  res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  next();
});

const locales = {};
const supportedLangs = ['en', 'fr', 'ar'];

supportedLangs.forEach(lang => {
  const filePath = path.join(__dirname, 'locales', `${lang}.json`);
  locales[lang] = JSON.parse(fs.readFileSync(filePath, 'utf8'));
});

function getTranslations(lang) {
  return locales[lang] || locales['en'];
}

// Reload locales from files (after editing)
function reloadLocales() {
  supportedLangs.forEach(lang => {
    const filePath = path.join(__dirname, 'locales', `${lang}.json`);
    try {
      locales[lang] = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (err) {
      console.error(`Error reloading locale ${lang}:`, err);
    }
  });
}

// Admin authentication middleware
function requireAuth(req, res, next) {
  if (req.session && req.session.admin) {
    return next();
  }
  res.redirect('/admin/login?error=Please login first');
}

function renderPage(req, res, page, lang, pagePath = '', extraData = {}) {
  const t = getTranslations(lang);
  
  app.render(`pages/${page}`, { t, lang, ...extraData }, (err, pageContent) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error rendering page');
    }
    
    res.render('layout', {
      body: pageContent,
      t,
      lang,
      page,
      currentPath: pagePath,
      title: t.nav[page] || 'ClickndBait',
      CALENDLY_URL: process.env.CALENDLY_URL || 'https://calendly.com/jihedlatiri/30min',
      ...extraData
    });
  });
}

// ============================================
// ADMIN ROUTES (Must be before /:lang routes)
// ============================================

// Admin login page
app.get('/admin/login', (req, res) => {
  const error = req.query.error;
  res.render('admin/login', { error });
});

// Admin login handler
app.post('/admin/login', (req, res) => {
  const password = process.env.ADMIN_PASSWORD || 'admin123'; // Change this!
  const { adminPassword } = req.body;
  
  if (adminPassword === password) {
    req.session.admin = true;
    res.redirect('/admin');
  } else {
    res.redirect('/admin/login?error=Invalid password');
  }
});

// Admin logout
app.get('/admin/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/admin/login');
});

// Admin dashboard
app.get('/admin', requireAuth, (req, res) => {
  res.render('admin/dashboard', { 
    supportedLangs,
    locales 
  });
});

// Admin editor - select language
app.get('/admin/edit', requireAuth, (req, res) => {
  const lang = req.query.lang || 'en';
  if (!supportedLangs.includes(lang)) {
    return res.redirect('/admin');
  }
  
  const localeData = locales[lang] || {};
  res.render('admin/editor', { 
    lang,
    localeData,
    supportedLangs
  });
});

// Admin save handler
app.post('/admin/save', requireAuth, (req, res) => {
  try {
    const { lang, content } = req.body;
    
    if (!supportedLangs.includes(lang)) {
      return res.json({ success: false, error: 'Invalid language' });
    }
    
    // Parse the content
    let updatedContent;
    try {
      updatedContent = JSON.parse(content);
    } catch (err) {
      return res.json({ success: false, error: 'Invalid JSON format' });
    }
    
    // Save to file
    const filePath = path.join(__dirname, 'locales', `${lang}.json`);
    fs.writeFileSync(filePath, JSON.stringify(updatedContent, null, 2));
    
    // Reload locales
    reloadLocales();
    
    res.json({ success: true, message: 'Content saved successfully!' });
  } catch (error) {
    console.error('Error saving content:', error);
    res.json({ success: false, error: error.message });
  }
});

// ============================================
// PUBLIC ROUTES
// ============================================

app.get('/', (req, res) => {
  res.redirect('/en');
});

app.get('/:lang', (req, res) => {
  // Don't match admin routes
  if (req.params.lang === 'admin') {
    return res.redirect('/admin');
  }
  
  const lang = supportedLangs.includes(req.params.lang) ? req.params.lang : 'en';
  if (!supportedLangs.includes(req.params.lang)) {
    return res.redirect('/en');
  }
  renderPage(req, res, 'home', lang, '');
});

app.get('/:lang/about', (req, res) => {
  const lang = supportedLangs.includes(req.params.lang) ? req.params.lang : 'en';
  renderPage(req, res, 'about', lang, '/about');
});

app.get('/:lang/services', (req, res) => {
  const lang = supportedLangs.includes(req.params.lang) ? req.params.lang : 'en';
  renderPage(req, res, 'services', lang, '/services');
});

app.get('/:lang/blog', (req, res) => {
  const lang = supportedLangs.includes(req.params.lang) ? req.params.lang : 'en';
  renderPage(req, res, 'blog', lang, '/blog');
});

app.get('/:lang/contact', (req, res) => {
  const lang = supportedLangs.includes(req.params.lang) ? req.params.lang : 'en';
  const success = req.query.success === 'true';
  const error = req.query.error === 'true';
  renderPage(req, res, 'contact', lang, '/contact', { success, error });
});

// Contact form submission handler
app.post('/:lang/contact', (req, res) => {
  const lang = supportedLangs.includes(req.params.lang) ? req.params.lang : 'en';
  
  try {
    const { name, email, company, message } = req.body;
    
    // Basic validation
    if (!name || !email || !message) {
      return res.redirect(`/${lang}/contact?error=true`);
    }
    
    // Sanitize input (basic)
    const sanitizedData = {
      name: name.trim().substring(0, 100),
      email: email.trim().substring(0, 100),
      company: company ? company.trim().substring(0, 100) : '',
      message: message.trim().substring(0, 2000),
      timestamp: new Date().toISOString(),
      lang: lang
    };
    
    // Save to file (creates data directory if it doesn't exist)
    const dataDir = path.join(__dirname, 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    const submissionsFile = path.join(dataDir, 'contact-submissions.json');
    
    // Read existing submissions
    let submissions = [];
    if (fs.existsSync(submissionsFile)) {
      try {
        const fileData = fs.readFileSync(submissionsFile, 'utf8');
        submissions = JSON.parse(fileData);
      } catch (err) {
        console.error('Error reading submissions file:', err);
        submissions = [];
      }
    }
    
    // Add new submission
    submissions.push(sanitizedData);
    
    // Save back to file
    fs.writeFileSync(submissionsFile, JSON.stringify(submissions, null, 2));
    
    // Optional: Send email notification (requires email service)
    // You can add nodemailer or similar here
    
    // Redirect with success message
    res.redirect(`/${lang}/contact?success=true`);
    
  } catch (error) {
    console.error('Error processing contact form:', error);
    res.redirect(`/${lang}/contact?error=true`);
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
  console.log(`Admin panel: http://localhost:${PORT}/admin`);
});
