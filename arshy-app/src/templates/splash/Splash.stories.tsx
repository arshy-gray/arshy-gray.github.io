import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import '../../index.css';

import Splash from './Splash';

const styles = {
  transform: 'scale(1)',
  height: '100vh',
};

const metaSplash = {
  title: 'Templates/Splash',
  decorators: [storyFn => <div style={styles}>{storyFn()}</div>],
  component: Splash,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    progressBarLeftH: { control: 'number' },
    progressBarRightH: { control: 'number' },
    progressTxt: { control: 'number' },
  }
} satisfies Meta<typeof Splash>;

export default metaSplash;
type Story = StoryObj<typeof Splash>;

export const Progress0: Story = {
  render: (args) => <Splash {...args} />
};

Progress0.args = {
  progressBarLeftH : 0,
  progressBarRightH : 0,
  progressTxt : 0,
}

export const Progress100: Story = {
  render: (args) => <Splash {...args} />,
};

Progress100.args = {
  progressBarLeftH : 100,
  progressBarRightH : 100,
  progressTxt : 100,
}
