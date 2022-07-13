import { fireEvent, render, screen } from "@testing-library/react";

import { TabContent, TabLabel, TabList } from "./TabComponent";
import Tab, { TabProps } from "./TabComponent/Tab";

type MockComponentProps = Pick<TabProps, "defaultValue" | "onValueChange">;

const MockComponent = ({ defaultValue, onValueChange }: MockComponentProps) => (
  <Tab defaultValue={defaultValue} onValueChange={onValueChange}>
    <TabList>
      <TabLabel value="tabValue1">firstLabel</TabLabel>
      <TabLabel value="tabValue2">secondLabel</TabLabel>
    </TabList>
    <TabContent value="tabValue1">fristContent</TabContent>
    <TabContent value="tabValue2">secondContent</TabContent>
  </Tab>
);

describe("UI Tab Component", () => {
  it("should render trigger text", () => {
    render(<MockComponent />);
    expect(screen.getByText("firstLabel"));
    expect(screen.getByText("secondLabel"));
  });

  it("should render defaultValue", () => {
    render(<MockComponent defaultValue="tabValue1" />);
    expect(screen.getByText("fristContent"));
  });

  it("should click event", async () => {
    render(<MockComponent />);
    fireEvent.mouseDown(screen.getByText("firstLabel"));
    expect(screen.getByText("fristContent")).toBeInTheDocument();
  });

  it("should on value change", () => {
    const mockOnChange = jest.fn();
    render(<MockComponent onValueChange={mockOnChange} />);
    fireEvent.mouseDown(screen.getByText("firstLabel"));
    expect(mockOnChange).toBeCalled();

    fireEvent.mouseDown(screen.getByText("secondLabel"));
    expect(mockOnChange).toBeCalledTimes(2);
  });
});
