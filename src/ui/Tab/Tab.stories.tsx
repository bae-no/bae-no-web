import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Box } from "../Box";

import Tab from "./Tab";

export default { component: Tab, title: "UI/Tab" } as ComponentMeta<typeof Tab>;

const Template: ComponentStory<typeof Tab> = (args) => (
  <Box style={{ width: "30rem" }}>
    <Tab
      {...args}
      options={[
        { label: "전체", value: "all" },
        { label: "피자", value: "pizza" },
        { label: "치킨", value: "chicken" },
        { label: "햄버거", value: "hamburger" },
        { label: "라면", value: "ramen" },
        { label: "족발, 보쌈", value: "porkFeet,bossam" },
        { label: "도시락", value: "lunchBox" },
        { label: "떡볶이", value: "tteokbokki" },
      ]}
    />
  </Box>
);

export const Default = Template.bind({});
Default.args = {};
