module.exports = {
  content: ['./*.{html,js}'],
  theme: {
    extend: {
      colors: {
        'dark-red': '#8B0000',
        'black': '#000000',
        'charcoal-grey': '#2C2C2C',
        'light-grey': '#D3D3D3',
        'white': '#FFFFFF',
        'golden-yellow': '#FFD700',
        'soft-red': '#DC143C',
        'deep-blue': '#191970',
        'silver': '#C0C0C0',
        'transparent-black': 'rgba(0, 0, 0, 0.7)',
      },
      animation: {
        'underline': 'underline-animation 0.4s ease-in-out',
      },
      keyframes: {
        'underline-animation': {
          '0%': {
            width: '0%',
            height: '2px',
            backgroundColor: 'transparent',
          },
          '100%': {
            width: '100%',
            height: '2px',
            backgroundColor: 'white', 
          },
        },
      },
    },
  },
  plugins: [],
};
