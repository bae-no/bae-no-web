import { ComponentStory, ComponentMeta } from "@storybook/react";

import { colors } from "../tokens/color";
import { layout } from "../tokens/layout";
import { space } from "../tokens/space";

import Box from "./Box";

export default {
  argTypes: {
    alignItems: {
      control: "select",
      options: ["stretch", "flex-start", "center", "flex-end"],
    },
    backgroundColor: { control: "select", options: Object.keys(colors) },
    bg: { control: "select", options: Object.keys(colors) },
    borderColor: { control: "select", options: Object.keys(colors) },
    borderRadius: { control: "select", options: Object.keys(layout) },
    boxSizing: { control: "select", options: ["border-box", "content-box"] },
    br: { control: "select", options: Object.keys(layout) },
    color: { control: "select", options: Object.keys(colors) },
    cursor: { control: "select", options: ["pointer"] },
    display: {
      control: "select",
      options: ["none", "flex", "block", "inline", "grid"],
    },
    flex: { control: "select", options: [0, 0.5, 1] },
    flexDirection: {
      control: "select",
      options: ["row", "column", "row-reverse", "column-reverse"],
    },
    gap: { control: "select", options: Object.keys(space) },
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
    m: { control: "select", options: Object.keys(space) },
    margin: { control: "select", options: Object.keys(space) },
    marginBottom: { control: "select", options: Object.keys(space) },
    marginLeft: { control: "select", options: Object.keys(space) },
    marginRight: { control: "select", options: Object.keys(space) },
    marginTop: { control: "select", options: Object.keys(space) },
    maxHeight: { control: "select", options: Object.keys(layout) },
    maxSize: { control: "select", options: Object.keys(layout) },
    maxWidth: { control: "select", options: Object.keys(layout) },
    minHeight: { control: "select", options: Object.keys(layout) },
    minSize: { control: "select", options: Object.keys(layout) },
    minWidth: { control: "select", options: Object.keys(layout) },
    mx: { control: "select", options: Object.keys(space) },
    my: { control: "select", options: Object.keys(space) },
    p: { control: "select", options: Object.keys(space) },
    padding: { control: "select", options: Object.keys(space) },
    paddingBottom: { control: "select", options: Object.keys(space) },
    paddingLeft: { control: "select", options: Object.keys(space) },
    paddingRight: { control: "select", options: Object.keys(space) },
    paddingTop: { control: "select", options: Object.keys(space) },
    position: {
      control: "select",
      options: ["absolute", "relative", "fixed", "sticky"],
    },
    px: { control: "select", options: Object.keys(space) },
    py: { control: "select", options: Object.keys(space) },
    size: { control: "select", options: Object.keys(layout) },
    width: { control: "select", options: Object.keys(layout) },
    zIndex: { control: "select", options: [-1, 0, 1, 2, 3, 4, 5] },
  },
  component: Box,
  title: "UI/Box",
} as ComponentMeta<typeof Box>;

const Template: ComponentStory<typeof Box> = (args) => <Box {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "Default Box",
};
