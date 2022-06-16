import { useState } from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import Input from "./Input";

export default {
  component: Input,
  title: "UI/Input",
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => {
  const [value, setValue] = useState("");
  return (
    <Input
      {...args}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onClearClick={() => setValue("")}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  variant: "default",
};

export const Underline = Template.bind({});
Underline.args = {
  variant: "underline",
};
