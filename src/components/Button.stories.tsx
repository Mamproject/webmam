import type { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";

const meta = {
  title: "Components/Button",
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof Button>;

export const White: Story = { args: { color: "white", children: "Button" } };

export const Purple: Story = { args: { color: "purple", children: "Button" } };
