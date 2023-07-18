import type { Meta, StoryObj } from '@storybook/react';
import '../../../index.css';

import Wrapper from './Wrapper';

const meta = {
  title: 'Components/Layout/Wrapper',
  component: Wrapper,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    skipNavHerf: { controls: 'string' },
  },
} satisfies Meta<typeof Wrapper>;

export default meta;
type Story = StoryObj<typeof Wrapper>;

export const Wrapper_: Story = {
  args: {
    isVisible: true,
    outerWrapperTopChildren: 'wrapper 외부 상단 마크업 자리',
    children: 'wrpper 내부 본문 마크업 자리',
  },
};
