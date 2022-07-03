import { fireEvent, render, RenderResult } from "@testing-library/react";

import BottomDrawer from "./BottomDrawer";

const TEXT = "Test Title";

describe("UI BottomDrawer Component", () => {
  let rendered: RenderResult;
  let trigger: HTMLElement;

  beforeEach(() => {
    rendered = render(
      <BottomDrawer trigger={<div>trigger</div>}>
        <div>{TEXT}</div>
      </BottomDrawer>
    );
    trigger = rendered.getByText("trigger");
  });

  it("should render trigger", () => {
    expect(trigger).toBeInTheDocument();
  });

  it("should open when trigger clicked", () => {
    fireEvent.click(trigger);
    expect(rendered.getByText(TEXT)).toBeInTheDocument();
  });
});
