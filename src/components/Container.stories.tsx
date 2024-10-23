import type { Meta, StoryObj } from "@storybook/react";
import Container from "./Container";

const meta = {
  title: "Components/Container",
  component: Container,
  decorators: [
    (Story) => (
      <div className="bg-green-300">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Container>;

export default meta;

type Story = StoryObj<typeof Container>;

export const Horizontal: Story = {
  args: {
    horizontal: true,
    children: "Horizontal",
    className: "bg-red-200",
  },
};
