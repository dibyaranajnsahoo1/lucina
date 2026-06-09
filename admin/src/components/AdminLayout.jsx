import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard, Users, FileText, Search, Phone,
  MessageSquare, LogOut, Menu, X, ChevronRight,
  Heart, BookOpen, Bell
} from 'lucide-react';

const NAV_ITEMS = [
  { path: '/', icon: <LayoutDashboard size={18} />, label: 'Dashboard', exact: true },
  { path: '/donor-applications', icon: <FileText size={18} />, label: 'Donor Applications' },
  { path: '/find-donor-leads', icon: <Search size={18} />, label: 'Find Donor Leads' },
  { path: '/contact-leads', icon: <Phone size={18} />, label: 'Contact Leads' },
  { path: '/donors', icon: <Users size={18} />, label: 'Donor Management' },
  { path: '/testimonials', icon: <Heart size={18} />, label: 'Testimonials' },
  { path: '/blogs', icon: <BookOpen size={18} />, label: 'Blog Posts' },
];

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { admin, logoutAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutAdmin();
    navigate('/login');
  };

  return (
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

      {/* Main */}
      <div className="admin-main">
        {/* Topbar */}
        <header className="topbar">
          <div className="topbar-left">
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
          background: var(--sidebar-bg);
          display: flex;
          flex-direction: column;
          transition: width 0.25s ease;
          flex-shrink: 0;
          position: sticky;
          top: 0;
          height: 100vh;
          overflow-y: auto;
        }
        .sidebar--closed { width: 68px; }

        .sidebar-header {
          padding: 20px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          min-height: 72px;
        }

        .logo-lucina {
          font-size: 22px;
          font-weight: 700;
          color: var(--primary-light);
          letter-spacing: -0.5px;
        }
        .logo-sub {
          font-size: 10px;
          color: rgba(255,255,255,0.4);
          text-transform: uppercase;
          letter-spacing: 1.5px;
          margin-top: 1px;
        }

        .sidebar-toggle {
          color: rgba(255,255,255,0.5);
          padding: 6px;
          border-radius: 6px;
          transition: var(--transition);
          flex-shrink: 0;
        }
        .sidebar-toggle:hover { background: rgba(255,255,255,0.1); color: white; }

        .sidebar-nav {
          flex: 1;
          padding: 16px 10px;
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .sidebar-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 12px;
          border-radius: 8px;
          color: rgba(255,255,255,0.6);
          font-size: 14px;
          font-weight: 500;
          transition: var(--transition);
          text-decoration: none;
          white-space: nowrap;
          overflow: hidden;
        }
        .sidebar-link:hover { background: var(--sidebar-hover); color: rgba(255,255,255,0.9); }
        .sidebar-link--active { background: var(--sidebar-active); color: var(--primary-light); }
        .sidebar-link--active .sidebar-link-icon { color: var(--primary-light); }

        .sidebar-link-icon { flex-shrink: 0; }
        .sidebar-link-label { flex: 1; overflow: hidden; text-overflow: ellipsis; }
        .sidebar-link-arrow { flex-shrink: 0; opacity: 0; transition: var(--transition); }
        .sidebar-link:hover .sidebar-link-arrow { opacity: 1; }

        .sidebar-footer {
          padding: 16px 12px;
          border-top: 1px solid rgba(255,255,255,0.08);
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .sidebar-user {
          display: flex;
          align-items: center;
          gap: 10px;
          overflow: hidden;
        }
        .sidebar-avatar {
          width: 36px; height: 36px;
          background: var(--primary);
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          font-weight: 700; font-size: 14px; color: white;
          flex-shrink: 0;
        }
        .sidebar-user-name { font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.8); }
        .sidebar-user-role { font-size: 11px; color: rgba(255,255,255,0.4); text-transform: capitalize; }

        .sidebar-logout {
          display: flex;
          align-items: center;
          gap: 8px;
          color: rgba(255,255,255,0.5);
          font-size: 13px;
          padding: 8px 12px;
          border-radius: 8px;
          transition: var(--transition);
          width: 100%;
        }
        .sidebar-logout:hover { background: rgba(239,68,68,0.15); color: #fca5a5; }

        .topbar {
          height: 72px;
          background: white;
          border-bottom: 1px solid var(--mid-gray);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 32px;
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }
        .topbar-title { font-size: 18px; font-weight: 600; color: var(--dark); }
        .topbar-right { display: flex; align-items: center; gap: 16px; }
        .topbar-badge {
          width: 36px; height: 36px;
          border-radius: 8px;
          background: var(--light);
          border: 1px solid var(--mid-gray);
          display: flex; align-items: center; justify-content: center;
          color: var(--text-muted);
          cursor: pointer;
          transition: var(--transition);
        }
        .topbar-badge:hover { background: var(--primary-pale); color: var(--primary); }
        .topbar-user { display: flex; align-items: center; gap: 10px; }
        .topbar-avatar {
          width: 36px; height: 36px;
          background: var(--primary);
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          font-weight: 700; font-size: 14px; color: white;
        }
        @media (max-width: 768px) {
          .sidebar { position: fixed; z-index: 200; }
          .sidebar--closed { width: 0; padding: 0; overflow: hidden; }
          .topbar { padding: 0 16px; }
          .admin-content { padding: 16px; }
        }
      `}</style>
    </div>
  );
};

export default AdminLayout;
