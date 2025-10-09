// stories/stats/Stats1.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Stats1, type Stat } from "@/components/stats/stats1";

// Helper to generate demo data
const demoStats = (n: number): Stat[] =>
  Array.from({ length: n }, (_, i) => ({
    value: `${(i + 1) * 10}%`,
    label: `Metric ${i + 1}`,
  }));

const meta = {
  title: "Stats/Stats1",
  component: Stats1,
  parameters: {
    layout: "centered", // same as your Feature120 story
    docs: {
      description: {
        component:
          "A responsive, repeatable stats grid. **Mobile**: uses 2 or 4 columns with `col-span` placements for 3–8 items. **Desktop**: exact layouts for 2–8 items; 5 and 7 use centered bottom rows.",
      },
    },
  },
  tags: ["autodocs"], // enables the Args table like your Feature120 example
  argTypes: {
    className: {
      control: "text",
      description: "Additional Tailwind classes on the grid container.",
    },
    stats: {
      control: "object",
      description: "Array of `{ value: string; label: string }`.",
      table: { type: { summary: "Stat[]" } },
    },
    renderItem: {
      control: false,
      description:
        "Optional custom renderer `(stat, index) => ReactNode`. When omitted, a default value/label block is rendered.",
      table: { type: { summary: "(stat: Stat, index: number) => React.ReactNode" } },
    },
  },
  args: {
    // Default args shown in the Docs table
    className: "",
    stats: demoStats(4),
  },
} satisfies Meta<typeof Stats1>;

export default meta;
type Story = StoryObj<typeof meta>;

// Presets for each count
export const Two: Story = { args: { stats: demoStats(2) } };
export const Three: Story = { args: { stats: demoStats(3) } };
export const Four: Story = { args: { stats: demoStats(4) } };
export const Five: Story = { args: { stats: demoStats(5) } };
export const Six: Story = { args: { stats: demoStats(6) } };
export const Seven: Story = { args: { stats: demoStats(7) } };
export const Eight: Story = { args: { stats: demoStats(8) } };

// Example with custom item rendering
export const CustomItem: Story = {
  args: {
    stats: demoStats(5),
    renderItem: (stat) => (
      <div className="p-6 text-center border rounded-2xl">
        <div className="text-5xl font-extrabold">{stat.value}</div>
        <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
      </div>
    ),
  },
};
