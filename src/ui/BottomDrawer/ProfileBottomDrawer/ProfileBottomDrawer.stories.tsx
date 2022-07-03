import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Button } from "src/ui/Button";

import ProfileBottomDrawer from "./ProfileBottomDrawer";

export default {
  component: ProfileBottomDrawer,
  title: "UI/ProfileBottomDrawer",
} as ComponentMeta<typeof ProfileBottomDrawer>;

const Template: ComponentStory<typeof ProfileBottomDrawer> = (args) => (
  <ProfileBottomDrawer {...args} />
);

export const Default = Template.bind({});
Default.args = {
  avatarProps: { text: "lifeisegg" },
  description: "Life is egg",
  nickname: "lifeisegg",
  trigger: <Button>열기</Button>,
};
