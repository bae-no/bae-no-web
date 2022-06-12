import { useState } from "react";

import { fireEvent, render } from "@testing-library/react";

import Toggle from "./Toggle";

const MockComponent = (props: unknown) => {
  const [checked, setChecked] = useState(false);
  return <Toggle {...props} checked={checked} onCheckedChange={setChecked} />;
}

describe("UI Toggle Component", () => {
  it("match snapshot", () => {
    const { container } = render(<Toggle />);
    expect(container).toMatchSnapshot();
  });

  it("should trigger onCheckedChange", () => {
    const mockClick = jest.fn();
    const { getByTestId } = render(
      <Toggle data-testid="toggle" onCheckedChange={mockClick} />
    );
    const target = getByTestId("toggle");

    fireEvent.click(target);
    expect(mockClick).toHaveBeenCalled();
    fireEvent.click(target);
    expect(mockClick).toHaveBeenCalledTimes(2);
  });

  it("should handle checked state as uncontrolled", () => {
    const { getByTestId } = render(<Toggle data-testid="toggle" />);
    const target = getByTestId("toggle");
    fireEvent.click(target);

    expect(target).toBeChecked();
    fireEvent.click(target);
    expect(target).not.toBeChecked();
  });

  it("should handle checked state as controlled", () => {
    const { getByTestId } = render(<MockComponent data-testid="toggle" />);
    const target = getByTestId("toggle");
    fireEvent.click(target);

    expect(target).toBeChecked();
    fireEvent.click(target);
    expect(target).not.toBeChecked();
  });

  it("should render correct default checked", () => {
    const { getByTestId } = render(
      <Toggle defaultChecked data-testid="toggle" />
    );
    const target = getByTestId("toggle");

    expect(target).toBeChecked();
    fireEvent.click(target);
    expect(target).not.toBeChecked();
  });

  it("should handle disabled state", () => {
    const mockClick = jest.fn();
    const { getByTestId } = render(
      <Toggle disabled data-testid="toggle" onCheckedChange={mockClick} />
    );
    const target = getByTestId("toggle");

    fireEvent.click(target);
    expect(target).toBeDisabled();
    expect(target).not.toBeChecked();
    expect(mockClick).not.toHaveBeenCalled();
  });
});
