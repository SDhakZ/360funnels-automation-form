// utils/tokenManager.ts
interface Tokens {
  token?: string | null;
}

export const tokenManager = {
  saveTokens: ({ token }: Tokens): void => {
    try {
      if (token) localStorage.setItem("token", token);
    } catch (err) {
      console.error("Failed to save tokens:", err);
    }
  },
  loadTokens: (): Tokens => {
    try {
      return {
        token: localStorage.getItem("token"),
      };
    } catch (err) {
      console.error("Failed to load tokens:", err);
      return {};
    }
  },
  removeTokens: (): void => {
    try {
      localStorage.removeItem("token");
    } catch (err) {
      console.error("Failed to remove tokens:", err);
    }
  },
};
