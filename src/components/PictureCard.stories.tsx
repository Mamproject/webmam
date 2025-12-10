import type { Meta, StoryObj } from "@storybook/react";
import PictureCard from "./PictureCard";
import momsSnc from "@/assets/moms_snc.png";

const meta = {
  title: "Components/PictureCard",
  component: PictureCard,
  parameters: { backgrounds: { default: "light" } },
} satisfies Meta<typeof PictureCard>;

export default meta;

type Story = StoryObj<typeof PictureCard>;

export const Primary: Story = {
  args: {
    src: momsSnc,
    title: "Moms Special Needs Children",
  },
};
