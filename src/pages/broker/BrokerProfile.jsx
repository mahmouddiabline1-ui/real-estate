import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Upload, Save } from 'lucide-react';
import DashboardSidebar from '../../components/dashboard/DashboardSidebar';
import { VerifiedBadge, ActiveBadge, StarRating } from '../../components/shared/Badges';
import { brokers } from '../../data/mockData';
import { useRole } from '../../App';

export default function BrokerProfile() {
  const location = useLocation();
  const { role, setRole } = useRole();
  const broker = brokers[0];
  const [form, setForm] = useState({
    name: broker.name,
    agency: broker.agency,
    phone: broker.phone,
    email: broker.email,
    location: broker.location,
    bio: broker.bio,
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="dashboard-layout">
      <DashboardSidebar role={role} onRoleChange={setRole} currentPath={location.pathname} />
      <main className="dashboard-main">
        <div className="dashboard-header">
          <div className="dashboard-header-title">ملفي الشخصي</div>
          <button className="btn btn-primary btn-sm" onClick={handleSave}>
            <Save size={16} />
            {saved ? '✓ تم الحفظ' : 'حفظ التغييرات'}
          </button>
        </div>

        <div className="dashboard-content">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 24 }}>
            <div>
              {/* Profile pic */}
              <div className="bg-card" style={{ marginBottom: 20 }}>
                <h3 style={{ fontWeight: 800, fontSize: 16, marginBottom: 20 }}>الصورة الشخصية</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                  <img
                    src={broker.avatar}
                    alt={broker.name}
                    style={{ width: 90, height: 90, borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--primary-50)' }}
                    onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(broker.name)}&background=0C447C&color=fff&size=90`; }}
                  />
                  <div>
                    <button className="btn btn-outline btn-sm" style={{ marginBottom: 8 }}>
                      <Upload size={14} />
                      رفع صورة جديدة
                    </button>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>PNG أو JPG — حجم أقصى 5MB</div>
                  </div>
                </div>
              </div>

              {/* Info form */}
              <div className="bg-card">
                <h3 style={{ fontWeight: 800, fontSize: 16, marginBottom: 20 }}>البيانات الشخصية</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>الاسم الكامل</label>
                    <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                  </div>
                  <div className="form-group">
                    <label>اسم الشركة / المكتب</label>
                    <input value={form.agency} onChange={e => setForm(f => ({ ...f, agency: e.target.value }))} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>رقم الهاتف</label>
                    <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
                  </div>
                  <div className="form-group">
                    <label>البريد الإلكتروني</label>
                    <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                  </div>
                </div>
                <div className="form-group">
                  <label>المنطقة / موقع العمل</label>
                  <input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label>نبذة تعريفية</label>
                  <textarea
                    rows={5}
                    value={form.bio}
                    onChange={e => setForm(f => ({ ...f, bio: e.target.value }))}
                    placeholder="اكتب نبذة احترافية عن نفسك وخبرتك..."
                  />
                </div>
              </div>
            </div>

            {/* Preview */}
            <div>
              <div className="bg-card" style={{ marginBottom: 16 }}>
                <h3 style={{ fontWeight: 800, fontSize: 14, marginBottom: 16, color: 'var(--text-secondary)' }}>معاينة الملف الشخصي</h3>
                <div style={{ textAlign: 'center', marginBottom: 16 }}>
                  <img
                    src={broker.avatar}
                    alt={broker.name}
                    style={{ width: 72, height: 72, borderRadius: '50%', objectFit: 'cover', margin: '0 auto 12px', display: 'block', border: '3px solid var(--primary-50)' }}
                    onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(form.name)}&background=0C447C&color=fff`; }}
                  />
                  <div style={{ fontWeight: 800, marginBottom: 4 }}>{form.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>{form.agency}</div>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginBottom: 8 }}>
                    <VerifiedBadge />
                    <ActiveBadge />
                  </div>
                  <StarRating rating={broker.rating} count={broker.reviews} />
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)', textAlign: 'center', lineHeight: 1.7 }}>
                  {form.bio.slice(0, 100)}...
                </div>
              </div>

              {/* Stats */}
              <div className="bg-card">
                <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 14 }}>إحصائيات الملف</div>
                {[
                  { label: 'مشاهدات الملف', value: '4,820', trend: '+12%' },
                  { label: 'نقرات على الهاتف', value: '381', trend: '+8%' },
                  { label: 'تواصل واتساب', value: '156', trend: '+22%' },
                ].map(stat => (
                  <div key={stat.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border-light)', fontSize: 13 }}>
                    <span style={{ color: 'var(--text-secondary)' }}>{stat.label}</span>
                    <span style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <strong>{stat.value}</strong>
                      <span style={{ fontSize: 11, color: 'var(--success)', fontWeight: 700 }}>{stat.trend}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
