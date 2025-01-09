import type { Preview } from '@storybook/react';
import { themes } from '@storybook/theming'; // Optional: For customizing Storybook's theme
import React from 'react'; // Add this import for JSX support

const preview: Preview = {
  parameters: {
    // Optional: Configure Storybook's appearance
    docs: {
      theme: themes.dark, // Use a dark theme for the docs (or themes.light for light theme)
    },
    // Optional: Configure backgrounds for your stories
    backgrounds: {
      default: 'light', // Default background
      values: [
        { name: 'light', value: '#ffffff' }, // Light background
        { name: 'dark', value: '#333333' }, // Dark background
      ],
    },
    // Optional: Configure viewports for responsive testing
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '375px',
            height: '667px',
          },
        },
        tablet: {
          name: 'Tablet',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
        desktop: {
          name: 'Desktop',
          styles: {
            width: '1440px',
            height: '900px',
          },
        },
      },
    },
    // Optional: Configure actions (e.g., onClick handlers)
    actions: { argTypesRegex: '^on[A-Z].*' },
    // Optional: Configure controls for props
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  // Optional: Global decorators (e.g., wrapping all stories in a provider)
  decorators: [
    (Story) => (
      <div style={{ margin: '20px' }}>
        <Story />
      </div>
    ),
  ],
};

export default preview;