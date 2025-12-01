import React, { useState } from 'react';
import './FacebookChat.css';

const FacebookChat = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  
  // Link Facebook của bạn - thay đổi link này
  const facebookUserId = '100035687520369';
  const facebookMessengerLink = `https://www.facebook.com/messages/t/${facebookUserId}`;
  
  const handleClick = () => {
    // Thử mở m.me trước (tốt hơn cho mobile), nếu không được sẽ fallback sang facebook.com
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const link = isMobile ? `https://m.me/${facebookUserId}` : facebookMessengerLink;
    window.open(link, '_blank', 'width=1000,height=700');
  };

  return (
    <div className="facebook-chat-wrapper">
      <button 
        className="facebook-chat-button"
        onClick={handleClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12,2C6.477,2,2,6.145,2,11.242c0,2.912,1.445,5.511,3.707,7.214V22l3.483-1.912c0.93,0.257,1.915,0.396,2.935,0.396c5.523,0,10-4.145,10-9.242S17.523,2,12,2z M12.713,14.182l-2.404-2.567l-4.695,2.567l5.163-5.477l2.463,2.567l4.636-2.567L12.713,14.182z"/>
        </svg>
      </button>
      {showTooltip && (
        <div className="chat-tooltip">
          Gửi ảnh thanh toán cho Admin
        </div>
      )}
    </div>
  );
};

export default FacebookChat;
