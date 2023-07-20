import type { Meta, StoryObj } from '@storybook/react';
import '../../index.css';

import Wrapper from '../../components/layout/wrapper/Wrapper';
import History from './History';

const meta = {
  title: 'Templates/History',
  component: History,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    isAniActive: { controls: 'boolean' },
  },
} satisfies Meta<typeof History>;

export default meta;
type Story = StoryObj<typeof History>;

const IntroInWrapper: Story = {
  render: ({ isAniActive, ...args }) => {
    return (
      <Wrapper isVisible>
        <History isAniActive={isAniActive} />
      </Wrapper>
    );
  },
};

export const History_: Story = {
  ...IntroInWrapper,
  args: {
    isAniActive: true,
  },
};
