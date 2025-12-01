# 🎬 Cinema Booking System - Hệ Thống Đặt Vé Xem Phim

Dự án đặt vé xem phim cho bộ phim **"ĐỐI"** tại Lotte Cinema Ninh Kiều - Cần Thơ.

## 🌟 Tính Năng

### User Features
- ✅ Đăng ký/Đăng nhập tài khoản
- ✅ Xem thông tin chi tiết phim
- ✅ Chọn ghế (tối đa 5 ghế, không được bỏ lỗ)
- ✅ Giữ ghế trong 10 phút
- ✅ Thanh toán qua QR Code chuyển khoản
- ✅ Xem danh sách vé đã đặt

### Admin Features
- ✅ Quản lý tất cả đơn đặt vé
- ✅ Xác nhận thanh toán
- ✅ Lọc theo trạng thái

## 🛠️ Công Nghệ Sử Dụng

- **Frontend**: React.js 18
- **Backend**: Node.js + Express.js
- **Database**: MongoDB Atlas
- **Authentication**: JWT + bcryptjs
- **Styling**: Custom CSS (Responsive Design)

## 📋 Yêu Cầu Hệ Thống

- Node.js >= 14.x
- npm hoặc yarn
- MongoDB Atlas account (đã được cấu hình)

## 🚀 Hướng Dẫn Cài Đặt

### 1. Clone hoặc tải dự án về

```bash
cd d:\CinemaProject
```

### 2. Cài đặt Backend

```bash
# Di chuyển vào thư mục backend
cd backend

# Cài đặt dependencies
npm install

# Khởi động server (development mode)
npm run dev

# Hoặc khởi động server (production mode)
npm start
```

Backend sẽ chạy tại: `http://localhost:5000`

### 3. Cài đặt Frontend

Mở terminal mới:

```bash
# Di chuyển vào thư mục frontend
cd d:\CinemaProject\frontend

# Cài đặt dependencies
npm install

# Khởi động ứng dụng
npm start
```

Frontend sẽ chạy tại: `http://localhost:3000`

## 🔑 Tài Khoản Mặc Định

### Admin Account
- **Username**: `admin123`
- **Password**: `Admin123@`

Tài khoản admin được tạo tự động khi khởi động backend lần đầu.

## 📱 Thông Tin Phim

- **Tên phim**: ĐỐI
- **Thể loại**: Gia Đình, Chính Kịch
- **Đạo diễn**: Nguyễn Tấn Phát, Huỳnh Phú Thịnh
- **Diễn viên**: Khánh Duy, Thành Nhân, Khazsar
- **Thời lượng**: 50 phút
- **Ngày chiếu**: 28/12/2024
- **Giờ chiếu**: 18h30
- **Địa điểm**: Lotte Cinema Ninh Kiều - Thành Phố Cần Thơ
- **Giá vé**: 99.000 VNĐ (đồng giá)

## 💳 Thông Tin Thanh Toán

- **Ngân hàng**: MB BANK
- **STK**: 0772967049
- **Chủ TK**: PHAN THANH HUNG

## 🏗️ Cấu Trúc Dự Án

```
CinemaProject/
├── backend/
│   ├── config/
│   │   └── database.js          # Cấu hình MongoDB
│   ├── middleware/
│   │   └── auth.js              # JWT authentication middleware
│   ├── models/
│   │   ├── User.js              # User schema
│   │   ├── Booking.js           # Booking schema
│   │   └── Seat.js              # Seat schema
│   ├── routes/
│   │   ├── auth.js              # Authentication routes
│   │   ├── seats.js             # Seat management routes
│   │   └── bookings.js          # Booking routes
│   ├── .env                     # Environment variables
│   ├── server.js                # Main server file
│   └── package.json
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── context/
    │   │   └── AuthContext.js   # Authentication context
    │   ├── pages/
    │   │   ├── Login.js         # Login page
    │   │   ├── Register.js      # Registration page
    │   │   ├── Home.js          # Movie info page
    │   │   ├── SeatSelection.js # Seat selection page
    │   │   ├── Payment.js       # Payment page
    │   │   ├── MyBookings.js    # User bookings page
    │   │   └── AdminDashboard.js # Admin dashboard
    │   ├── utils/
    │   │   └── api.js           # Axios configuration
    │   ├── App.js               # Main app component
    │   ├── index.js             # Entry point
    │   └── index.css            # Global styles
    └── package.json
```

## 🔄 Luồng Hoạt Động

1. **Đăng ký/Đăng nhập**: User tạo tài khoản hoặc đăng nhập
2. **Xem thông tin phim**: Hiển thị chi tiết phim và nút đặt vé
3. **Chọn ghế**: 
   - Chọn tối đa 5 ghế
   - Không được bỏ lỗ ghế trong cùng hàng
   - Giữ ghế trong 10 phút
4. **Thanh toán**: 
   - Hiển thị QR code và thông tin chuyển khoản
   - User chuyển khoản và gửi ảnh cho admin
5. **Xác nhận**: Admin xác nhận thanh toán
6. **Hoàn tất**: User xem vé đã đặt

## 🎨 Responsive Design

Website được tối ưu cho:
- 📱 Mobile (< 768px)
- 📱 Tablet (768px - 1024px)
- 💻 Desktop (> 1024px)

## 🔐 Bảo Mật

- ✅ Mật khẩu được hash bằng bcryptjs
- ✅ JWT authentication cho API
- ✅ Protected routes cho admin
- ✅ Input validation

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Đăng ký tài khoản
- `POST /api/auth/login` - Đăng nhập

### Seats
- `GET /api/seats` - Lấy danh sách ghế
- `POST /api/seats/reserve` - Giữ ghế (Private)
- `POST /api/seats/release` - Hủy giữ ghế (Private)

### Bookings
- `POST /api/bookings` - Tạo đơn đặt vé (Private)
- `GET /api/bookings/my-bookings` - Xem vé của tôi (Private)
- `GET /api/bookings/all` - Xem tất cả vé (Admin)
- `PUT /api/bookings/:id/confirm` - Xác nhận vé (Admin)
- `DELETE /api/bookings/:id` - Hủy vé (Private)

## 🐛 Troubleshooting

### Backend không khởi động được
- Kiểm tra MongoDB connection string trong `.env`
- Đảm bảo đã cài đặt tất cả dependencies: `npm install`

### Frontend không kết nối được Backend
- Kiểm tra backend đang chạy tại port 5000
- Kiểm tra proxy trong `frontend/package.json`

### Lỗi authentication
- Xóa localStorage và đăng nhập lại
- Kiểm tra JWT_SECRET trong `.env`

## 📞 Hỗ Trợ

Nếu gặp vấn đề, vui lòng kiểm tra:
1. MongoDB đã được kết nối chưa
2. Tất cả dependencies đã được cài đặt
3. Port 5000 và 3000 không bị sử dụng bởi ứng dụng khác

## 📄 License

MIT License - Dự án học tập và phát triển cá nhân

---

**Phát triển bởi**: Cinema Booking Team
**Ngày tạo**: December 2024
