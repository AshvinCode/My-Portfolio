# ✨ Portfolio Customization Checklist

A quick reference guide to customize this portfolio to your own details.

---

## 🎯 Priority Changes (Do These First)

### 1. Personal Information
**File**: `index.html`

- [ ] Change name from "Ashvin Mori" to your name
  - Search for: `Ashvin Mori` (multiple places)
  - Replace with: Your name

- [ ] Change email
  - Search for: `moriashvin892001@gmail.com`
  - Replace with: Your email

- [ ] Change location
  - Search for: `Ahmedabad, Gujarat, India`
  - Replace with: Your location

- [ ] Change LinkedIn URL
  - Search for: `https://linkedin.com/in/ashvin-mori`
  - Replace with: Your LinkedIn profile URL

- [ ] Change GitHub URL
  - Search for: `https://github.com` (in social links)
  - Replace with: Your GitHub profile URL

### 2. Professional Title & Description
**File**: `index.html` - Hero Section

Current:
```html
<div class="typing-text">Full-Stack .NET Developer | AI-Driven Engineer</div>
```

Change to your title:
```html
<div class="typing-text">Your Title Here</div>
```

Current description:
```html
<p class="hero-description">
    I build scalable, cloud-powered applications using .NET Core, Angular, and Azure, enhanced with AI tools.
</p>
```

Update to your summary.

### 3. Skills Section
**File**: `index.html` - Skills Section (~line 400)

Replace skill categories and items. Current structure:
```html
<div class="skill-category glass-effect">
    <div class="skill-header">
        <i class="fas fa-server"></i>
        <h3>Backend Development</h3>
    </div>
    <div class="skills-list">
        <div class="skill-item">
            <span class="skill-name">C#</span>
            <div class="progress-bar">
                <div class="progress-fill" style="width: 95%"></div>
            </div>
        </div>
        <!-- Add more skills -->
    </div>
</div>
```

Progress bar width (0-100%) = Your skill level

### 4. Projects Section
**File**: `index.html` - Projects Section (~line 500)

Update each project card:
```html
<div class="project-card glass-effect">
    <div class="project-header">
        <div class="project-icon">
            <i class="fas fa-ICON-NAME"></i> <!-- Change icon -->
        </div>
        <h3>Your Project Name</h3>
    </div>
    <p class="project-description">
        Your project description...
    </p>
    <div class="project-tech">
        <span class="tech-tag">Tech1</span>
        <span class="tech-tag">Tech2</span>
        <!-- Add your technologies -->
    </div>
    <div class="project-links">
        <a href="YOUR_LIVE_URL" class="project-btn">
            <i class="fas fa-external-link-alt"></i> Live Demo
        </a>
        <a href="YOUR_GITHUB_URL" class="project-btn">
            <i class="fab fa-github"></i> GitHub
        </a>
    </div>
</div>
```

