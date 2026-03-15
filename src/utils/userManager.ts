// utils/userManager.ts
export interface User {
  [key: string]: unknown;
}

export const userManager = {
  saveUser: (user: User): void => {
    try {
      localStorage.setItem("user", JSON.stringify(user));
    } catch (err) {
      console.error("Failed to save user:", err);
    }
  },
  loadUser: (): User | null => {
    try {
      const data = localStorage.getItem("user");
      return data ? (JSON.parse(data) as User) : null;
    } catch (err) {
      console.error("Failed to load user:", err);
      return null;
    }
  },
  removeUser: (): void => {
    try {
      localStorage.removeItem("user");
    } catch (err) {
      console.error("Failed to remove user:", err);
    }
  },
};
