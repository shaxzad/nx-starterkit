import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Button, ButtonProps } from './Button';

export default {
  title: 'Components/Button', // The title of the component in Storybook
  component: Button, // The component itself
  argTypes: {
    onClick: { action: 'clicked' }, // This will log the click event in the actions panel
  },
} as Meta;

// Template for the stories
const Template: StoryFn<ButtonProps> = (args: ButtonProps) => <Button {...args} />;

// Default story
export const Default = Template.bind({});
Default.args = {
  label: 'Click Me', // Default label for the button
};

// Story with a different label
export const WithCustomLabel = Template.bind({});
WithCustomLabel.args = {
  label: 'Custom Label', // Custom label for the button
};

// Story with a different style (if needed)
export const WithCustomStyle = Template.bind({});
WithCustomStyle.args = {
  label: 'Styled Button',
  onClick: () => alert('Styled Button Clicked!'), // Custom onClick handler
};