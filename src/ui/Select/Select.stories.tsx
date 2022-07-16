import { useState } from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import Select from "./Select";

export default {
  component: Select,
  title: "UI/Select",
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = ({ size, title }) => {
  const [value, setValue] = useState("");
  return (
    <Select
      options={[
        { label: "test1", value: "testvalue1" },
        { label: "test2", value: "testvalue2" },
      ]}
      placeholder="trigger"
      size={size}
      title={title}
      value={value}
      onValueChange={(v) => setValue(v)}
    />
  );
};

export const Default = Template.bind({});
Default.args = {};

export const Small = Template.bind({});
Small.args = {
  size: "small",
};
