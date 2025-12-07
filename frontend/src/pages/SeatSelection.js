import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import './SeatSelection.css';

const TICKET_PRICE = 99000;

const SeatSelection = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Seat layout based on the image
  const seatLayout = {
    'A': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
    'B': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
    'C': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
    'D': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
    'E': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
    'F': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
    'G': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
    'H': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
    'I': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
    'J': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
    'K': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]
  };

  useEffect(() => {
    fetchSeats();
    fetchUserBookings();
    const interval = setInterval(fetchSeats, 5000); // Refresh every 5 seconds
    
    // Cleanup: Release ghế khi unmount component
    return () => {
      clearInterval(interval);
      if (selectedSeats.length > 0) {
        api.post('/seats/release', { seatIds: selectedSeats }).catch(() => {});
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchSeats = async () => {
    try {
      const response = await api.get('/seats');
      setSeats(response.data);
      setLoading(false);
    } catch (error) {
      setError('Không thể tải danh sách ghế');
      setLoading(false);
    }
  };

  const fetchUserBookings = async () => {
    try {
      const response = await api.get('/bookings/my-bookings');
      // eslint-disable-next-line no-unused-vars
      const activeBookings = response.data.filter(b => 
        b.status === 'pending' || b.status === 'confirmed'
      );
    } catch (error) {
      console.error('Error fetching user bookings:', error);
    }
  };

  const getSeatStatus = (row, number) => {
    const seat = seats.find(s => s.row === row && s.number === number);
    if (!seat) return 'unavailable';
    
    if (seat.isBooked) return 'booked';
    if (seat.isReserved && seat.reservedBy !== user.id) return 'reserved';
    if (seat.isReserved && seat.reservedBy === user.id) return 'my-reserved';
    
    const seatId = `${row}${number}`;
    if (selectedSeats.includes(seatId)) return 'selected';
    
    return 'available';
  };

  const handleSeatClick = (row, number) => {
    const seatId = `${row}${number}`;
    const status = getSeatStatus(row, number);

    if (status === 'booked' || status === 'reserved') {
      return; // Cannot select
    }

    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatId));
      setError('');
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
      setError('');
    }
  };

  const handleProceedToPayment = async () => {
    if (selectedSeats.length === 0) {
      setError('Vui lòng chọn ít nhất 1 ghế');
      return;
    }

    try {
      setLoading(true);
      // Reserve ghế trước khi vào trang thanh toán
      await api.post('/seats/reserve', { seatIds: selectedSeats });
      // Chuyển sang trang thanh toán (sẽ tự động tạo booking và khóa ghế)
      navigate('/payment', { state: { selectedSeats } });
    } catch (error) {
      setError(error.response?.data?.message || 'Không thể giữ ghế');
      setLoading(false);
    }
  };

  const handleGoBack = async () => {
    if (selectedSeats.length > 0) {
      try {
        await api.post('/seats/release', { seatIds: selectedSeats });
      } catch (error) {
        console.error('Error releasing seats:', error);
      }
    }
    navigate('/');
  };



  if (loading) {
    return <div className="loading">Đang tải...</div>;
  }

  return (
    <div className="seat-selection-container">
      <header className="seat-header">
        <div className="header-content">
          <h1>🎬 Chọn Ghế</h1>
          <div className="header-actions">
            <button onClick={handleGoBack} className="btn btn-secondary">
              ← Quay lại
            </button>
            <button onClick={logout} className="btn btn-outline">
              Đăng xuất
            </button>
          </div>
        </div>
      </header>

      <main className="seat-main">
        <div className="screen-section">
          <div className="screen">MÀN HÌNH</div>
        </div>

        <div className="seat-map">
          {Object.entries(seatLayout).map(([row, numbers]) => (
            <div key={row} className="seat-row">
              <span className="row-label">{row}</span>
              <div className="seats">
                {Array.from({ length: 21 }, (_, i) => i + 1).map(number => {
                  if (!numbers.includes(number)) {
                    return <div key={number} className="seat-placeholder"></div>;
                  }

                  const status = getSeatStatus(row, number);
                  // Thêm class cho khoảng cách
                  let seatClass = `seat ${status}`;
                  if (number === 5 || number === 19) {
                    seatClass += ' seat-gap-before';
                  }
                  
                  return (
                    <div
                      key={number}
                      className={seatClass}
                      onClick={() => handleSeatClick(row, number)}
                    >
                      {number}
                    </div>
                  );
                })}
              </div>
              <span className="row-label">{row}</span>
            </div>
          ))}
        </div>

        <div className="legend">
          <div className="legend-item">
            <div className="seat available-demo"></div>
            <span>Còn trống</span>
          </div>
          <div className="legend-item">
            <div className="seat selected-demo"></div>
            <span>Đang chọn</span>
          </div>
          <div className="legend-item">
            <div className="seat reserved-demo"></div>
            <span>Đang giữ</span>
          </div>
          <div className="legend-item">
            <div className="seat booked-demo"></div>
            <span>Đã đặt</span>
          </div>
        </div>

        <div className="booking-summary">
          {error && <div className="error-message">{error}</div>}

          <div className="summary-content">
            <div className="summary-item">
              <span>Ghế đã chọn:</span>
              <span className="selected-seats-list">
                {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'Chưa chọn'}
              </span>
            </div>
            <div className="summary-item">
              <span>Số lượng:</span>
              <span>{selectedSeats.length} ghế</span>
            </div>
            <div className="summary-item total">
              <span>Tổng tiền:</span>
              <span>{(selectedSeats.length * TICKET_PRICE).toLocaleString('vi-VN')} VNĐ</span>
            </div>
          </div>

          <div className="action-buttons">
            {selectedSeats.length > 0 && (
              <button onClick={handleProceedToPayment} className="btn btn-primary">
                Tiếp Tục Thanh Toán
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SeatSelection;
