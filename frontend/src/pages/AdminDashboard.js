import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all'); // all, pending, confirmed

  useEffect(() => {
    fetchBookings();
    const interval = setInterval(fetchBookings, 10000); // Refresh every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchBookings = async () => {
    try {
      console.log('Fetching bookings...');
      const response = await api.get('/bookings');
      console.log('Bookings response:', response.data);
      setBookings(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setError('Không thể tải danh sách đặt vé');
      setLoading(false);
    }
  };

  const handleConfirm = async (bookingId) => {
    try {
      await api.put(`/bookings/${bookingId}/confirm`);
      await fetchBookings();
      alert('Đã xác nhận đơn đặt vé thành công!');
    } catch (error) {
      alert(error.response?.data?.message || 'Không thể xác nhận đơn đặt vé');
    }
  };

  const handleCancelConfirmation = async (bookingId) => {
    if (!window.confirm('Bạn có chắc muốn hủy xác nhận booking này? Ghế sẽ được trả lại hệ thống.')) {
      return;
    }
    
    try {
      await api.put(`/bookings/${bookingId}/cancel-confirmation`);
      await fetchBookings();
      alert('Đã hủy xác nhận thành công!');
    } catch (error) {
      alert(error.response?.data?.message || 'Không thể hủy xác nhận');
    }
  };

  const filteredBookings = bookings.filter(booking => {
    if (filter === 'all') return true;
    if (filter === 'pending') return booking.status === 'pending';
    if (filter === 'confirmed') return booking.status === 'confirmed';
    return true;
  });

  const getStatusBadge = (status) => {
    const badges = {
      pending: { text: 'Chờ xác nhận', class: 'status-pending' },
      confirmed: { text: 'Đã xác nhận', class: 'status-confirmed' },
      cancelled: { text: 'Đã hủy', class: 'status-cancelled' },
      expired: { text: 'Hết hạn', class: 'status-expired' }
    };
    return badges[status] || badges.pending;
  };

  if (loading) {
    return <div className="loading">Đang tải...</div>;
  }

  return (
    <div className="admin-container">
      <header className="admin-header">
        <div className="header-content">
          <h1>Quản Lý Đặt Vé</h1>
          <div className="header-actions">
            <button onClick={() => navigate('/')} className="btn btn-secondary">
              Trang chủ
            </button>
            <button onClick={logout} className="btn btn-outline">
              Đăng xuất
            </button>
          </div>
        </div>
      </header>

      <main className="admin-main">
        {error && <div className="error-message">{error}</div>}

        <div className="filter-section">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            Tất cả ({bookings.length})
          </button>
          <button
            className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
            onClick={() => setFilter('pending')}
          >
            Chờ xác nhận ({bookings.filter(b => b.status === 'pending').length})
          </button>
          <button
            className={`filter-btn ${filter === 'confirmed' ? 'active' : ''}`}
            onClick={() => setFilter('confirmed')}
          >
            Đã xác nhận ({bookings.filter(b => b.status === 'confirmed').length})
          </button>
        </div>

        <div className="bookings-grid">
          {filteredBookings.length === 0 ? (
            <div className="no-bookings">
              Không có đơn đặt vé nào
            </div>
          ) : (
            filteredBookings.map(booking => {
              const badge = getStatusBadge(booking.status);
              return (
                <div key={booking._id} className="booking-card">
                  <div className="booking-header">
                    <span className={`status-badge ${badge.class}`}>
                      {badge.text}
                    </span>
                    <span className="booking-id">
                      #{booking._id.slice(-6)}
                    </span>
                  </div>

                  <div className="booking-info">
                    <div className="info-row">
                      <span className="label">Khách hàng:</span>
                      <span className="value">
                        {booking.user?.firstName} {booking.user?.lastName}
                      </span>
                    </div>

                    <div className="info-row">
                      <span className="label">Username:</span>
                      <span className="value">{booking.user?.username}</span>
                    </div>

                    <div className="info-row">
                      <span className="label">Email:</span>
                      <span className="value">{booking.user?.email}</span>
                    </div>

                    <div className="info-row">
                      <span className="label">Số điện thoại:</span>
                      <span className="value">{booking.user?.phone}</span>
                    </div>

                    <div className="info-row">
                      <span className="label">Ghế đã đặt:</span>
                      <div className="seats-list">
                        {booking.seats?.map((seat, idx) => (
                          <span key={idx} className="seat-tag">
                            {seat.seatId}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="info-row">
                      <span className="label">Tổng tiền:</span>
                      <span className="value amount">
                        {booking.totalAmount?.toLocaleString('vi-VN')} VNĐ
                      </span>
                    </div>

                    <div className="info-row">
                      <span className="label">Ngày đặt:</span>
                      <span className="value">
                        {new Date(booking.createdAt).toLocaleString('vi-VN')}
                      </span>
                    </div>

                    {booking.confirmedAt && (
                      <div className="info-row">
                        <span className="label">Ngày xác nhận:</span>
                        <span className="value">
                          {new Date(booking.confirmedAt).toLocaleString('vi-VN')}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="booking-actions">
                    {booking.status === 'pending' && (
                      <button
                        onClick={() => handleConfirm(booking._id)}
                        className="btn btn-confirm"
                      >
                        ✓ Xác Nhận Thanh Toán
                      </button>
                    )}
                    {(booking.status === 'pending' || booking.status === 'confirmed') && (
                      <button
                        onClick={() => handleCancelConfirmation(booking._id)}
                        className="btn btn-cancel"
                      >
                        ✕ Hủy Xác Nhận
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
