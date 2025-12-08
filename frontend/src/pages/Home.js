import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const MOVIE_INFO = {
  title: 'EYESEE Showcase: "Refocus - The Next Frame"',
  poster: 'https://res.cloudinary.com/dvucotc8z/image/upload/v1765070209/EyeSee_Show_bzgmu0.png',
  description: `Một show đánh dấu bước chuyển mình mạnh mẽ của EYESEE, nơi những mảnh ghép con người tự tụ hợp lại với nhau, nơi ánh nhìn mới được khai mở, nơi trải nghiệm vượt khỏi khuôn khổ thường thấy. Sự kiện mang đến không khí hoàn toàn mới lạ, mở màn cho hành trình tái định nghĩa bản sắc sáng tạo của EYESEE. Tại đây, hai bộ phim được công chiếu như hai mảnh ghép quan trọng, hé lộ những câu chuyện sâu sắc, đầy cảm xúc và chất nghệ thuật đặc trưng. Tất cả hòa quyện thành một đêm trình chiếu cuốn hút và khó đoán, khiến mỗi khoảnh khắc đều trở thành một trải nghiệm đáng nhớ.`,
  organizer: 'EYESEE MEDIA PRODUCTION',
  genre: 'Gia Đình, Chính Kịch',
  director: 'Nguyễn Tấn Phát, Huỳnh Phú Thịnh',
  cast: 'Khánh Duy, Thành Nhân, Khazsar',
  language: 'Phụ đề Tiếng Việt - Anh',
  duration: '2 tiếng 30 phút',
  releaseDate: '28/12/2025',
  arrivalTime: '18 giờ',
  showtime: '19h15',
  location: 'TTTM Lotte Mart, 84 Đ. Mậu Thân, Cái Khế, Ninh Kiều, Cần Thơ, Việt Nam',
  price: '99.000 VNĐ'
};

const Home = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="header-content">
          <h1>Showcase Booking</h1>
          <div className="header-actions">
            <span className="user-name">Xin chào, {user?.firstName}!</span>
            <button onClick={() => navigate('/profile')} className="btn btn-secondary">
              Hồ sơ
            </button>
            <button onClick={() => navigate('/my-bookings')} className="btn btn-secondary">
              Vé của tôi
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
                <span className="info-label">Đơn vị tổ chức:</span>
                <span className="info-value">{MOVIE_INFO.organizer}</span>
              </div>

              <div className="info-item">
                <span className="info-label">Ngôn ngữ:</span>
                <span className="info-value">{MOVIE_INFO.language}</span>
              </div>

              <div className="info-item">
                <span className="info-label">Thời lượng:</span>
                <span className="info-value">{MOVIE_INFO.duration}</span>
              </div>

              <div className="info-item">
                <span className="info-label">Ngày chiếu:</span>
                <span className="info-value">{MOVIE_INFO.releaseDate}</span>
              </div>

              <div className="info-item">
                <span className="info-label">Có mặt lúc:</span>
                <span className="info-value">{MOVIE_INFO.arrivalTime}</span>
              </div>

              <div className="info-item">
                <span className="info-label">Giờ chiếu:</span>
                <span className="info-value">{MOVIE_INFO.showtime}</span>
              </div>

              <div className="info-item">
                <span className="info-label">Địa điểm:</span>
                <span className="info-value">{MOVIE_INFO.location}</span>
              </div>

              <div className="info-item price-highlight">
                <span className="info-label">Giá vé:</span>
                <span className="info-value">{MOVIE_INFO.price}</span>
              </div>
            </div>

            <div className="movie-description">
              <h3>Nội dung:</h3>
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
