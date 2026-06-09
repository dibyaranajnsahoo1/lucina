import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { getAllDonors, createDonor, updateDonor, deleteDonor } from '../utils/api';
import { Search, Plus, Edit2, Trash2, X, ChevronLeft, ChevronRight, Users, Image } from 'lucide-react';

const API_BASE = 'http://localhost:5000';

const RACIAL_BACKGROUNDS = ['Chinese','Japanese','Other Asian','American Indian or Alaska Native','Black or African American','Hispanic or Latina','Native Hawaiian or other Pacific Islander','White'];
const EYE_COLORS = ['Blue','Light Blue','Dark Blue','Brown','Light Brown','Dark Brown','Green','Hazel'];
const HAIR_COLORS = ['Black','Blonde','Light Blonde','Dark Blonde','Strawberry Blonde','Brown','Light Brown','Dark Brown','Red'];
const EDUCATIONS = ['High school completed','College enrolled','College in progress','College completed','Masters completed','PhD completed','Other'];
const AVAILABILITIES = ['Available','Reserved','Unavailable'];

const DonorModal = ({ donor, onClose, onSave }) => {
  const isEdit = !!donor;
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: donor ? {
      ...donor,
      'height.feet': donor.height?.feet,
      'height.inches': donor.height?.inches,
    } : { availability: 'Available', isActive: true }
  });
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();

      // Flatten height
      const payload = {
        ...data,
        'height[feet]': data['height.feet'] || data.heightFeet,
        'height[inches]': data['height.inches'] || data.heightInches,
      };
      delete payload['height.feet'];
      delete payload['height.inches'];

      Object.entries(payload).forEach(([k, v]) => {
        if (v !== undefined && v !== null && v !== '') formData.append(k, v);
      });
      files.forEach(f => formData.append('profileImages', f));

      let res;
      if (isEdit) {
        res = await updateDonor(donor._id, formData);
      } else {
        res = await createDonor(formData);
      }
      onSave(res.data, isEdit);
      toast.success(`Donor ${isEdit ? 'updated' : 'created'} successfully`);
      onClose();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: 720 }}>
        <div className="modal-header">
          <h3 style={{ fontSize: 18, fontWeight: 700 }}>{isEdit ? 'Edit Donor' : 'Add New Donor'}</h3>
          <button onClick={onClose} style={{ color: 'var(--text-muted)' }}><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="modal-body">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {/* Basic Info */}
              <div className="form-group">
                <label className="form-label">Donor ID <span style={{ color: 'var(--danger)' }}>*</span></label>
                <input {...register('donorId', { required: 'Required' })} className="form-input" placeholder="e.g. LEB-D1001" />
                {errors.donorId && <p className="form-error">{errors.donorId.message}</p>}
              </div>
              <div className="form-group">
                <label className="form-label">First Name <span style={{ color: 'var(--danger)' }}>*</span></label>
                <input {...register('firstName', { required: 'Required' })} className="form-input" placeholder="First name" />
                {errors.firstName && <p className="form-error">{errors.firstName.message}</p>}
              </div>

              <div className="form-group">
                <label className="form-label">Age <span style={{ color: 'var(--danger)' }}>*</span></label>
                <input {...register('age', { required: 'Required', min: 19, max: 31 })} type="number" className="form-input" placeholder="19-31" />
                {errors.age && <p className="form-error">{errors.age.message}</p>}
              </div>
              <div className="form-group">
                <label className="form-label">Racial Background <span style={{ color: 'var(--danger)' }}>*</span></label>
                <select {...register('racialBackground', { required: 'Required' })} className="form-select">
                  <option value="">Select</option>
                  {RACIAL_BACKGROUNDS.map(r => <option key={r}>{r}</option>)}
                </select>
                {errors.racialBackground && <p className="form-error">{errors.racialBackground.message}</p>}
              </div>

              <div className="form-group">
                <label className="form-label">Height (feet)</label>
                <input {...register('height.feet')} type="number" className="form-input" placeholder="5" min="4" max="7" />
              </div>
              <div className="form-group">
                <label className="form-label">Height (inches)</label>
                <input {...register('height.inches')} type="number" className="form-input" placeholder="6" min="0" max="11" />
              </div>

              <div className="form-group">
                <label className="form-label">Weight (lbs)</label>
                <input {...register('weight')} type="number" className="form-input" placeholder="125" />
              </div>
              <div className="form-group">
                <label className="form-label">Education</label>
                <select {...register('education')} className="form-select">
                  <option value="">Select</option>
                  {EDUCATIONS.map(e => <option key={e}>{e}</option>)}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Eye Color</label>
                <select {...register('eyeColor')} className="form-select">
                  <option value="">Select</option>
                  {EYE_COLORS.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Hair Color</label>
                <select {...register('hairColor')} className="form-select">
                  <option value="">Select</option>
                  {HAIR_COLORS.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Ethnic Origin</label>
                <input {...register('ethnicOrigin')} className="form-input" placeholder="e.g. Irish, German" />
              </div>
              <div className="form-group">
                <label className="form-label">Religious Affiliation</label>
                <input {...register('religiousAffiliation')} className="form-input" placeholder="e.g. Christian" />
              </div>

              <div className="form-group">
                <label className="form-label">Availability</label>
                <select {...register('availability')} className="form-select">
                  {AVAILABILITIES.map(a => <option key={a}>{a}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Previous Donations</label>
                <input {...register('previousDonations')} type="number" className="form-input" placeholder="0" min="0" />
              </div>

              <div className="form-group" style={{ display: 'flex', gap: 20, alignItems: 'center', gridColumn: '1 / -1' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 14 }}>
                  <input type="checkbox" {...register('featured')} style={{ accentColor: 'var(--primary)' }} />
                  Featured Donor
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 14 }}>
                  <input type="checkbox" {...register('isActive')} defaultChecked style={{ accentColor: 'var(--primary)' }} />
                  Active (shown on website)
                </label>
              </div>

              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">Bio</label>
                <textarea {...register('bio')} className="form-textarea" placeholder="Donor bio..." rows={3} />
              </div>
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">Hobbies & Interests</label>
                <input {...register('hobbies')} className="form-input" placeholder="e.g. Hiking, Reading, Music" />
              </div>

              {/* Image Upload */}
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">Profile Images</label>
                {isEdit && donor.profileImages?.length > 0 && (
                  <div style={{ display: 'flex', gap: 10, marginBottom: 12, flexWrap: 'wrap' }}>
                    {donor.profileImages.map((img, i) => (
                      <img key={i} src={`${API_BASE}${img}`} alt={`donor-${i}`}
                        style={{ width: 60, height: 60, borderRadius: 8, objectFit: 'cover', border: '1px solid var(--mid-gray)' }}
                        onError={e => { e.target.style.display = 'none'; }}
                      />
                    ))}
                  </div>
                )}
                <div style={{
                  border: '2px dashed var(--mid-gray)', borderRadius: 8, padding: '20px',
                  textAlign: 'center', cursor: 'pointer', background: 'var(--light)'
                }}
                  onClick={() => document.getElementById('donorImgInput').click()}
                >
                  <Image size={24} color="var(--text-muted)" style={{ margin: '0 auto 8px' }} />
                  <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                    {files.length > 0 ? `${files.length} file(s) selected` : 'Click to upload donor images (JPG, PNG, WebP)'}
                  </p>
                  <input id="donorImgInput" type="file" multiple accept=".jpg,.jpeg,.png,.webp"
                    onChange={e => setFiles(Array.from(e.target.files))} style={{ display: 'none' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving...' : (isEdit ? 'Update Donor' : 'Create Donor')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Donors = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [raceFilter, setRaceFilter] = useState('');
  const [availFilter, setAvailFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editDonor, setEditDonor] = useState(null);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});

  const fetchDonors = async () => {
    setLoading(true);
    try {
      const params = { page, limit: 15 };
      if (search) params.search = search;
      if (raceFilter) params.racialBackground = raceFilter;
      if (availFilter) params.availability = availFilter;
      const res = await getAllDonors(params);
      setDonors(res.data || []);
      setPagination(res.pagination || {});
    } catch (err) { toast.error(err.message); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchDonors(); }, [page, raceFilter, availFilter]);
  useEffect(() => { const t = setTimeout(fetchDonors, 400); return () => clearTimeout(t); }, [search]);

  const handleDelete = async (id) => {
    if (!confirm('Delete this donor? This cannot be undone.')) return;
    try {
      await deleteDonor(id);
      setDonors(p => p.filter(d => d._id !== id));
      toast.success('Donor deleted');
    } catch (err) { toast.error(err.message); }
  };

  const handleSave = (donor, isEdit) => {
    if (isEdit) {
      setDonors(p => p.map(d => d._id === donor._id ? donor : d));
    } else {
      setDonors(p => [donor, ...p]);
    }
  };

  const openEdit = (donor) => { setEditDonor(donor); setShowModal(true); };
  const openCreate = () => { setEditDonor(null); setShowModal(true); };

  return (
    <div>
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--dark)' }}>Donor Management</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: 2 }}>Manage egg donors — changes appear instantly on the website</p>
        </div>
        <button className="btn btn-primary" onClick={openCreate}>
          <Plus size={15} /> Add New Donor
        </button>
      </div>

      {/* Filters */}
      <div className="card" style={{ marginBottom: 20 }}>
        <div className="card-body" style={{ paddingTop: 16, paddingBottom: 16 }}>
          <div className="search-bar">
            <div className="search-input-wrapper">
              <Search size={15} color="var(--text-muted)" />
              <input className="search-input" placeholder="Search by Donor ID or name..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <select className="form-select" style={{ width: 180 }} value={raceFilter} onChange={e => { setRaceFilter(e.target.value); setPage(1); }}>
              <option value="">All Backgrounds</option>
              {RACIAL_BACKGROUNDS.map(r => <option key={r}>{r}</option>)}
            </select>
            <select className="form-select" style={{ width: 150 }} value={availFilter} onChange={e => { setAvailFilter(e.target.value); setPage(1); }}>
              <option value="">All Status</option>
              {AVAILABILITIES.map(a => <option key={a}>{a}</option>)}
            </select>
            {(search || raceFilter || availFilter) && (
              <button className="btn btn-secondary btn-sm" onClick={() => { setSearch(''); setRaceFilter(''); setAvailFilter(''); setPage(1); }}>
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
        ) : donors.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon"><Users size={40} color="var(--text-muted)" /></div>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 12 }}>No donors found</h3>
            <p style={{ marginTop: 6, fontSize: 13 }}>Add donors to populate the website's donor gallery.</p>
            <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={openCreate}><Plus size={14} /> Add First Donor</button>
          </div>
        ) : (
          <>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Photo</th>
                    <th>Donor ID</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Race</th>
                    <th>Education</th>
                    <th>Features</th>
                    <th>Availability</th>
                    <th>Active</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {donors.map(donor => (
                    <tr key={donor._id}>
                      <td>
                        {donor.profileImage ? (
                          <img src={`${API_BASE}${donor.profileImage}`} alt={donor.firstName}
                            style={{ width: 36, height: 36, borderRadius: 8, objectFit: 'cover' }}
                            onError={e => { e.target.src = ''; e.target.style.display = 'none'; }}
                          />
                        ) : (
                          <div style={{ width: 36, height: 36, background: 'var(--primary-pale)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: 'var(--primary)' }}>
                            {donor.firstName?.charAt(0)}
                          </div>
                        )}
                      </td>
                      <td><code style={{ fontSize: 11, color: 'var(--primary)', background: 'var(--primary-pale)', padding: '2px 6px', borderRadius: 4 }}>{donor.donorId}</code></td>
                      <td style={{ fontWeight: 600 }}>{donor.firstName}</td>
                      <td>{donor.age}</td>
                      <td style={{ fontSize: 12 }}>{donor.racialBackground}</td>
                      <td style={{ fontSize: 12 }}>{donor.education || '—'}</td>
                      <td>{donor.featured && <span className="badge badge-warning">Featured</span>}</td>
                      <td>
                        <span className={`badge ${donor.availability === 'Available' ? 'badge-success' : donor.availability === 'Reserved' ? 'badge-warning' : 'badge-danger'}`}>
                          {donor.availability}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${donor.isActive ? 'badge-success' : 'badge-gray'}`}>
                          {donor.isActive ? 'Active' : 'Hidden'}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: 6 }}>
                          <button className="btn btn-secondary btn-sm" onClick={() => openEdit(donor)} title="Edit">
                            <Edit2 size={13} />
                          </button>
                          <button className="btn btn-danger btn-sm" onClick={() => handleDelete(donor._id)} title="Delete">
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ padding: '16px 24px', borderTop: '1px solid var(--mid-gray)' }}>
              <div className="pagination">
                <span style={{ fontSize: 12, color: 'var(--text-muted)', marginRight: 'auto' }}>
                  Showing {donors.length} of {pagination.total || 0} donors
                </span>
                <button className="page-btn" onClick={() => setPage(p => p - 1)} disabled={page <= 1}><ChevronLeft size={14} /></button>
                <button className="page-btn" onClick={() => setPage(p => p + 1)} disabled={page >= (pagination.pages || 1)}><ChevronRight size={14} /></button>
              </div>
            </div>
          </>
        )}
      </div>

      {showModal && (
        <DonorModal
          donor={editDonor}
          onClose={() => { setShowModal(false); setEditDonor(null); }}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default Donors;
