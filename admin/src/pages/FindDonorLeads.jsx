import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getFindDonorForms, updateFindDonorStatus, deleteFindDonorForm } from '../utils/api';
import { Search, Eye, Trash2, X, ChevronLeft, ChevronRight } from 'lucide-react';

const STATUS_OPTS = ['New', 'Contacted', 'In Progress', 'Converted', 'Closed'];

const StatusBadge = ({ status }) => {
  const map = { 'New': 'badge-primary', 'Contacted': 'badge-warning', 'In Progress': 'badge-warning', 'Converted': 'badge-success', 'Closed': 'badge-gray' };
  return <span className={`badge ${map[status] || 'badge-gray'}`}>{status}</span>;
};

const DetailModal = ({ lead, onClose, onUpdate }) => {
  const [status, setStatus] = useState(lead.status);
  const [notes, setNotes] = useState(lead.notes || '');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateFindDonorStatus(lead._id, { status, notes });
      onUpdate(lead._id, status, notes);
      toast.success('Status updated');
      onClose();
    } catch (err) { toast.error(err.message); }
    finally { setSaving(false); }
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <h3 style={{ fontSize: 17, fontWeight: 700 }}>Lead Details</h3>
          <button onClick={onClose} style={{ color: 'var(--text-muted)' }}><X size={20} /></button>
        </div>
        <div className="modal-body">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            {[
              ['Name', lead.name],
              ['Email', lead.email],
              ['Phone', lead.phoneNumber],
              ['How Heard', lead.howDidYouHear + (lead.howDidYouHearSpecify ? ` (${lead.howDidYouHearSpecify})` : '')],
              ['Needs Surrogate', lead.needsSurrogate || 'N/A'],
              ['Submitted', new Date(lead.createdAt).toLocaleString()],
            ].map(([label, val]) => (
              <div key={label}>
                <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 3 }}>{label}</div>
                <div style={{ fontSize: 14, color: 'var(--dark)', fontWeight: 500 }}>{val || '—'}</div>
              </div>
            ))}
            {lead.message && (
              <div style={{ gridColumn: '1 / -1' }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 3 }}>Message</div>
                <div style={{ fontSize: 14, color: 'var(--dark)', background: 'var(--light)', padding: 12, borderRadius: 8, lineHeight: 1.6 }}>{lead.message}</div>
              </div>
            )}
          </div>
          <div style={{ borderTop: '1px solid var(--mid-gray)', paddingTop: 16 }}>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Update Status</label>
                <select className="form-select" value={status} onChange={e => setStatus(e.target.value)}>
                  {STATUS_OPTS.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Notes</label>
              <textarea className="form-textarea" value={notes} onChange={e => setNotes(e.target.value)} rows={3} placeholder="Internal notes..." />
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSave} disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
        </div>
      </div>
    </div>
  );
};

const FindDonorLeads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const params = { page, limit: 15 };
      if (search) params.search = search;
      if (statusFilter) params.status = statusFilter;
      const res = await getFindDonorForms(params);
      setLeads(res.data || []);
      setPagination(res.pagination || {});
    } catch (err) { toast.error(err.message); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchLeads(); }, [page, statusFilter]);
  useEffect(() => { const t = setTimeout(fetchLeads, 400); return () => clearTimeout(t); }, [search]);

  const handleDelete = async (id) => {
    if (!confirm('Delete this lead?')) return;
    try { await deleteFindDonorForm(id); setLeads(p => p.filter(l => l._id !== id)); toast.success('Deleted'); }
    catch (err) { toast.error(err.message); }
  };

  const handleUpdate = (id, status, notes) => {
    setLeads(p => p.map(l => l._id === id ? { ...l, status, notes } : l));
  };

  return (
    <div>
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--dark)' }}>Find Donor Leads</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: 2 }}>"Find Your Perfect Egg Donor" form submissions</p>
        </div>
        <div style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: 8, padding: '8px 16px', fontSize: 14, color: '#b45309', fontWeight: 600 }}>
          Total: {pagination.total ?? '—'}
        </div>
      </div>

      <div className="card" style={{ marginBottom: 20 }}>
        <div className="card-body" style={{ paddingTop: 16, paddingBottom: 16 }}>
          <div className="search-bar">
            <div className="search-input-wrapper">
              <Search size={15} color="var(--text-muted)" />
              <input className="search-input" placeholder="Search by name or email..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <select className="form-select" style={{ width: 180 }} value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }}>
              <option value="">All Statuses</option>
              {STATUS_OPTS.map(s => <option key={s}>{s}</option>)}
            </select>
            {(search || statusFilter) && (
              <button className="btn btn-secondary btn-sm" onClick={() => { setSearch(''); setStatusFilter(''); setPage(1); }}><X size={13} /> Clear</button>
            )}
          </div>
        </div>
      </div>

      <div className="card">
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}><div className="spinner" /></div>
        ) : leads.length === 0 ? (
          <div className="empty-state"><div className="empty-state-icon">🔍</div><h3 style={{ fontSize: 16, fontWeight: 600 }}>No leads found</h3></div>
        ) : (
          <>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>How Heard</th>
                    <th>Needs Surrogate</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map(lead => (
                    <tr key={lead._id}>
                      <td style={{ fontWeight: 600 }}>{lead.name}</td>
                      <td style={{ fontSize: 12, color: 'var(--text-muted)' }}>{lead.email}</td>
                      <td style={{ fontSize: 12 }}>{lead.phoneNumber}</td>
                      <td style={{ fontSize: 12 }}>{lead.howDidYouHear}</td>
                      <td><span className={`badge ${lead.needsSurrogate === 'Yes' ? 'badge-warning' : 'badge-gray'}`}>{lead.needsSurrogate || 'N/A'}</span></td>
                      <td><StatusBadge status={lead.status} /></td>
                      <td style={{ fontSize: 12, color: 'var(--text-muted)' }}>{new Date(lead.createdAt).toLocaleDateString()}</td>
                      <td>
                        <div style={{ display: 'flex', gap: 6 }}>
                          <button className="btn btn-secondary btn-sm" onClick={() => setSelected(lead)}><Eye size={13} /></button>
                          <button className="btn btn-danger btn-sm" onClick={() => handleDelete(lead._id)}><Trash2 size={13} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ padding: '16px 24px', borderTop: '1px solid var(--mid-gray)' }}>
              <div className="pagination">
                <span style={{ fontSize: 12, color: 'var(--text-muted)', marginRight: 'auto' }}>Showing {leads.length} of {pagination.total} results</span>
                <button className="page-btn" onClick={() => setPage(p => p - 1)} disabled={page <= 1}><ChevronLeft size={14} /></button>
                <button className="page-btn" onClick={() => setPage(p => p + 1)} disabled={page >= (pagination.pages || 1)}><ChevronRight size={14} /></button>
              </div>
            </div>
          </>
        )}
      </div>

      {selected && <DetailModal lead={selected} onClose={() => setSelected(null)} onUpdate={handleUpdate} />}
    </div>
  );
};

export default FindDonorLeads;
