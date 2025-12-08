# Hướng Dẫn Cấu Hình Resend Email trên Render

## ✅ Đã hoàn thành:
1. ✅ Cài đặt package `resend` 
2. ✅ Thay thế nodemailer bằng Resend SDK
3. ✅ Cập nhật file `backend/config/email.js`
4. ✅ Cài đặt dependencies: `react`, `react-dom`

## 🔧 Cần cấu hình trên Render:

### 1. Lấy API Key từ Resend:

1. Truy cập: https://resend.com/api-keys
2. Đăng nhập với email: **cinemafpt@gmail.com** 
3. Click **"Create API Key"**
4. Đặt tên: `Cinema Production`
5. Chọn **"Sending access"**
6. Click **Create** và copy API key (bắt đầu với `re_...`)

### 2. Thêm Environment Variable trên Render:

Vào **Render Dashboard** → Chọn service **projectcinema** → **Environment** → Thêm biến:

```
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxx
```

(Thay `re_xxxxxxxxxxxxxxxxxxxxxxxx` bằng API key vừa tạo)

### 2. Xóa các biến cũ (không cần nữa):
- ❌ `EMAIL_HOST`
- ❌ `EMAIL_PORT`
- ❌ `EMAIL_USER`
- ❌ `EMAIL_PASSWORD`

### 3. Push code lên GitHub:

```bash
git add .
git commit -m "Integrate Resend for email functionality"
git push origin main
```

### 4. Render sẽ tự động redeploy (2-3 phút)

## 📧 Email sender mặc định:

- **From:** `EYESEE Showcase <onboarding@resend.dev>`
- Đây là domain test của Resend, email sẽ được gửi đến inbox

## 🎯 Để dùng domain riêng (tùy chọn):

1. Vào [Resend Dashboard](https://resend.com/domains)
2. Add domain của bạn (ví dụ: eyesee.com)
3. Xác thực DNS records
4. Đổi `from` trong `email.js`:
   ```javascript
   from: 'EYESEE Showcase <noreply@eyesee.com>'
   ```

## 🧪 Test email:

1. Vào trang web
2. Chọn "Quên mật khẩu"
3. Nhập email của bạn
4. Kiểm tra inbox (và spam folder)

## 📊 Monitor emails:

- Truy cập: https://resend.com/emails
- Xem logs, delivery status, opens, clicks

## ⚠️ Giới hạn Free Plan:

- **100 emails/day**
- **3,000 emails/month**
- Đủ cho development và testing

## 💰 Nâng cấp (nếu cần):

- **Pay as you go:** $1/1000 emails
- Không giới hạn domains
- Email analytics đầy đủ

---

✅ **Hoàn tất!** Email giờ sẽ hoạt động ổn định trên production với Resend.
