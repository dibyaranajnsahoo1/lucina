import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './components/Layout';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const BecomeEggDonor = lazy(() => import('./pages/BecomeEggDonor'));
const FindEggDonor = lazy(() => import('./pages/FindEggDonor'));
const WhyLucina = lazy(() => import('./pages/WhyLucina'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const FinancialResources = lazy(() => import('./pages/FinancialResources'));
const ContactUs = lazy(() => import('./pages/ContactUs'));

const AdminApp = lazy(() => import('./admin/AdminApp'));

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="spinner"></div>
  </div>
);

function App() {
  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/admin/*" element={<AdminApp />} />
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/become-an-egg-donor" element={<BecomeEggDonor />} />
            <Route path="/find-an-egg-donor" element={<FindEggDonor />} />
            <Route path="/why-choose-lucina" element={<WhyLucina />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/financial-resources" element={<FinancialResources />} />
            <Route path="/contact-us" element={<ContactUs />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
