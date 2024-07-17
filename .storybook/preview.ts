import type { Preview } from "@storybook/react";
import { themes } from '@storybook/theming';

import '../src/styles/motion/style.css';

export const parameters = {
  darkMode: {
    // Override the default dark theme
    dark: { ...themes.dark, appBg: 'black' },
    // Override the default light theme
    light: { ...themes.normal, appBg: 'red' }
  }
};

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#EFEFEF',
        },
        {
          name: 'dark',
          value: '#222222',
        },
        {
          name: 'blue',
          value: '#00aced',
        },
        {
          name: 'steel',
          value: '#3b5998',
        },
      ],
    },    
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },

  tags: ["autodocs"]
};

export default preview;
