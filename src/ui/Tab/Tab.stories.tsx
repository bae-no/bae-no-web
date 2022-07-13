import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Box } from "../Box";

import { TabContent, TabLabel, TabList } from "./TabComponent";
import Tab from "./TabComponent/Tab";

export default { component: Tab, title: "UI/Tab" } as ComponentMeta<typeof Tab>;

const ContentComponent = () => (
  <Box backgroundColor="skyBlue1" justifyContent="center">
    <input />
    <button type="button">버튼</button>
    <article style={{ wordBreak: "break-all" }}>
      첫번째 클릭하면 나오는것입니다.
    </article>
  </Box>
);

const Template: ComponentStory<typeof Tab> = (args) => (
  <Box style={{ width: "30rem" }}>
    <Tab {...args}>
      <TabList>
        <TabLabel value="tap1">전체</TabLabel>
        <TabLabel value="tap2">한식</TabLabel>
        <TabLabel value="tap3">중식</TabLabel>
        <TabLabel value="tap4">양식</TabLabel>
        <TabLabel value="tap5">일식</TabLabel>
        <TabLabel value="tap6">도시락</TabLabel>
        <TabLabel value="tap7">분식</TabLabel>
        <TabLabel value="tap8">햄버거</TabLabel>
      </TabList>
      <TabContent value="tap1">
        전체전체전체전체전체전체전체전체전체전체전체전체전체전체전체전체전체전체전체전체전체
      </TabContent>
      <TabContent value="tap2">
        한식한식한식한식한식한식한식한식한식한식한식한식한식한식한식한식
      </TabContent>
      <TabContent value="tap3">
        중식중식중식중식중식중식중식중식중식중식중식중식중식중식
        중식중식중식중식중식중식중식중식중식중식중식중식중식중식
      </TabContent>
      <TabContent value="tap4">
        양식양식양식양식양식양식양식양식양식양식양식양식양식양식양식양식양식양식양식양식양식양식양식양식양식양식양식양식양식양식양식양식
      </TabContent>
      <TabContent value="tap5">
        일식일식일식일식일식일식일식일식일식일식일식일식일식일식일식일식일식일식일식일식일식일식일식일식일식일식일식
      </TabContent>
      <TabContent value="tap6">
        도시락도시락도시락도시락도시락도시락도시락도시락도시락도시락도시락도시락도시락도시락도시락도시락도시락도시락도시락도시락도시락도시락도시락도시락도시락도시락도시락도시락도시락도시락도시락도시락도시락도시락도시락도시락도시락도시락도시락도시락
      </TabContent>
      <TabContent value="tap7">
        분식분식분식분식분식분식분식분식분식분식분식분식분식분식분식분식분식분식분식분식분식분식분식분식분식분식분식분식분식분식분식분식분식분식분식분식분식분식분식분식
      </TabContent>
      <TabContent value="tap8">
        <ContentComponent />
      </TabContent>
    </Tab>
  </Box>
);

export const Default = Template.bind({});
Default.args = {};
