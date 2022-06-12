import { render, screen } from "@testing-library/react";

import Popup from "./Popup";

describe("UI Popup Component", () => {
  it("match snapshot", () => {
    const { container } = render(
      <Popup
        buttonDirection="column"
        cancelText="tesaaaa"
        confirmText="test"
        description="fdsa"
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
        buttonDirection="column"
        cancelText="tesaaaa"
        confirmText="test"
        description="fdsa"
        title="fas"
      >
        <div>tet</div>
      </Popup>
    );

    expect(screen.getByText("tet")).toBeInTheDocument();
  });
});
