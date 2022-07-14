import { fireEvent, render, screen } from "@testing-library/react";

import Tab, { TabProps } from "./Tab";

type MockComponentProps = Pick<TabProps, "defaultValue" | "onValueChange">;

const MockComponent = ({ defaultValue, onValueChange }: MockComponentProps) => (
  <Tab
    defaultValue={defaultValue}
    options={[
      { label: "label1", value: "value1" },
      { label: "label2", value: "value2" },
    ]}
    onValueChange={onValueChange}
  />
);

describe("UI Tab Component", () => {
  it("should render trigger text", () => {
    render(<MockComponent />);
    expect(screen.getByText("label1"));
    expect(screen.getByText("label2"));
  });

  it("should render defaultValue", () => {
    render(<MockComponent defaultValue="value1" />);
    expect(screen.getByText("label1")).toHaveAttribute("data-state", "active");
  });

  it("should click event", () => {
    render(<MockComponent />);
    fireEvent.mouseDown(screen.getByText("label1"));
    expect(screen.getByText("label1")).toHaveAttribute("data-state", "active");
    expect(screen.getByText("label2")).toHaveAttribute(
      "data-state",
      "inactive"
    );

    fireEvent.mouseDown(screen.getByText("label2"));
    expect(screen.getByText("label1")).toHaveAttribute(
      "data-state",
      "inactive"
    );
    expect(screen.getByText("label2")).toHaveAttribute("data-state", "active");
  });

  it("should on value change", () => {
    const mockOnChange = jest.fn();
    render(<MockComponent onValueChange={mockOnChange} />);
    fireEvent.mouseDown(screen.getByText("label1"));
    expect(mockOnChange).toBeCalled();

    fireEvent.mouseDown(screen.getByText("label2"));
    expect(mockOnChange).toBeCalledTimes(2);
  });
});
