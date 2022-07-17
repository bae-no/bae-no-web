import { useState } from "react";

import { fireEvent, render, RenderResult } from "@testing-library/react";

import SelectBottomDrawer from "./SelectBottomDrawer";

const TITLE = "Test Title";

const MockComp = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  return (
    <>
      <SelectBottomDrawer
        open={open}
        options={[
          { label: "test1", value: "testValue1" },
          { label: "test2", value: "testValue2" },
        ]}
        title={TITLE}
        trigger={<div>trigger</div>}
        onOpenChange={(_open) => setOpen(_open)}
        onValueChange={(_value) => setValue(_value)}
      />
      <div>{value}</div>
    </>
  );
};

describe("UI SelectBottomDrawer Component", () => {
  let rendered: RenderResult;
  let trigger: HTMLElement;

  beforeEach(() => {
    rendered = render(<MockComp />);
    trigger = rendered.getByText("trigger");
  });

  it("should render trigger", () => {
    expect(trigger).toBeInTheDocument();
  });

  it("should open when trigger clicked", () => {
    fireEvent.click(trigger);
    expect(rendered.getByText(TITLE)).toBeInTheDocument();
  });

  it("should set proper value when item clicked", () => {
    fireEvent.click(trigger);
    fireEvent.click(rendered.getByText("test1"));
    expect(rendered.getByText("testValue1")).toBeInTheDocument();
  });
});
