import { useState, useEffect } from 'react';

// A simple toast manager outside of React tree
let addToastHandler = null;

export const toast = (message, type = 'info', duration = 3000) => {
  if (addToastHandler) {
    addToastHandler(message, type, duration);
  }
};

export function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    addToastHandler = (message, type, duration) => {
      const id = Date.now();
      setToasts(prev => [...prev, { id, message, type }]);
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, duration);
    };
  }, []);

  const getIcon = (type) => {
    switch(type) {
      case 'success': return <i className="ph-fill ph-check-circle" style={{ color: '#22c55e', fontSize: '1.2em', verticalAlign: 'middle' }}></i>;
      case 'error': return <i className="ph-fill ph-x-circle" style={{ color: '#F35029', fontSize: '1.2em', verticalAlign: 'middle' }}></i>;
      default: return <i className="ph-fill ph-info" style={{ color: '#29858D', fontSize: '1.2em', verticalAlign: 'middle' }}></i>;
    }
  };

  return (
    <div className="toast-container">
      {toasts.map(t => (
        <div key={t.id} className={`toast toast--${t.type}`} style={{ animation: 'slideIn 0.3s ease' }}>
          <span>{getIcon(t.type)}</span>
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  );
}
