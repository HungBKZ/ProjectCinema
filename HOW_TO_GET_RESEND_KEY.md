# 🔑 Hướng Dẫn Lấy Resend API Key

## Bước 1: Truy cập Resend

1. Mở trình duyệt và vào: **https://resend.com/login**
2. Đăng nhập bằng email: **cinemafpt@gmail.com**

## Bước 2: Tạo API Key

1. Sau khi đăng nhập, vào: **https://resend.com/api-keys**
2. Click nút **"Create API Key"** (màu tím)
3. Điền thông tin:
   - **Name:** `Cinema Production` (hoặc tên bất kỳ)
   - **Permission:** Chọn **"Sending access"**
   - **Domain:** Để mặc định (All Domains)
4. Click **"Create"**

## Bước 3: Copy API Key

⚠️ **QUAN TRỌNG:** API key chỉ hiện 1 lần duy nhất!

1. API key sẽ hiển thị dạng: `re_...` (dài khoảng 40-50 ký tự)
2. Click icon **Copy** để copy toàn bộ
3. **LƯU LẠI** ở nơi an toàn (Notepad, Notes, v.v.)

## Bước 4: Cập nhật Local (.env)

Mở file `backend/.env` và thay đổi:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxx
```

Thay `re_xxxxxxxxxxxxxxxxxxxxxxxx` bằng API key vừa copy.

## Bước 5: Test Local

```bash
cd backend
npm start
```

Vào trang web → Test chức năng "Quên mật khẩu" → Kiểm tra email.

## Bước 6: Cấu hình Render

1. Vào: **https://dashboard.render.com/**
2. Chọn service: **projectcinema**
3. Vào tab **Environment**
4. Tìm biến `RESEND_API_KEY`:
   - Nếu **chưa có**: Click "Add Environment Variable"
   - Nếu **đã có**: Click "Edit" (icon bút chì)
5. Paste API key vừa copy
6. Click **Save Changes**

## Bước 7: Deploy

```bash
git add .
git commit -m "Update Resend API key"
git push origin main
```

Render sẽ tự động redeploy (2-3 phút).

## ✅ Kiểm tra

1. Vào trang production: **https://project-cinema-pied.vercel.app**
2. Test "Quên mật khẩu"
3. Kiểm tra email inbox

## 🔍 Monitor Emails

Xem logs tại: **https://resend.com/emails**

## ⚠️ Lưu ý bảo mật

- ❌ **KHÔNG** commit API key vào Git
- ❌ **KHÔNG** share API key công khai
- ✅ Chỉ lưu trong `.env` và Render Environment Variables
- ✅ File `.env` đã có trong `.gitignore`

## 🆘 Nếu mất API Key

1. Vào: https://resend.com/api-keys
2. Click **"Delete"** API key cũ
3. Tạo API key mới theo Bước 2-7

---

📧 **Hỗ trợ:** support@resend.com
