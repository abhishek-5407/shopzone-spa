import { useState } from 'react';
import { PhoneCall, X } from 'lucide-react';

export const SyncBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="sync-banner">
      <div className="sync-banner-container">
        <div className="sync-banner-content">
          <span className="sync-badge">Mandatory Action Item</span>
          <p className="sync-text">
            <PhoneCall className="sync-icon" size={16} />
            <strong>Engineering Residency 1-on-1 Sync:</strong> Call <strong>Mr. Nakul (8851407750)</strong> for your 3-min Technical Communication KPI evaluation.
          </p>
        </div>
        <div className="sync-banner-actions">
          <a href="tel:8851407750" className="sync-call-btn">
            Call Now
          </a>
          <button 
            type="button" 
            className="sync-dismiss-btn" 
            onClick={() => setIsVisible(false)}
            aria-label="Dismiss notification"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
