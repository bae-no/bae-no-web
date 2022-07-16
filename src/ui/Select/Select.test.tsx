import { useState } from "react";

import { fireEvent, render, RenderResult } from "@testing-library/react";

import { SelectBottomDrawer } from "../BottomDrawer";

import Select from "./Select";

const MockComp = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  return (
    <SelectBottomDrawer
      open={open}
      options={[
        { label: "test1", value: "testvalue1" },
        { label: "test2", value: "testvalue2" },
      ]}
      trigger={<Select placeholder="trigger" />}
      value={value}
      onOpenChange={(o) => setOpen(o)}
      onValueChange={(v) => setValue(v)}
    />
  );
};

describe("UI Select Component", () => {
  let rendered: RenderResult;
  let trigger: HTMLElement;

  beforeEach(() => {
    rendered = render(<MockComp />);
    trigger = rendered.getByText("trigger");
    fireEvent.click(trigger);
  });
  it("should render trigger", () => {
    expect(trigger).toBeInTheDocument();
  });

  it("should render clicked value", () => {
    fireEvent.click(rendered.getByText("test1"));
    expect(rendered.getByText("testvalue1")).toBeInTheDocument();
  });
});
