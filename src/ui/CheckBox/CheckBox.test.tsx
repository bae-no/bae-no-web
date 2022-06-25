import { SVGAttributes } from "react";

import { fireEvent, render, screen } from "@testing-library/react";

import CheckBox from "./CheckBox";

jest.mock("next/dynamic", () => () => {
  const DynamicComponent = (props: SVGAttributes<SVGElement>) => (
    <svg {...props} />
  );
  DynamicComponent.displayName = "LoadableComponent";
  DynamicComponent.preload = jest.fn();
  return DynamicComponent;
});

describe("UI CheckBox Component", () => {
  it("should render label text", () => {
    render(<CheckBox label="testLabel" value="testValue" />);
    expect(screen.getByLabelText("testLabel")).toBeInTheDocument();
  });

  it("should default checked", () => {
    render(<CheckBox defaultChecked label="testLabel" value="testValue" />);
    expect(screen.getByLabelText("testLabel")).toBeChecked();
  });

  it("should on value check event", () => {
    const mockCheck = jest.fn();
    render(
      <CheckBox
        label="testLabel"
        value="testValue"
        onCheckedChange={mockCheck}
      />
    );
    fireEvent.click(screen.getByLabelText("testLabel"));
    expect(screen.getByLabelText("testLabel")).toBeChecked();
    expect(mockCheck).toHaveBeenCalled();

    fireEvent.click(screen.getByLabelText("testLabel"));
    expect(screen.getByLabelText("testLabel")).not.toBeChecked();
    expect(mockCheck).toHaveBeenCalledTimes(2);
  });
});
