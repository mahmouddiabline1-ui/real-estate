import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { GripVertical, Phone, MessageSquare, Home } from 'lucide-react';
import DashboardSidebar from '../../components/dashboard/DashboardSidebar';
import { useRole } from '../../App';

const COLUMNS = [
  { key: 'new', label: 'طلب جديد', color: '#3B82F6', bg: '#EFF6FF' },
  { key: 'contacted', label: 'تم التواصل', color: '#F59E0B', bg: '#FFFBEB' },
  { key: 'interested', label: 'مهتم بالحجز', color: '#0D9488', bg: '#E6F7F6' },
  { key: 'booked', label: 'محجوز ✓', color: '#10B981', bg: '#ECFDF5' },
];

const BOOKING_REQUESTS = [
  { id: 1, name: 'أمير حسن', phone: '01011122233', project: 'نور العاصمة', unit: 'شقة 3 غرف', budget: '4,800,000', date: '2024-03-18', status: 'new', notes: 'يريد وحدة في الطابق العلوي' },
  { id: 2, name: 'سمر إبراهيم', phone: '01099988877', project: 'بالم هيلز الجديد', unit: 'توين هاوس', budget: '13,000,000', date: '2024-03-17', status: 'contacted', notes: 'تم التواصل ومتحمسة جداً' },
  { id: 3, name: 'طارق فاروق', phone: '01055566644', project: 'أبراج النيل', unit: 'شقة 2 غرفة', budget: '2,800,000', date: '2024-03-16', status: 'booked', notes: 'دفع المقدم' },
  { id: 4, name: 'نوران سعيد', phone: '01022233344', project: 'نور العاصمة', unit: 'بنتهاوس', budget: '8,500,000', date: '2024-03-15', status: 'interested', notes: 'تطلب تمويل عقاري' },
  { id: 5, name: 'بدر الأنصاري', phone: '01044455566', project: 'بالم هيلز الجديد', unit: 'فيلا مستقلة', budget: '22,000,000', date: '2024-03-14', status: 'new', notes: '' },
  { id: 6, name: 'لمياء كمال', phone: '01066677788', project: 'أبراج النيل', unit: 'شقة 3 غرف', budget: '4,200,000', date: '2024-03-13', status: 'contacted', notes: 'تريد زيارة ميدانية' },
];

export default function DevBookings() {
  const location = useLocation();
  const { role, setRole } = useRole();
  const [requests, setRequests] = useState(BOOKING_REQUESTS);

  const moveCard = (id, newStatus) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
  };

  const getColItems = (colKey) => requests.filter(r => r.status === colKey);

  return (
    <div className="dashboard-layout">
      <DashboardSidebar role={role} onRoleChange={setRole} currentPath={location.pathname} />
      <main className="dashboard-main">
        <div className="dashboard-header">
          <div>
            <div className="dashboard-header-title">طلبات الحجز</div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>
              {requests.length} طلب — اسحب لتحديث الحالة
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {COLUMNS.map(c => (
              <span key={c.key} className="badge" style={{ background: c.bg, color: c.color, fontSize: 12 }}>
                {c.label}: {getColItems(c.key).length}
              </span>
            ))}
          </div>
        </div>
        <div className="dashboard-content" style={{ overflowX: 'auto' }}>
          <div style={{ display: 'flex', gap: 14, minWidth: 900 }}>
            {COLUMNS.map(col => (
              <div
                key={col.key}
                style={{
                  flex: 1, background: col.bg,
                  border: `1.5px solid ${col.color}25`,
                  borderRadius: 14, padding: 14, minHeight: 400,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14, paddingBottom: 10, borderBottom: `2px solid ${col.color}40` }}>
                  <span style={{ fontWeight: 800, color: col.color, fontSize: 14 }}>{col.label}</span>
                  <span style={{ background: 'white', border: `1px solid ${col.color}40`, borderRadius: 20, width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, color: col.color }}>
                    {getColItems(col.key).length}
                  </span>
                </div>
                {getColItems(col.key).map(req => (
                  <div key={req.id} className="kanban-card" style={{ marginBottom: 10 }}>
                    <div style={{ fontWeight: 800, marginBottom: 6, fontSize: 14 }}>{req.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--primary)', marginBottom: 4 }}>
                      <Phone size={11} style={{ display: 'inline', marginLeft: 4 }} />
                      {req.phone}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4 }}>
                      🏗️ {req.project}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>
                      🏠 {req.unit} — {req.budget} ج
                    </div>
                    {req.notes && (
                      <div style={{ fontSize: 11, background: 'var(--bg-alt)', borderRadius: 6, padding: '4px 8px', marginBottom: 8, color: 'var(--text-muted)', lineHeight: 1.5 }}>
                        {req.notes}
                      </div>
                    )}
                    <div style={{ display: 'flex', gap: 6 }}>
                      <a href={`tel:${req.phone}`} className="btn btn-outline btn-sm" style={{ flex: 1, justifyContent: 'center', fontSize: 11 }}>
                        <Phone size={11} /> اتصال
                      </a>
                      <a href={`https://wa.me/2${req.phone}`} target="_blank" rel="noreferrer" className="btn whatsapp-btn btn-sm" style={{ flex: 1, justifyContent: 'center', fontSize: 11 }}>
                        <MessageSquare size={11} />
                      </a>
                    </div>
                    {/* Move buttons */}
                    <div style={{ display: 'flex', gap: 4, marginTop: 6, flexWrap: 'wrap' }}>
                      {COLUMNS.filter(c => c.key !== req.status).map(c => (
                        <button
                          key={c.key}
                          onClick={() => moveCard(req.id, c.key)}
                          style={{
                            background: c.bg, color: c.color, border: `1px solid ${c.color}50`,
                            borderRadius: 6, padding: '3px 8px', fontSize: 10, cursor: 'pointer', fontFamily: 'Cairo', fontWeight: 700
                          }}
                        >
                          ← {c.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
                {getColItems(col.key).length === 0 && (
                  <div style={{ border: `2px dashed ${col.color}30`, borderRadius: 10, padding: 20, textAlign: 'center', color: col.color, fontSize: 13, opacity: 0.6 }}>
                    لا توجد طلبات
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
