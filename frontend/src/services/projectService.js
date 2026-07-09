import apiClient from './api';

export const getProjects = async () => {
  const response = await apiClient.get('/projects');
  return response.data.projects;
};

export const createProject = async (project) => {
  const response = await apiClient.post('/projects', project);
  return response.data.proyecto;
};

export const updateProject = async (id, project) => {
  const response = await apiClient.put(`/projects/${id}`, project);
  return response.data.project;
};

export const deleteProject = async (id) => {
  const response = await apiClient.delete(`/projects/${id}`);
  return response.data;
};