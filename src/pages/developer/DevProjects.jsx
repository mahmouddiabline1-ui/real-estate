import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Edit2, Eye, PlusCircle, MapPin, Calendar } from 'lucide-react';
import DashboardSidebar from '../../components/dashboard/DashboardSidebar';
import { VerifiedBadge } from '../../components/shared/Badges';
import { projects, formatPrice } from '../../data/mockData';
import { useRole } from '../../App';

export default function DevProjects() {
  const location = useLocation();
  const navigate = useNavigate();
  const { role, setRole } = useRole();

  return (
    <div className="dashboard-layout">
      <DashboardSidebar role={role} onRoleChange={setRole} currentPath={location.pathname} />
      <main className="dashboard-main">
        <div className="dashboard-header">
          <div className="dashboard-header-title">مشاريعي</div>
          <button className="btn btn-primary btn-sm" onClick={() => navigate('/dashboard/developer/add-project')}>
            <PlusCircle size={16} />
            مشروع جديد
          </button>
        </div>
        <div className="dashboard-content">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
            {projects.map(project => (
              <div key={project.id} className="card" style={{ overflow: 'hidden' }}>
                <div style={{ position: 'relative', height: 180 }}>
                  <img
                    src={project.image}
                    alt={project.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={e => { e.target.src = `https://picsum.photos/seed/${project.id + 30}/800/400`; }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }} />
                  <div style={{ position: 'absolute', top: 12, right: 12 }}>{project.verified && <VerifiedBadge />}</div>
                  <div style={{ position: 'absolute', bottom: 12, right: 12, color: 'white' }}>
                    <div style={{ fontWeight: 900, fontSize: 18 }}>{project.name}</div>
                  </div>
                </div>
                <div style={{ padding: 18 }}>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap', fontSize: 13, color: 'var(--text-secondary)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><MapPin size={13} />{project.location}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Calendar size={13} />تسليم: {project.deliveryDate}</span>
                  </div>

                  {/* Units stats */}
                  <div style={{ display: 'flex', gap: 0, background: 'var(--bg-alt)', borderRadius: 10, overflow: 'hidden', marginBottom: 16 }}>
                    {[
                      { label: 'إجمالي', value: project.totalUnits, color: 'var(--primary)' },
                      { label: 'متاح', value: project.availableUnits, color: 'var(--success)' },
                      { label: 'مباع', value: project.soldUnits, color: 'var(--gold)' },
                    ].map((s, i) => (
                      <div key={i} style={{ flex: 1, padding: '10px 0', textAlign: 'center', borderLeft: i > 0 ? '1px solid var(--border)' : 'none' }}>
                        <div style={{ fontWeight: 800, color: s.color, fontSize: 18 }}>{s.value}</div>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{s.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Units table */}
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10 }}>الوحدات المتاحة</div>
                    <div className="unit-table-wrapper">
                      <table style={{ fontSize: 12 }}>
                        <thead>
                          <tr>
                            <th style={{ padding: '8px 12px' }}>النوع</th>
                            <th style={{ padding: '8px 12px' }}>المساحة</th>
                            <th style={{ padding: '8px 12px' }}>السعر</th>
                            <th style={{ padding: '8px 12px' }}>الحالة</th>
                          </tr>
                        </thead>
                        <tbody>
                          {project.units.map((unit, i) => (
                            <tr key={i}>
                              <td style={{ padding: '8px 12px', fontWeight: 600 }}>{unit.type}</td>
                              <td style={{ padding: '8px 12px' }}>{unit.area} م²</td>
                              <td style={{ padding: '8px 12px', color: 'var(--primary)', fontWeight: 700 }}>
                                {formatPrice(unit.price, 'بيع')}
                              </td>
                              <td style={{ padding: '8px 12px' }}>
                                <span className={`badge ${unit.status === 'متاح' ? 'badge-success' : unit.status === 'محجوز' ? 'badge-warning' : 'badge-danger'}`} style={{ fontSize: 11 }}>
                                  {unit.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Payment plan */}
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10 }}>خطة الدفع</div>
                    <div className="payment-plan-table">
                      <div className="payment-plan-cell">
                        <div className="payment-plan-value">{project.paymentPlan.downPayment}%</div>
                        <div className="payment-plan-label">مقدم</div>
                      </div>
                      <div className="payment-plan-cell">
                        <div className="payment-plan-value">{project.paymentPlan.years}</div>
                        <div className="payment-plan-label">سنوات تقسيط</div>
                      </div>
                      <div className="payment-plan-cell">
                        <div className="payment-plan-value" style={{ color: 'var(--success)' }}>0%</div>
                        <div className="payment-plan-label">فوائد</div>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 10 }}>
                    <button className="btn btn-outline btn-sm" style={{ flex: 1 }} onClick={() => navigate('/dashboard/developer/add-project')}>
                      <Edit2 size={14} />
                      تعديل
                    </button>
                    <button className="btn btn-primary btn-sm" style={{ flex: 1 }}>
                      <Eye size={14} />
                      معاينة
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
