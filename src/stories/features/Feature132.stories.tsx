// stories/features/Feature132.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Feature132, type Feature132Props } from "@/components/Feature132";

/** Helper: generate demo items (1–8) */
const demoItems = (n: number): Feature132Props["items"] =>
  Array.from({ length: n }, (_, i) => ({
    id: i + 1,
    title: `Card ${i + 1}`,
    description:
      "Short description for this card. Keep it to 1–2 lines to maintain a tidy grid.",
    imageSrc:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
  }));

const meta = {
  title: "Features/Feature132",
  component: Feature132,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
**Feature132** is a responsive feature/card grid that uses the **same explicit grid maps** as \`Stats1\`.  
All class tokens are literal (no dynamic Tailwind), so layouts are deterministic and don't need a safelist.

### Layout rules

**Mobile**
- 2 → \`grid-cols-2 grid-rows-1\`
- 3 → \`grid-cols-4 grid-rows-2\` with \`col-span-2\` and centered last item
- 4 → \`grid-cols-4 grid-rows-2\`
- 5 → \`grid-cols-4 grid-rows-3\` (2-2-1 pattern; last row centered)
- 6 → \`grid-cols-4 grid-rows-3\`
- 7 → \`grid-cols-4 grid-rows-4\` (2-2-2-1 pattern; last row centered)
- 8 → \`grid-cols-4 grid-rows-4\`

**Desktop**
- 2 → \`grid-cols-2 grid-rows-1\`
- 3 → \`grid-cols-3 grid-rows-1\`
- 4 → \`grid-cols-4 grid-rows-1\`
- 5 → \`grid-cols-6 grid-rows-2\` with \`col-span-2\` to center the bottom row
- 6 → \`grid-cols-3 grid-rows-2\`
- 7 → \`grid-cols-8 grid-rows-2\` with \`col-span-2\`
- 8 → \`grid-cols-4 grid-rows-2\`

Cards can be links by providing \`href\` on each item.
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    heading: { control: "text", description: "Section heading." },
    subheading: { control: "text", description: "Section subheading/lede." },
    className: {
      control: "text",
      description: "Additional Tailwind classes for the outer section/container.",
    },
    cta: {
      control: "object",
      description: "Call to action object `{ text: string; href: string }`.",
      table: { type: { summary: "{ text: string; href: string }" } },
    },
    items: {
      control: "object",
      description:
        "Array of items (max 8): `{ id, title, imageSrc, imageAlt?, description, href? }`.",
      table: {
        type: {
          summary:
            "{ id: number|string; title: string; imageSrc: string; imageAlt?: string; description: string; href?: string }[]",
        },
      },
    },
  },
  args: {
    heading: "Welcome to Our Website",
    subheading:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig doloremque mollitia fugiat omnis! Porro facilis quo animi consequatur. Explicabo.",
    cta: { text: "Get Started", href: "#" },
    items: demoItems(6),
  },
} satisfies Meta<typeof Feature132>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ===== Presets by count ===== */
export const One: Story = { args: { items: demoItems(1) } };
export const Two: Story = { args: { items: demoItems(2) } };
export const Three: Story = { args: { items: demoItems(3) } };
export const Four: Story = { args: { items: demoItems(4) } };
export const Five: Story = { args: { items: demoItems(5) } };
export const Six: Story = { args: { items: demoItems(6) } };
export const Seven: Story = { args: { items: demoItems(7) } };
export const Eight: Story = { args: { items: demoItems(8) } };

/* ===== Linked cards example ===== */
export const LinkedCards: Story = {
  args: {
    items: demoItems(5).map((it) => ({ ...it, href: "#card-" + it.id })),
    cta: { text: "Explore", href: "#explore" },
  },
};

/* ===== No CTA example ===== */
export const NoCta: Story = {
  args: {
    cta: undefined,
    items: demoItems(4),
  },
};
