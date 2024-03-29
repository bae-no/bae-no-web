import { SVGAttributes } from "react";

import { render, screen } from "@testing-library/react";

import { theme } from "../tokens";

import Icon from "./Icon";

jest.mock("next/dynamic", () => () => {
  const DynamicComponent = (props: SVGAttributes<SVGElement>) => (
    <svg {...props} />
  );
  DynamicComponent.displayName = "LoadableComponent";
  DynamicComponent.preload = jest.fn();
  return DynamicComponent;
});

describe("UI Icon Component", () => {
  it("could have aria-label", () => {
    render(<Icon aria-label="test" name="close" />);
    expect(screen.getByLabelText("test")).toBeInTheDocument();
  });

  it("could have color", () => {
    const { container } = render(<Icon color="black1" name="close" />);
    expect(container).toHaveStyle({ color: theme.colors.black1 });
  });

  it("could have size", () => {
    const { container } = render(<Icon name="close" size="48" />);
    expect(container).toHaveStyle({
      height: theme.space["48"],
      width: theme.space["48"],
    });
  });
});
