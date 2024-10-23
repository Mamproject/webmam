import type { Meta, StoryObj } from "@storybook/react";
import BrickBtn from "./BrickBtn";

const meta = {
  title: "Components/BrickBtn",
  component: BrickBtn,
} satisfies Meta<typeof BrickBtn>;

export default meta;

type Story = StoryObj<typeof BrickBtn>;

export const Primary: Story = {
  args: {
    children: "Brick button",
  },
};
