import type { Meta, StoryObj } from "@storybook/react";
import CookiesModal from "./CookiesModal";

const meta = {
  title: "Components/CookiesModal",
  component: CookiesModal,
} satisfies Meta<typeof CookiesModal>;

export default meta;

type Story = StoryObj<typeof CookiesModal>;

export const Primary: Story = {
  args: {
    open: true,
    onOpenChange: () => {},
    cookies: {
      essential: true,
      google: false,
      stripe: false,
    },
    onSavedPreferences: () => {},
  },
};
