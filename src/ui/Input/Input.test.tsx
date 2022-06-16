import { useState } from "react";

import { fireEvent, render, screen } from "@testing-library/react";

import Input from "./Input";

const MockComponent = () => {
  const [state, setState] = useState("");

  return (
    <Input
      placeholder="aaaa"
      value={state}
      onChange={({ target: { value } }) => setState(value)}
      onClearClick={() => setState("")}
    />
  );
};

describe("UI Input Component", () => {
  it("should handle change event", () => {
    const { getByPlaceholderText } = render(<MockComponent />);
    fireEvent.change(getByPlaceholderText("aaaa"), {
      target: { value: "test" },
    });
    expect(screen.getByDisplayValue("test")).toBeInTheDocument();
  });
});
