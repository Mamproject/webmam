import type { Preview } from "@storybook/react";
import "../src/styles/globals.css";
import dictionary from "../src/i18n/dictionaries/es";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: "dark",
      values: [
        { name: "purple", value: "#D395FF" },
        { name: "dark", value: "#000000" },
        { name: "light", value: "#FFFFFF" },
      ],
    },
  },
  args: {
    dictionary,
  },
  argTypes: {
    dictionary: { table: { disable: true } },
  },
};

export default preview;
