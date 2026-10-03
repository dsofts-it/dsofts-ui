import api from './axios';

// Public Endpoints
export const publicApi = {
  getHealth: () => api.get('/'),
  getProjects: (params) => api.get('/projects', { params }),
  getProjectBySlug: (slug) => api.get(`/projects/${slug}`),
  getServices: () => api.get('/services'),
  sendContactMessage: (data) => api.post('/contact', data),

  // Jobs & Applications
  getJobs: () => api.get('/jobs'),
  getJobBySlug: (slug) => api.get(`/jobs/${slug}`),
  submitJobApplication: (formData) => api.post('/job-applications/apply', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),

  // Case Studies
  getCaseStudies: () => api.get('/case-studies'),
  getCaseStudyBySlug: (slug) => api.get(`/case-studies/${slug}`),

  // Blog
  getBlogPosts: () => api.get('/blog'),
  getBlogPostBySlug: (slug) => api.get(`/blog/${slug}`),

  // Testimonials & Settings
  getTestimonials: () => api.get('/testimonials'),
  getCompanySettings: () => api.get('/company-settings')
};

// Client Endpoints
export const clientApi = {
  createProject: (data) => api.post('/client-projects', data),
  getMyProjects: () => api.get('/client-projects'),
  getProjectById: (id) => api.get(`/client-projects/${id}`)
};

// Admin Endpoints
export const adminApi = {
  // Portfolio Projects
  getProjects: () => api.get('/projects'),
  createProject: (data) => api.post('/admin/projects', data),
  updateProject: (id, data) => api.put(`/admin/projects/${id}`, data),
  deleteProject: (id) => api.delete(`/admin/projects/${id}`),

  // Client Projects (Admin View)
  getClientProjects: (params) => api.get('/admin/client-projects', { params }),
  getClientProjectById: (id) => api.get(`/admin/client-projects/${id}`),
  updateClientProject: (id, data) => api.put(`/admin/client-projects/${id}`, data),

  // Services
  getServices: () => api.get('/services'),
  createService: (data) => api.post('/services', data),
  updateService: (id, data) => api.put(`/services/${id}`, data),
  deleteService: (id) => api.delete(`/services/${id}`),

  // Jobs CRUD
  getAllJobs: () => api.get('/jobs/admin/all'),
  createJob: (data) => api.post('/jobs/admin', data),
  updateJob: (id, data) => api.put(`/jobs/admin/${id}`, data),
  deleteJob: (id) => api.delete(`/jobs/admin/${id}`),

  // Job Applications
  getApplications: (params) => api.get('/job-applications/admin', { params }),
  getApplicationById: (id) => api.get(`/job-applications/admin/${id}`),
  updateApplicationStatus: (id, data) => api.put(`/job-applications/admin/${id}`, data),
  downloadResume: (id) => api.get(`/job-applications/admin/${id}/resume`, { responseType: 'blob' }),
  deleteApplication: (id) => api.delete(`/job-applications/admin/${id}`),

  // Case Studies CRUD
  createCaseStudy: (data) => api.post('/case-studies/admin', data),
  updateCaseStudy: (id, data) => api.put(`/case-studies/admin/${id}`, data),
  deleteCaseStudy: (id) => api.delete(`/case-studies/admin/${id}`),

  // Blog CRUD
  getAllBlogPosts: () => api.get('/blog/admin/all'),
  createBlogPost: (data) => api.post('/blog/admin', data),
  updateBlogPost: (id, data) => api.put(`/blog/admin/${id}`, data),
  deleteBlogPost: (id) => api.delete(`/blog/admin/${id}`),

  // Testimonials CRUD
  getAllTestimonials: () => api.get('/testimonials/admin/all'),
  createTestimonial: (data) => api.post('/testimonials/admin', data),
  updateTestimonial: (id, data) => api.put(`/testimonials/admin/${id}`, data),
  deleteTestimonial: (id) => api.delete(`/testimonials/admin/${id}`),

  // Company Settings
  updateCompanySettings: (data) => api.put('/company-settings/admin', data),

  // Messages
  getMessages: () => api.get('/contact'),
  getMessageById: (id) => api.get(`/contact/${id}`),
  deleteMessage: (id) => api.delete(`/contact/${id}`),

  // Uploads
  uploadImage: (formData) => api.post('/upload/image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  deleteImage: (publicId) => api.delete('/upload/image', { data: { publicId } })
};
