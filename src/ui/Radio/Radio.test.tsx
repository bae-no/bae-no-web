import { fireEvent, render, screen } from "@testing-library/react";

import Radio from "./Radio";

describe("UI Radio Component", () => {
  it("should render label text", () => {
    render(<Radio radioValue={[{ label: "test" }, { label: "test2" }]} />);
    expect(screen.getByLabelText("test")).toBeInTheDocument();
    expect(screen.getByLabelText("test2")).toBeInTheDocument();
  });

  it("should default value", () => {
    render(
      <Radio
        defaultValue="test3"
        radioValue={[{ label: "test" }, { label: "test2" }, { label: "test3" }]}
      />
    );

    expect(screen.getByLabelText("test3")).toBeChecked();
  });

  it("should on value change event ", () => {
    const mockOnValueChange = jest.fn();
    render(
      <Radio
        radioValue={[{ label: "test" }, { label: "test2" }]}
        onValueChange={mockOnValueChange}
      />
    );
    fireEvent.click(screen.getByLabelText("test"));
    expect(screen.getByLabelText("test")).toBeChecked();
    expect(mockOnValueChange).toHaveBeenCalled();

    fireEvent.click(screen.getByLabelText("test2"));
    expect(screen.getByLabelText("test2")).toBeChecked();
    expect(mockOnValueChange).toHaveBeenCalledTimes(2);
  });
});
