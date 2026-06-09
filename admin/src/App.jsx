import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider, useAuth } from './context/AuthContext';
import AdminLayout from './components/AdminLayout';

const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const DonorApplications = lazy(() => import('./pages/DonorApplications'));
const FindDonorLeads = lazy(() => import('./pages/FindDonorLeads'));
const ContactLeads = lazy(() => import('./pages/ContactLeads'));
const Donors = lazy(() => import('./pages/Donors'));
const Testimonials = lazy(() => import('./pages/Testimonials'));
const Blogs = lazy(() => import('./pages/Blogs'));

const Spinner = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
    <div className="spinner" />
  </div>
);

const ProtectedRoute = ({ children }) => {
  const { admin, loading } = useAuth();
  if (loading) return <Spinner />;
  if (!admin) return <Navigate to="/login" replace />;
  return children;
};

const AppRoutes = () => {
  const { admin } = useAuth();
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/login" element={admin ? <Navigate to="/" replace /> : <Login />} />
        <Route path="/" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="donor-applications" element={<DonorApplications />} />
          <Route path="find-donor-leads" element={<FindDonorLeads />} />
          <Route path="contact-leads" element={<ContactLeads />} />
          <Route path="donors" element={<Donors />} />
          <Route path="testimonials" element={<Testimonials />} />
          <Route path="blogs" element={<Blogs />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <ToastContainer position="top-right" autoClose={4000} theme="colored" />
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
