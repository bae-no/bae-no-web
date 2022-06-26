import { SVGAttributes, useState } from "react";

import { fireEvent, render, screen } from "@testing-library/react";

import CheckBox from "./CheckBox";

interface MockComponentProps {
  label: string;
}

const MockComponent = ({ label }: MockComponentProps) => {
  const [checked, setChecked] = useState(false);
  const handleCheck = (e: boolean) => {
    setChecked(e);
  };
  return (
    <CheckBox checked={checked} label={label} onCheckedChange={handleCheck} />
  );
};

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
    render(<CheckBox label="testLabel" />);
    expect(screen.getByLabelText("testLabel")).toBeInTheDocument();
  });

  it("should default checked true", () => {
    render(<CheckBox defaultChecked label="testLabel" />);
    expect(screen.getByLabelText("testLabel")).toBeChecked();
  });

  it("should on value check event(controlled component)", () => {
    render(<MockComponent label="testLabel" />);

    fireEvent.click(screen.getByLabelText("testLabel"));
    expect(screen.getByLabelText("testLabel")).toBeChecked();

    fireEvent.click(screen.getByLabelText("testLabel"));
    expect(screen.getByLabelText("testLabel")).not.toBeChecked();
  });
  it("should on value check event(uncontrolled component)", () => {
    render(<CheckBox label="testLabel" />);

    fireEvent.click(screen.getByLabelText("testLabel"));
    expect(screen.getByLabelText("testLabel")).toBeChecked();

    fireEvent.click(screen.getByLabelText("testLabel"));
    expect(screen.getByLabelText("testLabel")).not.toBeChecked();
  });
});
