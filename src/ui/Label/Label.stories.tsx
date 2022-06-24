import { ComponentStory, ComponentMeta } from "@storybook/react";

import Label from "./Label";

export default {
  component: Label,
  title: "UI/Label",
  argTypes: {
    children: {
      control: { type: "text" },
      defaultValue: "3명 / 4명",
      description: "Label 내용을 입력",
    },
    variant: {
      control: { type: "select" },
      description: "Label 모양을 설정",
      defaultValue: "default",
    },
    color: {
      control: { type: "select" },
      description: "Label 색상을 설정 ",
      defaultValue: "orange",
    },
  },
} as ComponentMeta<typeof Label>;

const Template: ComponentStory<typeof Label> = (args) => <Label {...args} />;

export const Default = Template.bind({});

export const Border = Template.bind({});
Border.args = {
  children: "방장",
  variant: "border",
  color: "skyblue",
};
