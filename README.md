# Todo Muebles Web

Angular web page for Todo Muebles, a furniture business website.

**Access Credentials**

User: demoprofile@example.com

Password: DemoProfile#

_(Credentials for testing purposes only)_

Note: This website is intented to be managedwith the Todo Muebles Dashboard Project:

```bash
https://github.com/Ferbox44/todoMueblesDashboard-frontend
```
```bash
https://github.com/Ferbox44/todoMueblesDashboard-backend
```

## 🚀 Features

- **Home Page (Inicio)**: Dynamic landing page with hero section, service carousel, videos, before/after comparison, and brand gallery
- **Services/Products**: Service detail pages with dynamic routing (`/servicios/:id`)
- **About Us (Nosotros)**: Company information and story
- **Contact (Contacto)**: Contact form and information
- **Responsive Design**: Modern, mobile-friendly UI built with PrimeNG
- **Image Sliders**: Swiper integration for carousels and galleries

## 🛠️ Tech Stack

- **Angular 19.2.11**: Modern Angular framework
- **PrimeNG 19.1.3**: UI component library
- **PrimeIcons 7.0.0**: Icon library
- **Swiper 11.2.6**: Touch slider component
- **RxJS 7.8.0**: Reactive programming
- **TypeScript 5.7.2**: Type-safe JavaScript

## 📋 Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn package manager

## 🔧 Installation

1. Clone the repository:
```bash
git clone https://github.com/Ferbox44/todoMueblesWeb
cd todoMueblesWeb
```

2. Install dependencies:
```bash
npm install
```

## 🏃 Development

Run the development server:
```bash
npm start
```

The application will be available at `http://localhost:4200`

## 🏗️ Build

Build for production:
```bash
npm run build
```

The build artifacts will be stored in the `dist/todo-muebles-web` directory.

Build with watch mode for development:
```bash
npm run watch
```

## 🧪 Testing

Run unit tests:
```bash
npm test
```

## 📁 Project Structure

```
src/
├── app/
│   ├── components/          # Reusable components
│   │   ├── marcas-gallery/  # Brand gallery component
│   │   ├── nosotros-button/ # About us button
│   │   ├── slider-inicio/   # Home slider
│   │   └── shared/          # Shared components (menu, footer, button)
│   ├── pages/               # Page components
│   │   ├── contacto/        # Contact page
│   │   ├── inicio/          # Home page
│   │   ├── nosotros/        # About us page
│   │   └── producto/        # Product/Service detail page
│   ├── services/            # Angular services
│   │   ├── appointments.service.ts
│   │   ├── landing-page.service.ts
│   │   ├── producto.service.ts
│   │   └── service-details.service.ts
│   ├── app.component.ts     # Root component
│   ├── app.routes.ts        # Application routes
│   └── app.config.ts        # App configuration
├── environments/            # Environment configuration
└── index.html              # Main HTML file

public/
├── img/                    # Image assets
└── video/                  # Video assets
```

## 🛣️ Routes

- `/` - Home page (Inicio)
- `/servicios/:id` - Service/Product detail page
- `/nosotros` - About us page
- `/contacto` - Contact page

## 🔌 API Integration

The application connects to a backend dashboard API for dynamic content. Configure the API URL in `src/environments/environment.ts`:

```typescript
export const environment = {
  apiUrl: 'your-api-url'
};
```

## 📝 Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run watch` - Build with watch mode
- `npm test` - Run unit tests
- `npm run ng` - Angular CLI commands

## 🎨 Styling

- Global styles: `src/styles.css`
- Component-specific styles in respective component directories
- PrimeNG themes and PrimeIcons are included

## 📦 Dependencies

### Main Dependencies
- Angular 19.2.11
- PrimeNG 19.1.3
- PrimeIcons 7.0.0
- Swiper 11.2.6
- RxJS 7.8.0

### Dev Dependencies
- Angular CLI 19.2.12
- TypeScript 5.7.2
- Karma & Jasmine (for testing)

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

MIT License

## 👥 Support

For questions or support, please contact the development team.

