# RosettaScripts Blog

A clean, modern static blog website for the RosettaScripts project.

## 📁 Project Structure

```
rosettascripts-static-website/
├── index.html                 # Main homepage
├── assets/                    # Static assets
│   ├── css/
│   │   └── main.css          # Main stylesheet
│   ├── js/
│   │   └── main.js           # Main JavaScript file
│   ├── images/               # Image assets
│   ├── icons/                # Icon files
│   └── fonts/                # Font files
├── content/                  # Blog content
│   └── blog/                 # Blog content
│       ├── index.html        # Blog listing page
│       ├── posts/            # Individual blog posts
│       └── drafts/           # Draft blog posts
└── README.md                 # This file
```

## 🚀 Getting Started

1. **Clone or download** this repository
2. **Open** `index.html` in your web browser
3. **Start editing** the HTML, CSS, and JavaScript files as needed

## 📝 Features

- **Blog-Focused**: Designed specifically for blog content
- **Responsive Design**: Mobile-friendly layout
- **Clean Structure**: Organized folder hierarchy
- **Modern CSS**: Flexbox and Grid layouts
- **Vanilla JavaScript**: No frameworks required
- **SEO Optimized**: Comprehensive meta tags, structured data, and sitemap
- **Fast Loading**: Optimized for performance
- **Accessibility**: WCAG compliant with skip links and semantic HTML

## 🎨 Customization

### Adding New Blog Posts
1. Create new HTML files in the `content/blog/posts/` directory
2. Follow the existing post structure with proper meta tags
3. Update the blog index page to include your new post
4. Add the post to the sitemap.xml file

### Styling
- Edit `assets/css/main.css` for global styles
- Add page-specific styles as needed
- Use CSS custom properties for consistent theming

### JavaScript
- Add functionality in `assets/js/main.js`
- Create additional JS files for specific features
- All scripts are loaded at the bottom of pages

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔧 Development

### Local Development
Simply open the HTML files in your browser or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (if you have it)
npx serve .

# Using PHP
php -S localhost:8000
```

### Deployment
This is a static website, so it can be deployed to any static hosting service:

- **GitHub Pages**
- **Netlify**
- **Vercel**
- **AWS S3 + CloudFront**
- **Any web server**

## 📄 License

MIT License - feel free to use this structure for your projects.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For questions or support, please open an issue in the repository.
