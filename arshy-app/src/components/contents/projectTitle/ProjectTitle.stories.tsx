import type { Meta, StoryObj } from '@storybook/react';
import '../../../index.css';

import ProjectTitle from './ProjectTitle';

const meta = {
  title: 'Components/Contents/ProjectTitle',
  component: ProjectTitle,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    titleType: { option: ['thumb', 'popup'], control: { type: 'select' } },
    title: { control: 'string' },
    summary: { control: 'string' },
  },
} satisfies Meta<typeof ProjectTitle>;

export default meta;
type Story = StoryObj<typeof ProjectTitle>;

export const Popup: Story = {
  args: {
    titleType: 'thumb',
    title: '프로젝트 썸네일 타이틀',
    summary: '프로젝트 썸네일 개요를 입력하세요',
  },
};

export const Summary: Story = {
  args: {
    titleType: 'popup',
    title: '프로젝트 팝업 타이틀',
    summary: '프로젝트 팝업 개요를 입력하세요',
  },
};
