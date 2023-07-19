import type { Meta, StoryObj } from '@storybook/react';
import '../../index.css';

import Wrapper from '../../components/layout/wrapper/Wrapper';
import Contact from './Contact';

const meta = {
  title: 'Templates/Contact',
  component: Contact,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    isAniActive: { controls: 'boolean' },
  },
} satisfies Meta<typeof Contact>;

export default meta;
type Story = StoryObj<typeof Contact>;

const IntroInWrapper: Story = {
  render: ({ isAniActive, ...args }) => {
    return (
      <Wrapper isVisible>
        <Contact isAniActive={isAniActive} />
      </Wrapper>
    );
  },
};

export const Contact_: Story = {
  ...IntroInWrapper,
  args: {
    isAniActive: true,
  },
};
