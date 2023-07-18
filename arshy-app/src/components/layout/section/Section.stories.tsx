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
    pageName: { control: 'select', options: ['intro', 'project', 'history', 'contact'] },
    isFullpage: { control: 'boolean' },
    isPageOn: { control: 'boolean' },
    isAniActive: { control: 'boolean' },
    isSectionTitle: { control: 'boolean' },
    isFooter: { control: 'boolean' },
  },
} satisfies Meta<typeof Section>;

export default metaSection;
type Story = StoryObj<typeof Section>;

export const Section_: Story = {
  args: {
    pageName: 'contact',
    isFullpage: true,
    isPageOn: false,
    isAniActive: true,
    isSectionTitle: true,
    SectionDesc: '연락처 정보입니다.',
    bgElement: '',
    articleTitle: '연락처',
    isFooter: true,
    children: '본문',
  },
};
