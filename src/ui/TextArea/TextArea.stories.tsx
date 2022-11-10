import { useState } from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import TextArea from "./TextArea";

export default {
  argTypes: {},
  component: TextArea,
  title: "UI/TextArea",
} as ComponentMeta<typeof TextArea>;

const Template: ComponentStory<typeof TextArea> = (args) => {
  const [value, setValue] = useState("");
  return (
    <TextArea
      {...args}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export const Default = Template.bind({});
