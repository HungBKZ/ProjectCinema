import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const MOVIE_INFO = {
  title: 'ĐỐI',
  poster: 'https://res.cloudinary.com/dvucotc8z/image/upload/v1764607026/IMG_7307_fsmlxh.jpg',
  description: `Bộ phim lấy cảm hứng từ những chia sẻ có thật của người trẻ sống chung với "rối loạn cảm xúc lưỡng cực", đặc biệt là những người mang trong mình sang chấn tuổi thơ không được nhìn thấy.

"ĐỐI" là hành trình bên trong một tâm trí bị chia cắt bởi hưng cảm – trầm cảm – và ký ức. Một nỗ lực để được nhìn thấy, không phải bởi người khác, mà bởi chính mình.`,
  genre: 'Gia Đình, Chính Kịch',
  director: 'Nguyễn Tấn Phát, Huỳnh Phú Thịnh',
  cast: 'Khánh Duy, Thành Nhân, Khazsar',
  language: 'Phụ đề Tiếng Việt - Anh',
  duration: '50 phút',
  releaseDate: '28/12/2024',
  showtime: '18h30',
  location: 'Lotte Cinema Ninh Kiều - Thành Phố Cần Thơ',
  price: '99.000 VNĐ'
};

const Home = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="header-content">
          <h1>🎬 Cinema Booking</h1>
          <div className="header-actions">
            <span className="user-name">Xin chào, {user?.firstName}!</span>
            <button onClick={() => navigate('/profile')} className="btn btn-secondary">
              👤 Hồ sơ
            </button>
            <button onClick={() => navigate('/my-bookings')} className="btn btn-secondary">
              🎫 Vé của tôi
            </button>
            <button onClick={logout} className="btn btn-outline">
              Đăng xuất
            </button>
          </div>
        </div>
      </header>

      <main className="home-main">
        <div className="movie-section">
          <div className="movie-poster">
            <img src={MOVIE_INFO.poster} alt={MOVIE_INFO.title} />
          </div>

          <div className="movie-details">
            <h1 className="movie-title">{MOVIE_INFO.title}</h1>
            
            <div className="movie-info-grid">
              <div className="info-item">
                <span className="info-label">🎭 Thể loại:</span>
                <span className="info-value">{MOVIE_INFO.genre}</span>
              </div>

              <div className="info-item">
                <span className="info-label">🎬 Đạo diễn:</span>
                <span className="info-value">{MOVIE_INFO.director}</span>
              </div>

              <div className="info-item">
                <span className="info-label">⭐ Diễn viên:</span>
                <span className="info-value">{MOVIE_INFO.cast}</span>
              </div>

              <div className="info-item">
                <span className="info-label">🌐 Ngôn ngữ:</span>
                <span className="info-value">{MOVIE_INFO.language}</span>
              </div>

              <div className="info-item">
                <span className="info-label">⏱️ Thời lượng:</span>
                <span className="info-value">{MOVIE_INFO.duration}</span>
              </div>

              <div className="info-item">
                <span className="info-label">📅 Ngày chiếu:</span>
                <span className="info-value">{MOVIE_INFO.releaseDate}</span>
              </div>

              <div className="info-item">
                <span className="info-label">🕐 Giờ chiếu:</span>
                <span className="info-value">{MOVIE_INFO.showtime}</span>
              </div>

              <div className="info-item">
                <span className="info-label">📍 Địa điểm:</span>
                <span className="info-value">{MOVIE_INFO.location}</span>
              </div>

              <div className="info-item price-highlight">
                <span className="info-label">💰 Giá vé:</span>
                <span className="info-value">{MOVIE_INFO.price}</span>
              </div>
            </div>

            <div className="movie-description">
              <h3>Nội dung phim:</h3>
              <p>{MOVIE_INFO.description}</p>
            </div>

            <button 
              onClick={() => navigate('/seat-selection')} 
              className="btn btn-book"
            >
              Đặt Vé Ngay
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
