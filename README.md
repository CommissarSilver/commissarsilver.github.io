# Personal Website - Vahid Majdinasab

A terminal/CRT-themed personal website with dynamic content loading and sophisticated typing animations. Built for GitHub Pages deployment.

## 🚀 Features

- **Dynamic Content Loading**: Content managed through YAML configuration
- **Realistic Typing Animation**: Sophisticated typing effects with autocomplete, mistakes, and backspacing
- **Terminal/CRT Aesthetic**: Retro computing theme with scanlines and CRT effects
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **SEO Optimized**: Rich meta tags, structured data, and semantic HTML
- **Modular Architecture**: Well-organized, maintainable code structure

## 📁 Project Structure

```
├── index.html                 # Main HTML file (GitHub Pages entry point)
├── assets/
│   ├── styles/               # Modular CSS files
│   │   ├── main.css         # Main stylesheet (imports all others)
│   │   ├── base.css         # Reset, fonts, basic styles
│   │   ├── layout.css       # Grid, flexbox, positioning
│   │   ├── typography.css   # Text styles, headers, colors
│   │   ├── components.css   # Interactive elements
│   │   ├── typing.css       # Typing animation styles
│   │   ├── terminal.css     # CRT effects, terminal styling
│   │   └── responsive.css   # Media queries, mobile styles
│   └── scripts/             # JavaScript modules
│       ├── config.js        # Global configuration
│       ├── content-loader.js # YAML content parser & DOM injector
│       └── typing.js        # Typing animation engine
├── config/
│   └── content.yaml         # Website content & data
├── tools/
│   └── run_local.py         # Local development server
└── README.md               # This file
```

## 🛠️ Quick Start

### Local Development

1. **Start the development server:**
   ```bash
   python3 tools/run_local.py
   ```
   This will serve the site at `http://localhost:8000` and automatically open it in your browser.

2. **Alternative ports:**
   ```bash
   python3 tools/run_local.py --port 8001
   ```

### GitHub Pages Deployment

1. Push your changes to the `main` branch
2. GitHub Pages will automatically deploy from the repository root
3. Your site will be available at `https://yourusername.github.io/your-repo-name`

## ✏️ Customization Guide

### Content Management

All website content is managed through `config/content.yaml`. This file contains:

- **Profile Information**: Name, title, bio
- **About Me Sections**: Multiple text blocks for typing animation
- **Contact Links**: Social media and contact information
- **Publications/Projects**: Academic papers, projects with links

**Example content structure:**
```yaml
profile:
  name: "Your Name"
  title: "Your Title"

aboutMe:
  texts:
    - |
      Your first bio section...
    - |
      Your alternative bio section...

contact:
  social:
    - name: "GitHub"
      url: "https://github.com/yourusername"

publications:
  - title: "Your Paper Title"
    description: "Paper description..."
    links:
      - name: "Paper"
        url: "https://arxiv.org/abs/..."
```

### Styling Customization

The modular CSS structure makes customization easy:

- **Colors**: Edit `assets/styles/typography.css` and `assets/styles/terminal.css`
- **Layout**: Modify `assets/styles/layout.css`
- **Typography**: Adjust fonts and text styles in `assets/styles/typography.css`
- **CRT Effects**: Customize scanlines and overlays in `assets/styles/terminal.css`
- **Responsive Behavior**: Update breakpoints in `assets/styles/responsive.css`

### Typing Animation Settings

Customize the typing effect in `assets/scripts/config.js`:

```javascript
typing: {
    baseSpeed: 45,              // Base typing speed (ms per character)
    speedVariation: 0.7,        // Speed randomness (0-1)
    autoCompleteChance: 0.08,   // Probability of autocomplete (0-1)
    mistakeChance: 0.03,        // Probability of typos (0-1)
    // ... more settings
}
```

### Adding New Sections

1. **Update HTML structure** in `index.html`
2. **Add CSS styling** to appropriate stylesheet in `assets/styles/`
3. **Extend content loader** in `assets/scripts/content-loader.js`
4. **Add content** to `config/content.yaml`

## 🔧 Technical Details

### Dependencies

- **js-yaml**: YAML parsing (loaded via CDN)
- **Google Fonts**: Quicksand font family
- **Modern Browser**: ES6+ features used

### Browser Support

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+

### Performance Features

- **Modular CSS**: Organized stylesheets for maintainability
- **Efficient Animations**: CSS animations with hardware acceleration
- **Minimal Dependencies**: Only essential external libraries
- **Optimized Assets**: Compressed and minified resources

## 🎨 Color Scheme

The website uses a classic terminal color palette:

- **Primary Green**: `#00ff00` (terminal text)
- **Background**: `#000000` (pure black)
- **Accent Green**: `#2a692a` (borders, secondary elements)
- **Text**: `#ffffff` (primary text)
- **CRT Effects**: Various rgba overlays for authenticity

## 📱 Responsive Design

- **Desktop**: Two-column layout with full features
- **Tablet/Mobile**: Single-column stack with optimized typography
- **Breakpoint**: 1024px for layout switching

## 🔍 SEO Features

- Semantic HTML structure
- Rich meta tags (Open Graph, Twitter Cards)
- JSON-LD structured data
- Canonical URLs
- Proper heading hierarchy

## 🚨 Troubleshooting

### Common Issues

1. **YAML parsing errors**: Check `config/content.yaml` syntax
2. **Font loading issues**: Verify Google Fonts CDN connection
3. **Typing animation not working**: Ensure config.js loads before other scripts
4. **CSS not loading**: Check import paths in `assets/styles/main.css`

### Development Tips

- Use browser dev tools to debug CSS modules
- Check console for JavaScript errors
- Test responsive design with device emulation
- Validate YAML syntax before deploying

## 📄 License

This project is open source. Feel free to use as a template for your own website.

## 🤝 Contributing

Feel free to submit issues and enhancement requests!