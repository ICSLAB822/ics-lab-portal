module.exports = {
  content: ['./_includes/**/*.html', './_layouts/**/*.html', './*.html', './{news,projects,publications,members,gallery,join-us,contact,people}/**/*.html', './assets/js/*.js'],
  darkMode: 'class',
  theme: { extend: {
    colors: { blue: { 50: '#f0f9ff', 100: '#e0f2fe', 500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8' } },
    fontFamily: {
      sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      heading: ['Inter', 'sans-serif']
    },
    backgroundImage: {
      'grid-pattern': 'linear-gradient(to right, #f1f5f9 1px, transparent 1px), linear-gradient(to bottom, #f1f5f9 1px, transparent 1px)',
      'grid-pattern-dark': 'linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)'
    }
  }}
};
