import { render, screen } from "@testing-library/react";
import Typography from "./Typography";

describe("UI Typography Component", () => {
  it("match snapshot", () => {
    const { container } = render(<Typography fontSize={1} fontWeight="bold" />);

    expect(container).toMatchSnapshot();
  });

  it("render text", () => {
    render(<Typography>test text</Typography>);

    expect(screen.getByText("test text")).toBeInTheDocument();
  });
});
