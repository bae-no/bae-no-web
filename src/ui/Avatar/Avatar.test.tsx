import { render, RenderResult } from "@testing-library/react";

import Avatar from "./Avatar";

const FALLBACK_TEXT = "AB";
const IMAGE_ALT_TEXT = "Fake Avatar";
const DELAY = 300;

describe("UI Avatar Component", () => {
  let rendered: RenderResult;
  let image: HTMLElement | null = null;
  const orignalGlobalImage = window.Image;

  beforeAll(() => {
    (window.Image as any) = class MockImage {
      onload: () => void = () => {};

      src: string = "";

      constructor() {
        setTimeout(() => {
          this.onload();
        }, DELAY);
        return this;
      }
    };
  });

  afterAll(() => {
    window.Image = orignalGlobalImage;
  });

  beforeEach(() => {
    rendered = render(
      <Avatar
        alt={IMAGE_ALT_TEXT}
        size="56"
        src="/test.jpg"
        text={FALLBACK_TEXT}
      />,
    );
  });

  it("should render the fallback initially", () => {
    const fallback = rendered.queryByText(FALLBACK_TEXT[0]);
    expect(fallback).toBeInTheDocument();
  });

  it("should not render the image initially", () => {
    image = rendered.queryByRole("img");
    expect(image).not.toBeInTheDocument();
  });

  it("should render the image after it has loaded", async () => {
    const fallBackText = rendered.getByText(FALLBACK_TEXT[0]);
    image = await rendered.findByRole("img");

    expect(fallBackText).not.toBeInTheDocument();
    expect(image).toBeInTheDocument();
  });

  it("should have alt text on the image", async () => {
    image = await rendered.findByAltText(IMAGE_ALT_TEXT);
    expect(image).toBeInTheDocument();
  });

  it("should render the fallback text", () => {
    const { getByText } = render(<Avatar size="56" text="QWERTY" />);
    expect(getByText("Q"));
  });
});
