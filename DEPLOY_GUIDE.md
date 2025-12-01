# Hướng Dẫn Deploy Lên Vercel

## Bước 1: Chuẩn Bị

1. Tạo tài khoản Vercel tại https://vercel.com
2. Cài đặt Vercel CLI (tùy chọn):
```bash
npm install -g vercel
```

## Bước 2: Deploy Backend

### Option 1: Deploy Backend riêng (Khuyến nghị)

Backend nên deploy lên service khác như:
- **Render.com** (Miễn phí, dễ dùng)
- **Railway.app** (Miễn phí, tốt cho Node.js)
- **Heroku** (Có phí)

#### Deploy Backend lên Render.com:

1. Đăng nhập https://render.com
2. Tạo New Web Service
3. Connect GitHub repo hoặc upload code
4. Cấu hình:
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && node server.js`
   - **Environment**: Node
5. Thêm Environment Variables:
   ```
   MONGODB_URI=your_mongodb_atlas_uri
   JWT_SECRET=your_secret_key
   EMAIL_USER=your_gmail
   EMAIL_PASSWORD=your_app_password
   PORT=5000
   NODE_ENV=production
   ```
6. Deploy

Sau khi deploy xong, bạn sẽ có URL backend như: `https://your-app.onrender.com`

## Bước 3: Deploy Frontend Lên Vercel

1. Tạo file `.env.production` trong folder `frontend`:
```
REACT_APP_API_URL=https://your-backend-url.onrender.com/api
```

2. Push code lên GitHub

3. Trên Vercel:
   - Click "Add New Project"
   - Import từ GitHub repository
   - Chọn project của bạn
   - Cấu hình:
     - **Framework Preset**: Create React App
     - **Root Directory**: `frontend`
     - **Build Command**: `npm run build`
     - **Output Directory**: `build`
   - Thêm Environment Variable:
     ```
     REACT_APP_API_URL=https://your-backend-url.onrender.com/api
     ```
   - Click "Deploy"

## Bước 4: Cập Nhật CORS trong Backend

Sau khi có URL Vercel của frontend, cập nhật CORS trong `backend/server.js`:

```javascript
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://your-app.vercel.app'  // Thêm URL Vercel
  ],
  credentials: true
}));
```

## Bước 5: Cấu Hình MongoDB Atlas

Đảm bảo MongoDB Atlas cho phép kết nối từ mọi IP:
1. Vào MongoDB Atlas Dashboard
2. Network Access
3. Add IP Address: `0.0.0.0/0` (Allow from anywhere)

## Bước 6: Test

1. Truy cập URL Vercel của frontend
2. Đăng ký/đăng nhập
3. Test các chức năng

## Lưu Ý Quan Trọng

### 1. Environment Variables
- **Frontend**: Chỉ có thể dùng biến bắt đầu với `REACT_APP_`
- **Backend**: Tất cả biến trong `.env` cần thêm vào Render/Vercel

### 2. HTTPS
- Vercel tự động cung cấp HTTPS
- Đảm bảo backend cũng dùng HTTPS

### 3. Database
- Dùng MongoDB Atlas (cloud)
- Không nên dùng local MongoDB

### 4. Email
- Dùng Gmail với App Password
- Không dùng mật khẩu thật

### 5. Files Upload
- Nếu có upload file, dùng Cloudinary hoặc AWS S3
- Vercel không lưu file upload

## Troubleshooting

### Lỗi CORS
```javascript
// backend/server.js
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
```

### Lỗi 404 khi reload trang
Vercel tự động handle React Router (đã có trong vercel.json)

### Lỗi Environment Variables
- Restart deployment sau khi thêm biến
- Check tên biến có đúng không (case-sensitive)

## Scripts Hữu Ích

### Deploy frontend locally với Vercel CLI:
```bash
cd frontend
vercel
```

### Deploy production:
```bash
vercel --prod
```

### Xem logs:
```bash
vercel logs
```

## Chi Phí

- **Vercel**: Miễn phí cho personal projects
- **Render.com**: Miễn phí với giới hạn 750 giờ/tháng
- **MongoDB Atlas**: Miễn phí 512MB
- **Gmail**: Miễn phí

## Support

Nếu gặp lỗi, check:
1. Vercel Deployment Logs
2. Render Logs (nếu dùng)
3. Browser Console
4. Network tab trong DevTools
