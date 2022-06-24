import { ComponentStory, ComponentMeta } from "@storybook/react";

import Label from "./Label";

export default {
  argTypes: {
    children: {
      control: {
        type: "text",
      },
      defaultValue: "3명 / 4명",
      description: "Label 내용을 입력",
    },
    color: {
      control: {
        type: "select",
      },
      defaultValue: "orange",
      description: "Label 색상을 설정 ",
    },
    variant: {
      control: {
        type: "select",
      },
      defaultValue: "default",
      description: "Label 모양을 설정",
    },
  },
  component: Label,
  title: "UI/Label",
} as ComponentMeta<typeof Label>;

const Template: ComponentStory<typeof Label> = (args) => <Label {...args} />;

export const Default = Template.bind({});

export const Border = Template.bind({});
Border.args = {
  children: "방장",
  color: "skyblue",
  variant: "border",
};
