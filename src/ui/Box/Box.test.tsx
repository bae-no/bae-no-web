import { render, screen } from "@testing-library/react";
import Box from "./Box";

describe("UI Box Component", () => {
  it("match snapshot", () => {
    const { container } = render(<Box flexDirection="row" p="small" />);

    expect(container).toMatchSnapshot();
  });

  it("render text", () => {
    render(<Box>test text</Box>);

    expect(screen.getByText("test text")).toBeInTheDocument();
  });
});
