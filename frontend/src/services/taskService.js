import apiClient from './api.js';

export const getTasks = async () => {
  const response = await apiClient.get('/tasks');
  return response.data.tasks;
};

export const createTask = async (task) => {
  const response = await apiClient.post('/tasks', task);
  return response.data.task;
};

export const updateTask = async (id, task) => {
  const response = await apiClient.put(`/tasks/${id}`, task);
  return response.data.task;
};

export const deleteTask = async (id) => {
  const response = await apiClient.delete(`/tasks/${id}`);
  return response.data;
};