import type { Meta, StoryObj } from '@storybook/react';
import '../../index.css';

import Wrapper from '../../components/layout/wrapper/Wrapper';
import Intro from './Intro';

const meta = {
  title: 'Templates/Intro',
  component: Intro,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    isAniActive: { controls: 'boolean' },
  },
} satisfies Meta<typeof Intro>;

export default meta;
type Story = StoryObj<typeof Intro>;

const IntroInWrapper: Story = {
  render: ({ isAniActive, ...args }) => {
    return (
      <Wrapper isVisible>
        <Intro isAniActive={isAniActive} />
      </Wrapper>
    );
  },
};

export const Intro_: Story = {
  ...IntroInWrapper,
  args: {
    isAniActive: true,
  },
};
