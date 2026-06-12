import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getContactForms, updateContactStatus, deleteContactForm } from '../utils/api';
import { Search, Eye, Trash2, X, ChevronLeft, ChevronRight, Phone } from 'lucide-react';

const STATUS_OPTS = ['New', 'Read', 'Replied', 'Closed'];

const StatusBadge = ({ status }) => {
  const map = { 'New': 'badge-primary', 'Read': 'badge-warning', 'Replied': 'badge-success', 'Closed': 'badge-gray' };
  return <span className={`badge ${map[status] || 'badge-gray'}`}>{status}</span>;
};

const InquiryBadge = ({ type }) => {
  const map = { 'Intended Parent': 'badge-primary', 'Egg Donor': 'badge-success', 'Clinic Partner': 'badge-warning', 'General': 'badge-gray', 'Other': 'badge-gray' };
  return <span className={`badge ${map[type] || 'badge-gray'}`}>{type}</span>;
};

const DetailModal = ({ contact, onClose, onUpdate }) => {
  const [status, setStatus] = useState(contact.status);
  const [notes, setNotes] = useState(contact.notes || '');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateContactStatus(contact._id, { status, notes });
      onUpdate(contact._id, status, notes);
      toast.success('Status updated');
      onClose();
    } catch (err) { toast.error(err.message); }
    finally { setSaving(false); }
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <div>
            <h3 style={{ fontSize: 17, fontWeight: 700 }}>Contact Form Submission</h3>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
              {new Date(contact.createdAt).toLocaleString()}
            </p>
          </div>
          <button onClick={onClose} style={{ color: 'var(--text-muted)' }}><X size={20} /></button>
        </div>

        <div className="modal-body">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            {[
              ['Name', contact.name],
              ['Email', contact.email],
              ['Phone', contact.phone || 'N/A'],
              ['Inquiry Type', contact.inquiryType],
              ['Subject', contact.subject],
            ].map(([label, val]) => (
              <div key={label} style={{ gridColumn: label === 'Subject' ? '1 / -1' : undefined }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 3 }}>{label}</div>
                <div style={{ fontSize: 14, color: 'var(--dark)', fontWeight: 500 }}>{val || '—'}</div>
              </div>
            ))}
            <div style={{ gridColumn: '1 / -1' }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }}>Message</div>
              <div style={{ background: 'var(--light)', padding: '14px', borderRadius: 8, fontSize: 14, color: 'var(--dark)', lineHeight: 1.7, border: '1px solid var(--mid-gray)' }}>
                {contact.message}
              </div>
            </div>
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
              <label className="form-label">Internal Notes</label>
              <textarea className="form-textarea" value={notes} onChange={e => setNotes(e.target.value)} rows={3} placeholder="Add internal notes here..." />
            </div>
          </div>

          {/* Quick Reply Link */}
          <a
            href={`mailto:${contact.email}?subject=Re: ${encodeURIComponent(contact.subject)}`}
            className="btn btn-primary btn-sm"
            style={{ marginTop: 8 }}
          >
            ✉️ Reply via Email
          </a>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>Close</button>
          <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

const ContactLeads = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const params = { page, limit: 15 };
      if (search) params.search = search;
      if (statusFilter) params.status = statusFilter;
      const res = await getContactForms(params);
      setContacts(res.data || []);
      setPagination(res.pagination || {});
    } catch (err) { toast.error(err.message); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchContacts(); }, [page, statusFilter]);
  useEffect(() => { const t = setTimeout(fetchContacts, 400); return () => clearTimeout(t); }, [search]);

  const handleDelete = async (id) => {
    if (!confirm('Delete this contact submission?')) return;
    try {
      await deleteContactForm(id);
      setContacts(p => p.filter(c => c._id !== id));
      toast.success('Deleted successfully');
    } catch (err) { toast.error(err.message); }
  };

  const handleUpdate = (id, status, notes) => {
    setContacts(p => p.map(c => c._id === id ? { ...c, status, notes } : c));
  };

  return (
    <div>
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--dark)' }}>Contact Leads</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: 2 }}>Contact Us page form submissions</p>
        </div>
        <div style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: 8, padding: '8px 16px', fontSize: 14, color: '#7c3aed', fontWeight: 600 }}>
          Total: {pagination.total ?? '—'}
        </div>
      </div>

      {/* Filters */}
      <div className="card" style={{ marginBottom: 20 }}>
        <div className="card-body" style={{ paddingTop: 16, paddingBottom: 16 }}>
          <div className="search-bar">
            <div className="search-input-wrapper">
              <Search size={15} color="var(--text-muted)" />
              <input className="search-input" placeholder="Search by name, email, or subject..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <select className="form-select" style={{ width: 180 }} value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }}>
              <option value="">All Statuses</option>
              {STATUS_OPTS.map(s => <option key={s}>{s}</option>)}
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
        ) : contacts.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon"><Phone size={40} color="var(--text-muted)" /></div>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 12 }}>No contact submissions found</h3>
            <p style={{ marginTop: 6, fontSize: 13 }}>Contact form submissions will appear here.</p>
          </div>
        ) : (
          <>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Type</th>
                    <th>Subject</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map(contact => (
                    <tr key={contact._id}>
                      <td data-label="Name" style={{ fontWeight: 600 }}>{contact.name}</td>
                      <td data-label="Email">
                        <a href={`mailto:${contact.email}`} style={{ color: 'var(--primary)', fontSize: 12, textDecoration: 'none' }}>
                          {contact.email}
                        </a>
                      </td>
                      <td data-label="Phone" style={{ fontSize: 12, color: 'var(--text-muted)' }}>{contact.phone || '—'}</td>
                      <td data-label="Type"><InquiryBadge type={contact.inquiryType} /></td>
                      <td data-label="Subject" style={{ fontSize: 12, maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {contact.subject}
                      </td>
                      <td data-label="Status"><StatusBadge status={contact.status} /></td>
                      <td data-label="Date" style={{ fontSize: 12, color: 'var(--text-muted)' }}>{new Date(contact.createdAt).toLocaleDateString()}</td>
                      <td data-label="Actions">
                        <div style={{ display: 'flex', gap: 6 }}>
                          <button className="btn btn-secondary btn-sm" onClick={() => setSelected(contact)} title="View">
                            <Eye size={13} />
                          </button>
                          <button className="btn btn-danger btn-sm" onClick={() => handleDelete(contact._id)} title="Delete">
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
                  Showing {contacts.length} of {pagination.total} results
                </span>
                <button className="page-btn" onClick={() => setPage(p => p - 1)} disabled={page <= 1}>
                  <ChevronLeft size={14} />
                </button>
                <button className="page-btn" onClick={() => setPage(p => p + 1)} disabled={page >= (pagination.pages || 1)}>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {selected && (
        <DetailModal contact={selected} onClose={() => setSelected(null)} onUpdate={handleUpdate} />
      )}
    </div>
  );
};

export default ContactLeads;
