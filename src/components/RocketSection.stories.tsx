import type { Meta, StoryObj } from "@storybook/react";
import RocketSection from "./RocketSection";

const meta = {
  title: "Components/RocketSection",
  component: RocketSection,
} satisfies Meta<typeof RocketSection>;

export default meta;

type Story = StoryObj<typeof RocketSection>;

export const Primary: Story = { args: {} };