**Icon options** (Font Awesome icons):
- `fa-chart-line` - Analytics/CRM
- `fa-robot` - AI/Chatbot
- `fa-hammer` - Construction/Building
- `fa-shopping-cart` - E-commerce
- `fa-tasks` - Project Management
- `fa-globe` - Website
- `fa-mobile-alt` - Mobile App
- `fa-database` - Data/Backend
- Find more: [fontawesome.com/icons](https://fontawesome.com/icons)

### 5. Experience Timeline
**File**: `index.html` - Experience Section (~line 700)

Update company names, dates, and achievements:
```html
<div class="timeline-item">
    <div class="timeline-marker">
        <div class="timeline-dot"></div>
    </div>
    <div class="timeline-content glass-effect">
        <div class="timeline-date">YYYY - YYYY</div>
        <h3>Your Job Title</h3>
        <p class="company-name">Company Name</p>
        <ul class="achievements">
            <li>Achievement 1</li>
            <li>Achievement 2</li>
            <li>Achievement 3</li>
        </ul>
    </div>
</div>
```

### 6. About Section
**File**: `index.html` - About Section (~line 250)

Update professional summary:
```html
<div class="about-card glass-effect">
    <h3>Professional Summary</h3>
    <p>
        Your professional summary here...
    </p>
</div>
```

Update stats:
```html
<div class="stat-card glass-effect">
    <div class="stat-number">X+</div>
    <div class="stat-label">Years Experience</div>
</div>
```

### 7. Contact Information
**File**: `index.html` - Contact Section (~line 850)

Update contact details:
```html
<div class="contact-item">
    <i class="fas fa-envelope"></i>
    <div>
        <p class="label">Email</p>
        <a href="mailto:YOUR_EMAIL">YOUR_EMAIL</a>
    </div>
</div>
```

---

## 🎨 Design Customizations

### Change Color Scheme
**File**: `style.css` - Top of file

```css
:root {
    --primary-color: #00d4ff;      /* Change this */
    --secondary-color: #7c3aed;    /* And this */
    --accent-color: #ff00ff;       /* And this */
    /* ... rest of colors */
}
```

**Popular Color Combinations**:

**Modern Blue-Purple**:
```css
--primary-color: #3b82f6;
--accent-color: #a855f7;
```

**Modern Green**:
```css
--primary-color: #10b981;
--accent-color: #059669;
```

**Bold Orange-Red**:
```css
--primary-color: #f97316;
--accent-color: #dc2626;
```

**Tech Purple**:
```css
--primary-color: #8b5cf6;
--accent-color: #ec4899;
```

### Change Fonts
**File**: `index.html` - Line 9

Change Google Fonts import:
```html
<link href="https://fonts.googleapis.com/css2?family=YOUR_FONT_1:wght@400;600;700&family=YOUR_FONT_2:wght@400;600;700&display=swap" rel="stylesheet">
```

Popular font combinations:
- `Poppins` & `Inter`
- `Playfair+Display` & `Lato`
- `Montserrat` & `Open+Sans`
- `Raleway` & `Roboto`

Then update CSS:
```css
body {
    font-family: 'YOUR_FONT_2', sans-serif;
}

.section-title, .hero-title {
    font-family: 'YOUR_FONT_1', sans-serif;
}
```

---

## 📁 File Structure Setup

### Create Folder Structure
```bash
mkdir -p assets
```

### Place Files
```
portfolio/
├── index.html
├── style.css
├── script.js
├── SETUP_GUIDE.md
├── README.md
├── CUSTOMIZE.md
└── assets/
    ├── Ashvin_Mori_Resume.pdf    ← Add your resume here
    └── favicon.ico               ← Add your favicon here (optional)
```

### Add Resume
1. Convert your resume to PDF
2. Save as: `assets/Ashvin_Mori_Resume.pdf`
3. Already linked in HTML, no changes needed

### Add Favicon (Optional)
1. Create or download favicon (16x16 or 32x32 PNG)
2. Save as: `assets/favicon.ico`
3. Add to `<head>`:
   ```html
   <link rel="icon" type="image/x-icon" href="assets/favicon.ico">
   ```

---

## 🔗 Links to Update

### Social Links
Find and update ALL instances:

| What | Find | Replace |
|------|------|---------|
| LinkedIn | `linkedin.com/in/ashvin-mori` | Your LinkedIn URL |
| GitHub | `github.com` | Your GitHub URL |
| Email | `moriashvin892001@gmail.com` | Your Email |
| Portfolio | `ashvinmori.com` | Your domain (if applicable) |

### Project Links
For each project, update:
- `href="#"` → `Your live demo URL`
- GitHub links → Your GitHub repo

### Resume Link
Already set to: `assets/Ashvin_Mori_Resume.pdf`
(No changes needed if you name your file correctly)

---

## 🔧 Advanced Customizations

### Add Google Analytics
1. Create account at [analytics.google.com](https://analytics.google.com)
2. Get Tracking ID (format: G-XXXXXXXXXX)
3. Add to `<head>` in `index.html`:
   ```html
   <!-- Google Analytics -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=YOUR_TRACKING_ID"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'YOUR_TRACKING_ID');
   </script>
   ```

### Setup Contact Form
See detailed instructions in `SETUP_GUIDE.md` → Google Forms Integration

### Add Custom Domain
1. Buy domain (GoDaddy, Namecheap, etc.)
2. Point DNS to GitHub Pages or Netlify
3. Add to repo (if GitHub Pages):
   - Create file: `CNAME`
   - Content: `yourdomain.com`

### Enable HTTPS
- GitHub Pages: Automatic ✓
- Netlify: Automatic ✓
- Traditional hosting: Get SSL certificate from Let's Encrypt

---

## ✅ Pre-Launch Checklist

### Content
- [ ] Name, title, email updated
- [ ] About section written
- [ ] Skills list complete with accurate percentages
- [ ] Projects with real links
- [ ] Experience timeline filled
- [ ] Resume PDF uploaded
- [ ] Social links verified

### Design
- [ ] Colors match your brand
- [ ] No placeholder text remaining
- [ ] Images loading properly
- [ ] All icons displaying

### Testing
- [ ] Desktop view looks good
- [ ] Mobile view responsive
- [ ] Tablet view aligned
- [ ] Contact form functional
- [ ] All links working
- [ ] No console errors (F12)
- [ ] Page loads fast (< 3 seconds)

### Deployment
- [ ] Code pushed to Git
- [ ] Domain configured (if using custom domain)
- [ ] HTTPS enabled
- [ ] Analytics set up
- [ ] Sitemap created
- [ ] Google Search Console verified
- [ ] LinkedIn profile updated with portfolio link

---

## 🚀 Launch

### Before Going Live
1. Test everything one more time
2. Ask a friend to review
3. Check on different browsers
4. Check on different devices

### Launch Steps
1. Deploy to GitHub Pages / Netlify / Hosting
2. Update LinkedIn with portfolio URL
3. Share on social media
4. Send to recruiters
5. Monitor performance

### After Launch
- [ ] Monitor Google Analytics
- [ ] Check Google Search Console
- [ ] Respond to contact form messages promptly
- [ ] Keep portfolio updated with new projects
- [ ] Monitor performance metrics

---

## 📊 Performance Metrics to Track

- **Page Load Time**: Target < 2 seconds
- **Mobile Friendliness**: 90+ score on PageSpeed Insights
- **SEO Score**: 90+ on Lighthouse
- **Contact Form Submission Rate**: Monitor in Google Forms/Sheets

Check with:
- [PageSpeed Insights](https://pagespeed.web.dev)
- [Mobile Friendly Test](https://search.google.com/test/mobile-friendly)
- [Lighthouse](https://chrome.google.com/webstore) (Chrome extension)

---

## 💡 Pro Tips

1. **Update Regularly**: Add new projects as you complete them
2. **Keep Stats Current**: Update stats like "projects completed"
3. **Monitor Analytics**: See what sections recruiters view
4. **A/B Test**: Try different descriptions, see which converts better
5. **Get Feedback**: Ask seniors/mentors to review
6. **Stay Active**: Update GitHub with commits to show activity
7. **Blog Section**: Consider adding a blog for SEO

---

## 🆘 Need Help?

### Common Issues

**Q: How do I add a new skill?**
A: Copy a skill-item div in the skills section and update the name and percentage

**Q: How do I change the gradient background?**
A: Edit background gradient in `style.css` under `body` and `section` classes

**Q: Can I add animations?**
A: Modify CSS @keyframes or add JavaScript event listeners in script.js

**Q: How do I make images smaller/faster?**
A: Compress with TinyPNG or use WebP format

---

**Happy Customizing! 🎉**

For more details, see `SETUP_GUIDE.md`
