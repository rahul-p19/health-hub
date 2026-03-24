# MediCare - Health Companion Platform

A beautiful, interactive medical system frontend built with React, TypeScript, Tailwind CSS, and GSAP animations. This is a fully functional prototype with mock authentication and an AI-powered chatbot interface.

## Features

### Pages
- **Landing Page**: Hero section, features showcase, testimonials, and call-to-action
- **Sign Up**: User registration with form validation
- **Sign In**: User login with mock authentication
- **Chatbot**: Interactive health companion with rule-based responses

### Design
- **Soothing Color Palette**: Sage green primary, sky blue secondary, warm coral accents with soft neutrals
- **Responsive Design**: Mobile-first approach with full responsive support
- **Accessibility**: Proper ARIA labels, semantic HTML, reduced motion support

### Animations
- **GSAP Powered**: Smooth fade-in animations on page load
- **Interactive Elements**: Hover effects with glow animations
- **Message Animations**: Smooth message entry in chatbot
- **Typing Indicator**: Animated dots showing bot is typing
- **Stagger Effects**: Cascading animations for feature cards

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **UI**: React 19 with TypeScript
- **Styling**: Tailwind CSS 4 with custom design tokens
- **Animations**: GSAP 3 for smooth, performant animations
- **Components**: Custom reusable component library
- **State**: React Context for authentication
- **Forms**: React Hook Form with Zod validation support

## Project Structure

```
app/
├── layout.tsx           # Root layout with metadata
├── globals.css          # Global styles and design tokens
├── page.tsx             # Landing page
├── signin/
│   └── page.tsx         # Sign in page
├── signup/
│   └── page.tsx         # Sign up page
└── chatbot/
    └── page.tsx         # Chatbot interface

components/
├── Button.tsx           # Reusable button component
├── Input.tsx            # Reusable input component
├── Card.tsx             # Card component family
├── landing/
│   ├── Hero.tsx         # Hero section
│   ├── Features.tsx     # Features showcase
│   ├── Testimonials.tsx # Testimonials section
│   └── CTA.tsx          # Call-to-action section
└── chatbot/
    ├── Message.tsx      # Chat message component
    └── TypingIndicator.tsx # Typing animation

lib/
├── auth-context.tsx     # Authentication context
├── chatbot-utils.ts     # Chatbot logic and utilities
└── utils.ts             # Utility functions

hooks/
└── useGsap.ts           # Custom GSAP animation hooks
```

## Getting Started

### Installation

```bash
# Using npm
npm install

# Using pnpm (recommended)
pnpm install

# Using yarn
yarn install
```

### Running the Development Server

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Demo Credentials

Since this is a mock authentication system, you can use any email and password to sign in or sign up.

Example:
- **Email**: `demo@example.com`
- **Password**: `password123`

## Features Breakdown

### Authentication
- Mock-based authentication using localStorage
- Session persistence across page refreshes
- Email and password validation
- Form error handling
- Loading states

### Chatbot
- Gemini-powered symptom analysis responses
- Token streaming for real-time assistant replies
- Message history tracking
- Health-related question handling
- Timestamps for messages
- Disclaimer about seeking professional help

### Gemini API Setup

Create a local environment file and add your Gemini credentials:

```bash
GEMINI_API_KEY=your_api_key_here
# Optional: defaults to gemini-2.0-flash
GEMINI_MODEL=gemini-2.0-flash
```

### Design System

**Color Palette:**
- Primary (Sage Green): `oklch(0.55 0.09 165)`
- Secondary (Sky Blue): `oklch(0.72 0.12 230)`
- Accent (Warm Coral): `oklch(0.68 0.14 25)`
- Neutrals: Various grays and off-whites
- Background: `oklch(0.98 0.01 85)`

**Typography:**
- Headings: Geist font family
- Body: Geist font family
- Font sizing: Responsive with Tailwind's text-* utilities

### Animation Hooks

The project includes custom GSAP hooks for easy animation implementation:

- `useFadeInUp()`: Fade in with upward movement
- `useStaggerAnimation()`: Staggered item animations
- `useHoverGlow()`: Hover glow effect
- `useScrollReveal()`: Reveal on scroll
- `useTypewriter()`: Typewriter text effect

## Customization

### Changing Colors

Edit the CSS variables in `app/globals.css` under `:root` and `.dark` sections:

```css
:root {
  --primary: oklch(0.55 0.09 165);  /* Change primary color */
  --secondary: oklch(0.72 0.12 230); /* Change secondary color */
  /* ... other colors ... */
}
```

### Adding Authentication

To add real authentication, replace the mock functions in `lib/auth-context.tsx` with your actual auth provider (Firebase, Supabase, etc.).

### Extending the Chatbot

Add more responses to the `medicalResponses` object in `lib/chatbot-utils.ts`:

```typescript
const medicalResponses: { [key: string]: string[] } = {
  'your-keyword': ['Response 1', 'Response 2'],
  // ... more responses
};
```

### Modifying Animations

All animations use GSAP. Customize them in:
- `hooks/useGsap.ts` for reusable animation hooks
- `app/globals.css` for CSS-based animations
- Component files for instance-specific animations

## Performance Considerations

- All animations respect `prefers-reduced-motion` preference
- GSAP animations are optimized and cached
- Images and assets are optimized for web
- Lazy loading for better performance

## Accessibility

- Semantic HTML structure
- ARIA labels where needed
- Keyboard navigation support
- Color contrast compliance
- Focus management
- Screen reader friendly

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Future Enhancements

- [ ] Real backend API integration
- [ ] User profile management
- [ ] Chat history persistence
- [ ] AI chatbot integration (OpenAI, Anthropic, etc.)
- [ ] Appointment scheduling
- [ ] Medical records management
- [ ] Prescription tracking
- [ ] Health metrics dashboard

## License

This project is open source and available under the MIT License.

## Support

For issues, questions, or suggestions, please open an issue on the repository or contact support.

---

**Note**: This is a frontend prototype. It does not provide actual medical advice. Always consult with healthcare professionals for medical concerns.
