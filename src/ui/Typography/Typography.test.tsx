import { render, screen } from "@testing-library/react";

import Typography from "./Typography";

describe("UI Typography Component", () => {
  it("render text", () => {
    render(<Typography>test text</Typography>);

    expect(screen.getByText("test text")).toBeInTheDocument();
  });
});
