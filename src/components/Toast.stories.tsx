import type { Meta, StoryObj } from "@storybook/react";
import type { ToastProps} from "./Toast";
import Toast, { ToastProvider, useToast } from "./Toast";
import Button from "./Button";
import type { FC } from "react";

const meta = {
  title: "Components/Toast",
  component: Toast,
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
} satisfies Meta<typeof Toast>;

export default meta;

type Story = StoryObj<typeof Toast>;

export const Primary: Story = {
  args: {
    title: "Form submitted",
    description: "Your form has been submitted successfully.",
    action: {
      label: "Undo",
      altText: "Undo",
      onClick: () => {},
    },
  },
  render: (args) => <StoryRender {...args} />,
};

const StoryRender: FC<ToastProps> = (props) => {
  const toast = useToast();

  return <Button onClick={() => toast(props)}>Show toast</Button>;
};
