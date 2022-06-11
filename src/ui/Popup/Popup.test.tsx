import { render, screen } from "@testing-library/react";
import Popup from "./Popup";

describe("UI Popup Component", () => {
  it("match snapshot", () => {
    const { container } = render(
      <Popup
        cancelText="tesaaaa"
        confirmText="test"
        description="fdsa"
        buttonDirection="column"
        title="fas"
      >
        <div>test</div>
      </Popup>
    );
    expect(container).toMatchSnapshot();
  });

  it("render text", () => {
    render(
      <Popup
        cancelText="tesaaaa"
        confirmText="test"
        description="fdsa"
        buttonDirection="column"
        title="fas"
      >
        <div>tet</div>
      </Popup>
    );

    expect(screen.getByText("tet")).toBeInTheDocument();
  });
});
