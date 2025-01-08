// packages/react-shared-components/tailwind.config.js
const rootTailwindConfig = require('./../../tailwind.config'); // Adjust path if necessary

module.exports = {
  ...rootTailwindConfig,
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Add paths specific to this package
  ],
};
