import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ShieldCheck, ShieldOff, Search } from 'lucide-react';
import DashboardSidebar from '../../components/dashboard/DashboardSidebar';
import { VerifiedBadge } from '../../components/shared/Badges';
import { properties, brokers, developers } from '../../data/mockData';
import { useRole } from '../../App';

export default function AdminVerification() {
  const location = useLocation();
  const { role, setRole } = useRole();
  const [tab, setTab] = useState('properties');
  const [search, setSearch] = useState('');

  const [propVerified, setPropVerified] = useState(
    Object.fromEntries(properties.map(p => [p.id, p.verified]))
  );
  const [brokerVerified, setBrokerVerified] = useState(
    Object.fromEntries(brokers.map(b => [b.id, b.verified]))
  );
  const [devVerified, setDevVerified] = useState(
    Object.fromEntries(developers.map(d => [d.id, d.verified]))
  );

  const toggleProp = (id) => setPropVerified(prev => ({ ...prev, [id]: !prev[id] }));
  const toggleBroker = (id) => setBrokerVerified(prev => ({ ...prev, [id]: !prev[id] }));
  const toggleDev = (id) => setDevVerified(prev => ({ ...prev, [id]: !prev[id] }));

  const filteredProps = properties.filter(p => !search || p.title.includes(search) || p.location.includes(search));
  const filteredBrokers = brokers.filter(b => !search || b.name.includes(search) || b.agency.includes(search));
  const filteredDevs = developers.filter(d => !search || d.name.includes(search));

  const TABS = [
    { key: 'properties', label: 'العقارات', count: Object.values(propVerified).filter(Boolean).length },
    { key: 'brokers', label: 'الوسطاء', count: Object.values(brokerVerified).filter(Boolean).length },
    { key: 'developers', label: 'شركات التطوير', count: Object.values(devVerified).filter(Boolean).length },
  ];

  return (
    <div className="dashboard-layout">
      <DashboardSidebar role={role} onRoleChange={setRole} currentPath={location.pathname} />
      <main className="dashboard-main">
        <div className="dashboard-header">
          <div>
            <div className="dashboard-header-title">إدارة التوثيق والشارات</div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>
              منح شارة "موثّق" للعقارات والوسطاء والشركات
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <span className="badge badge-success" style={{ fontSize: 13, padding: '6px 14px' }}>
              ✓ {Object.values(propVerified).filter(Boolean).length + Object.values(brokerVerified).filter(Boolean).length + Object.values(devVerified).filter(Boolean).length} توثيق نشط
            </span>
          </div>
        </div>

        <div className="dashboard-content">
          {/* Tabs */}
          <div style={{ display: 'flex', gap: 0, background: 'var(--card)', borderRadius: 12, border: '1px solid var(--border)', overflow: 'hidden', marginBottom: 20 }}>
            {TABS.map(t => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                style={{
                  flex: 1, padding: '14px 20px', border: 'none', cursor: 'pointer', fontFamily: 'Cairo',
                  fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  background: tab === t.key ? 'var(--primary)' : 'var(--card)',
                  color: tab === t.key ? 'white' : 'var(--text-secondary)',
                  borderLeft: t.key !== 'developers' ? '1px solid var(--border)' : 'none',
                  transition: 'all 0.2s'
                }}
              >
                {t.label}
                <span style={{
                  background: tab === t.key ? 'rgba(255,255,255,0.2)' : 'var(--bg-alt)',
                  padding: '2px 8px', borderRadius: 20, fontSize: 12
                }}>
                  {t.count} موثّق
                </span>
              </button>
            ))}
          </div>

          {/* Search */}
          <div style={{ position: 'relative', marginBottom: 20 }}>
            <Search size={15} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input placeholder="بحث..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingRight: 40 }} />
          </div>

          {/* Properties tab */}
          {tab === 'properties' && (
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>العقار</th>
                    <th>النوع</th>
                    <th>الموقع</th>
                    <th>الوسيط</th>
                    <th>حالة التوثيق</th>
                    <th>الإجراء</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProps.map(p => (
                    <tr key={p.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <img src={p.images[0]} alt="" style={{ width: 44, height: 34, borderRadius: 6, objectFit: 'cover' }} onError={e => { e.target.src = `https://picsum.photos/seed/${p.id}/200/150`; }} />
                          <span style={{ fontWeight: 700, fontSize: 13 }}>{p.title}</span>
                        </div>
                      </td>
                      <td><span className="badge badge-gray">{p.type}</span></td>
                      <td style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{p.location}</td>
                      <td style={{ fontSize: 13 }}>وسيط #{p.brokerId}</td>
                      <td>
                        {propVerified[p.id] ? <VerifiedBadge /> : <span className="badge badge-gray">غير موثق</span>}
                      </td>
                      <td>
                        <button
                          onClick={() => toggleProp(p.id)}
                          className={`btn btn-sm ${propVerified[p.id] ? 'btn-danger' : 'btn-teal'}`}
                          style={{ gap: 5 }}
                        >
                          {propVerified[p.id]
                            ? <><ShieldOff size={13} /> سحب التوثيق</>
                            : <><ShieldCheck size={13} /> منح التوثيق</>
                          }
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Brokers tab */}
          {tab === 'brokers' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
              {filteredBrokers.map(broker => (
                <div key={broker.id} className="bg-card" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <img
                    src={broker.avatar}
                    alt={broker.name}
                    style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover' }}
                    onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(broker.name)}&background=0C447C&color=fff`; }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <span style={{ fontWeight: 800 }}>{broker.name}</span>
                      {brokerVerified[broker.id] && <VerifiedBadge />}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{broker.agency}</div>
                  </div>
                  <button
                    onClick={() => toggleBroker(broker.id)}
                    className={`btn btn-sm ${brokerVerified[broker.id] ? 'btn-danger' : 'btn-teal'}`}
                    style={{ gap: 5, flexShrink: 0 }}
                  >
                    {brokerVerified[broker.id]
                      ? <><ShieldOff size={13} /> سحب</>
                      : <><ShieldCheck size={13} /> توثيق</>
                    }
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Developers tab */}
          {tab === 'developers' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {filteredDevs.map(dev => (
                <div key={dev.id} className="bg-card" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ width: 64, height: 64, borderRadius: 14, background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 900, fontSize: 20, flexShrink: 0 }}>
                    {dev.name.split(' ')[1]?.[0] || dev.name[0]}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                      <span style={{ fontWeight: 800, fontSize: 16 }}>{dev.name}</span>
                      {devVerified[dev.id] && <VerifiedBadge />}
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                      {dev.projectsCount} مشروع — {dev.location}
                    </div>
                  </div>
                  <button
                    onClick={() => toggleDev(dev.id)}
                    className={`btn btn-sm ${devVerified[dev.id] ? 'btn-danger' : 'btn-teal'}`}
                    style={{ gap: 6 }}
                  >
                    {devVerified[dev.id]
                      ? <><ShieldOff size={14} /> سحب التوثيق</>
                      : <><ShieldCheck size={14} /> منح التوثيق</>
                    }
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
