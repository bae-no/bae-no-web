import { useState } from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Input } from "../Input";

import FormField from "./FormField";

const InputWrapper = (props: object) => {
  const [value, setValue] = useState("");
  return (
    <Input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onClearClick={() => setValue("")}
    />
  );
};

export default {
  argTypes: {
    state: { control: "", options: ["valid", "invalid", "none"] },
  },
  component: FormField,
  title: "UI/FormField",
} as ComponentMeta<typeof FormField>;

const Template: ComponentStory<typeof FormField> = (args) => (
  <FormField {...args} />
);

export const Default = Template.bind({});
Default.args = {
  children: <InputWrapper />,
};
