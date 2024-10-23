import type { Meta, StoryObj } from "@storybook/react";
import Checkbox from "./Checkbox";

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Purple: Story = { args: { defaultChecked: true, label: "Acepto los términos y condiciones" } };

export const White: Story = {
  args: { color: "white", ...Purple.args },
  decorators: [
    (Story) => (
      <div className="bg-purple p-4 text-white">
        <Story />
      </div>
    ),
  ],
};
