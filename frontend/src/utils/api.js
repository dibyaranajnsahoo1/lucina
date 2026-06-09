import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 30000,
});

// Request interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('lucina_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || error.message || 'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

// Forms
export const submitDonorApplication = (formData) =>
  api.post('/forms/donor-application', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });

export const submitFindDonorForm = (data) => api.post('/forms/find-donor', data);
export const submitContactForm = (data) => api.post('/forms/contact', data);

// Donors
export const getDonors = (params) => api.get('/donors', { params });
export const getDonor = (id) => api.get(`/donors/${id}`);

// Testimonials
export const getTestimonials = (params) => api.get('/testimonials', { params });

// Blogs
export const getBlogs = (params) => api.get('/blogs', { params });
export const getBlog = (slug) => api.get(`/blogs/${slug}`);

export default api;
