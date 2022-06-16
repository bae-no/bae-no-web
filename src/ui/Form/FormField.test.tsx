import { render, screen } from "@testing-library/react";

import { Input } from "../Input";

import FormField from "./FormField";

describe("UI FormField Component", () => {
  it("should render validMessage", () => {
    const mockFn = jest.fn();
    render(
      <FormField
        invalidMessage="invalid test"
        state="valid"
        validMessage="valid test"
      >
        <Input value="" onChange={mockFn} onClearClick={mockFn} />
      </FormField>
    );

    expect(screen.getByText("valid test")).toBeInTheDocument();
  });

  it("should render invalidMessage", () => {
    const mockFn = jest.fn();
    render(
      <FormField
        invalidMessage="invalid test"
        state="invalid"
        validMessage="valid test"
      >
        <Input value="" onChange={mockFn} onClearClick={mockFn} />
      </FormField>
    );

    expect(screen.getByText("invalid test")).toBeInTheDocument();
  });

  it("should render label", () => {
    const mockFn = jest.fn();
    render(
      <FormField label="test">
        <Input value="" onChange={mockFn} onClearClick={mockFn} />
      </FormField>
    );

    expect(screen.getByLabelText("test")).toBeInTheDocument();
  });
});
