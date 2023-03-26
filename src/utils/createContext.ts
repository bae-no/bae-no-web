import React from "react";

export function createContext<T>(contextName: string, defaultValue?: T) {
  const context = React.createContext(defaultValue);
  function useContext() {
    const ctx = React.useContext(context);
    if (ctx === undefined) {
      throw new Error(
        `useContext must be inside a ${contextName} with a value`,
      );
    }
    return ctx;
  }
  return [useContext, context.Provider] as const; // make TypeScript infer a tuple, not an array of union types
}
