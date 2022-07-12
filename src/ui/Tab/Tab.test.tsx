import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import Tab, { TabProps } from "./Tab";

type MockComponentProps = Pick<TabProps, "defaultValue" | "onValueChange">;

const MockComponent = ({ defaultValue, onValueChange }: MockComponentProps) => {
  return (
    <Tab
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      tab={[
        {
          content: "fristValue",
          tabId: "tabId1",
          label: "firstTrigger",
        },
        {
          content: "secondValue",
          tabId: "tabId2",
          label: "secondTrigger",
        },
      ]}
    />
  );
};

describe("UI Tab Component", () => {
  it("should render trigger text", () => {
    render(<MockComponent />);
    expect(screen.getByText("firstTrigger"));
    expect(screen.getByText("secondTrigger"));
  });

  it("should render defaultValue", () => {
    render(<MockComponent defaultValue="tabId2" />);
    expect(screen.getByText("secondValue"));
  });

  it("should click event", async () => {
    render(<MockComponent />);
    fireEvent.click(screen.getByText("firstTrigger"));
    await waitFor(() => {
      expect(screen.getByText("firstTrigger")).toBeInTheDocument();
    });
  });

  it("should on value change", () => {
    const mockOnChange = jest.fn();
    render(<MockComponent onValueChange={mockOnChange} />);
    fireEvent.mouseDown(screen.getByText("firstTrigger"));
    expect(mockOnChange).toBeCalled();

    fireEvent.mouseDown(screen.getByText("secondTrigger"));
    expect(mockOnChange).toBeCalledTimes(2);
  });
});
