import React from 'react';
import { ShieldCheck } from 'lucide-react';

export function VerifiedBadge({ gold = false, text = 'موثّق' }) {
  return (
    <span className={`verified-badge${gold ? ' verified-badge-gold' : ''}`}>
      <ShieldCheck size={12} />
      {text}
    </span>
  );
}

export function ActiveBadge({ text = 'متصل الآن' }) {
  return (
    <span className="active-badge">
      <span className="active-dot" />
      {text}
    </span>
  );
}

export function StarRating({ rating, count, size = 14 }) {
  const stars = Math.round(rating);
  return (
    <div className="star-rating">
      <div className="stars">
        {[1, 2, 3, 4, 5].map(i => (
          <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={i <= stars ? '#D4A017' : '#E2E8F0'} stroke="none">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        ))}
      </div>
      {count !== undefined && (
        <span className="count">({count.toLocaleString('ar-EG')})</span>
      )}
      {rating && <span style={{ fontWeight: 700, fontSize: 13, color: '#1E293B' }}>{rating}</span>}
    </div>
  );
}

export function ChannelIcon({ channel }) {
  const icons = {
    whatsapp: { icon: '💬', cls: 'channel-whatsapp', label: 'واتساب' },
    website: { icon: '🌐', cls: 'channel-website', label: 'موقع' },
    call: { icon: '📞', cls: 'channel-call', label: 'مكالمة' },
  };
  const c = icons[channel] || icons.website;
  return (
    <span className={`channel-icon ${c.cls}`} title={c.label}>{c.icon}</span>
  );
}
