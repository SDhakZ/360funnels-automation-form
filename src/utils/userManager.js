// utils/userManager.js
export const userManager = {
  saveUser: (user) => {
    try {
      localStorage.setItem("user", JSON.stringify(user));
    } catch (err) {
      console.error("Failed to save user:", err);
    }
  },
  loadUser: () => {
    try {
      const data = localStorage.getItem("user");
      return data ? JSON.parse(data) : null;
    } catch (err) {
      console.error("Failed to load user:", err);
      return null;
    }
  },
  removeUser: () => {
    try {
      localStorage.removeItem("user");
    } catch (err) {
      console.error("Failed to remove user:", err);
    }
  },
};
