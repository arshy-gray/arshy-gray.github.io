import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import '../../../index.css';

import Section from './Section';

const metaSection = {
  title: 'Components/Layout/Section',
  component: Section,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    // isTabIndex: { control: 'boolean' },
  }
} satisfies Meta<typeof Section>;

export default metaSection;
type Story = StoryObj<typeof Section>;

export const Section_: Story = {
  args: {
    // isTabIndex: false,
  },
};
