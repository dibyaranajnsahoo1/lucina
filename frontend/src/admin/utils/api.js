import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({ baseURL: API_BASE, timeout: 30000 });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('lucina_admin_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res.data,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('lucina_admin_token');
      window.location.href = '/login';
    }
    return Promise.reject(new Error(err.response?.data?.message || err.message || 'Error'));
  }
);

// Auth
export const login = (data) => api.post('/auth/login', data);
export const getMe = () => api.get('/auth/me');
export const setupAdmin = (data) => api.post('/auth/setup', data);
export const changePassword = (data) => api.put('/auth/change-password', data);

// Stats
export const getDashboardStats = () => api.get('/forms/stats');

// Donor Applications
export const getDonorApplications = (params) => api.get('/forms/donor-applications', { params });
export const getDonorApplication = (id) => api.get(`/forms/donor-applications/${id}`);
export const downloadDonorApplicationFile = (id, filename) =>
  api.get(`/forms/donor-applications/${id}/files/${filename}`, { responseType: 'blob' });
export const updateDonorApplicationStatus = (id, data) => api.put(`/forms/donor-applications/${id}`, data);
export const deleteDonorApplication = (id) => api.delete(`/forms/donor-applications/${id}`);

// Find Donor Forms
export const getFindDonorForms = (params) => api.get('/forms/find-donor', { params });
export const updateFindDonorStatus = (id, data) => api.put(`/forms/find-donor/${id}`, data);
export const deleteFindDonorForm = (id) => api.delete(`/forms/find-donor/${id}`);

// Contact Forms
export const getContactForms = (params) => api.get('/forms/contact', { params });
export const updateContactStatus = (id, data) => api.put(`/forms/contact/${id}`, data);
export const deleteContactForm = (id) => api.delete(`/forms/contact/${id}`);

// Donors
export const getAllDonors = (params) => api.get('/donors/admin/all', { params });
export const getDonor = (id) => api.get(`/donors/${id}`);
export const createDonor = (data) => api.post('/donors', data, { headers: { 'Content-Type': 'multipart/form-data' } });
export const updateDonor = (id, data) => api.put(`/donors/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
export const deleteDonor = (id) => api.delete(`/donors/${id}`);

// Testimonials
export const getAllTestimonials = () => api.get('/testimonials/admin/all');
export const createTestimonial = (data) => api.post('/testimonials', data);
export const updateTestimonial = (id, data) => api.put(`/testimonials/${id}`, data);
export const deleteTestimonial = (id) => api.delete(`/testimonials/${id}`);

// Blogs
export const getAllBlogs = () => api.get('/blogs/admin/all');
export const createBlog = (data) => api.post('/blogs', data);
export const updateBlog = (id, data) => api.put(`/blogs/${id}`, data);
export const deleteBlog = (id) => api.delete(`/blogs/${id}`);

export default api;
