export function hideErrorLog() {
  const spy = jest.spyOn(console, 'error');
  spy.mockImplementation(() => {});

  return () => spy.mockRestore();
}
