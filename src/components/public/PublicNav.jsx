import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Building2, Search, Phone, Users, LayoutDashboard, ChevronDown } from 'lucide-react';

export default function PublicNav({ compareCount = 0 }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="public-nav">
      <div className="public-nav-inner">
        {/* Logo */}
        <button className="nav-logo" onClick={() => navigate('/')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          <div className="nav-logo-icon">
            <Building2 size={22} />
          </div>
          عقارات مصر
        </button>

        {/* Nav Links */}
        <div className="nav-links">
          <button className={`nav-link ${isActive('/') ? 'active' : ''}`} onClick={() => navigate('/')}>
            الرئيسية
          </button>
          <button className={`nav-link ${location.pathname.startsWith('/search') ? 'active' : ''}`} onClick={() => navigate('/search')}>
            البحث عن عقار
          </button>
          <button className={`nav-link ${location.pathname.startsWith('/broker') ? 'active' : ''}`} onClick={() => navigate('/broker/1')}>
            الوسطاء
          </button>
          <button className="nav-link" onClick={() => navigate('/dashboard/broker')}>
            <LayoutDashboard size={14} />
            لوحة التحكم
          </button>
        </div>

        {/* Actions */}
        <div className="nav-actions">
          {compareCount > 0 && (
            <button
              className="btn btn-outline btn-sm"
              onClick={() => navigate('/compare')}
            >
              مقارنة ({compareCount})
            </button>
          )}
          <button className="btn btn-ghost btn-sm" onClick={() => navigate('/dashboard/broker')}>
            تسجيل الدخول
          </button>
          <button className="btn btn-primary btn-sm" onClick={() => navigate('/dashboard/broker')}>
            أضف عقارك
          </button>
        </div>
      </div>
    </nav>
  );
}
