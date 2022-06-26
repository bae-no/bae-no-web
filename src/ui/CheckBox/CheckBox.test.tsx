import { SVGAttributes, useState } from "react";

import { fireEvent, render, screen } from "@testing-library/react";

import CheckBox from "./CheckBox";

interface MockComponentProps {
  label: string;
  name: string;
  value: string;
}

const MockComponent = ({ name, label, value }: MockComponentProps) => {
  const [checked, setChecked] = useState(false);
  const handleCheck = (e: boolean) => {
    setChecked(e);
  };
  return (
    <CheckBox
      checked={checked}
      label={label}
      name={name}
      value={value}
      onCheckedChange={handleCheck}
    />
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
    render(
      <CheckBox
        checked={false}
        label="testLabel"
        name="testName"
        value="testValue"
        onCheckedChange={() => {}}
      />
    );
    expect(screen.getByLabelText("testLabel")).toBeInTheDocument();
  });

  it("should default checked true", () => {
    render(
      <CheckBox
        checked
        label="testLabel"
        name="testName"
        value="testValue"
        onCheckedChange={() => {}}
      />
    );
    expect(screen.getByLabelText("testLabel")).toBeChecked();
  });

  it("should on value check event", () => {
    render(
      <MockComponent label="testLabel" name="testName" value="testValue" />
    );

    fireEvent.click(screen.getByLabelText("testLabel"));
    expect(screen.getByLabelText("testLabel")).toBeChecked();

    fireEvent.click(screen.getByLabelText("testLabel"));
    expect(screen.getByLabelText("testLabel")).not.toBeChecked();
  });
});
