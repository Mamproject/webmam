import type { Meta, StoryObj } from "@storybook/react";
import CookiesBanner from "./CookiesBanner";
import { useState } from "react";

const meta = {
  title: "Components/CookiesBanner",
  component: CookiesBanner,
  decorators: [
    (Story, context) => {
      const [open, setOpen] = useState(true);
      return (
        <div className="flex h-screen items-center justify-center">
          <button onClick={() => setOpen(true)}>Open dialog</button>
          <Story
            args={{
              ...context.args,
              open,
              onOpenChange: setOpen,
            }}
          />
        </div>
      );
    },
  ],
} satisfies Meta<typeof CookiesBanner>;

export default meta;

type Story = StoryObj<typeof CookiesBanner>;

export const Primary: Story = {
  args: {
    openSettings: () => console.log("openSettings"),
  },
};
