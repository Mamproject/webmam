import { ColorVariant } from "@/types/theme";
import type { Meta, StoryObj } from "@storybook/react";
import Logo from "./Logo";

const meta = {
  title: "Components/Logo",
  component: Logo,
} satisfies Meta<typeof Logo>;

export default meta;

type Story = StoryObj<typeof Logo>;

export const Purple: Story = { args: { variant: ColorVariant.Purple } };

export const White: Story = { args: { variant: ColorVariant.White } };
