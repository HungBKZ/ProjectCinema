const nodemailer = require('nodemailer');

// Tạo transporter để gửi email
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Email của bạn
      pass: process.env.EMAIL_PASSWORD // App password của Gmail
    }
  });
};

// Gửi email quên mật khẩu
const sendPasswordResetEmail = async (email, newPassword) => {
  const transporter = createTransporter();
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: '🔐 Mật khẩu mới - Hệ thống đặt vé Cinema',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 10px;">
        <div style="background: white; padding: 30px; border-radius: 10px;">
          <h2 style="color: #3b82f6; text-align: center;">🎬 Cinema Booking System</h2>
          <p style="font-size: 16px; color: #4b5563;">Xin chào,</p>
          <p style="font-size: 16px; color: #4b5563;">Bạn đã yêu cầu đặt lại mật khẩu. Dưới đây là mật khẩu mới của bạn:</p>
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
            <p style="font-size: 14px; color: #6b7280; margin: 0;">Mật khẩu mới:</p>
            <p style="font-size: 24px; font-weight: bold; color: #3b82f6; margin: 10px 0; letter-spacing: 2px;">${newPassword}</p>
          </div>
          <p style="font-size: 14px; color: #ef4444; background: #fee2e2; padding: 15px; border-radius: 8px; border-left: 4px solid #ef4444;">
            ⚠️ <strong>Quan trọng:</strong> Vui lòng đổi mật khẩu ngay sau khi đăng nhập để bảo mật tài khoản.
          </p>
          <p style="font-size: 14px; color: #6b7280; margin-top: 20px;">Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.</p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
          <p style="font-size: 12px; color: #9ca3af; text-align: center;">© 2025 Cinema Booking System. All rights reserved.</p>
        </div>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
};

// Gửi email xác nhận đặt vé
const sendBookingConfirmationEmail = async (email, bookingDetails) => {
  const transporter = createTransporter();
  
  const { seats, totalAmount, bookingId } = bookingDetails;
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: '✅ Xác nhận đặt vé thành công - Cinema',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 10px;">
        <div style="background: white; padding: 30px; border-radius: 10px;">
          <h2 style="color: #3b82f6; text-align: center;">🎉 Đặt Vé Thành Công!</h2>
          <p style="font-size: 16px; color: #4b5563;">Xin chào,</p>
          <p style="font-size: 16px; color: #4b5563;">Chúc mừng! Vé của bạn đã được xác nhận thanh toán thành công.</p>
          
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #3b82f6; margin-top: 0;">📋 Thông tin đặt vé:</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #6b7280;">Mã đặt vé:</td>
                <td style="padding: 8px 0; color: #1f2937; font-weight: bold;">${bookingId}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280;">Ghế ngồi:</td>
                <td style="padding: 8px 0; color: #1f2937; font-weight: bold;">${seats.join(', ')}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280;">Số lượng:</td>
                <td style="padding: 8px 0; color: #1f2937; font-weight: bold;">${seats.length} ghế</td>
              </tr>
              <tr style="border-top: 2px solid #e5e7eb;">
                <td style="padding: 12px 0 0 0; color: #1f2937; font-size: 18px; font-weight: bold;">Tổng tiền:</td>
                <td style="padding: 12px 0 0 0; color: #3b82f6; font-size: 20px; font-weight: bold;">${totalAmount.toLocaleString('vi-VN')} VNĐ</td>
              </tr>
            </table>
          </div>

          <div style="background: #dbeafe; padding: 15px; border-radius: 8px; border-left: 4px solid #3b82f6;">
            <p style="margin: 0; color: #1e40af;">
              <strong>✨ Lưu ý:</strong> Vui lòng đến rạp trước giờ chiếu 15 phút và xuất trình email này tại quầy để nhận vé.
            </p>
          </div>

          <div style="text-align: center; margin-top: 25px;">
            <p style="font-size: 16px; color: #4b5563;">Chúc bạn có trải nghiệm xem phim thú vị! 🎬🍿</p>
          </div>

          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
          <p style="font-size: 12px; color: #9ca3af; text-align: center;">© 2025 Cinema Booking System. All rights reserved.</p>
        </div>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {
  sendPasswordResetEmail,
  sendBookingConfirmationEmail
};
