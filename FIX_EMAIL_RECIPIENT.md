# 📧 Fix: Gửi Email Đến Đúng Người Dùng

## ⚠️ Vấn đề:

Email đang gửi về **cinemafpt@gmail.com** thay vì email người dùng đăng ký (VD: hungvinh229@gmail.com).

**Nguyên nhân:** Resend đang ở chế độ test - chỉ gửi được đến email chủ tài khoản.

---

## ✅ Giải pháp nhanh: Thêm Email Test (5 phút)

### Bước 1: Vào Resend Dashboard
```
https://resend.com/settings/emails
```
Login với: **cinemafpt@gmail.com**

### Bước 2: Add Test Email
1. Tìm mục **"Test Email Addresses"** hoặc **"Verified Emails"**
2. Click **"Add Email"**
3. Nhập email: **hungvinh229@gmail.com**
4. Click **"Send Verification Email"**

### Bước 3: Xác nhận
1. Mở inbox của **hungvinh229@gmail.com**
2. Tìm email từ Resend
3. Click link **"Verify Email"**
4. Status sẽ chuyển thành **"Verified" ✅**

### Bước 4: Test lại
1. Đăng ký tài khoản với email **hungvinh229@gmail.com**
2. Test "Quên mật khẩu"
3. Email sẽ gửi thành công đến **hungvinh229@gmail.com**

**⚠️ Giới hạn:** Free plan chỉ cho phép **3 email test**.

---

## 🌐 Giải pháp lâu dài: Verify Domain (Production)

Nếu bạn có domain (VD: eyesee.vn, eyesee.com):

### Bước 1: Add Domain
```
https://resend.com/domains → "Add Domain"
```

### Bước 2: Add DNS Records
Resend sẽ cung cấp 3 DNS records. Vào **DNS provider** và thêm:

**SPF:**
```
Type: TXT
Name: @
Value: v=spf1 include:_spf.resend.com ~all
```

**DKIM:**
```
Type: TXT  
Name: resend._domainkey
Value: [Copy từ Resend]
```

**DMARC:**
```
Type: TXT
Name: _dmarc
Value: v=DMARC1; p=none;
```

### Bước 3: Verify
- Chờ 10-30 phút
- Click "Verify" trên Resend
- Status → "Verified" ✅

### Bước 4: Update Code
File `backend/config/email.js`:

```javascript
from: 'EYESEE Showcase <noreply@eyesee.vn>'
```

### Bước 5: Deploy
```bash
git commit -am "Update email domain"
git push origin main
```

---

## 📊 So sánh

| | Test Email | Verify Domain |
|---|---|---|
| **Setup** | 5 phút | 30-60 phút |
| **Giới hạn** | 3 emails | Không giới hạn |
| **Sender** | onboarding@resend.dev | noreply@domain.com |
| **Production** | ❌ | ✅ |

---

## 💡 Khuyến nghị

**Hiện tại (Development):**
→ Dùng **Test Email** - thêm 2-3 email để test

**Sau này (Production):**
→ Dùng **Verify Domain** - gửi không giới hạn

---

## 🔍 Kiểm tra email đã gửi

```
https://resend.com/emails
```

Xem logs:
- ✅ Delivered
- ❌ Bounced  
- 📭 Opened

---

## ❓ FAQ

**Q: Có thể thêm bao nhiêu email test?**
A: Free plan: 3 emails. Paid plan: Không giới hạn.

**Q: Verify domain mất bao lâu?**
A: DNS thường mất 10-30 phút, tối đa 24 giờ.

**Q: Không có domain thì sao?**
A: Có thể:
- Mua domain (~$10/năm): namecheap.com
- Domain free: freenom.com
- Hoặc chỉ dùng test emails cho development

**Q: Email vào spam?**
A: Sau khi verify domain + config DKIM/SPF → delivery rate cao, ít vào spam.

---

📧 **Support:** support@resend.com
