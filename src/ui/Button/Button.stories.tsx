import { ComponentStory, ComponentMeta } from "@storybook/react";

import Button from "./Button";

export default {
  component: Button,
  title: "UI/Button",
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "Default",
  variant: "default",
};

export const Outline = Template.bind({});
Outline.args = {
  children: "Outline",
  variant: "outline",
};
