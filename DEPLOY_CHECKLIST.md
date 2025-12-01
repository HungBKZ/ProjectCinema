# Cinema Booking System - Deploy Checklist

## ✅ Các bước deploy nhanh

### 1. Chuẩn bị MongoDB Atlas
- [ ] Tạo cluster trên MongoDB Atlas
- [ ] Whitelist IP: 0.0.0.0/0
- [ ] Copy connection string

### 2. Deploy Backend (Render.com)
- [ ] Đăng ký Render.com
- [ ] Tạo New Web Service
- [ ] Connect repo hoặc upload code
- [ ] Set environment variables:
  ```
  MONGODB_URI=<your_mongodb_uri>
  JWT_SECRET=<random_secret_key>
  EMAIL_USER=<your_gmail>
  EMAIL_PASSWORD=<gmail_app_password>
  PORT=5000
  NODE_ENV=production
  ```
- [ ] Deploy
- [ ] Copy URL backend (ví dụ: https://cinema-api.onrender.com)

### 3. Deploy Frontend (Vercel)
- [ ] Tạo file `frontend/.env.production`:
  ```
  REACT_APP_API_URL=https://your-backend-url.onrender.com/api
  ```
- [ ] Push code lên GitHub
- [ ] Đăng ký Vercel
- [ ] Import project từ GitHub
- [ ] Cấu hình:
  - Root Directory: `frontend`
  - Framework: Create React App
  - Build Command: `npm run build`
  - Output Directory: `build`
- [ ] Thêm Environment Variable:
  ```
  REACT_APP_API_URL=https://your-backend-url.onrender.com/api
  ```
- [ ] Deploy

### 4. Cập nhật Backend CORS
- [ ] Vào backend/.env trên Render
- [ ] Thêm biến:
  ```
  FRONTEND_URL=https://your-app.vercel.app
  ```
- [ ] Redeploy backend

### 5. Test
- [ ] Truy cập Vercel URL
- [ ] Đăng ký tài khoản
- [ ] Đặt vé
- [ ] Check email notification
- [ ] Test admin dashboard

## 📝 Environment Variables Summary

### Backend (Render.com)
```
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://your-app.vercel.app
```

### Frontend (Vercel)
```
REACT_APP_API_URL=https://your-backend-url.onrender.com/api
```

## 🔧 Files Created for Deploy
- ✅ `vercel.json` - Vercel configuration
- ✅ `render.yaml` - Render configuration
- ✅ `DEPLOY_GUIDE.md` - Detailed guide
- ✅ `.vercelignore` - Files to ignore
- ✅ `deploy-prepare.ps1` - Build script

## 🚀 Quick Commands

### Build frontend locally:
```powershell
.\deploy-prepare.ps1
```

### Or manually:
```bash
cd frontend
npm run build
```

## ⚠️ Important Notes

1. **Gmail App Password**: 
   - Go to Google Account Security
   - Enable 2FA
   - Generate App Password
   - Use that instead of real password

2. **MongoDB Atlas**:
   - Must whitelist 0.0.0.0/0 for Render
   - Free tier: 512MB storage

3. **Render Free Tier**:
   - App sleeps after 15 min inactivity
   - Takes ~30s to wake up
   - 750 hours/month free

4. **Vercel Free Tier**:
   - Unlimited bandwidth for personal projects
   - Auto HTTPS
   - Global CDN

## 📞 Support

Nếu gặp lỗi:
1. Check Render logs
2. Check Vercel deployment logs
3. Check browser console
4. Verify environment variables

## 🎉 Success!

Sau khi deploy xong:
- Frontend: https://your-app.vercel.app
- Backend: https://your-api.onrender.com
- Admin login: username/password từ cleanDB.js
