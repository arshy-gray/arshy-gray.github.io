import type { Meta, StoryObj } from '@storybook/react';
// import '../../../index.css';

import CheckboxGroup, { ChkItemProps } from './CheckboxGroup';
const meta = {
  title: 'Components/Basic/CheckboxGroup',
  component: CheckboxGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark',
    },
  },
  argTypes: {
    itemType: { ptions: ['default'], control: { type: 'select' } },
    legend: { control: 'text' },
    name: { control: 'text' },
    className: { control: 'text' },
    chkItems: { control: 'object' },
    isAniActive: { control: 'boolean' },
    checkedVal: { control: 'text' },
    disabledVal: { control: 'text' },
  },
} satisfies Meta<typeof CheckboxGroup>;
export default meta;
type Story = StoryObj<typeof CheckboxGroup>;

const chkItems: ChkItemProps[] = [
  { label: 'one', value: 'one' },
  { label: 'two', value: 'two' },
  { label: 'three', value: 'three' },
];

const chkItems2: ChkItemProps[] = [
  { label: 'one2', value: 'one2' },
  { label: 'two2', value: 'two2' },
  { label: 'three2', value: 'three2' },
];

const chkItems3: ChkItemProps[] = [
  { label: 'one3', value: 'one3' },
  { label: 'two3', value: 'two3' },
  { label: 'three3', value: 'three3' },
];

export const CheckboxGroup_: Story = {
  args: {
    itemType: 'default',
    legend: '운영중인 사이트',    
    className: 'filter-group filter-type-linked filter-chk',
    isAniActive: true,
  },
  render: ({ ...args }) => {
    return (
      <>
        <CheckboxGroup {...args} name="linked" chkItems={chkItems} />
        <CheckboxGroup {...args} name="linked2" chkItems={chkItems2} />
        <CheckboxGroup {...args} name="linked3" chkItems={chkItems3} />
      </>
    );
  },
};
