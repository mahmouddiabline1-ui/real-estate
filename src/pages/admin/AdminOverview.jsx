import React from 'react';
import { useLocation } from 'react-router-dom';
import { Building2, Users, Eye, TrendingUp } from 'lucide-react';
import DashboardSidebar from '../../components/dashboard/DashboardSidebar';
import StatCard from '../../components/dashboard/StatCard';
import { adminStats } from '../../data/mockData';
import { useRole } from '../../App';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, BarChart, Bar
} from 'recharts';

export default function AdminOverview() {
  const location = useLocation();
  const { role, setRole } = useRole();

  return (
    <div className="dashboard-layout">
      <DashboardSidebar role={role} onRoleChange={setRole} currentPath={location.pathname} />
      <main className="dashboard-main">
        <div className="dashboard-header">
          <div>
            <div className="dashboard-header-title">لوحة تحكم الإدارة</div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>نظرة شاملة على المنصة</div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <span className="badge badge-success">🟢 المنصة تعمل بشكل طبيعي</span>
          </div>
        </div>

        <div className="dashboard-content">
          {/* Stats */}
          <div className="stats-grid" style={{ marginBottom: 28 }}>
            <StatCard icon={Building2} value={adminStats.totalProperties.toLocaleString('ar-EG')} label="إجمالي العقارات" trend="+1,340 هذا الشهر" color="var(--primary)" bg="var(--primary-50)" />
            <StatCard icon={Users} value={(adminStats.totalBrokers + adminStats.totalCompanies).toLocaleString('ar-EG')} label="المستخدمون (وسطاء + شركات)" trend="+289 هذا الشهر" color="var(--teal)" bg="var(--teal-50)" />
            <StatCard icon={Eye} value={`${(adminStats.totalViews / 1000000).toFixed(1)}م`} label="إجمالي المشاهدات" trend="+22% مقارنة بالشهر الماضي" color="var(--gold)" bg="var(--gold-50)" />
            <StatCard icon={TrendingUp} value="138" label="صفقة هذا الشهر" trend="+23% نمو" color="var(--success)" bg="var(--success-50)" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
            {/* Growth Line Chart */}
            <div className="bg-card">
              <h2 style={{ fontWeight: 800, fontSize: 16, marginBottom: 20 }}>نمو العقارات والمستخدمين</h2>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={adminStats.monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fontFamily: 'Cairo' }} />
                  <YAxis tick={{ fontSize: 11, fontFamily: 'Cairo' }} />
                  <Tooltip contentStyle={{ fontFamily: 'Cairo', borderRadius: 8 }} />
                  <Legend wrapperStyle={{ fontFamily: 'Cairo', fontSize: 12 }} />
                  <Line type="monotone" dataKey="properties" stroke="var(--primary)" strokeWidth={2.5} dot={false} name="عقارات جديدة" />
                  <Line type="monotone" dataKey="users" stroke="var(--teal)" strokeWidth={2.5} dot={false} name="مستخدمون جدد" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Transactions Bar Chart */}
            <div className="bg-card">
              <h2 style={{ fontWeight: 800, fontSize: 16, marginBottom: 20 }}>الصفقات الشهرية</h2>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={adminStats.monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fontFamily: 'Cairo' }} />
                  <YAxis tick={{ fontSize: 11, fontFamily: 'Cairo' }} />
                  <Tooltip contentStyle={{ fontFamily: 'Cairo', borderRadius: 8 }} />
                  <Bar dataKey="transactions" fill="var(--gold)" radius={[4, 4, 0, 0]} name="الصفقات" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Platform breakdown */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {[
              { label: 'شقق', count: '8,420', pct: 65, color: 'var(--primary)' },
              { label: 'فيلات', count: '1,230', pct: 10, color: 'var(--teal)' },
              { label: 'أراضي', count: '2,100', pct: 16, color: 'var(--gold)' },
              { label: 'محلات تجارية', count: '970', pct: 7, color: 'var(--success)' },
              { label: 'صيدليات', count: '180', pct: 1, color: 'var(--danger)' },
              { label: 'كمبوندات', count: '340', pct: 3, color: '#A855F7' },
            ].map(item => (
              <div key={item.label} className="bg-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontWeight: 700 }}>{item.label}</span>
                  <span style={{ fontWeight: 800, color: item.color }}>{item.count}</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${item.pct}%`, background: item.color }} />
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>{item.pct}% من الإجمالي</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
