import { ComponentMeta, ComponentStory } from "@storybook/react";

import CheckBox from "./CheckBox";

export default {
  component: CheckBox,
  title: "UI/CheckBox",
} as ComponentMeta<typeof CheckBox>;

const Template: ComponentStory<typeof CheckBox> = (args) => (
  <CheckBox {...args} />
);

export const Default = Template.bind({});

Default.args = {
  label: "체크박스 label입니다",
  value: "체크박스 value입니다",
};
