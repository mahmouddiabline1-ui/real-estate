import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Upload, Save } from 'lucide-react';
import DashboardSidebar from '../../components/dashboard/DashboardSidebar';
import { VerifiedBadge, StarRating } from '../../components/shared/Badges';
import { developers } from '../../data/mockData';
import { useRole } from '../../App';

export default function DevProfile() {
  const location = useLocation();
  const { role, setRole } = useRole();
  const dev = developers[0];
  const [form, setForm] = useState({ name: dev.name, location: dev.location, description: dev.description, phone: '02-12345678', email: 'info@talaat.com', website: 'www.talaat-mostafa.com' });
  const [saved, setSaved] = useState(false);

  return (
    <div className="dashboard-layout">
      <DashboardSidebar role={role} onRoleChange={setRole} currentPath={location.pathname} />
      <main className="dashboard-main">
        <div className="dashboard-header">
          <div className="dashboard-header-title">ملف الشركة</div>
          <button className="btn btn-primary btn-sm" onClick={() => setSaved(true)}>
            <Save size={16} />
            {saved ? '✓ تم الحفظ' : 'حفظ التغييرات'}
          </button>
        </div>
        <div className="dashboard-content">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 24 }}>
            <div>
              <div className="bg-card" style={{ marginBottom: 20 }}>
                <h3 style={{ fontWeight: 800, fontSize: 16, marginBottom: 20 }}>شعار الشركة</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                  <div style={{ width: 90, height: 90, background: 'var(--primary)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 28, fontWeight: 900 }}>
                    TM
                  </div>
                  <div>
                    <button className="btn btn-outline btn-sm" style={{ marginBottom: 8 }}>
                      <Upload size={14} /> رفع شعار جديد
                    </button>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>PNG أو SVG — شفاف مفضل</div>
                  </div>
                </div>
              </div>
              <div className="bg-card">
                <h3 style={{ fontWeight: 800, fontSize: 16, marginBottom: 20 }}>بيانات الشركة</h3>
                <div className="form-group">
                  <label>اسم الشركة *</label>
                  <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
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
                <div className="form-row">
                  <div className="form-group">
                    <label>الموقع الجغرافي</label>
                    <input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} />
                  </div>
                  <div className="form-group">
                    <label>الموقع الإلكتروني</label>
                    <input value={form.website} onChange={e => setForm(f => ({ ...f, website: e.target.value }))} />
                  </div>
                </div>
                <div className="form-group">
                  <label>نبذة عن الشركة</label>
                  <textarea rows={4} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
                </div>
              </div>
            </div>
            <div>
              <div className="bg-card" style={{ marginBottom: 16 }}>
                <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 14 }}>معاينة صفحة الشركة</div>
                <div style={{ textAlign: 'center', marginBottom: 14 }}>
                  <div style={{ width: 64, height: 64, background: 'var(--primary)', borderRadius: 12, margin: '0 auto 10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 22, fontWeight: 900 }}>TM</div>
                  <div style={{ fontWeight: 800, fontSize: 15 }}>{form.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)', margin: '6px 0' }}>{form.location}</div>
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}><VerifiedBadge /></div>
                  <StarRating rating={dev.rating} count={dev.reviews} />
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.7, textAlign: 'center' }}>
                  {form.description.slice(0, 80)}...
                </div>
              </div>
              <div className="bg-card">
                <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 12 }}>إحصائيات الشركة</div>
                {[
                  { label: 'المشاريع المنجزة', value: dev.deliveredProjects },
                  { label: 'المشاريع الجارية', value: dev.projectsCount - dev.deliveredProjects },
                  { label: 'التقييم العام', value: `${dev.rating} / 5` },
                  { label: 'عدد التقييمات', value: dev.reviews },
                ].map(s => (
                  <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border-light)', fontSize: 13 }}>
                    <span style={{ color: 'var(--text-secondary)' }}>{s.label}</span>
                    <strong>{s.value}</strong>
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
