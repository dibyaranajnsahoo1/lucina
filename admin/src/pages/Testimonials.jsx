import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { getAllTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from '../utils/api';
import { Plus, Edit2, Trash2, X, Star, Heart } from 'lucide-react';

const DISPLAY_OPTS = [
  { value: 'homepage', label: 'Homepage' },
  { value: 'donor-page', label: 'Donor Page' },
  { value: 'both', label: 'Both Pages' },
];

const TestimonialModal = ({ testimonial, onClose, onSave }) => {
  const isEdit = !!testimonial;
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: testimonial || { role: 'Intended Parent', rating: 5, isActive: true, displayOn: ['homepage'], order: 0 }
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Convert displayOn to array if needed
      if (typeof data.displayOn === 'string') {
        data.displayOn = [data.displayOn];
      }
      let res;
      if (isEdit) {
        res = await updateTestimonial(testimonial._id, data);
      } else {
        res = await createTestimonial(data);
      }
      onSave(res.data, isEdit);
      toast.success(`Testimonial ${isEdit ? 'updated' : 'created'}`);
      onClose();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: 640 }}>
        <div className="modal-header">
          <h3 style={{ fontSize: 18, fontWeight: 700 }}>{isEdit ? 'Edit Testimonial' : 'Add Testimonial'}</h3>
          <button onClick={onClose} style={{ color: 'var(--text-muted)' }}><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="modal-body">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div className="form-group">
                <label className="form-label">Name <span style={{ color: 'var(--danger)' }}>*</span></label>
                <input {...register('name', { required: 'Required' })} className="form-input" placeholder="e.g. Sarah M." />
                {errors.name && <p className="form-error">{errors.name.message}</p>}
              </div>

              <div className="form-group">
                <label className="form-label">Role <span style={{ color: 'var(--danger)' }}>*</span></label>
                <select {...register('role', { required: 'Required' })} className="form-select">
                  <option value="Intended Parent">Intended Parent</option>
                  <option value="Egg Donor">Egg Donor</option>
                  <option value="Clinic Partner">Clinic Partner</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Rating</label>
                <select {...register('rating')} className="form-select">
                  {[5, 4, 3, 2, 1].map(r => <option key={r} value={r}>{r} Stars</option>)}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Display On</label>
                <select {...register('displayOn')} className="form-select">
                  {DISPLAY_OPTS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Location</label>
                <input {...register('location')} className="form-input" placeholder="e.g. California, USA" />
              </div>

              <div className="form-group">
                <label className="form-label">Date</label>
                <input {...register('date')} className="form-input" placeholder="e.g. March 2023" />
              </div>

              <div className="form-group">
                <label className="form-label">Display Order (lower = first)</label>
                <input {...register('order')} type="number" className="form-input" placeholder="0" min="0" />
              </div>

              <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 24 }}>
                <input type="checkbox" {...register('isActive')} id="isActive" style={{ accentColor: 'var(--primary)', width: 16, height: 16 }} />
                <label htmlFor="isActive" style={{ cursor: 'pointer', fontSize: 14, fontWeight: 500, color: 'var(--text)' }}>
                  Active (shown on website)
                </label>
              </div>

              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">Short Content (for cards) <span style={{ color: 'var(--danger)' }}>*</span></label>
                <textarea
                  {...register('shortContent', { required: 'Required' })}
                  className="form-textarea"
                  placeholder="Short version shown on homepage cards (1-2 sentences)..."
                  rows={2}
                />
                {errors.shortContent && <p className="form-error">{errors.shortContent.message}</p>}
              </div>

              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">Full Content <span style={{ color: 'var(--danger)' }}>*</span></label>
                <textarea
                  {...register('content', { required: 'Required' })}
                  className="form-textarea"
                  placeholder="Full testimonial text..."
                  rows={5}
                />
                {errors.content && <p className="form-error">{errors.content.message}</p>}
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving...' : (isEdit ? 'Update' : 'Create Testimonial')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [filter, setFilter] = useState('all');

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const res = await getAllTestimonials();
      setTestimonials(res.data || []);
    } catch (err) { toast.error(err.message); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchTestimonials(); }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this testimonial?')) return;
    try {
      await deleteTestimonial(id);
      setTestimonials(p => p.filter(t => t._id !== id));
      toast.success('Testimonial deleted');
    } catch (err) { toast.error(err.message); }
  };

  const handleSave = (item, isEdit) => {
    if (isEdit) {
      setTestimonials(p => p.map(t => t._id === item._id ? item : t));
    } else {
      setTestimonials(p => [item, ...p]);
    }
  };

  const openEdit = (item) => { setEditItem(item); setShowModal(true); };
  const openCreate = () => { setEditItem(null); setShowModal(true); };

  const filtered = filter === 'all' ? testimonials
    : filter === 'homepage' ? testimonials.filter(t => Array.isArray(t.displayOn) ? t.displayOn.includes('homepage') || t.displayOn.includes('both') : t.displayOn === 'homepage' || t.displayOn === 'both')
    : testimonials.filter(t => Array.isArray(t.displayOn) ? t.displayOn.includes('donor-page') || t.displayOn.includes('both') : t.displayOn === 'donor-page' || t.displayOn === 'both');

  return (
    <div>
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--dark)' }}>Testimonials</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: 2 }}>Manage testimonials displayed on the website</p>
        </div>
        <button className="btn btn-primary" onClick={openCreate}>
          <Plus size={15} /> Add Testimonial
        </button>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {[
          { key: 'all', label: `All (${testimonials.length})` },
          { key: 'homepage', label: 'Homepage' },
          { key: 'donor-page', label: 'Donor Page' },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            style={{
              padding: '8px 18px', borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: 'pointer',
              border: '1.5px solid', transition: 'all 0.2s',
              borderColor: filter === tab.key ? 'var(--primary)' : 'var(--mid-gray)',
              background: filter === tab.key ? 'var(--primary)' : 'white',
              color: filter === tab.key ? 'white' : 'var(--text)',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}><div className="spinner" /></div>
      ) : filtered.length === 0 ? (
        <div className="card">
          <div className="empty-state">
            <Heart size={40} color="var(--text-muted)" />
            <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 12 }}>No testimonials found</h3>
            <p style={{ marginTop: 6, fontSize: 13 }}>Add testimonials to display on the website.</p>
            <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={openCreate}><Plus size={14} /> Add First Testimonial</button>
          </div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
          {filtered.map(t => (
            <div key={t._id} className="card" style={{ opacity: t.isActive ? 1 : 0.6 }}>
              <div className="card-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 38, height: 38, background: 'var(--primary)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 16 }}>
                    {t.name?.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{t.role} {t.location ? `• ${t.location}` : ''}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                  {!t.isActive && <span className="badge badge-gray">Hidden</span>}
                  <span className="badge badge-primary" style={{ fontSize: 10 }}>
                    {Array.isArray(t.displayOn) ? t.displayOn.join(', ') : t.displayOn}
                  </span>
                  <button className="btn btn-secondary btn-sm" onClick={() => openEdit(t)} title="Edit">
                    <Edit2 size={13} />
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(t._id)} title="Delete">
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
              <div className="card-body" style={{ paddingTop: 16 }}>
                <div style={{ display: 'flex', gap: 2, marginBottom: 10 }}>
                  {[...Array(t.rating || 5)].map((_, i) => (
                    <Star key={i} size={13} fill="var(--warning)" color="var(--warning)" />
                  ))}
                </div>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, fontStyle: 'italic' }}>
                  "{t.shortContent || t.content?.slice(0, 160)}..."
                </p>
                <div style={{ marginTop: 12, fontSize: 12, color: 'var(--text-muted)', display: 'flex', gap: 12 }}>
                  {t.date && <span>📅 {t.date}</span>}
                  <span>Order: #{t.order}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <TestimonialModal
          testimonial={editItem}
          onClose={() => { setShowModal(false); setEditItem(null); }}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default Testimonials;
