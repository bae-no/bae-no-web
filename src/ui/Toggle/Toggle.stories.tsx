import { ComponentStory, ComponentMeta } from "@storybook/react";

import Toggle from "./Toggle";

export default {
  component: Toggle,
  title: "UI/Toggle",
} as ComponentMeta<typeof Toggle>;

const Template: ComponentStory<typeof Toggle> = (args) => <Toggle {...args} />;

export const Default = Template.bind({});
Default.args = {
  checked: true,
};
