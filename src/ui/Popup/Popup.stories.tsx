import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Button } from "../Button";
import { colors } from "../tokens/color";

import Popup from "./Popup";

export default {
  argTypes: {
    color: { control: "select", options: Object.keys(colors) },
  },
  component: Popup,
  title: "UI/Popup",
} as ComponentMeta<typeof Popup>;

const Template: ComponentStory<typeof Popup> = (args) => <Popup {...args} />;

export const Default = Template.bind({});
Default.args = {
  cancelText: "tesaaaa",
  children: <Button>팝업열기</Button>,
  confirmText: "test",
  description: "fdsa",
  title: "fas",
};
