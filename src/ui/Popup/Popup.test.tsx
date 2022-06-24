import { render, screen } from "@testing-library/react";

import Popup from "./Popup";

describe("UI Popup Component", () => {
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
