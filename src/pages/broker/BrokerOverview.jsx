import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Eye, Users, ListChecks, TrendingUp, ShieldCheck, MessageSquare, Star, Bell } from 'lucide-react';
import DashboardSidebar from '../../components/dashboard/DashboardSidebar';
import StatCard from '../../components/dashboard/StatCard';
import { VerifiedBadge } from '../../components/shared/Badges';
import { brokerPerformance, brokerLeads } from '../../data/mockData';
import { useRole } from '../../App';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart
} from 'recharts';

export default function BrokerOverview() {
  const location = useLocation();
  const navigate = useNavigate();
  const { role, setRole } = useRole();

  return (
    <div className="dashboard-layout">
      <DashboardSidebar role={role} onRoleChange={setRole} currentPath={location.pathname} />
      <main className="dashboard-main">
        {/* Header */}
        <div className="dashboard-header">
          <div>
            <div className="dashboard-header-title">مرحباً، أحمد محمد 👋</div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>الاثنين، 18 مارس 2024</div>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <VerifiedBadge text="وسيط موثّق" />
            <button className="btn-icon" style={{ position: 'relative' }}>
              <Bell size={18} />
              <span style={{ position: 'absolute', top: 4, left: 4, width: 8, height: 8, background: 'var(--danger)', borderRadius: '50%' }} />
            </button>
            <img
              src="https://i.pravatar.cc/40?img=11"
              alt="profile"
              className="avatar-md"
              style={{ cursor: 'pointer', border: '2px solid var(--primary-50)' }}
            />
          </div>
        </div>

        <div className="dashboard-content">
          {/* Stats */}
          <div className="stats-grid" style={{ marginBottom: 28 }}>
            <StatCard icon={ListChecks} value="38" label="إعلان نشط" trend="+3 هذا الشهر" color="var(--primary)" bg="var(--primary-50)" />
            <StatCard icon={Eye} value="12,840" label="مشاهدة هذا الشهر" trend="+18% مقارنة بالشهر الماضي" color="var(--teal)" bg="var(--teal-50)" />
            <StatCard icon={Users} value="24" label="عميل جديد" trend="+7 هذا الأسبوع" color="var(--gold)" bg="var(--gold-50)" />
            <StatCard icon={TrendingUp} value="92%" label="معدل الاستجابة" trend="ممتاز" color="var(--success)" bg="var(--success-50)" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 24 }}>
            {/* Performance Chart */}
            <div className="bg-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h2 style={{ fontWeight: 800, fontSize: 17 }}>أداء آخر 30 يوم</h2>
                <div style={{ display: 'flex', gap: 16, fontSize: 13 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--primary)', display: 'inline-block' }} />
                    المشاهدات
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--teal)', display: 'inline-block' }} />
                    العملاء
                  </span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={brokerPerformance}>
                  <defs>
                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0C447C" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#0C447C" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0D9488" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#0D9488" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="day" tick={{ fontSize: 11, fontFamily: 'Cairo' }} />
                  <YAxis tick={{ fontSize: 11, fontFamily: 'Cairo' }} />
                  <Tooltip contentStyle={{ fontFamily: 'Cairo', borderRadius: 8 }} />
                  <Area type="monotone" dataKey="views" stroke="#0C447C" fill="url(#colorViews)" strokeWidth={2.5} dot={false} name="المشاهدات" />
                  <Area type="monotone" dataKey="leads" stroke="#0D9488" fill="url(#colorLeads)" strokeWidth={2.5} dot={false} name="العملاء" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Verification Progress */}
            <div>
              <div className="verification-progress" style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                  <h3 style={{ fontWeight: 800, fontSize: 15 }}>حالة التوثيق</h3>
                  <VerifiedBadge />
                </div>
                <div style={{ marginBottom: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 6 }}>
                    <span>اكتمال الملف الشخصي</span>
                    <span style={{ fontWeight: 700 }}>85%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: '85%' }} />
                  </div>
                </div>
                {[
                  { label: 'هوية وطنية', done: true },
                  { label: 'ترخيص وسيط', done: true },
                  { label: 'صورة احترافية', done: true },
                  { label: 'شهادة التميز', done: false },
                ].map(step => (
                  <div key={step.label} className="verification-step">
                    <div className={`v-step-dot ${step.done ? 'done' : 'waiting'}`}>
                      {step.done ? '✓' : '○'}
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{step.label}</div>
                    <div style={{ marginRight: 'auto' }}>
                      <span className={`badge ${step.done ? 'badge-success' : 'badge-gray'}`} style={{ fontSize: 10 }}>
                        {step.done ? 'مكتمل' : 'معلّق'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick actions */}
              <div className="bg-card">
                <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 12 }}>إجراءات سريعة</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <button className="btn btn-primary btn-sm" onClick={() => navigate('/dashboard/broker/add-property')}>
                    + إضافة عقار جديد
                  </button>
                  <button className="btn btn-outline-teal btn-sm" onClick={() => navigate('/dashboard/broker/crm')}>
                    عرض العملاء الجدد (7)
                  </button>
                  <button className="btn btn-ghost btn-sm" onClick={() => navigate('/dashboard/broker/inbox')}>
                    <MessageSquare size={14} />
                    الرسائل الجديدة (3)
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Leads Table */}
          <div style={{ marginTop: 24 }}>
            <div className="section-header" style={{ marginBottom: 16 }}>
              <h2 style={{ fontWeight: 800, fontSize: 17 }}>أحدث العملاء</h2>
              <button className="btn btn-outline btn-sm" onClick={() => navigate('/dashboard/broker/crm')}>
                عرض CRM كاملاً
              </button>
            </div>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>العميل</th>
                    <th>العقار المهتم به</th>
                    <th>المصدر</th>
                    <th>الميزانية</th>
                    <th>الحالة</th>
                    <th>التاريخ</th>
                  </tr>
                </thead>
                <tbody>
                  {brokerLeads.slice(0, 5).map(lead => (
                    <tr key={lead.id}>
                      <td>
                        <div style={{ fontWeight: 700 }}>{lead.name}</div>
                        <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{lead.phone}</div>
                      </td>
                      <td style={{ fontSize: 13 }}>{lead.property}</td>
                      <td>
                        <span className="badge badge-gray">{lead.source}</span>
                      </td>
                      <td style={{ fontSize: 13 }}>{lead.budget}</td>
                      <td>
                        <span className={`badge ${
                          lead.status === 'new' ? 'badge-primary' :
                          lead.status === 'contacted' ? 'badge-warning' :
                          lead.status === 'interested' ? 'badge-teal' :
                          lead.status === 'closed' ? 'badge-success' : 'badge-danger'
                        }`}>
                          {lead.status === 'new' ? 'جديد' :
                           lead.status === 'contacted' ? 'تم التواصل' :
                           lead.status === 'interested' ? 'مهتم' :
                           lead.status === 'closed' ? 'مغلق ✓' : 'خسارة'}
                        </span>
                      </td>
                      <td style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{lead.date}</td>
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
