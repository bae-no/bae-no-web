import { fireEvent, render, screen } from "@testing-library/react";

import Button from "./Button";

describe("UI Button Component", () => {
  it("should render text", () => {
    render(<Button href="/">test text</Button>);
    expect(screen.getByText("test text")).toBeInTheDocument();
  });

  it("should trigger click event", () => {
    const mockClick = jest.fn();
    render(<Button onClick={mockClick}>test text</Button>);
    fireEvent.click(screen.getByRole("button"));

    expect(mockClick).toHaveBeenCalled();
  });

  it("should render link", () => {
    render(<Button href="/">test text</Button>);

    expect(screen.getByRole("link")).toBeInTheDocument();
  });

  it("should not trigger click event on disabled", () => {
    const mockClick = jest.fn();
    render(
      <Button disabled onClick={mockClick}>
        test text
      </Button>
    );
    fireEvent.click(screen.getByText("test text"));

    expect(mockClick).not.toHaveBeenCalled();
  });
});
