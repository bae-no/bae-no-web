import { renderHook } from "@testing-library/react";

import { useDebouncedCallback } from ".";

// eslint-disable-next-line no-promise-executor-return
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe("useDebouncedCallback", () => {
  it("should handle debounce", async () => {
    const mock = jest.fn();
    const { result } = renderHook(() => useDebouncedCallback(mock, 100));
    result.current();
    expect(mock).not.toBeCalled();
    await sleep(50);
    expect(mock).not.toBeCalled();
    await sleep(50);
    expect(mock).toBeCalled();
  });

  it("should not call callback when triggered again", async () => {
    const mock = jest.fn();
    const { result } = renderHook(() => useDebouncedCallback(mock, 100));

    result.current();
    expect(mock).not.toBeCalled();

    await sleep(50);
    expect(mock).not.toBeCalled();

    result.current();
    await sleep(50);
    expect(mock).not.toBeCalled();

    await sleep(50);
    expect(mock).toBeCalled();
  });
});
