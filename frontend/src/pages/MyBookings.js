import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import './MyBookings.css';

const MyBookings = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBookings();
    // Refresh every 5 seconds
    const interval = setInterval(fetchBookings, 5000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await api.get('/bookings/my-bookings');
      setBookings(response.data);
      setLoading(false);
    } catch (error) {
      setError('Không thể tải danh sách vé');
      setLoading(false);
    }
  };

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
    <div className="my-bookings-container">
      <header className="bookings-header">
        <div className="header-content">
          <h1>Vé Của Tôi</h1>
          <div className="header-actions">
            <button onClick={() => navigate('/')} className="btn btn-secondary">
              Quay lại
            </button>
            <button onClick={logout} className="btn btn-outline">
              Đăng xuất
            </button>
          </div>
        </div>
      </header>

      <main className="bookings-main">
        {error && <div className="error-message">{error}</div>}

        {bookings.length === 0 ? (
          <div className="no-bookings">
            <p>Bạn chưa có vé nào</p>
            <button onClick={() => navigate('/seat-selection')} className="btn btn-primary">
              Đặt Vé Ngay
            </button>
          </div>
        ) : (
          <div className="bookings-list">
            {bookings.map(booking => {
              const badge = getStatusBadge(booking.status);
              return (
                <div key={booking._id} className="ticket-card">
                  <div className="ticket-header">
                    <h2>EYESEE Showcase: "Refocus - The Next Frame"</h2>
                    <span className={`status-badge ${badge.class}`}>
                      {badge.text}
                    </span>
                  </div>

                  <div className="ticket-body">
                    <div className="ticket-row">
                      <span className="label">Ngày chiếu:</span>
                      <span className="value">28/12/2025</span>
                    </div>

                    <div className="ticket-row">
                      <span className="label">Giờ chiếu:</span>
                      <span className="value">19h15</span>
                    </div>

                    <div className="ticket-row">
                      <span className="label">Địa điểm:</span>
                      <span className="value">TTTM Lotte Mart, Cần Thơ</span>
                    </div>

                    <div className="ticket-row seats">
                      <span className="label">Ghế:</span>
                      <div className="seats-badges">
                        {booking.seats?.map((seat, idx) => (
                          <span key={idx} className="seat-badge">
                            {seat.seatId}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="ticket-row total">
                      <span className="label">Tổng tiền:</span>
                      <span className="value">
                        {booking.totalAmount?.toLocaleString('vi-VN')} VNĐ
                      </span>
                    </div>

                    <div className="ticket-row">
                      <span className="label">Ngày đặt:</span>
                      <span className="value">
                        {new Date(booking.createdAt).toLocaleString('vi-VN')}
                      </span>
                    </div>

                    {booking.status === 'confirmed' && booking.confirmedAt && (
                      <div className="ticket-row">
                        <span className="label">Xác nhận lúc:</span>
                        <span className="value">
                          {new Date(booking.confirmedAt).toLocaleString('vi-VN')}
                        </span>
                      </div>
                    )}

                    {booking.status === 'pending' && (
                      <div className="pending-notice">
                        Vui lòng chuyển khoản và gửi ảnh chụp cho admin để xác nhận vé
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default MyBookings;
