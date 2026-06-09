import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { getAllBlogs, createBlog, updateBlog, deleteBlog } from '../utils/api';
import { Plus, Edit2, Trash2, X, BookOpen, Eye } from 'lucide-react';

const CATEGORIES = ['Egg Donation', 'Intended Parents', 'Fertility', 'Success Stories', 'Health', 'News'];

const BlogModal = ({ blog, onClose, onSave }) => {
  const isEdit = !!blog;
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: blog || { isPublished: true, readTime: 5, category: 'Egg Donation', author: 'Lucina Egg Bank Team' }
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      let res;
      if (isEdit) {
        res = await updateBlog(blog._id, data);
      } else {
        res = await createBlog(data);
      }
      onSave(res.data, isEdit);
      toast.success(`Blog post ${isEdit ? 'updated' : 'created'}`);
      onClose();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: 780 }}>
        <div className="modal-header">
          <h3 style={{ fontSize: 18, fontWeight: 700 }}>{isEdit ? 'Edit Blog Post' : 'New Blog Post'}</h3>
          <button onClick={onClose} style={{ color: 'var(--text-muted)' }}><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="modal-body">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">Title <span style={{ color: 'var(--danger)' }}>*</span></label>
                <input {...register('title', { required: 'Title is required' })} className="form-input" placeholder="Blog post title..." />
                {errors.title && <p className="form-error">{errors.title.message}</p>}
              </div>

              <div className="form-group">
                <label className="form-label">Slug (auto-generated if empty)</label>
                <input {...register('slug')} className="form-input" placeholder="my-blog-post-slug" />
              </div>

              <div className="form-group">
                <label className="form-label">Category</label>
                <select {...register('category')} className="form-select">
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Author</label>
                <input {...register('author')} className="form-input" placeholder="Author name" />
              </div>

              <div className="form-group">
                <label className="form-label">Read Time (minutes)</label>
                <input {...register('readTime')} type="number" className="form-input" placeholder="5" min="1" />
              </div>

              <div className="form-group">
                <label className="form-label">Featured Image URL</label>
                <input {...register('image')} className="form-input" placeholder="https://images.unsplash.com/..." />
              </div>

              <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 20 }}>
                <input type="checkbox" {...register('isPublished')} id="isPublished" style={{ accentColor: 'var(--primary)', width: 16, height: 16 }} />
                <label htmlFor="isPublished" style={{ cursor: 'pointer', fontSize: 14, fontWeight: 500 }}>Published (visible on website)</label>
              </div>

              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">Excerpt (max 300 chars) <span style={{ color: 'var(--danger)' }}>*</span></label>
                <textarea
                  {...register('excerpt', { required: 'Excerpt is required', maxLength: { value: 300, message: 'Max 300 characters' } })}
                  className="form-textarea"
                  placeholder="Brief summary shown on the blog listing page..."
                  rows={3}
                />
                {errors.excerpt && <p className="form-error">{errors.excerpt.message}</p>}
              </div>

              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">Content (HTML supported) <span style={{ color: 'var(--danger)' }}>*</span></label>
                <textarea
                  {...register('content', { required: 'Content is required' })}
                  className="form-textarea"
                  placeholder="<h2>Introduction</h2><p>Your full blog content here...</p>"
                  rows={12}
                  style={{ fontFamily: 'monospace', fontSize: 13 }}
                />
                {errors.content && <p className="form-error">{errors.content.message}</p>}
              </div>

              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">Tags (comma separated)</label>
                <input {...register('tags')} className="form-input" placeholder="egg donation, fertility, IVF" />
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving...' : (isEdit ? 'Update Post' : 'Publish Post')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editBlog, setEditBlog] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('all');

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await getAllBlogs();
      setBlogs(res.data || []);
    } catch (err) { toast.error(err.message); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchBlogs(); }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this blog post? This cannot be undone.')) return;
    try {
      await deleteBlog(id);
      setBlogs(p => p.filter(b => b._id !== id));
      toast.success('Blog post deleted');
    } catch (err) { toast.error(err.message); }
  };

  const handleSave = (item, isEdit) => {
    if (isEdit) setBlogs(p => p.map(b => b._id === item._id ? item : b));
    else setBlogs(p => [item, ...p]);
  };

  const openEdit = (b) => { setEditBlog(b); setShowModal(true); };
  const openCreate = () => { setEditBlog(null); setShowModal(true); };

  const filtered = categoryFilter === 'all' ? blogs : blogs.filter(b => b.category === categoryFilter);

  return (
    <div>
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--dark)' }}>Blog Posts</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: 2 }}>Manage blog articles displayed on the website</p>
        </div>
        <button className="btn btn-primary" onClick={openCreate}>
          <Plus size={15} /> New Blog Post
        </button>
      </div>

      {/* Category Filters */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {['all', ...CATEGORIES].map(cat => (
          <button key={cat} onClick={() => setCategoryFilter(cat)}
            style={{
              padding: '7px 16px', borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: 'pointer',
              border: '1.5px solid', transition: 'all 0.2s',
              borderColor: categoryFilter === cat ? 'var(--primary)' : 'var(--mid-gray)',
              background: categoryFilter === cat ? 'var(--primary)' : 'white',
              color: categoryFilter === cat ? 'white' : 'var(--text)',
            }}
          >
            {cat === 'all' ? `All (${blogs.length})` : cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}><div className="spinner" /></div>
      ) : filtered.length === 0 ? (
        <div className="card">
          <div className="empty-state">
            <BookOpen size={40} color="var(--text-muted)" />
            <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 12 }}>No blog posts found</h3>
            <p style={{ marginTop: 6, fontSize: 13 }}>Create blog posts to display on the website.</p>
            <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={openCreate}><Plus size={14} /> Create First Post</button>
          </div>
        </div>
      ) : (
        <div className="card">
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Author</th>
                  <th>Read Time</th>
                  <th>Status</th>
                  <th>Published</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(b => (
                  <tr key={b._id}>
                    <td>
                      <div style={{ fontWeight: 600, fontSize: 13, maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {b.title}
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>/{b.slug}</div>
                    </td>
                    <td><span className="badge badge-primary" style={{ fontSize: 11 }}>{b.category}</span></td>
                    <td style={{ fontSize: 12, color: 'var(--text-muted)' }}>{b.author}</td>
                    <td style={{ fontSize: 12 }}>{b.readTime} min</td>
                    <td>
                      <span className={`badge ${b.isPublished ? 'badge-success' : 'badge-gray'}`}>
                        {b.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                      {new Date(b.publishedAt).toLocaleDateString()}
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <a href={`http://localhost:5173/blog/${b.slug}`} target="_blank" rel="noopener"
                          className="btn btn-secondary btn-sm" title="Preview">
                          <Eye size={13} />
                        </a>
                        <button className="btn btn-secondary btn-sm" onClick={() => openEdit(b)} title="Edit">
                          <Edit2 size={13} />
                        </button>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(b._id)} title="Delete">
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showModal && (
        <BlogModal blog={editBlog} onClose={() => { setShowModal(false); setEditBlog(null); }} onSave={handleSave} />
      )}
    </div>
  );
};

export default Blogs;
