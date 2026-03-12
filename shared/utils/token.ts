const KEY = 'accessToken';

const isBrowser = typeof window !== 'undefined';

export const tokenStorage = {
  get: () => (isBrowser ? localStorage.getItem(KEY) : null),
  set: (token: string) => isBrowser && localStorage.setItem(KEY, token),
  remove: () => isBrowser && localStorage.removeItem(KEY),
  parse: <T = Record<string, unknown>>(): T | null => {
    if (!isBrowser) return null;
    const token = localStorage.getItem(KEY);
    if (!token) return null;
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload)) as T;
    } catch {
      return null;
    }
  },
};
