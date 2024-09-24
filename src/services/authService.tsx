import api from "./api";

// Login function
export const login = async (email: string, password: string) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    const { token } = response.data;
    localStorage.setItem("token", token);
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

// Logout function
export const logout = () => {
  localStorage.removeItem("token");
};

// Register function
export const register = async (email: string, password: string) => {
  try {
    const response = await api.post("/auth/register", { email, password });
    return response.data;
  } catch (error) {
    console.error("Error registering:", error);
    throw error;
  }
};

// Check if user is authenticated
export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return !!token;
};
