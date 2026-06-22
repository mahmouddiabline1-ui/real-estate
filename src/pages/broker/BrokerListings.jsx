import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Edit2, Trash2, Eye, PlusCircle, Search } from 'lucide-react';
import DashboardSidebar from '../../components/dashboard/DashboardSidebar';
import { VerifiedBadge } from '../../components/shared/Badges';
import { properties, formatPrice } from '../../data/mockData';
import { useRole } from '../../App';

const STATUS_OPTIONS = ['الكل', 'نشط', 'منتهي', 'قيد المراجعة'];

export default function BrokerListings() {
  const location = useLocation();
  const navigate = useNavigate();
  const { role, setRole } = useRole();
  const [statusFilter, setStatusFilter] = useState('الكل');
  const [search, setSearch] = useState('');

  const brokerProps = properties.filter(p => p.brokerId === 1);
  const filtered = brokerProps.filter(p => {
    if (search && !p.title.includes(search) && !p.location.includes(search)) return false;
    if (statusFilter === 'نشط') return p.status === 'active';
    if (statusFilter === 'منتهي') return p.status === 'expired';
    if (statusFilter === 'قيد المراجعة') return p.status === 'pending';
    return true;
  });

  return (
    <div className="dashboard-layout">
      <DashboardSidebar role={role} onRoleChange={setRole} currentPath={location.pathname} />
      <main className="dashboard-main">
        <div className="dashboard-header">
          <div className="dashboard-header-title">إعلاناتي</div>
          <button className="btn btn-primary btn-sm" onClick={() => navigate('/dashboard/broker/add-property')}>
            <PlusCircle size={16} />
            إضافة إعلان جديد
          </button>
        </div>

        <div className="dashboard-content">
          {/* Filters */}
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 24, background: 'var(--card)', padding: '16px 20px', borderRadius: 12, border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', gap: 8 }}>
              {STATUS_OPTIONS.map(s => (
                <button
                  key={s}
                  className={`badge ${statusFilter === s ? 'badge-primary' : 'badge-gray'}`}
                  style={{ cursor: 'pointer', border: 'none', padding: '6px 14px', fontSize: 13 }}
                  onClick={() => setStatusFilter(s)}
                >
                  {s}
                </button>
              ))}
            </div>
            <div style={{ flex: 1, position: 'relative' }}>
              <Search size={16} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                placeholder="بحث في إعلاناتك..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ paddingRight: 38 }}
              />
            </div>
          </div>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>العقار</th>
                  <th>النوع</th>
                  <th>السعر</th>
                  <th>الموقع</th>
                  <th>المشاهدات</th>
                  <th>الحالة</th>
                  <th>التوثيق</th>
                  <th>الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(p => (
                  <tr key={p.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <img
                          src={p.images[0]}
                          alt=""
                          style={{ width: 56, height: 42, borderRadius: 6, objectFit: 'cover' }}
                          onError={e => { e.target.src = `https://picsum.photos/seed/${p.id}/200/150`; }}
                        />
                        <div>
                          <div style={{ fontWeight: 700, fontSize: 13 }}>{p.title}</div>
                          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{p.listed}</div>
                        </div>
                      </div>
                    </td>
                    <td><span className="badge badge-gray">{p.type}</span></td>
                    <td style={{ fontWeight: 700, color: 'var(--primary)', fontSize: 13 }}>
                      {formatPrice(p.price, p.saleType)}
                    </td>
                    <td style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{p.location}</td>
                    <td>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13 }}>
                        <Eye size={13} />
                        {p.views.toLocaleString('ar-EG')}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${p.status === 'active' ? 'badge-success' : p.status === 'expired' ? 'badge-danger' : 'badge-warning'}`}>
                        {p.status === 'active' ? 'نشط' : p.status === 'expired' ? 'منتهي' : 'مراجعة'}
                      </span>
                    </td>
                    <td>
                      {p.verified ? <VerifiedBadge /> : <span className="badge badge-gray">غير موثق</span>}
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button className="btn-icon" title="تعديل" onClick={() => navigate('/dashboard/broker/add-property')}>
                          <Edit2 size={15} />
                        </button>
                        <button className="btn-icon" title="معاينة" onClick={() => navigate(`/property/${p.id}`)}>
                          <Eye size={15} />
                        </button>
                        <button className="btn-icon" title="حذف" style={{ color: 'var(--danger)', borderColor: 'var(--danger-50)' }}>
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: 60, color: 'var(--text-muted)' }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>📭</div>
              <div style={{ fontWeight: 700 }}>لا توجد إعلانات مطابقة</div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
