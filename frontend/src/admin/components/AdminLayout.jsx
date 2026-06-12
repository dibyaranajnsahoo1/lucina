import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard, Users, FileText, Search, Phone,
  MessageSquare, LogOut, Menu, X, ChevronRight,
  Heart, BookOpen, Bell
} from 'lucide-react';

import '../admin.css';

const NAV_ITEMS = [
  { path: '.', icon: <LayoutDashboard size={18} />, label: 'Dashboard', exact: true },
  { path: 'donor-applications', icon: <FileText size={18} />, label: 'Donor Applications' },
  { path: 'find-donor-leads', icon: <Search size={18} />, label: 'Find Donor Leads' },
  { path: 'contact-leads', icon: <Phone size={18} />, label: 'Contact Leads' },
  { path: 'donors', icon: <Users size={18} />, label: 'Donor Management' },
  { path: 'testimonials', icon: <Heart size={18} />, label: 'Testimonials' },
  { path: 'blogs', icon: <BookOpen size={18} />, label: 'Blog Posts' },
];

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { admin, logoutAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin/login');
  };

  return (
    <div className="admin-app">
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'sidebar--open' : 'sidebar--closed'}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            {sidebarOpen && (
              <div>
                <div className="logo-lucina">Lucina</div>
                <div className="logo-sub">Admin Dashboard</div>
              </div>
            )}
          </div>
          <button className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <nav className="sidebar-nav">
          {NAV_ITEMS.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.exact}
              className={({ isActive }) => `sidebar-link ${isActive ? 'sidebar-link--active' : ''}`}
              title={!sidebarOpen ? item.label : ''}
            >
              <span className="sidebar-link-icon">{item.icon}</span>
              {sidebarOpen && <span className="sidebar-link-label">{item.label}</span>}
              {sidebarOpen && <ChevronRight size={14} className="sidebar-link-arrow" />}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          {sidebarOpen && (
            <div className="sidebar-user">
              <div className="sidebar-avatar">{admin?.username?.charAt(0)?.toUpperCase()}</div>
              <div>
                <div className="sidebar-user-name">{admin?.username}</div>
                <div className="sidebar-user-role">{admin?.role}</div>
              </div>
            </div>
          )}
          <button className="sidebar-logout" onClick={handleLogout} title="Logout">
            <LogOut size={16} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="sidebar-overlay" 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main */}
      <div className="admin-main">
        {/* Topbar */}
        <header className="topbar">
          <div className="topbar-left">
            <button 
              className="mobile-sidebar-toggle" 
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={20} />
            </button>
            <h2 className="topbar-title">Admin Panel</h2>
          </div>
          <div className="topbar-right">
            <div className="topbar-badge">
              <Bell size={18} />
            </div>
            <div className="topbar-user">
              <div className="topbar-avatar">{admin?.username?.charAt(0)?.toUpperCase()}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--dark)' }}>{admin?.username}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{admin?.email}</div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="admin-content">
          <Outlet />
        </div>
      </div>

      <style>{`
        .sidebar {
          width: 260px;
          min-height: 100vh;
          background: linear-gradient(180deg, #1A0830 0%, #2D1353 100%);
          color: white;
          display: flex;
          flex-direction: column;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          flex-shrink: 0;
          position: sticky;
          top: 0;
          height: 100vh;
          overflow-y: auto;
          box-shadow: 4px 0 24px rgba(0,0,0,0.15);
          border-right: 1px solid rgba(255,255,255,0.05);
          z-index: 200;
        }
        .sidebar--closed { width: 80px; }

        .sidebar-header {
          padding: 24px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          min-height: 80px;
        }

        .logo-lucina {
          font-family: var(--font-serif, 'Cormorant Garamond', serif);
          font-size: 26px;
          font-weight: 600;
          color: #F093B4;
          letter-spacing: -0.5px;
          line-height: 1;
        }
        .logo-sub {
          font-size: 10px;
          color: rgba(255,255,255,0.9);
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-top: 4px;
          font-weight: 500;
        }

        .sidebar-toggle {
          color: rgba(255,255,255,0.6);
          padding: 8px;
          border-radius: 8px;
          transition: all 0.2s ease;
          flex-shrink: 0;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.05);
        }
        .sidebar-toggle:hover { 
          background: rgba(255,255,255,0.1); 
          color: white; 
          transform: scale(1.05);
        }

        .sidebar-nav {
          flex: 1;
          padding: 20px 14px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .sidebar-link {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 12px 14px;
          border-radius: 12px;
          color: rgba(255,255,255,0.9);
          font-size: 14px;
          font-weight: 500;
          transition: all 0.25s ease;
          text-decoration: none;
          white-space: nowrap;
          overflow: hidden;
          border: 1px solid transparent;
        }
        .sidebar-link:hover { 
          background: rgba(255,255,255,0.1); 
          color: #ffffff; 
        }
        .sidebar-link--active { 
          background: linear-gradient(90deg, rgba(232,97,154,0.15) 0%, transparent 100%);
          border-left: 3px solid #E8619A;
          color: #ffffff; 
        }
        .sidebar-link--active .sidebar-link-icon { 
          color: #E8619A; 
        }

        .sidebar-link-icon { 
          flex-shrink: 0; 
          transition: color 0.25s ease;
        }
        .sidebar-link-label { 
          flex: 1; 
          overflow: hidden; 
          text-overflow: ellipsis; 
        }
        .sidebar-link-arrow { 
          flex-shrink: 0; 
          opacity: 0; 
          transform: translateX(-5px);
          transition: all 0.25s ease; 
        }
        .sidebar-link:hover .sidebar-link-arrow { 
          opacity: 1; 
          transform: translateX(0);
        }

        .sidebar-footer {
          padding: 20px 16px;
          border-top: 1px solid rgba(255,255,255,0.08);
          display: flex;
          flex-direction: column;
          gap: 16px;
          background: rgba(0,0,0,0.15);
        }

        .sidebar-user {
          display: flex;
          align-items: center;
          gap: 12px;
          overflow: hidden;
          padding: 0 4px;
        }
        .sidebar-avatar {
          width: 40px; height: 40px;
          background: linear-gradient(135deg, #7B3FA0, #E8619A);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-weight: 700; font-size: 16px; color: white;
          flex-shrink: 0;
          box-shadow: 0 4px 10px rgba(232,97,154,0.2);
        }
        .sidebar-user-name { font-size: 14px; font-weight: 600; color: rgba(255,255,255,0.9); }
        .sidebar-user-role { font-size: 12px; color: rgba(255,255,255,0.5); text-transform: capitalize; margin-top: 2px; }

        .sidebar-logout {
          display: flex;
          align-items: center;
          gap: 10px;
          color: rgba(255,255,255,0.9);
          font-size: 14px;
          font-weight: 500;
          padding: 10px 14px;
          border-radius: 10px;
          transition: all 0.2s ease;
          width: 100%;
          border: 1px solid transparent;
        }
        .sidebar-logout:hover { 
          background: rgba(239,68,68,0.1); 
          color: #fca5a5; 
          border-color: rgba(239,68,68,0.2);
        }

        .sidebar-overlay {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(26,8,48,0.6);
          backdrop-filter: blur(4px);
          z-index: 150;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .topbar {
          height: 80px;
          background: rgba(255,255,255,0.9);
          backdrop-filter: blur(8px);
          border-bottom: 1px solid rgba(107,45,139,0.1);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 32px;
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: 0 4px 20px rgba(0,0,0,0.03);
        }
        .topbar-title { font-family: var(--font-serif, 'Cormorant Garamond', serif); font-size: 22px; font-weight: 600; color: #1A0830; }
        .topbar-right { display: flex; align-items: center; gap: 20px; }
        .topbar-badge {
          width: 40px; height: 40px;
          border-radius: 10px;
          background: #F8F0F8;
          border: 1px solid rgba(107,45,139,0.1);
          display: flex; align-items: center; justify-content: center;
          color: #6B2D8B;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .topbar-badge:hover { 
          background: #E8619A; 
          color: white; 
          border-color: #E8619A;
          transform: translateY(-2px);
        }
        .topbar-user { display: flex; align-items: center; gap: 12px; }
        .topbar-avatar {
          width: 40px; height: 40px;
          background: linear-gradient(135deg, #7B3FA0, #E8619A);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-weight: 700; font-size: 16px; color: white;
          box-shadow: 0 4px 10px rgba(232,97,154,0.2);
        }

        .mobile-sidebar-toggle {
          display: none;
          background: none;
          border: none;
          color: #1A0830;
          cursor: pointer;
          padding: 8px;
          border-radius: 8px;
          transition: background 0.2s ease;
        }
        .mobile-sidebar-toggle:hover {
          background: rgba(107,45,139,0.05);
        }

        @media (max-width: 1024px) {
          .mobile-sidebar-toggle { display: block; }
          .sidebar--closed { width: 0; padding: 0; overflow: hidden; border: none; }
          .sidebar { position: fixed; transform: translateX(0); }
          .sidebar--closed { transform: translateX(-100%); }
          .sidebar-overlay { display: block; }
          .topbar { padding: 0 20px; }
          .topbar-left { display: flex; align-items: center; gap: 16px; }
        }
        
        @media (max-width: 768px) {
          .admin-content { padding: 20px; }
        }
      `}</style>
    </div>
    </div>
  );
};

export default AdminLayout;
