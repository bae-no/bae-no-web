import { ComponentProps, useState } from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import { useStateWithProp } from "src/hooks/useStateWithProp";

import SelectBottomDrawer from "./SelectBottomDrawer";

export default {
  component: SelectBottomDrawer,
  title: "UI/SelectBottomDrawer",
} as ComponentMeta<typeof SelectBottomDrawer>;

const Template: ComponentStory<typeof SelectBottomDrawer> = ({
  open = false,
}: ComponentProps<typeof SelectBottomDrawer>) => {
  const [isOpen, setOpen] = useStateWithProp(open);
  const [value, setValue] = useState("");
  return (
    <SelectBottomDrawer
      open={isOpen}
      options={[
        { label: "test1", value: "testValue1" },
        { label: "test2", value: "testValue2" },
      ]}
      trigger={<div>trigger</div>}
      value={value}
      onOpenChange={(_open) => setOpen(_open)}
      onValueChange={(_value) => setValue(_value)}
    />
  );
};

export const Default = Template.bind({});
Default.args = {};
