import { useState } from "react";

import { fireEvent, render, RenderResult } from "@testing-library/react";

import Select from "./Select";

const MockComp = () => {
  const [value, setValue] = useState("");
  return (
    <Select
      options={[
        { label: "test1", value: "testvalue1" },
        { label: "test2", value: "testvalue2" },
      ]}
      placeholder="trigger"
      value={value}
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
    expect(rendered.getAllByText("test1").length).toEqual(2);
    expect(rendered.getAllByText("test2").length).toEqual(1);
  });
});
