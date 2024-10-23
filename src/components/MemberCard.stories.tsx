import type { Meta, StoryObj } from "@storybook/react";
import MemberCard from "./MemberCard";
import picPlaceholder from "@/assets/pic_placeholder.png";
import type { LocalizedString } from "@/i18n/localized-string";

const meta = {
  title: "Components/MemberCard",
  component: MemberCard,
} satisfies Meta<typeof MemberCard>;

export default meta;

type Story = StoryObj<typeof MemberCard>;

export const Primary: Story = {
  args: {
    name: "Jhon Doe",
    title: "Chief Executive Officer" as LocalizedString,
    pictureSrc: picPlaceholder,
  },
};
