module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}','./src/**/*.{html,js}', './node_modules/tw-elements/dist/js/**/*.js'],
    darkMode: 'class',
    theme: {
      screens: {
        sm: { max: '576px' }, // Mobile (matches max: iPhone 11 Pro Max landscape @ 896px).
        md: { min: '576px', max: '1199px' }, // Tablet (matches max: iPad Pro @ 1112px).

        lg: { min: '1200px' }, // Desktop smallest.
        xl: { min: '1159px' }, // Desktop wide.
        xxl: { min: '1359px' } // Desktop widescreen.
      },
      fontFamily: {
        display: ['Open Sans', 'sans-serif'],
        body: ['Open Sans', 'sans-serif'],
      },
      extend: {
        fontSize: {
          14: '14px',
        },
        backgroundColor: {
          'main-bg': '#FAFBFB',
          'main-dark-bg': '#20232A',
          'secondary-dark-bg': '#33373E',
          'light-gray': '#F7F7F7',
          'half-transparent': 'rgba(0, 0, 0, 0.5)',
        },
        borderWidth: {
          1: '1px',
        },
        borderColor: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        width: {
          400: '400px',
          760: '760px',
          780: '780px',
          800: '800px',
          1000: '1000px',
          1200: '1200px',
          1400: '1400px',
        },
        height: {
          80: '80px',
        },
        minHeight: {
          590: '590px',
        },
        backgroundImage: {
          'hero-pattern':
            "url('https://cdn.pixabay.com/photo/2016/11/22/19/36/beach-1850248_1280.jpg')",
        },
      },
    },
    plugins: [
      require('tw-elements/dist/plugin')
    ],
  };