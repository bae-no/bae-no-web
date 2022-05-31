import { render, screen } from "@testing-library/react";
import { SVGAttributes } from "react";
import { theme } from "../tokens";
import Icon from "./Icon";

jest.mock("next/dynamic", () => () => {
  function DynamicComponent(props: SVGAttributes<SVGElement>) {
    return <svg {...props} />;
  }
  DynamicComponent.displayName = "LoadableComponent";
  DynamicComponent.preload = jest.fn();
  return DynamicComponent;
});

describe("UI Icon Component", () => {
  it("match snapshot", () => {
    const { container } = render(<Icon name="close" data-testid="test" />);

    expect(container).toMatchSnapshot();
  });

  it("could have aria-label", () => {
    render(<Icon aria-label="test" name="close" />);
    expect(screen.getByLabelText("test")).toBeInTheDocument();
  });

  it("could have color", () => {
    const { container } = render(<Icon color="black1" name="close" />);
    expect(container).toHaveStyle({ color: theme.colors.black1 });
  });

  it("could have size", () => {
    const { container } = render(<Icon size="xxl" name="close" />);
    expect(container).toHaveStyle({
      width: theme.size.xxl,
      height: theme.size.xxl,
    });
  });
});
