import { ComponentStory, ComponentMeta } from "@storybook/react";

import { colors } from "../tokens/color";

import Typography from "./Typography";

export default {
  argTypes: {
    color: { control: "select", options: Object.keys(colors) },
  },
  component: Typography,
  title: "UI/Typography",
} as ComponentMeta<typeof Typography>;

const Template: ComponentStory<typeof Typography> = (args) => (
  <Typography {...args} />
);

export const Default = Template.bind({});
Default.args = {
  children: "Default",
};
