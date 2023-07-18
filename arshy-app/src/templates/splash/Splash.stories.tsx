import type { Meta, StoryObj } from '@storybook/react';
import '../../index.css';

import Splash from './Splash';

const metaSplash = {
  title: 'Templates/Splash',
  component: Splash,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    progressBarLeftH: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    progressBarRightH: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    progressTxt: { control: { type: 'range', min: 0, max: 100, step: 1 } },
  },
} satisfies Meta<typeof Splash>;

export default metaSplash;
type Story = StoryObj<typeof Splash>;

export const Progress0: Story = {
  args: {
    progressBarLeftH : 0,
    progressBarRightH : 0,
    progressTxt : 0,
  },
};

export const Progress100: Story = {
  args: {
    progressBarLeftH : 100,
    progressBarRightH : 100,
    progressTxt : 100,
  },
};
