import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Star, Edit2, Search } from 'lucide-react';
import DashboardSidebar from '../../components/dashboard/DashboardSidebar';
import { VerifiedBadge } from '../../components/shared/Badges';
import { properties, formatPrice } from '../../data/mockData';
import { useRole } from '../../App';

export default function AdminProperties() {
  const location = useLocation();
  const navigate = useNavigate();
  const { role, setRole } = useRole();
  const [props, setProps] = useState(properties.map(p => ({ ...p, hidden: false, adminFeatured: p.featured })));
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  const toggleHide = (id) => setProps(prev => prev.map(p => p.id === id ? { ...p, hidden: !p.hidden } : p));
  const toggleFeatured = (id) => setProps(prev => prev.map(p => p.id === id ? { ...p, adminFeatured: !p.adminFeatured } : p));

  const filtered = props.filter(p => {
    if (search && !p.title.includes(search) && !p.location.includes(search)) return false;
    if (typeFilter && p.type !== typeFilter) return false;
    return true;
  });

  return (
    <div className="dashboard-layout">
      <DashboardSidebar role={role} onRoleChange={setRole} currentPath={location.pathname} />
      <main className="dashboard-main">
        <div className="dashboard-header">
          <div>
            <div className="dashboard-header-title">جميع العقارات</div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>
              {props.length} عقار في النظام
            </div>
          </div>
        </div>

        <div className="dashboard-content">
          {/* Filters */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 20, background: 'var(--card)', padding: '16px 20px', borderRadius: 12, border: '1px solid var(--border)' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <Search size={15} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input placeholder="بحث في العقارات..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingRight: 36 }} />
            </div>
            <select style={{ width: 'auto' }} value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
              <option value="">جميع الأنواع</option>
              <option>شقة</option>
              <option>فيلا</option>
              <option>أرض</option>
              <option>محل تجاري</option>
              <option>صيدلية</option>
            </select>
          </div>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>العقار</th>
                  <th>النوع</th>
                  <th>الموقع</th>
                  <th>السعر</th>
                  <th>المشاهدات</th>
                  <th>التوثيق</th>
                  <th>الحالة</th>
                  <th>الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(p => (
                  <tr key={p.id} style={{ opacity: p.hidden ? 0.5 : 1 }}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <img
                          src={p.images[0]}
                          alt=""
                          style={{ width: 52, height: 40, borderRadius: 6, objectFit: 'cover', opacity: p.hidden ? 0.5 : 1 }}
                          onError={e => { e.target.src = `https://picsum.photos/seed/${p.id}/200/150`; }}
                        />
                        <div>
                          <div style={{ fontWeight: 700, fontSize: 13 }}>{p.title}</div>
                          {p.adminFeatured && <span className="badge badge-gold" style={{ fontSize: 10 }}>⭐ مميز</span>}
                        </div>
                      </div>
                    </td>
                    <td><span className="badge badge-gray">{p.type}</span></td>
                    <td style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{p.location}</td>
                    <td style={{ fontWeight: 700, color: 'var(--primary)', fontSize: 13 }}>{formatPrice(p.price, p.saleType)}</td>
                    <td style={{ fontSize: 13 }}>{p.views.toLocaleString('ar-EG')}</td>
                    <td>{p.verified ? <VerifiedBadge /> : <span className="badge badge-gray">—</span>}</td>
                    <td>
                      <span className={`badge ${p.hidden ? 'badge-danger' : 'badge-success'}`}>
                        {p.hidden ? 'مخفي' : 'نشط'}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button
                          className="btn-icon"
                          title={p.adminFeatured ? 'إلغاء التمييز' : 'تمييز'}
                          onClick={() => toggleFeatured(p.id)}
                          style={{ color: p.adminFeatured ? 'var(--gold)' : 'var(--text-muted)' }}
                        >
                          <Star size={15} fill={p.adminFeatured ? 'currentColor' : 'none'} />
                        </button>
                        <button
                          className="btn-icon"
                          title={p.hidden ? 'إظهار' : 'إخفاء'}
                          onClick={() => toggleHide(p.id)}
                        >
                          {p.hidden ? <Eye size={15} /> : <EyeOff size={15} />}
                        </button>
                        <button className="btn-icon" title="تعديل" onClick={() => navigate('/dashboard/broker/add-property')}>
                          <Edit2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
