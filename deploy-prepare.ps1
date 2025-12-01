# Script để build frontend trước khi deploy
Write-Host "Building frontend..." -ForegroundColor Green
cd frontend
npm run build

Write-Host "`nBuild completed!" -ForegroundColor Green
Write-Host "Frontend build is ready in: frontend/build" -ForegroundColor Cyan
Write-Host "`nNext steps:" -ForegroundColor Yellow
Write-Host "1. Deploy backend to Render.com or Railway" -ForegroundColor White
Write-Host "2. Get backend URL" -ForegroundColor White
Write-Host "3. Update .env.production with backend URL" -ForegroundColor White
Write-Host "4. Push to GitHub" -ForegroundColor White
Write-Host "5. Deploy frontend to Vercel" -ForegroundColor White

cd ..
