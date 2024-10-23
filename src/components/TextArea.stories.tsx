import type { Meta, StoryObj } from "@storybook/react";
import TextArea from "./TextArea";

const meta = {
  title: "Components/TextArea",
  component: TextArea,
} satisfies Meta<typeof TextArea>;

export default meta;

type Story = StoryObj<typeof TextArea>;

export const Primary: Story = {
  args: {
    label: "Text area",
    placeholder: "Type something...",
    error: "This field is required",
  },
  parameters: {
    backgrounds: { default: "light" },
  },
};

export const White: Story = {
  args: {
    ...Primary.args,
    label: `Para construir nuestro puente, también necesitamos personas que coloquen esos ladrillos. ¿Crees que tu perfil profesional puede aportar a este proyecto?

Necesitamos: arquitecto/a, educador/a social, gestor/a económica, informático/a, jurista, periodista, traductor/a, sanitario…`,
    variant: "white",
  },

  parameters: {
    backgrounds: { default: "purple" },
  },
};
