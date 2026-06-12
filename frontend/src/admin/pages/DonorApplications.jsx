import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getDonorApplications, downloadDonorApplicationFile, updateDonorApplicationStatus, deleteDonorApplication } from '../utils/api';
import { Search, Eye, Trash2, Download, X, ChevronLeft, ChevronRight, FileText } from 'lucide-react';

const statusOptions = ['Pending', 'Pre-Qualified', 'Accepted', 'Rejected', 'In Progress'];

const StatusBadge = ({ status }) => {
  const map = { 'Pending': 'badge-gray', 'Pre-Qualified': 'badge-primary', 'Accepted': 'badge-success', 'Rejected': 'badge-danger', 'In Progress': 'badge-warning' };
  return <span className={`badge ${map[status] || 'badge-gray'}`}>{status}</span>;
};

const DetailModal = ({ app, onClose, onStatusUpdate }) => {
  const [status, setStatus] = useState(app.status);
  const [notes, setNotes] = useState(app.notes || '');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateDonorApplicationStatus(app._id, { status, notes });
      onStatusUpdate(app._id, status, notes);
      toast.success('Status updated successfully');
      onClose();
    } catch (err) {
      toast.error(err.message);
    } finally {

      setSaving(false);
    }
  };

  const handleFileDownload = async (file) => {
    try {
      if (file.path && file.path.startsWith('http')) {
        // Direct Cloudinary URL
        window.open(file.path, '_blank');
        return;
      }

      // Legacy fallback for locally stored files
      const blob = await downloadDonorApplicationFile(app._id, file.filename);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = file.originalName || file.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      toast.error(err.message || 'Could not download file');
    }
  };

  const handleFileView = async (file) => {
    try {
      const blob = await downloadDonorApplicationFile(app._id, file.filename);
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank', 'noopener,noreferrer');
      window.setTimeout(() => window.URL.revokeObjectURL(url), 60000);
    } catch (err) {
      toast.error(err.message || 'Could not open file');
    }
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: 700 }}>
        <div className="modal-header">
          <div>
            <h3 style={{ fontSize: 18, fontWeight: 700 }}>Application Details</h3>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>Case ID: {app.caseId}</p>
          </div>
          <button onClick={onClose} style={{ color: 'var(--text-muted)', padding: 4 }}><X size={20} /></button>
        </div>
        <div className="modal-body" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <InfoRow label="First Name" value={app.firstName} />
          <InfoRow label="Last Name" value={app.lastName} />
          <InfoRow label="Email" value={app.email} />
          <InfoRow label="Cell Number" value={app.cellNumber} />
          <InfoRow label="Date of Birth" value={new Date(app.dateOfBirth).toLocaleDateString()} />
          <InfoRow label="Country" value={app.country} />
          <InfoRow label="Height" value={`${app.heightFt}'${app.heightIn}"`} />
          <InfoRow label="Weight" value={`${app.weight} lbs`} />
          <InfoRow label="Eye Color" value={app.eyeColor} />
          <InfoRow label="Hair Color" value={app.hairColor} />
          <InfoRow label="Racial Background" value={app.racialBackground} />
          <InfoRow label="Ethnic Origin" value={app.ethnicOrigin} />
          <InfoRow label="Education" value={app.education} />
          <InfoRow label="Education Highlights" value={app.educationHighlights} />
          <InfoRow label="Religious Affiliation" value={app.religiousAffiliation} />
          <InfoRow label="Donated Before" value={app.hasDonatedBefore} />
          <InfoRow label="Agreed to Anonymous" value={app.agreedToAnonymous ? 'Yes' : 'No'} />
          <InfoRow label="Terms Accepted" value={app.agreedToTerms ? 'Yes' : 'No'} />
          <InfoRow label="Submitted" value={new Date(app.createdAt).toLocaleString()} />
          <InfoRow label="Email Sent" value={app.emailSent ? 'Yes ✓' : 'No'} />

          {/* Files */}
          {app.uploadedFiles?.length > 0 && (
            <div style={{ gridColumn: '1 / -1' }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.5 }}>Uploaded Files</div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {app.uploadedFiles.map((f, i) => (
                  <div key={i} style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => handleFileView(f)}
                    >
                      <Eye size={13} /> View {i + 1}
                    </button>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => handleFileDownload(f)}
                    >
                      <Download size={13} /> {f.originalName || `File ${i + 1}`}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Status Update */}
          <div style={{ gridColumn: '1 / -1', borderTop: '1px solid var(--mid-gray)', paddingTop: 16 }}>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Update Status</label>
                <select className="form-select" value={status} onChange={e => setStatus(e.target.value)}>
                  {statusOptions.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">Internal Notes</label>
                <textarea className="form-textarea" value={notes} onChange={e => setNotes(e.target.value)} rows={3} placeholder="Add notes..." />
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({ label, value }) => (
  <div>
    <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 3 }}>{label}</div>
    <div style={{ fontSize: 14, color: 'var(--dark)', fontWeight: 500 }}>{value || '—'}</div>
  </div>
);

const DonorApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedApp, setSelectedApp] = useState(null);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const limit = 15;

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const params = { page, limit };
      if (search) params.search = search;
      if (statusFilter) params.status = statusFilter;
      const res = await getDonorApplications(params);
      setApplications(res.data || []);
      setPagination(res.pagination || {});
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchApplications(); }, [page, statusFilter]);
  useEffect(() => {
    const t = setTimeout(fetchApplications, 400);
    return () => clearTimeout(t);
  }, [search]);

  const handleDelete = async (id) => {
    if (!confirm('Delete this application? This cannot be undone.')) return;
    try {
      await deleteDonorApplication(id);
      setApplications(prev => prev.filter(a => a._id !== id));
      toast.success('Application deleted');
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleStatusUpdate = (id, status, notes) => {
    setApplications(prev => prev.map(a => a._id === id ? { ...a, status, notes } : a));
  };

  return (
    <div>
      <div style={{ marginBottom: 24, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--dark)' }}>Donor Applications</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: 2 }}>
            "Find Out If You Qualify To Become An Egg Donor" submissions
          </p>
        </div>
        <div style={{ background: 'var(--primary-pale)', border: '1px solid var(--primary-muted)', borderRadius: 8, padding: '8px 16px', fontSize: 14, color: 'var(--primary)', fontWeight: 600 }}>
          Total: {pagination.total ?? '—'}
        </div>
      </div>

      {/* Filters */}
      <div className="card" style={{ marginBottom: 20 }}>
        <div className="card-body" style={{ paddingTop: 16, paddingBottom: 16 }}>
          <div className="search-bar">
            <div className="search-input-wrapper">
              <Search size={15} color="var(--text-muted)" />
              <input className="search-input" placeholder="Search by name, email, or case ID..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <select className="form-select" style={{ width: 200 }} value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }}>
              <option value="">All Statuses</option>
              {statusOptions.map(s => <option key={s}>{s}</option>)}
            </select>
            {(search || statusFilter) && (
              <button className="btn btn-secondary btn-sm" onClick={() => { setSearch(''); setStatusFilter(''); setPage(1); }}>
                <X size={13} /> Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card">
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}><div className="spinner" /></div>
        ) : applications.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon"><FileText size={40} /></div>
            <h3 style={{ fontSize: 16, fontWeight: 600 }}>No Applications Found</h3>
            <p style={{ marginTop: 6, fontSize: 13 }}>Adjust your filters or check back later.</p>
          </div>
        ) : (
          <>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Case ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Race</th>
                    <th>Education</th>
                    <th>Files</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map(app => (
                    <tr key={app._id}>
                      <td data-label="Case ID"><code style={{ fontSize: 11, color: 'var(--primary)', background: 'var(--primary-pale)', padding: '2px 6px', borderRadius: 4 }}>{app.caseId}</code></td>
                      <td data-label="Name" style={{ fontWeight: 600 }}>{app.firstName} {app.lastName}</td>
                      <td data-label="Email" style={{ color: 'var(--text-muted)', fontSize: 12 }}>{app.email}</td>
                      <td data-label="Race" style={{ fontSize: 12 }}>{app.racialBackground}</td>
                      <td data-label="Education" style={{ fontSize: 12 }}>{app.education}</td>
                      <td data-label="Files">
                        <span className="badge badge-gray">{app.uploadedFiles?.length || 0} files</span>
                      </td>
                      <td data-label="Status"><StatusBadge status={app.status} /></td>
                      <td data-label="Date" style={{ color: 'var(--text-muted)', fontSize: 12 }}>{new Date(app.createdAt).toLocaleDateString()}</td>
                      <td data-label="Actions">
                        <div style={{ display: 'flex', gap: 6 }}>
                          <button className="btn btn-secondary btn-sm" onClick={() => setSelectedApp(app)} title="View Details">
                            <Eye size={13} />
                          </button>
                          <button className="btn btn-danger btn-sm" onClick={() => handleDelete(app._id)} title="Delete">
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div style={{ padding: '16px 24px', borderTop: '1px solid var(--mid-gray)' }}>
              <div className="pagination">
                <span style={{ fontSize: 12, color: 'var(--text-muted)', marginRight: 'auto' }}>
                  Showing {applications.length} of {pagination.total} results
                </span>
                <button className="page-btn" onClick={() => setPage(p => p - 1)} disabled={page <= 1}><ChevronLeft size={14} /></button>
                {[...Array(pagination.pages || 1)].slice(Math.max(0, page - 3), Math.min(pagination.pages, page + 2)).map((_, i) => {
                  const p = Math.max(1, page - 2) + i;
                  return <button key={p} className={`page-btn ${p === page ? 'active' : ''}`} onClick={() => setPage(p)}>{p}</button>;
                })}
                <button className="page-btn" onClick={() => setPage(p => p + 1)} disabled={page >= (pagination.pages || 1)}><ChevronRight size={14} /></button>
              </div>
            </div>
          </>
        )}
      </div>

      {selectedApp && (
        <DetailModal
          app={selectedApp}
          onClose={() => setSelectedApp(null)}
          onStatusUpdate={handleStatusUpdate}
        />
      )}
    </div>
  );
};

export default DonorApplications;
