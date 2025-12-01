# Cinema Booking System - Installation Script
# PowerShell Script

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Cinema Booking System - Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Install Backend Dependencies
Write-Host "📦 Installing Backend Dependencies..." -ForegroundColor Yellow
Set-Location -Path "d:\CinemaProject\backend"
npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Backend dependencies installed successfully!" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to install backend dependencies" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Install Frontend Dependencies
Write-Host "📦 Installing Frontend Dependencies..." -ForegroundColor Yellow
Set-Location -Path "d:\CinemaProject\frontend"
npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Frontend dependencies installed successfully!" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to install frontend dependencies" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  ✅ Installation Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📝 Next Steps:" -ForegroundColor Yellow
Write-Host "1. Open TWO terminals" -ForegroundColor White
Write-Host ""
Write-Host "Terminal 1 - Start Backend:" -ForegroundColor Cyan
Write-Host "   cd d:\CinemaProject\backend" -ForegroundColor White
Write-Host "   npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "Terminal 2 - Start Frontend:" -ForegroundColor Cyan
Write-Host "   cd d:\CinemaProject\frontend" -ForegroundColor White
Write-Host "   npm start" -ForegroundColor White
Write-Host ""
Write-Host "🌐 Access:" -ForegroundColor Yellow
Write-Host "   Frontend: http://localhost:3000" -ForegroundColor White
Write-Host "   Backend:  http://localhost:5000" -ForegroundColor White
Write-Host ""
Write-Host "🔑 Admin Account:" -ForegroundColor Yellow
Write-Host "   Username: admin123" -ForegroundColor White
Write-Host "   Password: Admin123@" -ForegroundColor White
Write-Host ""
