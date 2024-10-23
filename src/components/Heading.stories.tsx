import type { Meta, StoryObj } from "@storybook/react";
import Heading from "./Heading";

const meta = {
  title: "Components/Heading",
  component: Heading,
} satisfies Meta<typeof Heading>;

export default meta;

type Story = StoryObj<typeof Heading>;

export const Purple1: Story = { args: { color: "purple", level: 1, children: "Hello World" } };

export const White2: Story = { args: { color: "white", level: 2, children: "Hello World" } };
