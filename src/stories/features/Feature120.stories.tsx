import type { Meta, StoryObj } from '@storybook/react';

import { Feature120, type Feature120Props } from '@/components/features/Feature120';

const meta = {
  title: 'Features/Feature120',
  component: Feature120,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    ctaText: { control: 'text' },
    ctaHref: { control: 'text' },
    className: { control: 'text' },
    people: { control: 'object' },
    stats: { control: 'object' },
    heroImageSrc: { control: 'text' },
  },
} satisfies Meta<typeof Feature120>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const CustomContent: Story = {
  args: {
    title: 'Level up your product experience',
    subtitle:
      'Powerful building blocks to ship faster and delight users.',
    ctaText: 'Explore Features',
    ctaHref: '#features',
    heroImageSrc:
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg',
    people: [
      {
        name: 'Ava Carter',
        role: 'PM, Nimbus Labs',
        avatarSrc:
          'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp',
      },
      {
        name: 'Liam Brooks',
        role: 'Design Lead, Nimbus Labs',
        avatarSrc:
          'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp',
      },
    ],
    stats: [
      { value: '98%', label: 'CSAT across all plans' },
      { value: '2x', label: 'Faster iteration speed' },
      { value: '15+', label: 'Supported integrations' },
      { value: '10k+', label: 'Active weekly users' },
    ],
  } satisfies Feature120Props,
};
