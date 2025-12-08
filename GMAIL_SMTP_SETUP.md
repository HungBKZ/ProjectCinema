# 🔐 Hướng Dẫn Setup Gmail SMTP với App Password

## ⚠️ Gmail SMTP - Giải Pháp Tạm Thời

Dùng trong khi chờ Brevo account được activate.

## 📝 Bước 1: Tạo Gmail App Password

### 1.1 Enable 2-Step Verification
1. Truy cập: https://myaccount.google.com/security
2. Tìm **2-Step Verification**
3. Click **Turn On** nếu chưa bật
4. Làm theo hướng dẫn để setup (dùng phone)

### 1.2 Tạo App Password
1. Sau khi bật 2-Step Verification
2. Vào: https://myaccount.google.com/apppasswords
3. Chọn:
   - **App**: Mail
   - **Device**: Other (Custom name)
   - Đặt tên: `Cinema Booking App`
4. Click **Generate**
5. Copy 16-character password (dạng: `xxxx xxxx xxxx xxxx`)

**Lưu ý:** App Password chỉ hiện 1 lần, copy và save ngay!

## 🔧 Bước 2: Cấu Hình Backend

### 2.1 Update email.js

Thay đổi trong `backend/config/email.js`:

```javascript
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APP_PASSWORD
    }
  });
};
```

### 2.2 Update .env

```env
# Gmail SMTP Configuration
EMAIL_USER=cinemafpt@gmail.com
EMAIL_APP_PASSWORD=your_16_char_app_password_here

# Example (without spaces):
# EMAIL_APP_PASSWORD=abcdabcdabcdabcd
```

### 2.3 Update Sender Email

Trong cả 2 functions:

```javascript
from: 'EYESEE Showcase <cinemafpt@gmail.com>'
```

## ⚠️ Gmail Limits

- **500 emails/day** (free account)
- **2000 emails/day** (Google Workspace)
- Rate limit: ~20 emails/minute
- Đủ cho demo và testing

## ✅ Test Local

```powershell
# Test forgot password
Invoke-RestMethod -Uri "http://localhost:5000/api/auth/forgot-password" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"email":"hungvinh229@gmail.com"}'
```

## 🌐 Deploy to Render

Add environment variables:
```
EMAIL_USER=cinemafpt@gmail.com
EMAIL_APP_PASSWORD=your_app_password
```

## 🔄 Switch Back to Brevo Later

Khi Brevo được activate:
1. Revert email.js về Brevo config
2. Update Render environment variables
3. Redeploy

---

**Quick Setup:** Chỉ mất 5-10 phút nếu đã có Gmail!
