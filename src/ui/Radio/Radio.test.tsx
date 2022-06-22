import { fireEvent, render, screen } from "@testing-library/react";

import Radio from "./Radio";

describe("UI Radio Component", () => {
  it("should render label text", () => {
    render(<Radio radioValue={["test", "test2"]} />);
    expect(screen.getByLabelText("test")).toBeInTheDocument();
    expect(screen.getByLabelText("test2")).toBeInTheDocument();
  });

  it("should default value", () => {
    render(
      <Radio defaultValue="test3" radioValue={["test", "test2", "test3"]} />
    );

    expect(screen.getByLabelText("test3")).toBeChecked();
  });

  it("should on value change event ", () => {
    const mockOnValueChange = jest.fn();
    render(
      <Radio radioValue={["test", "test2"]} onValueChange={mockOnValueChange} />
    );
    fireEvent.click(screen.getByLabelText("test"));

    expect(screen.getByLabelText("test")).toBeInTheDocument();
    expect(screen.getByLabelText("test2")).toBeInTheDocument();
    expect(mockOnValueChange).toHaveBeenCalled();
  });

  it("should handle disabled state", () => {
    const mockOnValueChange = jest.fn();
    render(
      <Radio disabled radioValue={["test"]} onValueChange={mockOnValueChange} />
    );
    fireEvent.click(screen.getByLabelText("test"));

    expect(mockOnValueChange).not.toHaveBeenCalled();
  });
});
