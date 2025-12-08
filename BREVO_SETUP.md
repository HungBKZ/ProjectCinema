# 🚀 Hướng Dẫn Thiết Lập Email với Brevo (SendinBlue)

## Tại Sao Chuyển Sang Brevo?

- ✅ **Không có test mode**: Gửi email đến bất kỳ địa chỉ nào ngay lập tức
- ✅ **Free tier tốt**: 300 emails/ngày miễn phí
- ✅ **SMTP đơn giản**: Không cần verify domain ngay từ đầu
- ✅ **Reliable**: Dịch vụ ổn định cho production

## 📝 Bước 1: Đăng Ký Tài Khoản Brevo

1. Truy cập: https://app.brevo.com/account/register
2. Đăng ký với email của bạn
3. Xác thực email (check inbox)
4. Complete setup wizard

## 🔑 Bước 2: Lấy SMTP Credentials

1. Đăng nhập vào Brevo dashboard
2. Click vào tên tài khoản (góc trên bên phải)
3. Chọn **SMTP & API**
4. Tại tab **SMTP**, bạn sẽ thấy:
   - **Server**: `smtp-relay.brevo.com`
   - **Port**: `587` (TLS) hoặc `465` (SSL)
   - **Login**: Email bạn đăng ký Brevo (ví dụ: `9d1b3f001@smtp-brevo.com`)
   - **SMTP Key**: Click **Generate a new SMTP key** nếu chưa có

## 📋 Bước 3: Cấu Hình Backend

### 3.1 Cập Nhật .env File

Thêm vào file `.env` trong folder `backend/`:

```env
# Brevo SMTP Configuration
BREVO_SMTP_KEY=your_smtp_key_here
```

**Ví dụ thực tế:**
```env
BREVO_SMTP_KEY=xsmtpsib-your-actual-key-here
```

### 3.2 Verify Email Configuration

File `backend/config/email.js` đã được cấu hình sẵn:

```javascript
const createTransporter = () => {
  return nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false,
    auth: {
      user: '9d1b3f001@smtp-brevo.com',
      pass: process.env.BREVO_SMTP_KEY
    }
  });
};
```

## 🌐 Bước 4: Deploy lên Render

### 4.1 Thêm Environment Variable

1. Truy cập Render Dashboard
2. Chọn service backend của bạn
3. Vào tab **Environment**
4. Thêm biến mới:
   - **Key**: `BREVO_SMTP_KEY`
   - **Value**: SMTP key từ Brevo dashboard

### 4.2 Redeploy

Sau khi thêm environment variable, Render sẽ tự động redeploy. Nếu không:
1. Click **Manual Deploy**
2. Chọn **Clear build cache & deploy**

## ✅ Bước 5: Test Email

### Test Password Reset Email

```bash
# Sử dụng API endpoint
POST https://projectcinema.onrender.com/api/auth/forgot-password
Content-Type: application/json

{
  "email": "hungvinh229@gmail.com"
}
```

### Test Booking Confirmation Email

Sau khi complete booking flow, email sẽ tự động gửi đến địa chỉ đã đăng ký.

## 📊 Monitoring

Theo dõi email statistics tại Brevo dashboard:
- **Statistics** > **Email** > **SMTP**
- Xem số lượng emails sent, delivered, bounced, etc.

## 🐛 Troubleshooting

### Error: "Connection timeout"
- **Nguyên nhân**: Render server không thể kết nối đến Brevo SMTP
- **Giải pháp**: Kiểm tra BREVO_SMTP_KEY đã được thêm đúng trong Render Environment Variables

### Error: "Authentication failed"
- **Nguyên nhân**: SMTP key không đúng hoặc đã expired
- **Giải pháp**: 
  1. Vào Brevo dashboard
  2. Generate SMTP key mới
  3. Update trong Render Environment Variables

### Emails không đến inbox
- **Nguyên nhân**: Có thể vào spam folder
- **Giải pháp**:
  1. Check spam folder
  2. Verify sender domain (optional, cho production)
  3. Add SPF và DKIM records (advanced)

## 🎯 Best Practices

1. **Verify Sender Domain** (Production):
   - Tăng deliverability rate
   - Tránh vào spam
   - Setup tại: Brevo Dashboard > **Senders, Domains & Dedicated IPs**

2. **Monitor Usage**:
   - Free tier: 300 emails/day
   - Track usage để tránh limit

3. **Template Management**:
   - Tạo email templates trong Brevo dashboard
   - Sử dụng variables cho personalization

## 📚 Tài Liệu Tham Khảo

- Brevo SMTP Documentation: https://developers.brevo.com/docs/send-emails-with-smtp
- Nodemailer with Brevo: https://nodemailer.com/smtp/

## 🔐 Security Notes

- ⚠️ **KHÔNG commit BREVO_SMTP_KEY** vào Git
- ✅ Sử dụng environment variables
- ✅ Add `.env` vào `.gitignore`
- ✅ Rotate SMTP keys định kỳ (3-6 tháng)

---

**Cấu hình hiện tại:**
- ✅ Email service: Brevo SMTP
- ✅ Server: smtp-relay.brevo.com:587
- ✅ Login: 9d1b3f001@smtp-brevo.com
- ✅ Sender: EYESEE Showcase <9d1b3f001@smtp-brevo.com>
- ✅ No test mode restrictions
- ✅ Send to any email address

**Status:** Ready for production! 🚀
