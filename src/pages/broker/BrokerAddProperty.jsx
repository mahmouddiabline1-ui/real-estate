import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Upload, MapPin, CheckSquare, Square } from 'lucide-react';
import DashboardSidebar from '../../components/dashboard/DashboardSidebar';
import { PROPERTY_TYPES, AREAS, FINISHING } from '../../data/mockData';
import { useRole } from '../../App';

const STEPS = ['المعلومات الأساسية', 'الصور والوسائط', 'الموقع', 'المميزات'];

const AMENITIES_LIST = [
  'مسبح', 'جيم', 'حارس أمن', 'جراج', 'مصعد', 'حديقة', 'نادي رياضي',
  'مولات تجارية', 'مدارس', 'مستشفى', 'إطلالة نيلية', 'تكييف مركزي',
  'واجهة زجاجية', 'غرفة خادمة', 'سطح خاص', 'إنترنت', 'كاميرات مراقبة',
];

export default function BrokerAddProperty() {
  const location = useLocation();
  const navigate = useNavigate();
  const { role, setRole } = useRole();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    title: '', type: 'شقة', price: '', area: '', rooms: '3',
    bathrooms: '2', floor: '', saleType: 'بيع', finishing: 'سوبر لوكس',
    description: '', location: 'التجمع الخامس، القاهرة الجديدة',
    deliveryDate: '', amenities: [],
  });
  const [submitted, setSubmitted] = useState(false);

  const toggleAmenity = (a) => {
    setForm(f => ({
      ...f,
      amenities: f.amenities.includes(a) ? f.amenities.filter(x => x !== a) : [...f.amenities, a]
    }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      navigate('/dashboard/broker/listings');
    }, 2500);
  };

  if (submitted) {
    return (
      <div className="dashboard-layout">
        <DashboardSidebar role={role} onRoleChange={setRole} currentPath={location.pathname} />
        <main className="dashboard-main" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 72, marginBottom: 20, animation: 'fadeInUp 0.5s ease' }}>🎉</div>
            <h2 style={{ fontSize: 28, fontWeight: 900, color: 'var(--success)', marginBottom: 12 }}>تم إضافة الإعلان بنجاح!</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>سيتم مراجعة إعلانك ونشره خلال 24 ساعة.</p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <div className="badge badge-success" style={{ fontSize: 14, padding: '8px 16px' }}>✓ تم الإرسال</div>
              <div className="badge badge-warning" style={{ fontSize: 14, padding: '8px 16px' }}>⏳ قيد المراجعة</div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="dashboard-layout">
      <DashboardSidebar role={role} onRoleChange={setRole} currentPath={location.pathname} />
      <main className="dashboard-main">
        <div className="dashboard-header">
          <div className="dashboard-header-title">إضافة عقار جديد</div>
        </div>

        <div className="dashboard-content" style={{ maxWidth: 800 }}>
          {/* Step indicator */}
          <div className="step-indicator" style={{ marginBottom: 36 }}>
            {STEPS.map((s, i) => (
              <div key={s} className="step-item">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div className={`step-circle ${i < step ? 'done' : i === step ? 'active' : ''}`}>
                    {i < step ? '✓' : i + 1}
                  </div>
                  <div style={{ fontSize: 11, marginTop: 6, fontWeight: 600, color: i === step ? 'var(--primary)' : 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                    {s}
                  </div>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`step-line ${i < step ? 'done' : ''}`} style={{ margin: '0 8px', marginBottom: 20 }} />
                )}
              </div>
            ))}
          </div>

          {/* Step content */}
          <div className="bg-card">
            {step === 0 && (
              <div>
                <h3 style={{ fontWeight: 800, marginBottom: 24, color: 'var(--primary)' }}>المعلومات الأساسية</h3>
                <div className="form-group">
                  <label>عنوان الإعلان *</label>
                  <input placeholder="مثال: شقة فاخرة 3 غرف في التجمع الخامس" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>نوع العقار *</label>
                    <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
                      {PROPERTY_TYPES.map(t => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>نوع الصفقة *</label>
                    <select value={form.saleType} onChange={e => setForm(f => ({ ...f, saleType: e.target.value }))}>
                      <option>بيع</option>
                      <option>إيجار</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>السعر (جنيه مصري) *</label>
                    <input type="number" placeholder="4500000" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} />
                  </div>
                  <div className="form-group">
                    <label>المساحة (م²) *</label>
                    <input type="number" placeholder="185" value={form.area} onChange={e => setForm(f => ({ ...f, area: e.target.value }))} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>عدد غرف النوم</label>
                    <select value={form.rooms} onChange={e => setForm(f => ({ ...f, rooms: e.target.value }))}>
                      {['1', '2', '3', '4', '5', '6+'].map(r => <option key={r}>{r}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>عدد الحمامات</label>
                    <select value={form.bathrooms} onChange={e => setForm(f => ({ ...f, bathrooms: e.target.value }))}>
                      {['1', '2', '3', '4+'].map(r => <option key={r}>{r}</option>)}
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>حالة التشطيب</label>
                    <select value={form.finishing} onChange={e => setForm(f => ({ ...f, finishing: e.target.value }))}>
                      {FINISHING.map(f => <option key={f}>{f}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>تاريخ الاستلام</label>
                    <input type="month" value={form.deliveryDate} onChange={e => setForm(f => ({ ...f, deliveryDate: e.target.value }))} />
                  </div>
                </div>
                <div className="form-group">
                  <label>الوصف</label>
                  <textarea rows={4} placeholder="اكتب وصفاً تفصيلياً للعقار..." value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
                </div>
              </div>
            )}

            {step === 1 && (
              <div>
                <h3 style={{ fontWeight: 800, marginBottom: 24, color: 'var(--primary)' }}>الصور والوسائط</h3>
                <div className="photo-upload-area">
                  <Upload size={36} style={{ marginBottom: 12, opacity: 0.5 }} />
                  <div style={{ fontWeight: 700, marginBottom: 6 }}>اسحب وأفلت الصور هنا</div>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16 }}>PNG, JPG, WEBP — حجم أقصى 10MB لكل صورة</div>
                  <button className="btn btn-primary btn-sm">
                    <Upload size={14} />
                    اختر الصور
                  </button>
                </div>
                <div style={{ marginTop: 20, padding: 16, background: 'var(--bg-alt)', borderRadius: 10 }}>
                  <div style={{ fontWeight: 700, marginBottom: 8, fontSize: 14 }}>نصائح للصور الاحترافية</div>
                  <ul style={{ fontSize: 13, color: 'var(--text-secondary)', paddingRight: 20, lineHeight: 2 }}>
                    <li>استخدم صوراً بجودة عالية لا تقل عن 1024×768 بكسل</li>
                    <li>أضف صوراً لجميع الغرف والمطبخ والحمامات</li>
                    <li>أضف صورة واجهة العقار والحديقة إن وجدت</li>
                    <li>الإضاءة الطبيعية تجعل الصور أكثر جاذبية</li>
                  </ul>
                </div>
                <div style={{ marginTop: 20 }}>
                  <label>رابط فيديو يوتيوب (اختياري)</label>
                  <input placeholder="https://youtube.com/watch?v=..." style={{ marginTop: 6 }} />
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h3 style={{ fontWeight: 800, marginBottom: 24, color: 'var(--primary)' }}>الموقع الجغرافي</h3>
                <div className="form-group">
                  <label>المنطقة / الحي *</label>
                  <select value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))}>
                    {AREAS.map(a => <option key={a}>{a}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>العنوان التفصيلي</label>
                  <input placeholder="مثال: شارع 90، الحي الأول" />
                </div>
                <div className="map-placeholder" style={{ marginTop: 16 }}>
                  <div style={{ textAlign: 'center' }}>
                    <MapPin size={32} style={{ color: 'var(--primary)', marginBottom: 8 }} />
                    <div style={{ fontWeight: 700, color: 'var(--primary)' }}>انقر لتحديد الموقع على الخريطة</div>
                    <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>سيتم عرض موقع العقار للمشترين</div>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h3 style={{ fontWeight: 800, marginBottom: 24, color: 'var(--primary)' }}>المميزات والخدمات</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                  {AMENITIES_LIST.map(a => (
                    <label
                      key={a}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px',
                        border: `1.5px solid ${form.amenities.includes(a) ? 'var(--primary)' : 'var(--border)'}`,
                        borderRadius: 8, cursor: 'pointer',
                        background: form.amenities.includes(a) ? 'var(--primary-50)' : 'var(--card)',
                        transition: 'all 0.15s'
                      }}
                      onClick={() => toggleAmenity(a)}
                    >
                      {form.amenities.includes(a)
                        ? <CheckSquare size={16} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                        : <Square size={16} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                      }
                      <span style={{ fontSize: 13, fontWeight: form.amenities.includes(a) ? 700 : 400 }}>{a}</span>
                    </label>
                  ))}
                </div>
                <div style={{ marginTop: 24, padding: 20, background: 'var(--success-50)', borderRadius: 12, border: '1px solid rgba(16,185,129,0.2)' }}>
                  <div style={{ fontWeight: 800, color: 'var(--success)', marginBottom: 8 }}>✓ ملخص الإعلان</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: 13 }}>
                    <span><strong>النوع:</strong> {form.type}</span>
                    <span><strong>السعر:</strong> {form.price ? parseInt(form.price).toLocaleString('ar-EG') + ' ج' : '—'}</span>
                    <span><strong>المساحة:</strong> {form.area ? form.area + ' م²' : '—'}</span>
                    <span><strong>الموقع:</strong> {form.location}</span>
                    <span><strong>التشطيب:</strong> {form.finishing}</span>
                    <span><strong>المميزات:</strong> {form.amenities.length} خاصية</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation buttons */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24 }}>
            <button
              className="btn btn-ghost"
              onClick={() => step > 0 ? setStep(s => s - 1) : navigate('/dashboard/broker/listings')}
            >
              <ChevronRight size={16} />
              {step === 0 ? 'إلغاء' : 'السابق'}
            </button>
            <button
              className="btn btn-primary"
              onClick={() => step < STEPS.length - 1 ? setStep(s => s + 1) : handleSubmit()}
            >
              {step === STEPS.length - 1 ? '✓ نشر الإعلان' : 'التالي'}
              {step < STEPS.length - 1 && <ChevronLeft size={16} />}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
