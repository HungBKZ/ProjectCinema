import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await api.post('/auth/forgot-password', { email });
      setSuccess(true);
    } catch (error) {
      setError(error.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="forgot-password-container">
        <div className="forgot-password-card success-card">
          <div className="success-icon">✅</div>
          <h2>Email Đã Được Gửi!</h2>
          <p>Mật khẩu mới đã được gửi đến email <strong>{email}</strong></p>
          <p className="note">Vui lòng kiểm tra hộp thư của bạn (kể cả thư spam)</p>
          <Link to="/login" className="btn btn-primary">
            Đăng nhập ngay
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card">
        <div className="forgot-header">
          <div className="forgot-icon">🔐</div>
          <h2>Quên Mật Khẩu?</h2>
          <p>Nhập email của bạn để nhận mật khẩu mới</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Nhập email đã đăng ký"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary btn-full"
            disabled={loading}
          >
            {loading ? '⏳ Đang gửi...' : '📧 Gửi mật khẩu mới'}
          </button>
        </form>

        <div className="forgot-footer">
          <Link to="/login">← Quay lại đăng nhập</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
