import apiClient from "./api";

export const login = async (email, password) => {
  const response = await apiClient.post("/auth/login", { email, password });

  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.usuario));
  }

  return response.data;
};

export const register = async (nombre, email, password) => {
  const response = await apiClient.post("/auth/register", {
    nombre,
    email,
    password,
  });

  return response.data;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};