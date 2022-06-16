import { ComponentStory, ComponentMeta } from "@storybook/react";

import { colors } from "../tokens/color";
import { size } from "../tokens/size";

import Icon from "./Icon";

export default {
  argTypes: {
    color: { control: "select", options: Object.keys(colors) },
    size: { control: "select", options: Object.keys(size) },
  },
  component: Icon,
  title: "UI/Icon",
} as ComponentMeta<typeof Icon>;

const Template: ComponentStory<typeof Icon> = (args) => <Icon {...args} />;

export const Default = Template.bind({});
Default.args = {
  color: "black1",
  name: "arrow-left",
};
