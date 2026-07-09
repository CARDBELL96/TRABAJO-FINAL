import apiClient from './api';

const login = async (email, password) => {
  try {
    const response = await apiClient.post('/auth/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error('Error en el login:', error.response?.data || error.message);
    throw error.response?.data || new Error('Error en el servidor');
  }
};

const logout = () => {
  localStorage.removeItem('token');
};

export { login, logout };