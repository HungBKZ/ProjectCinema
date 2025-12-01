import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import './Payment.css';

const TICKET_PRICE = 99000;
const QR_IMAGE = 'https://res.cloudinary.com/dvucotc8z/image/upload/v1764607722/z7282799235046_5979fd1d33ff4406d2e1701f21d139a3_pgtiih.jpg';

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const bookingCreatedRef = useRef(false);
  const bookingIdRef = useRef(null);

  const selectedSeats = location.state?.selectedSeats || [];

  const createBooking = async () => {
    if (bookingCreatedRef.current) return; // Prevent duplicate booking
    bookingCreatedRef.current = true;
    
    try {
      setLoading(true);
      // Tạo booking và khóa ghế luôn (không có thời gian hết hạn)
      const response = await api.post('/bookings', {
        seatIds: selectedSeats
      });
      bookingIdRef.current = response.data._id;
      setLoading(false);
    } catch (error) {
      setError(error.response?.data?.message || 'Không thể tạo đơn đặt vé');
      bookingCreatedRef.current = false;
      setLoading(false);
    }
  };

  const handleGoBack = async () => {
    try {
      // Xóa booking nếu đã tạo
      if (bookingIdRef.current) {
        await api.delete(`/bookings/${bookingIdRef.current}`);
      }
      // Release ghế
      if (selectedSeats.length > 0) {
        await api.post('/seats/release', { seatIds: selectedSeats });
      }
    } catch (error) {
      console.error('Error cleaning up:', error);
    }
    navigate('/seat-selection');
  };

  useEffect(() => {
    if (selectedSeats.length === 0) {
      navigate('/seat-selection');
      return;
    }

    createBooking();

    // Cleanup khi unmount hoặc user đóng trang/bấm back
    const handleBeforeUnload = () => {
      if (bookingIdRef.current && selectedSeats.length > 0) {
        // Sử dụng sendBeacon để đảm bảo request được gửi trước khi trang đóng
        const blob = new Blob([JSON.stringify({ seatIds: selectedSeats })], {
          type: 'application/json'
        });
        navigator.sendBeacon(
          `${api.defaults.baseURL}/seats/release`,
          blob
        );
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      // Cleanup khi navigate đi (không phải do confirm/cancel)
      if (bookingIdRef.current && window.location.pathname === '/payment') {
        api.post('/seats/release', { seatIds: selectedSeats }).catch(() => {});
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalAmount = selectedSeats.length * TICKET_PRICE;

  if (loading) {
    return <div className="loading">Đang xử lý...</div>;
  }

  return (
    <div className="payment-container">
      <header className="payment-header">
        <div className="header-content">
          <h1>💳 Thanh Toán</h1>
          <div className="header-actions">
            <button 
              onClick={handleGoBack}
              className="btn btn-secondary"
            >
              ← Quay lại
            </button>
            <button onClick={logout} className="btn btn-outline">
              Đăng xuất
            </button>
          </div>
        </div>
      </header>

      <main className="payment-main">
        {error && <div className="error-message">{error}</div>}

        <div className="payment-layout">
          <div className="payment-info">
            <h2>Thông Tin Đặt Vé</h2>

            <div className="info-section">
              <h3>Thông Tin Khách Hàng</h3>
              <div className="info-grid">
                <div className="info-item">
                  <span className="label">Họ và tên:</span>
                  <span className="value">{user?.firstName} {user?.lastName}</span>
                </div>
                <div className="info-item">
                  <span className="label">Email:</span>
                  <span className="value">{user?.email}</span>
                </div>
                <div className="info-item">
                  <span className="label">Số điện thoại:</span>
                  <span className="value">{user?.phone}</span>
                </div>
              </div>
            </div>

            <div className="info-section">
              <h3>Thông Tin Phim</h3>
              <div className="info-grid">
                <div className="info-item">
                  <span className="label">Tên phim:</span>
                  <span className="value">ĐỐI</span>
                </div>
                <div className="info-item">
                  <span className="label">Ngày chiếu:</span>
                  <span className="value">28/12/2024</span>
                </div>
                <div className="info-item">
                  <span className="label">Giờ chiếu:</span>
                  <span className="value">18h30</span>
                </div>
                <div className="info-item">
                  <span className="label">Địa điểm:</span>
                  <span className="value">Lotte Cinema Ninh Kiều - Cần Thơ</span>
                </div>
              </div>
            </div>

            <div className="info-section">
              <h3>Chi Tiết Đặt Vé</h3>
              <div className="ticket-details">
                <div className="seats-selected">
                  <span className="label">Ghế đã chọn:</span>
                  <div className="seat-badges">
                    {selectedSeats.map(seat => (
                      <span key={seat} className="seat-badge">{seat}</span>
                    ))}
                  </div>
                </div>
                <div className="price-breakdown">
                  <div className="price-item">
                    <span>Số lượng ghế:</span>
                    <span>{selectedSeats.length}</span>
                  </div>
                  <div className="price-item">
                    <span>Giá vé:</span>
                    <span>{TICKET_PRICE.toLocaleString('vi-VN')} VNĐ/ghế</span>
                  </div>
                  <div className="price-item total">
                    <span>Tổng tiền:</span>
                    <span>{totalAmount.toLocaleString('vi-VN')} VNĐ</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="payment-qr">
            <h2>Thanh Toán Chuyển Khoản</h2>
            
            <div className="qr-section">
              <img src={QR_IMAGE} alt="QR Code" className="qr-code" />
              
              <div className="bank-info">
                <h3>Thông Tin Chuyển Khoản</h3>
                <div className="bank-details">
                  <div className="bank-item">
                    <span className="label">Ngân hàng:</span>
                    <span className="value">MB BANK</span>
                  </div>
                  <div className="bank-item">
                    <span className="label">Số tài khoản:</span>
                    <span className="value highlight">0772967049</span>
                  </div>
                  <div className="bank-item">
                    <span className="label">Chủ tài khoản:</span>
                    <span className="value">PHAN THANH HUNG</span>
                  </div>
                  <div className="bank-item">
                    <span className="label">Số tiền:</span>
                    <span className="value highlight">{totalAmount.toLocaleString('vi-VN')} VNĐ</span>
                  </div>
                  <div className="bank-item">
                    <span className="label">Nội dung:</span>
                    <span className="value highlight">
                      {user?.phone} {selectedSeats.join(' ')}
                    </span>
                  </div>
                </div>
              </div>

              <div className="payment-notice">
                <h4>⚠️ Lưu Ý Quan Trọng</h4>
                <ul>
                  <li>Vui lòng chuyển khoản đúng số tiền: <strong>{totalAmount.toLocaleString('vi-VN')} VNĐ</strong></li>
                  <li>Ghi đúng nội dung chuyển khoản để xác nhận nhanh</li>
                  <li>Sau khi chuyển khoản, vui lòng chụp màn hình và gửi cho admin qua Zalo/Messenger</li>
                  <li>Admin sẽ xác nhận vé của bạn trong thời gian sớm nhất</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Payment;
