# Hướng dẫn cấu hình Email cho Cinema Booking System

## 📧 Các tính năng Email đã được thêm:

1. **Quên mật khẩu**: Gửi mật khẩu mới qua email
2. **Xác nhận đặt vé**: Gửi email khi admin xác nhận thanh toán thành công

## 🔧 Cấu hình Gmail để gửi email

### Bước 1: Tạo App Password cho Gmail

1. Truy cập [Google Account](https://myaccount.google.com/)
2. Chọn **Security** (Bảo mật)
3. Bật **2-Step Verification** (Xác minh 2 bước) nếu chưa bật
4. Sau khi bật 2-Step Verification, quay lại **Security**
5. Tìm và chọn **App passwords** (Mật khẩu ứng dụng)
6. Chọn **Mail** và **Other (Custom name)**, đặt tên là "Cinema Booking"
7. Click **Generate** để tạo mật khẩu
8. **Sao chép** mật khẩu 16 ký tự (dạng: xxxx xxxx xxxx xxxx)

### Bước 2: Cập nhật file .env

Mở file `backend/.env` và cập nhật:

```env
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=xxxx xxxx xxxx xxxx
```

**Ví dụ:**
```env
EMAIL_USER=cinema.booking2025@gmail.com
EMAIL_PASSWORD=abcd efgh ijkl mnop
```

### Bước 3: Restart Backend Server

```powershell
cd backend
npm start
```

## 📱 Cấu hình Facebook Chat Button

Mở file `frontend/src/components/FacebookChat.js` và thay đổi:

```javascript
const facebookMessengerLink = 'https://m.me/YOUR_PAGE_ID';
```

### Cách lấy Facebook Page ID:

1. Vào trang Facebook của bạn
2. Click vào **About** (Giới thiệu)
3. Cuộn xuống tìm **Page ID** hoặc
4. Lấy username từ URL: `facebook.com/username` → `https://m.me/username`

**Ví dụ:**
```javascript
const facebookMessengerLink = 'https://m.me/100006775502613';
```

## ✅ Test các tính năng

### Test Quên Mật Khẩu:
1. Truy cập `/forgot-password`
2. Nhập email đã đăng ký
3. Kiểm tra email (cả hộp thư spam)

### Test Xác nhận Đặt Vé:
1. User đặt vé và upload ảnh thanh toán
2. Admin vào `/admin` và xác nhận booking
3. User sẽ nhận email xác nhận

### Test Facebook Chat:
1. Click vào icon chat tròn góc dưới bên phải
2. Sẽ mở cửa sổ Facebook Messenger
3. User có thể gửi ảnh thanh toán cho admin

## ⚠️ Lưu ý:

- **App Password** khác với mật khẩu Gmail thông thường
- Không chia sẻ App Password với ai
- Nếu lỗi "Less secure app", phải dùng App Password
- Email có thể vào thư spam, nhắc user kiểm tra

## 🎉 Tính năng mới đã hoàn thành:

✅ Trang Profile để cập nhật thông tin user  
✅ Chức năng đổi mật khẩu  
✅ Quên mật khẩu (gửi email)  
✅ Email thông báo khi admin xác nhận vé  
✅ Facebook chat button để liên hệ admin  

## 📝 Routes mới:

- `/profile` - Trang thông tin cá nhân
- `/forgot-password` - Quên mật khẩu
