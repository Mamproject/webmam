import type { Meta, StoryObj } from "@storybook/react";
import SocialMediaButton from "./SocialMediaButton";

const meta = {
  title: "Components/SocialMediaButton",
  component: SocialMediaButton,
  parameters: { backgrounds: { default: "light" } },
} satisfies Meta<typeof SocialMediaButton>;

export default meta;

type Story = StoryObj<typeof SocialMediaButton>;

export const Primary: Story = {
  args: {
    variant: "instagram",
  },
};
