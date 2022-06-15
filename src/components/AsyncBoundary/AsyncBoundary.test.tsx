import { waitFor } from "@testing-library/react";
import { useQuery } from "react-query";

import { hideErrorLog, customRender } from "src/utils/testUtils";

import { AsyncBoundary } from ".";

function MockComponent() {
  const { data } = useQuery(["mock"], () => Promise.resolve("mock"), {
    suspense: true,
  });
  return <div>{data}</div>;
}

function MockErrorComponent() {
  useQuery(
    ["mock", "error"],
    () =>
      new Promise((resolve, reject) => {
        reject(new Error("mockError"));
      }),
    {
      retry: false,
      suspense: true,
    }
  );
  return <div>test</div>;
}

function LoadingFallback() {
  return <div>Loading...</div>;
}

function ErrorFallback() {
  return <>error</>;
}

describe("common/components/AsyncBoundary", () => {
  it("should render child", () => {
    const container = customRender(
      <AsyncBoundary
        errorFallback={ErrorFallback}
        loadingFallback={LoadingFallback}
      >
        <div>test</div>
      </AsyncBoundary>
    );

    expect(container.getByText("test")).toBeInTheDocument();
  });

  it("should render LoadingComponent", async () => {
    const container = customRender(
      <AsyncBoundary
        errorFallback={ErrorFallback}
        loadingFallback={LoadingFallback}
      >
        <MockComponent />
      </AsyncBoundary>
    );
    expect(container.getByText("Loading...")).toBeInTheDocument();

    await waitFor(() => {
      expect(container.getByText("mock")).toBeInTheDocument();
    });
  });

  it("should handle error from query", async () => {
    const restoreError = hideErrorLog();

    const container = customRender(
      <AsyncBoundary
        loadingFallback={() => <span>loading</span>}
        errorFallback={({ error }) => <div>{error.message}</div>}
      >
        <MockErrorComponent />
      </AsyncBoundary>
    );
    expect(container.getByText("loading")).toBeInTheDocument();

    await waitFor(() => {
      expect(container.getByText("mockError")).toBeInTheDocument();
    });
    restoreError();
  });
});
