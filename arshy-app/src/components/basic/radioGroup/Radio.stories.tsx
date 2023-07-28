import type { Meta, StoryObj } from '@storybook/react';
import '../../../index.css';

import RadioGruop, { RadioItemProps } from './RadioGroup';
const meta = {
  title: 'Components/Basic/RadioGruop',
  component: RadioGruop,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark',
    },
  },
  argTypes: {
    itemType: { options: ['default', 'button'], control: { type: 'select' } },
    legend: { control: 'text' },
    name: { control: 'text' },
    className: { control: 'text' },
    radioItems: { control: 'object' },
    isAniActive: { control: 'boolean' },
    checkedVal: { control: 'text' },
    disabledVal: { control: 'text' },
  },
} satisfies Meta<typeof RadioGruop>;
export default meta;
type Story = StoryObj<typeof RadioGruop>;

const radioItems: RadioItemProps[] = [
  { label: 'one', value: 'one' },
  { label: 'two', value: 'two' },
  { label: 'three', value: 'three' },
];

const radioItems2: RadioItemProps[] = [
  { label: 'one2', value: 'one2' },
  { label: 'two2', value: 'two2' },
  { label: 'three2', value: 'three2' },
];

const radioItems3: RadioItemProps[] = [
  { label: 'one3', value: 'one3' },
  { label: 'two3', value: 'two3' },
  { label: 'three3', value: 'three3' },
];

export const Default: Story = {
  args: {
    itemType: 'default',
    legend: '운영중인 사이트',
    className: 'filter-group filter-type-linked filter-chk',
    isAniActive: true,
  },
  render: ({ ...args }) => {
    return (
      <>
        <RadioGruop {...args} name="linked" radioItems={radioItems} />
        <RadioGruop {...args} name="linked2" radioItems={radioItems2} />
        <RadioGruop {...args} name="linked3" radioItems={radioItems3} />
      </>
    );
  },
};

export const Button: Story = {
  args: {
    itemType: 'button',
    legend: '운영중인 사이트',
    className: 'filter-group filter-type-linked filter-chk',
    isAniActive: true,
  },
  render: ({ ...args }) => {
    return (
      <>
        <RadioGruop {...args} name="linked" radioItems={radioItems} />
        <RadioGruop {...args} name="linked2" radioItems={radioItems2} />
        <RadioGruop {...args} name="linked3" radioItems={radioItems3} />
      </>
    );
  },
};
