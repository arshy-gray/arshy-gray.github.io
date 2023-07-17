import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import '../../../index.css';

import ContactGroup from './ContactGroup';

const meta = {
  title: 'Components/Contents/ContactGroup',
  component: ContactGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    isTabIndex: { control: 'boolean' },
  }
} satisfies Meta<typeof ContactGroup>;

export default meta;
type Story = StoryObj<typeof ContactGroup>;

export const ContactGroup_: Story = {
  args: {
    isTabIndex: false,
  },
};
