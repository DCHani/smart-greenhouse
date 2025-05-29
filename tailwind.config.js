module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4CAF50',
        secondary: '#2E7D32',
        accent: '#81C784',
        warning: '#FFC107',
        danger: '#F44336',
        background: '#F9FBFA',
        'text-dark': '#333333',
        'text-light': '#757575',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 8px rgba(0, 0, 0, 0.05)',
        sidebar: '0 0 15px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
}
