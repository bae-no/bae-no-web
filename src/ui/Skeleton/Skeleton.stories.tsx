import { ComponentStory, ComponentMeta } from "@storybook/react";

import { layout } from "../tokens/layout";
import { space } from "../tokens/space";

import Skeleton from "./Skeleton";

export default {
  argTypes: {
    alignItems: {
      control: "select",
      options: ["stretch", "flex-start", "center", "flex-end"],
    },
    borderRadius: { control: "select", options: Object.keys(layout) },
    display: {
      control: "select",
      options: ["none", "flex", "block", "inline", "grid"],
    },
    flex: { control: "select", options: [0, 0.5, 1] },
    flexDirection: {
      control: "select",
      options: ["row", "column", "row-reverse", "column-reverse"],
    },
    height: { control: "select", options: Object.keys(layout) },
    justifyContent: {
      control: "select",
      options: [
        "stretch",
        "flex-start",
        "center",
        "flex-end",
        "space-around",
        "space-between",
      ],
    },
    margin: { control: "select", options: Object.keys(space) },
    padding: { control: "select", options: Object.keys(space) },
    width: { control: "select", options: Object.keys(layout) },
  },
  component: Skeleton,
  title: "UI/Skeleton",
} as ComponentMeta<typeof Skeleton>;

const Template: ComponentStory<typeof Skeleton> = (args) => (
  <Skeleton {...args} />
);

export const Default = Template.bind({});
Default.args = {
  height: "16",
  width: "full",
};
