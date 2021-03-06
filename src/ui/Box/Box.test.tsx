import { fireEvent, render, screen } from "@testing-library/react";

import Box from "./Box";

describe("UI Box Component", () => {
  it("render text", () => {
    render(<Box>test text</Box>);
    expect(screen.getByText("test text")).toBeInTheDocument();
  });

  it("triggered click event", () => {
    const mockClick = jest.fn();
    render(<Box onClick={mockClick}>test text</Box>);
    fireEvent.click(screen.getByText("test text"));

    expect(mockClick).toHaveBeenCalled();
  });
});
