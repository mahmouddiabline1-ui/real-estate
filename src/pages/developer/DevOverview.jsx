import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Building2, Home, BookOpen, TrendingUp, PlusCircle } from 'lucide-react';
import DashboardSidebar from '../../components/dashboard/DashboardSidebar';
import StatCard from '../../components/dashboard/StatCard';
import { projects } from '../../data/mockData';
import { useRole } from '../../App';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const chartData = [
  { month: 'أكتوبر', متاح: 120, محجوز: 45, مباع: 30 },
  { month: 'نوفمبر', متاح: 110, محجوز: 60, مباع: 50 },
  { month: 'ديسمبر', متاح: 90, محجوز: 55, مباع: 75 },
  { month: 'يناير', متاح: 85, محجوز: 70, مباع: 95 },
  { month: 'فبراير', متاح: 75, محجوز: 80, مباع: 110 },
  { month: 'مارس', متاح: 65, محجوز: 95, مباع: 130 },
];

export default function DevOverview() {
  const location = useLocation();
  const navigate = useNavigate();
  const { role, setRole } = useRole();

  const totalUnits = projects.reduce((sum, p) => sum + p.totalUnits, 0);
  const availableUnits = projects.reduce((sum, p) => sum + p.availableUnits, 0);
  const soldUnits = projects.reduce((sum, p) => sum + p.soldUnits, 0);

  return (
    <div className="dashboard-layout">
      <DashboardSidebar role={role} onRoleChange={setRole} currentPath={location.pathname} />
      <main className="dashboard-main">
        <div className="dashboard-header">
          <div>
            <div className="dashboard-header-title">لوحة تحكم المطور</div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>شركة طلعت مصطفى للإسكان</div>
          </div>
          <button className="btn btn-primary btn-sm" onClick={() => navigate('/dashboard/developer/add-project')}>
            <PlusCircle size={16} />
            إضافة مشروع
          </button>
        </div>

        <div className="dashboard-content">
          <div className="stats-grid stats-grid-3" style={{ marginBottom: 28 }}>
            <StatCard icon={Building2} value={projects.length} label="مشروع نشط" trend="+1 هذا الشهر" color="var(--primary)" bg="var(--primary-50)" />
            <StatCard icon={Home} value={`${availableUnits} / ${totalUnits}`} label="وحدة متاحة / إجمالي" trend={`${soldUnits} وحدة مُباعة`} color="var(--teal)" bg="var(--teal-50)" />
            <StatCard icon={BookOpen} value="47" label="طلب حجز جديد" trend="+12 هذا الأسبوع" color="var(--gold)" bg="var(--gold-50)" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 24 }}>
            {/* Chart */}
            <div className="bg-card">
              <h2 style={{ fontWeight: 800, fontSize: 17, marginBottom: 20 }}>حالة الوحدات — آخر 6 أشهر</h2>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={chartData} barSize={18}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fontFamily: 'Cairo' }} />
                  <YAxis tick={{ fontSize: 11, fontFamily: 'Cairo' }} />
                  <Tooltip contentStyle={{ fontFamily: 'Cairo', borderRadius: 8 }} />
                  <Legend wrapperStyle={{ fontFamily: 'Cairo', fontSize: 12 }} />
                  <Bar dataKey="متاح" fill="#0C447C" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="محجوز" fill="#D4A017" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="مباع" fill="#10B981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Projects Summary */}
            <div>
              <div className="bg-card">
                <h3 style={{ fontWeight: 800, fontSize: 15, marginBottom: 16 }}>ملخص المشاريع</h3>
                {projects.map(p => (
                  <div key={p.id} style={{ marginBottom: 16, paddingBottom: 16, borderBottom: '1px solid var(--border-light)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ fontWeight: 700, fontSize: 13 }}>{p.name}</span>
                      <span className="badge badge-success">{p.availableUnits} متاح</span>
                    </div>
                    <div style={{ marginBottom: 6 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-muted)', marginBottom: 3 }}>
                        <span>نسبة المبيعات</span>
                        <span>{Math.round((p.soldUnits / p.totalUnits) * 100)}%</span>
                      </div>
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${(p.soldUnits / p.totalUnits) * 100}%` }} />
                      </div>
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
                      تسليم: {p.deliveryDate}
                    </div>
                  </div>
                ))}
                <button className="btn btn-outline btn-sm" style={{ width: '100%' }} onClick={() => navigate('/dashboard/developer/projects')}>
                  عرض جميع المشاريع
                </button>
              </div>
            </div>
          </div>

          {/* Recent booking requests */}
          <div style={{ marginTop: 24 }}>
            <div className="section-header" style={{ marginBottom: 16 }}>
              <h2 style={{ fontWeight: 800, fontSize: 17 }}>أحدث طلبات الحجز</h2>
              <button className="btn btn-outline btn-sm" onClick={() => navigate('/dashboard/developer/bookings')}>
                عرض الكل
              </button>
            </div>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>العميل</th>
                    <th>المشروع</th>
                    <th>نوع الوحدة</th>
                    <th>السعر</th>
                    <th>التاريخ</th>
                    <th>الحالة</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'أمير حسن', project: 'نور العاصمة', unit: 'شقة 3 غرف', price: '4,800,000', date: '2024-03-18', status: 'new' },
                    { name: 'سمر إبراهيم', project: 'بالم هيلز الجديد', unit: 'توين هاوس', price: '13,000,000', date: '2024-03-17', status: 'contacted' },
                    { name: 'طارق فاروق', project: 'أبراج النيل', unit: 'شقة 2 غرف', price: '2,800,000', date: '2024-03-16', status: 'closed' },
                    { name: 'نوران سعيد', project: 'نور العاصمة', unit: 'بنتهاوس', price: '8,500,000', date: '2024-03-15', status: 'interested' },
                  ].map((req, i) => (
                    <tr key={i}>
                      <td style={{ fontWeight: 700 }}>{req.name}</td>
                      <td style={{ fontSize: 13 }}>{req.project}</td>
                      <td><span className="badge badge-gray">{req.unit}</span></td>
                      <td style={{ fontWeight: 700, color: 'var(--primary)', fontSize: 13 }}>{req.price} ج</td>
                      <td style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{req.date}</td>
                      <td>
                        <span className={`badge ${req.status === 'new' ? 'badge-primary' : req.status === 'contacted' ? 'badge-warning' : req.status === 'interested' ? 'badge-teal' : 'badge-success'}`}>
                          {req.status === 'new' ? 'جديد' : req.status === 'contacted' ? 'تم التواصل' : req.status === 'interested' ? 'مهتم' : 'محجوز ✓'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
