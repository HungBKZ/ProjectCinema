# 🎬 HƯỚNG DẪN SỬ DỤNG NHANH

## ⚡ Cài Đặt Nhanh (Lần Đầu)

### Cách 1: Sử dụng Script Tự Động
```powershell
# Chạy lệnh này trong PowerShell
cd d:\CinemaProject
.\install.ps1
```

### Cách 2: Cài Đặt Thủ Công

**Bước 1: Cài đặt Backend**
```powershell
cd d:\CinemaProject\backend
npm install
```

**Bước 2: Cài đặt Frontend**
```powershell
cd d:\CinemaProject\frontend
npm install
```

## 🚀 Khởi Động Ứng Dụng

### Cách 1: Sử dụng Script Tự Động
```powershell
cd d:\CinemaProject
.\start.ps1
```

### Cách 2: Khởi Động Thủ Công

**Terminal 1 - Backend:**
```powershell
cd d:\CinemaProject\backend
npm run dev
```

**Terminal 2 - Frontend:**
```powershell
cd d:\CinemaProject\frontend
npm start
```

## 🌐 Truy Cập Website

- **Website**: http://localhost:3000
- **API Backend**: http://localhost:5000

## 🔑 Đăng Nhập

### Tài Khoản Admin (Có sẵn)
- Username: `admin123`
- Password: `Admin123@`

### Tài Khoản User
Đăng ký tài khoản mới tại trang Register

## 📱 Hướng Dẫn Sử Dụng

### Cho User (Khách Hàng)

1. **Đăng Ký/Đăng Nhập**
   - Truy cập http://localhost:3000
   - Nếu chưa có tài khoản, click "Đăng ký ngay"
   - Điền thông tin: Họ, Tên, Username, Email, SĐT, Mật khẩu

2. **Xem Thông Tin Phim**
   - Sau khi đăng nhập, bạn sẽ thấy thông tin phim "ĐỐI"
   - Xem chi tiết: thể loại, đạo diễn, giờ chiếu, địa điểm, giá vé

3. **Đặt Vé**
   - Click nút "Đặt Vé Ngay"
   - Chọn ghế trên sơ đồ (tối đa 5 ghế)
   - ⚠️ Lưu ý: Không được bỏ lỗ ghế trong cùng hàng
   - Click "Giữ Ghế (10 phút)" để giữ ghế trong 10 phút
   - Click "Tiếp Tục Thanh Toán"

4. **Thanh Toán**
   - Quét mã QR hoặc chuyển khoản theo thông tin:
     - Ngân hàng: MB BANK
     - STK: 0772967049
     - Chủ TK: PHAN THANH HUNG
     - Số tiền: (hiển thị trên màn hình)
     - Nội dung: (hiển thị trên màn hình)
   - Chụp ảnh màn hình chuyển khoản
   - Gửi ảnh cho admin qua Zalo/Messenger

5. **Xem Vé Đã Đặt**
   - Click "Vé của tôi" ở góc trên
   - Xem trạng thái vé (Chờ xác nhận / Đã xác nhận)

### Cho Admin

1. **Đăng Nhập**
   - Username: `admin123`
   - Password: `Admin123@`
   - Tự động chuyển đến trang Admin

2. **Quản Lý Đơn Đặt Vé**
   - Xem tất cả đơn đặt vé
   - Lọc theo trạng thái: Tất cả / Chờ xác nhận / Đã xác nhận

3. **Xác Nhận Thanh Toán**
   - Sau khi nhận ảnh chuyển khoản từ khách
   - Click "✓ Xác Nhận Thanh Toán"
   - Vé sẽ chuyển sang trạng thái "Đã xác nhận"

## 🎨 Tính Năng Đặc Biệt

✅ Giao diện responsive - tối ưu cho điện thoại
✅ Giữ ghế tự động trong 10 phút
✅ Không cho phép bỏ lỗ ghế
✅ Giới hạn tối đa 5 ghế/lần đặt
✅ Tự động làm mới danh sách ghế
✅ Bảo mật với JWT authentication

## ❓ Xử Lý Sự Cố

### Backend không chạy
```powershell
# Kiểm tra MongoDB connection
# Xem file backend\.env
# Đảm bảo MONGODB_URI đúng
```

### Frontend không hiển thị
```powershell
# Xóa cache và cài lại
cd d:\CinemaProject\frontend
Remove-Item node_modules -Recurse -Force
npm install
npm start
```

### Lỗi đăng nhập
- Xóa dữ liệu trình duyệt (Ctrl + Shift + Delete)
- Đăng ký tài khoản mới hoặc dùng tài khoản admin

## 📞 Thông Tin Phim

**ĐỐI**
- 📅 Ngày chiếu: 28/12/2024
- 🕐 Giờ chiếu: 18h30
- 📍 Lotte Cinema Ninh Kiều - Cần Thơ
- 💰 Giá vé: 99.000 VNĐ (tất cả ghế)

## 🛑 Tắt Ứng Dụng

- Nhấn `Ctrl + C` trong mỗi terminal
- Hoặc đóng cửa sổ PowerShell

---

💡 **Mẹo**: Bookmark trang http://localhost:3000 để truy cập nhanh!
