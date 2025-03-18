# Fruit Explorer Application

A modern web application built with Nuxt 3 that allows users to explore fruits, their nutritional information, save favorites, and generate personalized workout and nutrition plans.

## 🚀 Technologies & Tools

### Core Framework
- **Nuxt 3** - Vue.js framework with SSR capabilities
- **TypeScript** - For type safety and better developer experience
- **Pinia** - State management solution
- **Vue 3 Composition API** - For reactive and composable component logic

### Styling
- **SCSS** - For enhanced CSS capabilities
- **CSS Variables** - For theming and consistent styling
- **Responsive Design** - Mobile-first approach with flexible layouts

### Data Management
- **IndexedDB** - For client-side data persistence
- **LocalForage** - For simplified IndexedDB interactions
- **Local Storage** - For storing user preferences and favorites

### Authentication & Backend
- **Firebase**
  - Authentication
  - Firestore Database
  - Hosting

### API Integration
- **OpenAI API** - For generating workout and nutrition plans
- **Fruityvice API** - For fruit data

### Performance Optimization
- **Infinite Scroll** - For efficient data loading
- **Virtual Scrolling** - For handling large lists
- **Client-side Caching** - Using IndexedDB for offline capabilities
- **Lazy Loading** - For optimized component loading

## 🎯 Features

### Fruit Management
- Browse fruits with nutritional information
- Filter fruits based on nutritional values
- Save favorite fruits
- View fruits by family
- Offline support with IndexedDB caching

### Workout & Nutrition
- Generate personalized workout plans
- Create custom nutrition plans
- Multi-language support (English, Ukrainian, Russian)
- Save workout history
- Customizable preferences for:
  - Workout duration
  - Difficulty level
  - Equipment availability
  - Focus areas
  - Dietary restrictions
  - Meal preferences

### User Experience
- Responsive design for all devices
- Smooth animations and transitions
- Error handling and loading states
- Filter panel with responsive layout
- Authentication modal for user actions

## 🏗 Architecture & Patterns

### State Management
- Pinia stores for:
  - Fruits data
  - User authentication
  - Workout management
  - Application state

### Component Structure
- Reusable components
- Composition API for logic organization
- Props and events for component communication
- Slots for flexible content injection

### Data Flow
- Centralized API calls
- Cached data management
- Real-time updates
- Error boundary handling

### Type System
- TypeScript interfaces for:
  - API responses
  - Component props
  - Store state
  - Application configuration

## 🛠 Development Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npx nuxi generate

# Preview production build
npm run preview
```

## 🔐 Environment Variables

Required environment variables:
```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_OPENAI_API_KEY=
```

## 🚀 Deployment

The application is configured for Firebase Hosting deployment:

```bash
# Deploy to Firebase
npm run deploy
```

Current hosting URL: https://fruits-test-f250a.web.app

## 📦 Project Structure

```
├── api/              # API integration layer
├── assets/          # Static assets and global styles
├── components/      # Reusable Vue components
├── composables/     # Shared composition functions
├── config/          # Configuration files
├── pages/           # Application routes
├── plugins/         # Nuxt plugins
├── public/          # Public static files
├── stores/          # Pinia stores
├── types/           # TypeScript type definitions
└── utils/           # Utility functions
```

## 🔄 State Management

The application uses Pinia stores for state management:

- **fruitsStore**: Manages fruit data, favorites, and filtering
- **userStore**: Handles user authentication state
- **workoutStore**: Manages workout generation and history

## 🎨 Styling System

The application uses a consistent styling system with:

- CSS Variables for theming
- SCSS for enhanced styling capabilities
- Responsive design patterns
- Component-scoped styles

## 🔒 Security

- Firebase Authentication
- Protected routes
- Environment variable protection
- API key security
- Error handling

## 🌐 API Integration

### Fruit API
- RESTful endpoints
- Error handling
- Response caching
- Offline support

### OpenAI Integration
- GPT-3.5 Turbo model
- Custom prompt engineering
- Multi-language support
- Error handling

## 📱 Responsive Design

The application is fully responsive with:
- Mobile-first approach
- Flexible layouts
- Adaptive components
- Touch-friendly interactions

## 🔍 Future Improvements

Potential areas for enhancement:
- PWA support
- Advanced caching strategies
- Social authentication
- Workout sharing features
- Enhanced offline capabilities
- Performance optimizations
