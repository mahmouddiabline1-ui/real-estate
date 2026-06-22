import React from 'react';
import { TrendingUp } from 'lucide-react';

export default function StatCard({ icon: Icon, value, label, trend, color = '#0C447C', bg = '#e8f1f9' }) {
  return (
    <div className="stat-card">
      <div className="stat-icon" style={{ background: bg }}>
        <Icon size={26} style={{ color }} />
      </div>
      <div className="stat-info">
        <div className="stat-value">{value}</div>
        <div className="stat-label">{label}</div>
        {trend && (
          <div className="stat-trend">
            <TrendingUp size={11} style={{ display: 'inline', marginLeft: 3 }} />
            {trend}
          </div>
        )}
      </div>
    </div>
  );
}
