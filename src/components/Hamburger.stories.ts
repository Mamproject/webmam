import { ColorVariant } from "@/types/theme";
import type { Meta, StoryObj } from "@storybook/react";
import Hamburger from "./Hamburger";

const meta = {
  title: "Components/Hamburger",
  component: Hamburger,
} satisfies Meta<typeof Hamburger>;

export default meta;

type Story = StoryObj<typeof Hamburger>;

export const Purple: Story = { args: { variant: ColorVariant.Purple } };

export const White: Story = { args: { variant: ColorVariant.White } };
