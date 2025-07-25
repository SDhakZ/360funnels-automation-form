// utils/tokenManager.js
export const tokenManager = {
  saveTokens: ({ token }) => {
    try {
      if (token) localStorage.setItem("token", token);
    } catch (err) {
      console.error("Failed to save tokens:", err);
    }
  },
  loadTokens: () => {
    try {
      return {
        token: localStorage.getItem("token"),
      };
    } catch (err) {
      console.error("Failed to load tokens:", err);
      return {};
    }
  },
  removeTokens: () => {
    try {
      localStorage.removeItem("token");
    } catch (err) {
      console.error("Failed to remove tokens:", err);
    }
  },
};
