# Start Backend and Frontend - PowerShell Script

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Starting Cinema Booking System" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Start Backend
Write-Host "🚀 Starting Backend Server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd d:\CinemaProject\backend; npm run dev"

# Wait a bit for backend to start
Start-Sleep -Seconds 3

# Start Frontend
Write-Host "🚀 Starting Frontend Application..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd d:\CinemaProject\frontend; npm start"

Write-Host ""
Write-Host "✅ Both servers are starting..." -ForegroundColor Green
Write-Host ""
Write-Host "🌐 Access URLs:" -ForegroundColor Yellow
Write-Host "   Frontend: http://localhost:3000" -ForegroundColor White
Write-Host "   Backend:  http://localhost:5000" -ForegroundColor White
Write-Host ""
Write-Host "🔑 Admin Login:" -ForegroundColor Yellow
Write-Host "   Username: admin123" -ForegroundColor White
Write-Host "   Password: Admin123@" -ForegroundColor White
Write-Host ""
Write-Host "⚠️  Two new PowerShell windows have been opened." -ForegroundColor Cyan
Write-Host "    Press Ctrl+C in each window to stop the servers." -ForegroundColor Cyan
Write-Host ""
