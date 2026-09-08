import { useCart } from '../context/CartContext';
import { CheckCircle2, Info, AlertCircle, X } from 'lucide-react';

export const Toast = () => {
  const { toast, hideToast } = useCart();

  if (!toast || !toast.show) return null;

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle2 className="toast-icon success" size={20} />;
      case 'info':
        return <Info className="toast-icon info" size={20} />;
      case 'warning':
      case 'error':
        return <AlertCircle className="toast-icon error" size={20} />;
      default:
        return <CheckCircle2 className="toast-icon success" size={20} />;
    }
  };

  return (
    <div className={`toast-notification toast-${toast.type || 'success'}`}>
      <div className="toast-content">
        {getIcon()}
        <span className="toast-message">{toast.message}</span>
      </div>
      <button type="button" className="toast-close" onClick={hideToast} aria-label="Close notification">
        <X size={16} />
      </button>
    </div>
  );
};
