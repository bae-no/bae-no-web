import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Box } from "../Box";

import Tab from "./Tab";

export default { component: Tab, title: "UI/Tab" } as ComponentMeta<typeof Tab>;

const Template: ComponentStory<typeof Tab> = (args) => (
  <Box style={{ width: "30rem" }}>
    <Tab {...args} />
  </Box>
);
const ContentComponent = () => (
  <Box backgroundColor="skyBlue1" justifyContent="center">
    <input />
    <button type="button">버튼</button>
    <article style={{ wordBreak: "break-all" }}>
      첫번째 클릭하면 나오는것입니다.
    </article>
  </Box>
);

export const Default = Template.bind({});
Default.args = {
  tab: [
    {
      content: <ContentComponent />,
      tabId: "첫번째아이디",
      label: "첫번째",
    },
    {
      content: "두번째 클릭하면 나오는것이고 얘는 문자열입니다~",
      tabId: "두번째아이디",
      label: "두번째",
    },
    {
      content: "세번째 클릭하면 나오는것이고 얘도 문자열입니다 :)",
      tabId: "세번째아이디",
      label: "세번째",
    },
    {
      content: "44444444444444444444444444",
      tabId: "네번째아이디",
      label: "네번째",
    },
    {
      content: "555555555555555555555555555",
      tabId: "다섯번째번째아이디",
      label: "다섯번째",
    },
    {
      content: "66666666666666666666666666",
      tabId: "여섯번째아이디",
      label: "여섯번째",
    },
    {
      content: "7777777777777777777777777",
      tabId: "일곱번째아이디",
      label: "일곱번째",
    },
  ],
};
