import type { Meta, StoryObj } from '@storybook/react';
import '../../../index.css';

import Section from './Section';

const meta = {
  title: 'Components/Layout/Section',
  component: Section,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark',
    },
  },
  argTypes: {
    pageName: { control: 'select', options: ['intro', 'project', 'history', 'contact'] },
    isFullpage: { control: 'boolean' },
    isAniActive: { control: 'boolean' },
    isSectionTitle: { control: 'boolean' },
    isFooter: { control: 'boolean' },
  },
} satisfies Meta<typeof Section>;

export default meta;
type Story = StoryObj<typeof Section>;

export const Section_: Story = {
  args: {
    pageName: 'section title',
    isFullpage: true,
    isAniActive: true,
    isSectionTitle: true,
    SectionDesc: '섹션 설명을 입력해주세요',
    bgElement: '',
    articleTitle: '한글 타이틀',
    isFooter: true,
    children: (
      <>
        본문입니다 <br />
        내용을 입력해주세요
      </>
    ),
  },
};
