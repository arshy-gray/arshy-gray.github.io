import type { Meta, StoryObj } from '@storybook/react';
import '../../../index.css';

import Header from './Header';

const meta = {
  title: 'Components/Layout/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark',
    },
  },
  argTypes: {
    isActiveIdx: { control: 'number' },
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof Header>;

export const ScrollFalse: Story = {
  args: {
    isScrollVal: false,
  },
};

export const ScrollTrue: Story = {
  args: {
    isScrollVal: true,
  },
};
