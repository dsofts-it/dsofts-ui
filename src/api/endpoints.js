import api from './axios';

// Public Endpoints
export const publicApi = {
  getHealth: () => api.get('/'),
  getProjects: (params) => api.get('/projects', { params }), // params: { featured, limit }
  getProjectBySlug: (slug) => api.get(`/projects/${slug}`),
  getServices: () => api.get('/services'),
  sendContactMessage: (data) => api.post('/contact', data),
};

// Client Endpoints
export const clientApi = {
  createProject: (data) => api.post('/client-projects', data),
  getMyProjects: () => api.get('/client-projects'),
  getProjectById: (id) => api.get(`/client-projects/${id}`),
};

// Admin Endpoints
export const adminApi = {
  // Portfolio Projects
  createProject: (data) => api.post('/admin/projects', data),
  updateProject: (id, data) => api.put(`/admin/projects/${id}`, data),
  deleteProject: (id) => api.delete(`/admin/projects/${id}`),

  // Client Projects (Admin View)
  getClientProjects: (params) => api.get('/admin/client-projects', { params }), // params: { status }
  getClientProjectById: (id) => api.get(`/admin/client-projects/${id}`),
  updateClientProject: (id, data) =>
    api.put(`/admin/client-projects/${id}`, data),

  // Services
  createService: (data) => api.post('/services', data),
  updateService: (id, data) => api.put(`/services/${id}`, data),
  deleteService: (id) => api.delete(`/services/${id}`),

  // Contact Messages
  getMessages: () => api.get('/contact'),
  getMessageById: (id) => api.get(`/contact/${id}`),
  deleteMessage: (id) => api.delete(`/contact/${id}`),

  // Uploads
  uploadImage: (formData) =>
    api.post('/upload/image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  deleteImage: (publicId) =>
    api.delete('/upload/image', { data: { publicId } }),
};
