import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, ListChecks, PlusCircle, Users, MessageSquare, UserCircle,
  Building2, FolderOpen, BookOpen, ShieldCheck, Settings, LogOut,
  ChevronDown, Layers
} from 'lucide-react';

const ROLES = [
  { key: 'broker', label: 'الوسيط العقاري', icon: '🏠', color: '#0C447C' },
  { key: 'developer', label: 'شركة التطوير', icon: '🏗️', color: '#0D9488' },
  { key: 'admin', label: 'الإدارة', icon: '⚙️', color: '#D4A017' },
];

const NAV_ITEMS = {
  broker: [
    { label: 'نظرة عامة', icon: LayoutDashboard, path: '/dashboard/broker' },
    { label: 'إعلاناتي', icon: ListChecks, path: '/dashboard/broker/listings' },
    { label: 'إضافة عقار', icon: PlusCircle, path: '/dashboard/broker/add-property' },
    { label: 'العملاء (CRM)', icon: Users, path: '/dashboard/broker/crm' },
    { label: 'صندوق الرسائل', icon: MessageSquare, path: '/dashboard/broker/inbox' },
    { label: 'ملفي الشخصي', icon: UserCircle, path: '/dashboard/broker/profile' },
  ],
  developer: [
    { label: 'نظرة عامة', icon: LayoutDashboard, path: '/dashboard/developer' },
    { label: 'مشاريعي', icon: Building2, path: '/dashboard/developer/projects' },
    { label: 'إضافة مشروع', icon: PlusCircle, path: '/dashboard/developer/add-project' },
    { label: 'طلبات الحجز', icon: BookOpen, path: '/dashboard/developer/bookings' },
    { label: 'ملف الشركة', icon: UserCircle, path: '/dashboard/developer/profile' },
  ],
  admin: [
    { label: 'نظرة عامة', icon: LayoutDashboard, path: '/dashboard/admin' },
    { label: 'إدارة المستخدمين', icon: Users, path: '/dashboard/admin/users' },
    { label: 'جميع العقارات', icon: Layers, path: '/dashboard/admin/properties' },
    { label: 'التحقق والشارات', icon: ShieldCheck, path: '/dashboard/admin/verification' },
  ],
};

export default function DashboardSidebar({ role, onRoleChange, currentPath }) {
  const navigate = useNavigate();
  const items = NAV_ITEMS[role] || [];

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="sidebar-logo-text" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
          <Building2 size={22} />
          عقارات مصر
        </div>
        <div className="sidebar-logo-sub">لوحة التحكم الموحدة</div>
      </div>

      {/* Role Switcher */}
      <div className="role-switcher">
        <div className="role-switcher-label">تبديل الدور — عرض تجريبي</div>
        {ROLES.map(r => (
          <button
            key={r.key}
            className={`role-btn ${role === r.key ? 'active' : ''}`}
            onClick={() => {
              onRoleChange(r.key);
              navigate(`/dashboard/${r.key}`);
            }}
          >
            <span style={{ fontSize: 18 }}>{r.icon}</span>
            {r.label}
          </button>
        ))}
      </div>

      {/* Nav Items */}
      <nav className="sidebar-nav">
        <div className="sidebar-section-label">القائمة الرئيسية</div>
        {items.map(item => {
          const Icon = item.icon;
          const isActive = currentPath === item.path;
          return (
            <button
              key={item.path}
              className={`sidebar-link ${isActive ? 'active' : ''}`}
              onClick={() => navigate(item.path)}
            >
              <Icon size={18} />
              {item.label}
            </button>
          );
        })}

        <div style={{ marginTop: 24 }}>
          <div className="sidebar-section-label">الموقع العام</div>
          <button className="sidebar-link" onClick={() => navigate('/')}>
            <Layers size={18} />
            زيارة الموقع
          </button>
        </div>
      </nav>

      {/* Bottom actions */}
      <div style={{ padding: '16px 12px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <button className="sidebar-link">
          <Settings size={18} />
          الإعدادات
        </button>
        <button className="sidebar-link" onClick={() => navigate('/')}>
          <LogOut size={18} />
          تسجيل الخروج
        </button>
      </div>
    </aside>
  );
}
