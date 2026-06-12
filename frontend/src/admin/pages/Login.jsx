import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { login, setupAdmin } from '../utils/api';
import { Eye, EyeOff, Lock, Mail, Shield } from 'lucide-react';
import '../admin.css';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [setupMode, setSetupMode] = useState(false);
  const { loginAdmin } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      let res;
      if (setupMode) {
        res = await setupAdmin(data);
        toast.success('Admin account created!');
      } else {
        res = await login(data);
      }
      loginAdmin(res.token, res.admin);
      toast.success(`Welcome back, ${res.admin.username}!`);
      navigate('/admin');
    } catch (err) {
      toast.error(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-app">
    <div className="login-page">
      <div className="login-left">
        <div className="login-brand">
          <div className="login-logo">
            <span className="logo-l">Lucina</span>
            <span className="logo-eb">Egg Bank</span>
          </div>
          <div className="login-tagline">Your trusted partner in building families for over 30 years.</div>
        </div>
        <div className="login-stats">
          {[
            { num: '3,500+', label: 'Screened Donors' },
            { num: '92.2%', label: 'Egg Survival Rate' },
            { num: '30+', label: 'Years of Excellence' },
          ].map(s => (
            <div key={s.label} className="login-stat">
              <div className="login-stat-num">{s.num}</div>
              <div className="login-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="login-right">
        <div className="login-card">
          <div className="login-card-icon">
            <Shield size={28} color="var(--primary)" />
          </div>
          <h2 className="login-title">Admin {setupMode ? 'Setup' : 'Login'}</h2>
          <p className="login-desc">
            {setupMode
              ? 'Create your initial admin account to get started.'
              : 'Sign in to access the Lucina admin dashboard.'}
          </p>

          <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {setupMode && (
              <div className="form-group">
                <label className="form-label">Username</label>
                <div className="input-wrapper">
                  <input
                    {...register('username', { required: 'Username required' })}
                    className="form-input"
                    placeholder="admin"
                  />
                </div>
                {errors.username && <p className="form-error">{errors.username.message}</p>}
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div className="input-wrapper">
                <Mail size={16} className="input-icon" />
                <input
                  {...register('email', { required: 'Email required', pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email' } })}
                  type="email"
                  className="form-input input-with-icon"
                  placeholder="admin@lucinaeggbank.com"
                />
              </div>
              {errors.email && <p className="form-error">{errors.email.message}</p>}
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="input-wrapper">
                <Lock size={16} className="input-icon" />
                <input
                  {...register('password', { required: 'Password required', minLength: { value: 6, message: 'Min 6 characters' } })}
                  type={showPass ? 'text' : 'password'}
                  className="form-input input-with-icon input-with-suffix"
                  placeholder="••••••••"
                />
                <button type="button" className="input-suffix" onClick={() => setShowPass(!showPass)}>
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p className="form-error">{errors.password.message}</p>}
            </div>

            <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: 8 }} disabled={loading}>
              {loading ? (
                <><span className="spinner" style={{ width: 18, height: 18, borderWidth: 2 }}></span> {setupMode ? 'Creating...' : 'Signing in...'}</>
              ) : (setupMode ? 'Create Admin Account' : 'Sign In')}
            </button>
          </form>

         

          
        </div>
      </div>

      <style>{`
        .login-page {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
        }
        .login-left {
          background: linear-gradient(145deg, #0f1929, #162236);
          padding: 60px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .login-brand { margin-top: auto; }
        .login-logo {
          display: flex;
          flex-direction: column;
          margin-bottom: 20px;
        }
        .logo-l { font-size: 48px; font-weight: 700; color: var(--primary-light); letter-spacing: -1px; }
        .logo-eb { font-size: 14px; color: rgba(255,255,255,0.4); letter-spacing: 3px; text-transform: uppercase; }
        .login-tagline {
          font-size: 18px;
          color: rgba(255,255,255,0.6);
          line-height: 1.6;
          max-width: 360px;
        }
        .login-stats {
          display: flex;
          gap: 40px;
          margin-bottom: auto;
          margin-top: 60px;
        }
        .login-stat { text-align: center; }
        .login-stat-num { font-size: 32px; font-weight: 700; color: var(--primary-light); }
        .login-stat-label { font-size: 12px; color: rgba(255,255,255,0.4); margin-top: 4px; }
        .login-right {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
          background: var(--light);
        }
        .login-card {
          background: white;
          border-radius: 20px;
          padding: 48px 40px;
          box-shadow: var(--shadow-md);
          border: 1px solid var(--mid-gray);
          width: 100%;
          max-width: 420px;
        }
        .login-card-icon {
          width: 56px; height: 56px;
          background: var(--primary-pale);
          border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 20px;
        }
        .login-title { font-size: 24px; font-weight: 700; color: var(--dark); margin-bottom: 8px; }
        .login-desc { font-size: 14px; color: var(--text-muted); margin-bottom: 28px; }
        .input-wrapper { position: relative; }
        .input-icon { position: absolute; left: 13px; top: 50%; transform: translateY(-50%); color: var(--text-muted); }
        .input-suffix { position: absolute; right: 13px; top: 50%; transform: translateY(-50%); color: var(--text-muted); padding: 4px; }
        .input-with-icon { padding-left: 40px !important; }
        .input-with-suffix { padding-right: 40px !important; }
        .login-hint {
          margin-top: 20px;
          padding: 12px 16px;
          background: var(--light);
          border-radius: 8px;
          border: 1px solid var(--mid-gray);
          font-size: 12px;
          color: var(--text-muted);
        }
        .login-hint code {
          display: block;
          margin-top: 4px;
          font-size: 13px;
          color: var(--primary);
          font-weight: 600;
        }
        @media (max-width: 768px) {
          .login-page { grid-template-columns: 1fr; }
          .login-left { display: none; }
          .login-card { padding: 32px 24px; }
        }
      `}</style>
    </div>
    </div>
  );
};

export default Login;
