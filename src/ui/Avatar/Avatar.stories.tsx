import { ComponentMeta, ComponentStory } from "@storybook/react";

import Avatar from "./Avatar";

export default {
  component: Avatar,
  title: "UI/Avatar",
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />;

export const Default = Template.bind({});
export const Image = Template.bind({});
export const Text = Template.bind({});

Default.args = {
  size: "56",
};

Image.args = {
  size: "56",
  src: "https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80",
};

Text.args = {
  size: "56",
  text: "A",
};
