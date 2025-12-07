import type { Config } from 'tailwindcss'

// Tailwind Configuration is critical for defining custom paths, colors, and themes.
// This configuration enables your custom white theme palette for all components.
const config: Config = {
  // 1. Content: Tell Tailwind which files to scan for class names
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}', // Recommended for the src/ directory setup
  ],

  // 2. Theme Extension: Customizing colors, shadows, etc., to match the white theme
  theme: {
    // Extend allows you to ADD custom values without overriding Tailwind's defaults
    extend: {
      colors: {
        // --- White Theme Palette ---

        // 1. Background & Surface
        'background': '#FFFFFF', // Pure White for the main canvas (bg-background)
        'surface': '#F3F4F6',    // Light gray for subtle backgrounds (bg-surface)

        // 2. Text & Foreground
        'foreground': '#1F2937', // Dark Gray (Gray-800) for primary text (text-foreground)
        'muted-foreground': '#6B7280', // Gray-500 for secondary text

        // 3. Primary (Accent) Color
        'primary': {
          DEFAULT: '#3B82F6', // Blue-500
          hover: '#2563EB',    // Blue-600 for hover state
        },

        // 4. Border & Input
        'border': '#D1D5DB',     // Gray-300 for component borders (border-border)
        'input': '#D1D5DB',      // Gray-300 for input borders

        // 5. Utility Colors
        'success': '#10B981',   // Green-500
        'destructive': '#EF4444', // Red-500

        // 6. Optional: Card colors for shadcn look (reusing our theme colors)
        'card': {
          DEFAULT: '#FFFFFF', // Card Background
          foreground: '#1F2937', // Card Text Color
        },
      },
      // Adding a standard box shadow for consistency across cards and modals
      boxShadow: {
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.01)',
      }
    },
  },

  // 3. Plugins: Add any necessary plugins here (like forms or typography)
  plugins: [],
}

export default config
