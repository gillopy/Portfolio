# Portfolio Website

A modern, responsive portfolio website built with Astro and Tailwind CSS. This project showcases a developer's skills, projects, and contact information in a clean and professional layout with alternating section backgrounds and a focused project detail view.

![Portfolio Screenshot](https://example.com/screenshot.jpg)

## 🚀 Features

- **Responsive Design**: Fully responsive layout that works on all devices
- **Alternating Section Backgrounds**: Visual separation between content sections
- **Modern UI**: Clean and professional design with subtle animations
- **Project Showcase**: Detailed project pages with technical information
- **Code Highlighting**: Syntax highlighting for code examples with copy functionality
- **Contact Form**: Integrated contact form for easy communication
- **Fast Performance**: Built with Astro for optimal loading speed

## 🛠️ Technologies Used

- [Astro](https://astro.build/) - The web framework for content-driven websites
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Bun](https://bun.sh/) - JavaScript runtime & package manager
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [Bun](https://bun.sh/) (recommended) or npm

## 🔧 Installation & Setup

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/portfolio-website.git
cd portfolio-website
```

2. **Install dependencies**

```bash
# Using Bun (recommended)
bun install

# Or using npm
npm install
```

3. **Start the development server**

```bash
# Using Bun
bun run dev

# Or using npm
npm run dev
```

4. **Open your browser**

Navigate to [http://localhost:4321](http://localhost:4321) to see the website.

## 📚 Project Structure

```
/
├── public/             # Static assets
├── src/
│   ├── assets/         # Project images and other assets
│   ├── components/     # UI components
│   ├── data/           # JSON data files
│   ├── layouts/        # Page layouts
│   ├── pages/          # Page components and routes
│   └── utils/          # Utility functions
├── .astro/             # Astro build files
├── astro.config.mjs    # Astro configuration
└── tailwind.config.mjs # Tailwind CSS configuration
```

## 🧩 Customization

### Personal Information

Edit the JSON files in the `src/data/` directory to update:

- `profile.json` - Your personal information and about section
- `projects.json` - Your project showcase 
- `skills.json` - Your technical and personal skills
- `siteConfig.json` - Site-wide configuration

### Styling

The color scheme and general styling can be modified in:

- `tailwind.config.mjs` - Color palette and theme customization
- Individual component `.astro` files - Component-specific styling

## 🚢 Deployment

### Build for Production

```bash
# Using Bun
bun run build

# Or using npm
npm run build
```

This generates a static site in the `dist/` directory ready for deployment.

### Deploy to Netlify/Vercel

This project is ready to deploy on Netlify, Vercel, or any static site hosting:

1. Connect your repository to your hosting provider
2. Set the build command to `astro build` or `npm run build`
3. Set the publish directory to `dist`

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Original design inspiration: [Guillermo Cabrera's Portfolio](https://portfolio-guillermo-cabrera.vercel.app/)
- [Inter Font](https://fonts.google.com/specimen/Inter) by Rasmus Andersson
- Icons from [Heroicons](https://heroicons.com/)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📬 Contact

If you have any questions or feedback, please reach out through the contact form on the website or create an issue in this repository.

---

Made with ❤️ using [Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com)