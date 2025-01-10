import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A versatile button component that supports various styles, sizes, and states.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'outline',
        'primary400',
        'primaryOutline-400',
        'primary500',
        'primaryOutline-500',
        'destructive',
        'secondary',
        'secondary-outline',
        'error',
        'error-outline',
        'success',
        'success-outline',
        'info',
        'infoOutline',
        'warning',
        'warningOutline',
        'ghost',
        'link',
      ],
      description: 'The visual style variant of the button',
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'md', 'xs', 'icon'],
      description: 'The size of the button',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    loading: {
      control: 'boolean',
      description: 'Whether to show a loading state',
    },
    icon: {
      control: 'select',
      options: ['none', 'camera'],
      mapping: {
        none: undefined,
      },
      description: 'Icon to display alongside text',
    },
    iconPosition: {
      control: 'radio',
      options: ['left', 'right'],
      description: 'Position of the icon relative to text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// Base Button
export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'default',
    size: 'default',
  },
};

// Variants
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="default">Default</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="primary400">Primary 400</Button>
      <Button variant="primaryOutline-400">Primary Outline 400</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="error">Error</Button>
      <Button variant="success">Success</Button>
      <Button variant="info">Info</Button>
      <Button variant="warning">Warning</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

// States
export const States: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button>Normal</Button>
      <Button disabled>Disabled</Button>
      <Button loading>Loading</Button>
    </div>
  ),
};

export const Interactive: Story = {
  args: {
    children: 'Interactive Button',
    variant: 'default',
    size: 'default',
    disabled: false,
    loading: false,
    icon: undefined,
    iconPosition: 'left',
  },
  parameters: {
    docs: {
      description: {
        story:
          'An interactive example of the Button component. Use the controls to try different combinations of props.',
      },
    },
  },
};

// Full Width Example
export const FullWidth: Story = {
  render: () => (
    <div className="space-y-4 w-full">
      <Button className="w-full">Full Width Button</Button>
      <Button variant="outline" className="w-full">
        Full Width Outline
      </Button>
    </div>
  ),
};

// Color Variants
export const ColorVariants: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Button variant="primary400" className="w-full">
          Primary 400
        </Button>
        <Button variant="primaryOutline-400" className="w-full">
          Primary Outline 400
        </Button>
        <Button variant="error" className="w-full">
          Error
        </Button>
        <Button variant="error-outline" className="w-full">
          Error Outline
        </Button>
      </div>
      <div className="space-y-2">
        <Button variant="success" className="w-full">
          Success
        </Button>
        <Button variant="success-outline" className="w-full">
          Success Outline
        </Button>
        <Button variant="warning" className="w-full">
          Warning
        </Button>
        <Button variant="warningOutline" className="w-full">
          Warning Outline
        </Button>
      </div>
    </div>
  ),
};

// Loading States
export const LoadingStates: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      {['default', 'outline', 'primary400', 'error'].map((variant) => (
        <Button key={variant} variant={variant as any} loading>
          Loading {variant}
        </Button>
      ))}
    </div>
  ),
};

// Custom Styling
export const CustomStyling: Story = {
  render: () => (
    <div className="space-y-4">
      <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
        Gradient Button
      </Button>
      <Button className="rounded-full shadow-lg hover:shadow-xl transition-shadow">
        Custom Rounded with Shadow
      </Button>
    </div>
  ),
};
