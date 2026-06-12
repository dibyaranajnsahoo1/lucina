import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDashboardStats } from '../utils/api';
import { FileText, Search, Phone, Users, TrendingUp, Clock, ArrowRight, CheckCircle } from 'lucide-react';

const StatCard = ({ icon, iconBg, num, label, link }) => (
  <Link to={link} className="stat-card" style={{ textDecoration: 'none', cursor: 'pointer' }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary-muted)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,154,147,0.15)'; }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--mid-gray)'; e.currentTarget.style.boxShadow = 'var(--shadow)'; }}
  >
    <div className="stat-icon" style={{ background: iconBg }}>{icon}</div>
    <div>
      <div className="stat-num">{num}</div>
      <div className="stat-label">{label}</div>
    </div>
  </Link>
);

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardStats()
      .then(res => setStats(res))
      .catch(() => setStats({ stats: { totalApplications: 0, totalFindDonorLeads: 0, totalContactForms: 0 }, recentApplications: [], recentLeads: [] }))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}><div className="spinner" /></div>;

  const { stats: s, recentApplications = [], recentLeads = [] } = stats || {};

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--dark)', marginBottom: 4 }}>Dashboard Overview</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>Welcome to the Lucina Egg Bank admin panel.</p>
      </div>

      {/* Stats Grid */}
      <div className="stat-grid">
        <StatCard
          icon={<FileText size={22} color="#009a93" />}
          iconBg="rgba(0,154,147,0.1)"
          num={s?.totalApplications ?? 0}
          label="Donor Applications"
          link="/donor-applications"
        />
        <StatCard
          icon={<Search size={22} color="#f59e0b" />}
          iconBg="rgba(245,158,11,0.1)"
          num={s?.totalFindDonorLeads ?? 0}
          label="Find Donor Leads"
          link="/find-donor-leads"
        />
        <StatCard
          icon={<Phone size={22} color="#8b5cf6" />}
          iconBg="rgba(139,92,246,0.1)"
          num={s?.totalContactForms ?? 0}
          label="Contact Form Leads"
          link="/contact-leads"
        />
        <StatCard
          icon={<Users size={22} color="#ef4444" />}
          iconBg="rgba(239,68,68,0.1)"
          num={s?.totalDonors ?? '—'}
          label="Active Donors"
          link="/donors"
        />
      </div>

      {/* Recent Tables */}
      <div className="grid-2">
        {/* Recent Applications */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">Recent Donor Applications</span>
            <Link to="/donor-applications" className="btn btn-secondary btn-sm">
              View All <ArrowRight size={13} />
            </Link>
          </div>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Case ID</th>
                  <th>Applicant</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentApplications.length === 0 ? (
                  <tr><td colSpan={4} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '32px' }}>No applications yet</td></tr>
                ) : recentApplications.map(a => (
                  <tr key={a._id}>
                    <td data-label="Case ID"><code style={{ fontSize: 12, color: 'var(--primary)' }}>{a.caseId}</code></td>
                    <td data-label="Applicant" style={{ fontWeight: 500 }}>{a.firstName} {a.lastName}</td>
                    <td data-label="Status"><StatusBadge status={a.status} /></td>
                    <td data-label="Date" style={{ color: 'var(--text-muted)', fontSize: 12 }}>
                      {new Date(a.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Leads */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">Recent Find Donor Leads</span>
            <Link to="/find-donor-leads" className="btn btn-secondary btn-sm">
              View All <ArrowRight size={13} />
            </Link>
          </div>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentLeads.length === 0 ? (
                  <tr><td colSpan={4} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '32px' }}>No leads yet</td></tr>
                ) : recentLeads.map(l => (
                  <tr key={l._id}>
                    <td data-label="Name" style={{ fontWeight: 500 }}>{l.name}</td>
                    <td data-label="Email" style={{ color: 'var(--text-muted)', fontSize: 12 }}>{l.email}</td>
                    <td data-label="Status"><LeadStatusBadge status={l.status} /></td>
                    <td data-label="Date" style={{ color: 'var(--text-muted)', fontSize: 12 }}>{new Date(l.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card" style={{ marginTop: 24 }}>
        <div className="card-header">
          <span className="card-title">Quick Actions</span>
        </div>
        <div className="card-body">
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <Link to="/donors" className="btn btn-primary"><Users size={15} /> Add New Donor</Link>
            <Link to="/testimonials" className="btn btn-secondary"><CheckCircle size={15} /> Manage Testimonials</Link>
            <Link to="/donor-applications" className="btn btn-secondary"><FileText size={15} /> Review Applications</Link>
            <Link to="/contact-leads" className="btn btn-secondary"><Phone size={15} /> View Contact Leads</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export const StatusBadge = ({ status }) => {
  const map = {
    'Pending': 'badge-gray',
    'Pre-Qualified': 'badge-primary',
    'Accepted': 'badge-success',
    'Rejected': 'badge-danger',
    'In Progress': 'badge-warning',
  };
  return <span className={`badge ${map[status] || 'badge-gray'}`}>{status}</span>;
};

export const LeadStatusBadge = ({ status }) => {
  const map = {
    'New': 'badge-primary',
    'Contacted': 'badge-warning',
    'In Progress': 'badge-warning',
    'Converted': 'badge-success',
    'Closed': 'badge-gray',
  };
  return <span className={`badge ${map[status] || 'badge-gray'}`}>{status}</span>;
};

export default Dashboard;
