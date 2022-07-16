import { ComponentStory, ComponentMeta } from "@storybook/react";

import { colors } from "../tokens/color";

import Select from "./Select";

export default {
  argTypes: {
    color: { control: "select", options: Object.keys(colors) },
  },
  component: Select,
  title: "UI/Select",
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;

export const Default = Template.bind({});
Default.args = {
  placeholder: "Select",
};

export const Small = Template.bind({});
Small.args = {
  placeholder: "Select",
  size: "small",
};
