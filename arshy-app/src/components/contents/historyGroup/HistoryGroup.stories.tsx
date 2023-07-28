import type { Meta, StoryObj } from '@storybook/react';
import '../../../index.css';

import HistoryGroup from './HistoryGroup';

const meta = {
  title: 'Components/Contents/HistoryGroup',
  component: HistoryGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    isAniActive: { control: 'boolean' },
  },
} satisfies Meta<typeof HistoryGroup>;

export default meta;
type Story = StoryObj<typeof HistoryGroup>;

export const HistoryGroup_: Story = {
  args: {
    isAniActive: true,
  },
};
