import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Success.css';

const Success = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  
  const bookingDetails = location.state?.bookingDetails;

  useEffect(() => {
    // Nếu không có booking details, redirect về home
    if (!bookingDetails) {
      navigate('/');
    }
  }, [bookingDetails, navigate]);

  if (!bookingDetails) {
    return null;
  }

  return (
    <div className="success-container">
      <header className="success-header">
        <div className="header-content">
          <h1>🎉 Cinema Booking</h1>
          <div className="header-actions">
            <button onClick={() => navigate('/')} className="btn btn-secondary">
              ← Trang chủ
            </button>
            <button onClick={logout} className="btn btn-outline">
              Đăng xuất
            </button>
          </div>
        </div>
      </header>

      <main className="success-main">
        <div className="success-card">
          <div className="success-icon">✅</div>
          <h1>Đặt Vé Thành Công!</h1>
          <p className="success-message">
            Cảm ơn bạn đã đặt vé. Vé của bạn đang chờ xác nhận từ admin.
          </p>

          <div className="booking-details">
            <h2>Thông Tin Đặt Vé</h2>
            
            <div className="detail-row">
              <span className="label">Sự kiện:</span>
              <span className="value">EYESEE Showcase: "Refocus - The Next Frame"</span>
            </div>

            <div className="detail-row">
              <span className="label">Ngày chiếu:</span>
              <span className="value">28/12/2025</span>
            </div>

            <div className="detail-row">
              <span className="label">Giờ chiếu:</span>
              <span className="value">19h15</span>
            </div>

            <div className="detail-row">
              <span className="label">Địa điểm:</span>
              <span className="value">TTTM Lotte Mart, Cần Thơ</span>
            </div>

            <div className="detail-row highlight">
              <span className="label">Ghế đã chọn:</span>
              <span className="value seats">
                {bookingDetails.seats?.map(seat => seat.seatId).join(', ')}
              </span>
            </div>

            <div className="detail-row highlight">
              <span className="label">Tổng tiền:</span>
              <span className="value amount">
                {bookingDetails.totalAmount?.toLocaleString('vi-VN')} VNĐ
              </span>
            </div>
          </div>

          <div className="next-steps">
            <h3>Bước Tiếp Theo</h3>
            <ul>
              <li>Vui lòng chụp màn hình bill chuyển khoản</li>
              <li>Gửi ảnh cho admin qua Zalo/Messenger để xác nhận</li>
              <li>Admin sẽ xác nhận vé của bạn trong thời gian sớm nhất</li>
              <li>Kiểm tra trạng thái vé trong mục "Vé của tôi"</li>
            </ul>
          </div>

          <div className="action-buttons">
            <button 
              onClick={() => navigate('/my-bookings')} 
              className="btn btn-primary"
            >
              Xem Vé Của Tôi
            </button>
            <button 
              onClick={() => navigate('/')} 
              className="btn btn-secondary"
            >
              Về Trang Chủ
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Success;
