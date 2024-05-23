const config = {
  content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'],

  plugins: [require('flowbite/plugin')],

  darkMode: 'media',

  theme: {
    extend: {
      colors: {
        // flowbite-svelte
        primary: {
          '50': '#f4f7fb',
          '100': '#e8eef6',
          '200': '#ccdbeb',
          '300': '#9fbdda',
          '400': '#6b9ac5',
          '500': '#487daf',
          '600': '#366393',
          '700': '#2f547d',
          '800': '#284564',
          '900': '#263b54',
          '950': '#192738',
        }
      }
    }
  }
};

module.exports = config;