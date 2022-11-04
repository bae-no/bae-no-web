/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from "react";

import { fireEvent, render } from "@testing-library/react";

import { ConditionalRender } from "./index";
import "@testing-library/jest-dom";

const BooleanCase = () => {
  const [value, setValue] = useState(false);
  return (
    <ConditionalRender
      condition={value}
      renderCase={{
        false: <div onClick={() => setValue(true)}>False</div>,
        true: <div onClick={() => setValue(false)}>True</div>,
      }}
    />
  );
};

const StringCase = () => {
  const [value, setValue] = useState<"a" | "b" | "c">("a");
  return (
    <ConditionalRender
      condition={value}
      renderCase={{
        a: <div onClick={() => setValue("b")}>A</div>,
        b: <div onClick={() => setValue("c")}>B</div>,
        c: <div onClick={() => setValue("a")}>C</div>,
      }}
    />
  );
};

const NullableStringCase = () => {
  const [value, setValue] = useState<"a" | "b" | null>("a");
  return (
    <ConditionalRender
      condition={value}
      renderCase={{
        a: <div onClick={() => setValue("b")}>A</div>,
        b: <div onClick={() => setValue(null)}>B</div>,
        null: <div onClick={() => setValue("a")}>Null</div>,
      }}
    />
  );
};

const UndefinedCase = () => {
  const [value, setValue] = useState<"a" | "b" | undefined>();
  return (
    <ConditionalRender
      condition={value}
      renderCase={{
        a: <div onClick={() => setValue("b")}>A</div>,
        b: <div onClick={() => setValue(undefined)}>B</div>,
        undefined: <div onClick={() => setValue("a")}>Undefined</div>,
      }}
    />
  );
};

describe("ConditionalRender", () => {
  it("should handle boolean case", () => {
    const { getByText } = render(<BooleanCase />);
    expect(getByText("False")).toBeInTheDocument();
    fireEvent.click(getByText("False"));

    expect(getByText("True")).toBeInTheDocument();
    fireEvent.click(getByText("True"));

    expect(getByText("False")).toBeInTheDocument();
  });

  it("should handle string case", () => {
    const { getByText } = render(<StringCase />);
    expect(getByText("A")).toBeInTheDocument();
    fireEvent.click(getByText("A"));

    expect(getByText("B")).toBeInTheDocument();
    fireEvent.click(getByText("B"));

    expect(getByText("C")).toBeInTheDocument();
    fireEvent.click(getByText("C"));

    expect(getByText("A")).toBeInTheDocument();
  });

  it("should handle nullable string case", () => {
    const { getByText } = render(<NullableStringCase />);
    expect(getByText("A")).toBeInTheDocument();
    fireEvent.click(getByText("A"));

    expect(getByText("B")).toBeInTheDocument();
    fireEvent.click(getByText("B"));

    expect(getByText("Null")).toBeInTheDocument();
    fireEvent.click(getByText("Null"));

    expect(getByText("A")).toBeInTheDocument();
  });

  it("should handle nullable string case", () => {
    const { getByText } = render(<UndefinedCase />);

    expect(getByText("Undefined")).toBeInTheDocument();
    fireEvent.click(getByText("Undefined"));

    expect(getByText("A")).toBeInTheDocument();
    fireEvent.click(getByText("A"));

    expect(getByText("B")).toBeInTheDocument();
    fireEvent.click(getByText("B"));

    expect(getByText("Undefined")).toBeInTheDocument();
  });
});
