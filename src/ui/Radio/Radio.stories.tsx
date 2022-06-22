import { ComponentMeta, ComponentStory } from "@storybook/react";

import Radio from "./Radio";

export default {
  component: Radio,
  title: "UI/Radio",
} as ComponentMeta<typeof Radio>;

const Template: ComponentStory<typeof Radio> = (args) => {
  const handleOnValueChange = () => {};
  return <Radio onValueChange={handleOnValueChange} {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  disabled: false,
  radioValue: ["", "라디오버튼 라벨", "라디오버튼 라벨2"],
};
