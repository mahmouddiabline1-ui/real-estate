import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Check, X, FileText, User, Building2, Eye } from 'lucide-react';
import DashboardSidebar from '../../components/dashboard/DashboardSidebar';
import { pendingUsers } from '../../data/mockData';
import { useRole } from '../../App';

export default function AdminUsers() {
  const location = useLocation();
  const { role, setRole } = useRole();
  const [users, setUsers] = useState(pendingUsers);
  const [filter, setFilter] = useState('pending');

  const approve = (id) => setUsers(prev => prev.map(u => u.id === id ? { ...u, status: 'approved' } : u));
  const reject = (id) => setUsers(prev => prev.map(u => u.id === id ? { ...u, status: 'rejected' } : u));

  const filtered = filter === 'all' ? users : users.filter(u => u.status === filter);

  return (
    <div className="dashboard-layout">
      <DashboardSidebar role={role} onRoleChange={setRole} currentPath={location.pathname} />
      <main className="dashboard-main">
        <div className="dashboard-header">
          <div>
            <div className="dashboard-header-title">إدارة المستخدمين والموافقة</div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>
              {users.filter(u => u.status === 'pending').length} طلب قيد المراجعة
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {['pending', 'approved', 'rejected', 'all'].map(f => (
              <button
                key={f}
                className={`badge ${filter === f ? 'badge-primary' : 'badge-gray'}`}
                style={{ cursor: 'pointer', border: 'none', padding: '6px 14px', fontSize: 13 }}
                onClick={() => setFilter(f)}
              >
                {f === 'pending' ? 'معلّق' : f === 'approved' ? 'موافق' : f === 'rejected' ? 'مرفوض' : 'الكل'}
              </button>
            ))}
          </div>
        </div>

        <div className="dashboard-content">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {filtered.map(user => (
              <div
                key={user.id}
                className="bg-card"
                style={{
                  borderRight: `4px solid ${user.status === 'pending' ? 'var(--warning)' : user.status === 'approved' ? 'var(--success)' : 'var(--danger)'}`,
                }}
              >
                <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                  {/* Avatar */}
                  <div style={{
                    width: 56, height: 56, borderRadius: 14,
                    background: user.type === 'broker' ? 'var(--primary-50)' : 'var(--teal-50)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    {user.type === 'broker'
                      ? <User size={24} style={{ color: 'var(--primary)' }} />
                      : <Building2 size={24} style={{ color: 'var(--teal)' }} />
                    }
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                      <span style={{ fontWeight: 800, fontSize: 16 }}>{user.name}</span>
                      <span className={`badge ${user.type === 'broker' ? 'badge-primary' : 'badge-teal'}`}>
                        {user.type === 'broker' ? '🏠 وسيط' : '🏗️ شركة تطوير'}
                      </span>
                      <span className={`badge ${user.status === 'pending' ? 'badge-warning' : user.status === 'approved' ? 'badge-success' : 'badge-danger'}`}>
                        {user.status === 'pending' ? 'معلّق' : user.status === 'approved' ? '✓ تم الموافقة' : '✗ مرفوض'}
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: 20, fontSize: 13, color: 'var(--text-secondary)', marginBottom: 12, flexWrap: 'wrap' }}>
                      <span>📧 {user.email}</span>
                      <span>📞 {user.phone}</span>
                      <span>📍 {user.location}</span>
                      <span>📅 تقدّم في: {user.submitted}</span>
                    </div>

                    {/* Documents */}
                    <div style={{ marginBottom: 16 }}>
                      <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 8 }}>المستندات المرفقة:</div>
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        {user.documents.map((doc, i) => (
                          <button
                            key={i}
                            className="btn btn-ghost btn-sm"
                            style={{ fontSize: 12, gap: 5 }}
                          >
                            <FileText size={13} />
                            {doc}
                            <Eye size={12} />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    {user.status === 'pending' && (
                      <div style={{ display: 'flex', gap: 10 }}>
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() => approve(user.id)}
                          style={{ gap: 6 }}
                        >
                          <Check size={16} />
                          الموافقة والتوثيق
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => reject(user.id)}
                          style={{ gap: 6 }}
                        >
                          <X size={16} />
                          الرفض
                        </button>
                        <button className="btn btn-ghost btn-sm">
                          طلب مستندات إضافية
                        </button>
                      </div>
                    )}
                    {user.status === 'approved' && (
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        <span style={{ color: 'var(--success)', fontWeight: 700, fontSize: 14 }}>✓ تم الموافقة وإصدار شارة التوثيق</span>
                        <button className="btn btn-ghost btn-sm" onClick={() => setUsers(prev => prev.map(u => u.id === user.id ? { ...u, status: 'rejected' } : u))}>
                          إلغاء الموافقة
                        </button>
                      </div>
                    )}
                    {user.status === 'rejected' && (
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        <span style={{ color: 'var(--danger)', fontWeight: 700, fontSize: 14 }}>✗ تم الرفض</span>
                        <button className="btn btn-ghost btn-sm" onClick={() => setUsers(prev => prev.map(u => u.id === user.id ? { ...u, status: 'pending' } : u))}>
                          إعادة المراجعة
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: 60, color: 'var(--text-muted)' }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>📭</div>
              <div style={{ fontWeight: 700 }}>لا توجد طلبات في هذه الحالة</div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
