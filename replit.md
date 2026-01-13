# ClickndBait Agency Website

## Overview
A professional marketing agency website featuring media buying and video production services. The site supports:
- Light/dark mode theming (blue/black for light, red for dark)
- Multi-language support (English, French, Arabic with RTL)
- Multiple pages (Home, About, Services, Blog, Contact)

## Project Structure
```
├── server.js              # Express server with EJS templating (port 5000)
├── package.json           # Node.js dependencies
├── public/
│   ├── style.css          # All styling (themes, RTL support)
│   ├── script.js          # FAQ accordion, theme toggle
│   ├── logo-light.png     # Logo for light mode
│   └── logo-dark.png      # Logo for dark mode (red)
├── views/
│   ├── layout.ejs         # Main layout template
│   ├── partials/
│   │   ├── header.ejs     # Navigation with lang switcher
│   │   └── footer.ejs     # Footer
│   └── pages/
│       ├── home.ejs       # Home page
│       ├── about.ejs      # About page
│       ├── services.ejs   # Services page
│       ├── blog.ejs       # Blog page
│       └── contact.ejs    # Contact page with form
├── locales/
│   ├── en.json            # English translations
│   ├── fr.json            # French translations
│   └── ar.json            # Arabic translations (RTL)
└── replit.md              # This file
```

## Tech Stack
- Node.js with Express + EJS templating
- Vanilla CSS and JavaScript
- Google Fonts (Inter, Noto Sans Arabic)
- CSS custom properties for theming

## Features
- Dark mode toggle (blue/black for light, red for dark)
- 3 languages: English, French, Arabic (with RTL support)
- 5 pages: Home, About, Services, Blog, Contact
- Stats section ($10K+ ads, 130+ clients, 1000+ videos, 87% retention)
- Contact form
- FAQ accordion
- Responsive design
- Calendly integration for 15-minute free consultations
- Service icons (megaphone, video, chart, rocket)
- B2B and B2C focused content

## URL Structure
- `/` - Redirects to /en
- `/:lang` - Home page (en, fr, ar)
- `/:lang/about` - About page
- `/:lang/services` - Services page
- `/:lang/blog` - Blog page
- `/:lang/contact` - Contact page

## Branding
- Agency Name: ClickndBait Agency
- Light Mode: Blue (#2563eb) and Black
- Dark Mode: Red (#ef4444) theme

## Running the Project
```bash
node server.js
```
Server runs on port 5000.

## Calendar Booking Setup
To enable calendar booking, edit `public/script.js` and replace `YOUR_USERNAME` with your Calendly username:
```javascript
const CALENDLY_URL = 'https://calendly.com/YOUR_USERNAME/15min';
```

## Intake Form Flow
When users click any booking CTA button, they first see an intake form that collects:
- Service interest (Media Buying Meta/Google, Video Editing, Other)
- Personal info (first name, last name, email, phone)
- Business info (company, website, business type, budget range)

After submitting the form, the Calendly popup opens with their information pre-filled. This makes consultations more organized and manageable.

## Recent Changes
- Added intake form before Calendly booking (collects service interest, personal info, business type, budget)
- Updated language switcher to use circular flag logos (UK, France, Arabic League)
- Added Calendly popup for 15-minute free consultations
- Added service icons (megaphone, video, chart, rocket)
- Updated content for B2B and B2C audiences
- Fixed CTA button visibility (white text on gradient background)
- Language switcher now shows flag + text (EN, FR, AR)
- Added multi-language support (EN, FR, AR)
- Created 5 pages with shared layout
- Added RTL support for Arabic
- Made logo bigger and more visible
- Added language switcher in navigation
