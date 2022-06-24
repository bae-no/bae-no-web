import { fireEvent, render, screen } from "@testing-library/react";
import { theme } from "../tokens";

import Label from "./Label";

describe("UI Button Component", () => {
  it("should render text", () => {
    render(<Label>test</Label>);
    expect(screen.getByText("test")).toBeInTheDocument();
  });

  it("should render color", () => {
    render(<Label color="skyblue">test</Label>);

    expect(screen.getByText("test")).toHaveStyle(
      `background-color:${theme.colors.skyBlue1}`
    );
  });
});
