export const localStorageHelper = <T>(key: string) => ({
  get: (): T => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  },
  set: (data: T) => {
    localStorage.setItem(key, JSON.stringify(data));
  },
});
