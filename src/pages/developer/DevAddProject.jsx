import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Plus, Trash2, ChevronRight, ChevronLeft } from 'lucide-react';
import DashboardSidebar from '../../components/dashboard/DashboardSidebar';
import { AREAS } from '../../data/mockData';
import { useRole } from '../../App';

const STEPS = ['معلومات المشروع', 'الصور والوسائط', 'جدول الوحدات', 'خطة الدفع'];
const STATUS_OPTIONS = ['متاح', 'محجوز', 'مباع'];

export default function DevAddProject() {
  const location = useLocation();
  const navigate = useNavigate();
  const { role, setRole } = useRole();
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [units, setUnits] = useState([
    { type: 'شقة 2 غرفة', area: 110, price: 3200000, status: 'متاح' },
    { type: 'شقة 3 غرف', area: 155, price: 4800000, status: 'متاح' },
  ]);
  const [paymentPlan, setPaymentPlan] = useState({ downPayment: 15, years: 7, freeYears: 1 });

  const addUnit = () => {
    setUnits(prev => [...prev, { type: 'وحدة جديدة', area: 100, price: 2000000, status: 'متاح' }]);
  };

  const updateUnit = (i, field, value) => {
    setUnits(prev => prev.map((u, idx) => idx === i ? { ...u, [field]: value } : u));
  };

  const removeUnit = (i) => {
    setUnits(prev => prev.filter((_, idx) => idx !== i));
  };

  if (submitted) {
    return (
      <div className="dashboard-layout">
        <DashboardSidebar role={role} onRoleChange={setRole} currentPath={location.pathname} />
        <main className="dashboard-main" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 64, marginBottom: 20 }}>🏗️</div>
            <h2 style={{ fontSize: 24, fontWeight: 900, color: 'var(--success)', marginBottom: 12 }}>تم إضافة المشروع بنجاح!</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>سيتم مراجعة المشروع ونشره خلال 24 ساعة.</p>
            <button className="btn btn-primary" onClick={() => navigate('/dashboard/developer/projects')}>
              العودة للمشاريع
            </button>
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
          <div className="dashboard-header-title">إضافة مشروع جديد</div>
        </div>
        <div className="dashboard-content" style={{ maxWidth: 860 }}>
          {/* Steps */}
          <div className="step-indicator" style={{ marginBottom: 32 }}>
            {STEPS.map((s, i) => (
              <div key={s} className="step-item">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div className={`step-circle ${i < step ? 'done' : i === step ? 'active' : ''}`}>
                    {i < step ? '✓' : i + 1}
                  </div>
                  <div style={{ fontSize: 11, marginTop: 6, fontWeight: 600, color: i === step ? 'var(--primary)' : 'var(--text-muted)', whiteSpace: 'nowrap' }}>{s}</div>
                </div>
                {i < STEPS.length - 1 && <div className={`step-line ${i < step ? 'done' : ''}`} style={{ margin: '0 8px', marginBottom: 20 }} />}
              </div>
            ))}
          </div>

          <div className="bg-card">
            {step === 0 && (
              <div>
                <h3 style={{ fontWeight: 800, marginBottom: 20, color: 'var(--primary)' }}>معلومات المشروع</h3>
                <div className="form-group">
                  <label>اسم المشروع *</label>
                  <input placeholder="مثال: مشروع نور التجمع" />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>الموقع / المنطقة *</label>
                    <select>
                      {AREAS.map(a => <option key={a}>{a}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>تاريخ التسليم المتوقع *</label>
                    <input type="month" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>إجمالي عدد الوحدات</label>
                    <input type="number" placeholder="250" />
                  </div>
                  <div className="form-group">
                    <label>السعر يبدأ من (جنيه)</label>
                    <input type="number" placeholder="2500000" />
                  </div>
                </div>
                <div className="form-group">
                  <label>وصف المشروع</label>
                  <textarea rows={4} placeholder="اكتب وصفاً شاملاً للمشروع وما يميزه..." />
                </div>
              </div>
            )}

            {step === 1 && (
              <div>
                <h3 style={{ fontWeight: 800, marginBottom: 20, color: 'var(--primary)' }}>الصور والوسائط</h3>
                <div className="photo-upload-area" style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 32, marginBottom: 8 }}>🏙️</div>
                  <div style={{ fontWeight: 700, marginBottom: 4 }}>صور المشروع والتصميمات المعمارية</div>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 12 }}>اختر صوراً احترافية تعكس جودة المشروع</div>
                  <button className="btn btn-primary btn-sm">اختر الصور</button>
                </div>
                <div className="form-group">
                  <label>رابط فيديو المشروع</label>
                  <input placeholder="https://youtube.com/watch?v=..." />
                </div>
                <div className="form-group">
                  <label>رابط الجولة الافتراضية 360°</label>
                  <input placeholder="https://..." />
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                  <h3 style={{ fontWeight: 800, color: 'var(--primary)' }}>جدول الوحدات</h3>
                  <button className="btn btn-teal btn-sm" onClick={addUnit}>
                    <Plus size={14} />
                    إضافة وحدة
                  </button>
                </div>
                <div className="unit-table-wrapper">
                  <table>
                    <thead>
                      <tr>
                        <th>نوع الوحدة</th>
                        <th>المساحة (م²)</th>
                        <th>السعر (جنيه)</th>
                        <th>الحالة</th>
                        <th>حذف</th>
                      </tr>
                    </thead>
                    <tbody>
                      {units.map((unit, i) => (
                        <tr key={i}>
                          <td>
                            <input
                              value={unit.type}
                              onChange={e => updateUnit(i, 'type', e.target.value)}
                              style={{ padding: '6px 10px', fontSize: 13 }}
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              value={unit.area}
                              onChange={e => updateUnit(i, 'area', e.target.value)}
                              style={{ padding: '6px 10px', fontSize: 13 }}
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              value={unit.price}
                              onChange={e => updateUnit(i, 'price', e.target.value)}
                              style={{ padding: '6px 10px', fontSize: 13 }}
                            />
                          </td>
                          <td>
                            <select
                              value={unit.status}
                              onChange={e => updateUnit(i, 'status', e.target.value)}
                              style={{ padding: '6px 10px', fontSize: 13 }}
                            >
                              {STATUS_OPTIONS.map(s => <option key={s}>{s}</option>)}
                            </select>
                          </td>
                          <td>
                            <button className="btn-icon" onClick={() => removeUnit(i)} style={{ color: 'var(--danger)' }}>
                              <Trash2 size={14} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h3 style={{ fontWeight: 800, marginBottom: 20, color: 'var(--primary)' }}>خطة الدفع والتقسيط</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 28 }}>
                  {[
                    { label: 'نسبة المقدم (%)', key: 'downPayment', min: 5, max: 50 },
                    { label: 'مدة التقسيط (سنة)', key: 'years', min: 1, max: 20 },
                    { label: 'سنوات بدون فوائد', key: 'freeYears', min: 0, max: 5 },
                  ].map(field => (
                    <div key={field.key} className="form-group">
                      <label>{field.label}</label>
                      <input
                        type="number"
                        min={field.min}
                        max={field.max}
                        value={paymentPlan[field.key]}
                        onChange={e => setPaymentPlan(p => ({ ...p, [field.key]: +e.target.value }))}
                      />
                    </div>
                  ))}
                </div>

                {/* Preview */}
                <div style={{ background: 'linear-gradient(135deg, var(--primary), var(--teal-dark))', borderRadius: 16, padding: 24, color: 'white' }}>
                  <div style={{ fontWeight: 800, marginBottom: 16, fontSize: 16 }}>معاينة خطة الدفع</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                    <div style={{ textAlign: 'center', background: 'rgba(255,255,255,0.15)', borderRadius: 12, padding: 16 }}>
                      <div style={{ fontSize: 28, fontWeight: 900 }}>{paymentPlan.downPayment}%</div>
                      <div style={{ fontSize: 13, opacity: 0.8 }}>مقدم</div>
                    </div>
                    <div style={{ textAlign: 'center', background: 'rgba(255,255,255,0.15)', borderRadius: 12, padding: 16 }}>
                      <div style={{ fontSize: 28, fontWeight: 900 }}>{paymentPlan.years}</div>
                      <div style={{ fontSize: 13, opacity: 0.8 }}>سنة تقسيط</div>
                    </div>
                    <div style={{ textAlign: 'center', background: 'rgba(255,255,255,0.15)', borderRadius: 12, padding: 16 }}>
                      <div style={{ fontSize: 28, fontWeight: 900 }}>{paymentPlan.freeYears}</div>
                      <div style={{ fontSize: 13, opacity: 0.8 }}>سنة بدون فوائد</div>
                    </div>
                  </div>
                  <div style={{ marginTop: 16, fontSize: 13, opacity: 0.75, textAlign: 'center' }}>
                    مثال: لوحدة بـ 4 مليون — المقدم: {(4000000 * paymentPlan.downPayment / 100).toLocaleString('ar-EG')} ج | القسط الشهري: ~{Math.round((4000000 * (1 - paymentPlan.downPayment / 100)) / (paymentPlan.years * 12)).toLocaleString('ar-EG')} ج
                  </div>
                </div>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24 }}>
            <button className="btn btn-ghost" onClick={() => step > 0 ? setStep(s => s - 1) : navigate('/dashboard/developer/projects')}>
              <ChevronRight size={16} />
              {step === 0 ? 'إلغاء' : 'السابق'}
            </button>
            <button className="btn btn-primary" onClick={() => step < STEPS.length - 1 ? setStep(s => s + 1) : setSubmitted(true)}>
              {step === STEPS.length - 1 ? '✓ نشر المشروع' : 'التالي'}
              {step < STEPS.length - 1 && <ChevronLeft size={16} />}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
