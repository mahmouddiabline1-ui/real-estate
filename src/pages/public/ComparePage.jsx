import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ArrowLeft, CheckCircle } from 'lucide-react';
import PublicNav from '../../components/public/PublicNav';
import { VerifiedBadge } from '../../components/shared/Badges';
import { properties, formatPrice } from '../../data/mockData';
import { useCompare } from '../../App';

const COMPARE_FIELDS = [
  { label: 'السعر', key: 'price', render: (p) => formatPrice(p.price, p.saleType) },
  { label: 'سعر المتر (ج/م²)', key: 'pricePerSqm', render: (p) => p.pricePerSqm?.toLocaleString('ar-EG') + ' ج' },
  { label: 'المساحة', key: 'area', render: (p) => `${p.area} م²` },
  { label: 'غرف النوم', key: 'rooms', render: (p) => p.rooms > 0 ? `${p.rooms} غرف` : '—' },
  { label: 'الحمامات', key: 'bathrooms', render: (p) => p.bathrooms > 0 ? p.bathrooms : '—' },
  { label: 'نوع العقار', key: 'type', render: (p) => p.type },
  { label: 'الموقع', key: 'location', render: (p) => p.location },
  { label: 'التشطيب', key: 'finishing', render: (p) => p.finishing },
  { label: 'تاريخ التسليم', key: 'deliveryDate', render: (p) => p.deliveryDate },
  { label: 'موثّق', key: 'verified', render: (p) => p.verified ? <VerifiedBadge /> : <span style={{ color: 'var(--text-muted)' }}>—</span> },
  { label: 'نوع الصفقة', key: 'saleType', render: (p) => p.saleType },
];

export default function ComparePage() {
  const navigate = useNavigate();
  const { compareList, removeFromCompare, addToCompare } = useCompare();
  const selectedProps = properties.filter(p => compareList.includes(p.id));

  // Find best price
  const bestPrice = selectedProps.length ? Math.min(...selectedProps.map(p => p.price)) : 0;
  const bestPricePerSqm = selectedProps.length ? Math.min(...selectedProps.map(p => p.pricePerSqm || Infinity)) : 0;

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <PublicNav compareCount={compareList.length} />

      <div className="container" style={{ padding: '32px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
          <div>
            <h1 style={{ fontWeight: 900, fontSize: 28 }}>مقارنة العقارات</h1>
            <div style={{ color: 'var(--text-secondary)', fontSize: 14, marginTop: 4 }}>
              {selectedProps.length} عقارات مختارة — يمكنك مقارنة حتى 3 عقارات
            </div>
          </div>
          <button className="btn btn-outline btn-sm" onClick={() => navigate('/search')}>
            <ArrowLeft size={14} />
            العودة للبحث
          </button>
        </div>

        {selectedProps.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div style={{ fontSize: 64, marginBottom: 20 }}>⚖️</div>
            <h2 style={{ marginBottom: 12 }}>لا توجد عقارات للمقارنة</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>
              ابحث عن عقارات وأضفها للمقارنة باستخدام زر "إضافة للمقارنة"
            </p>
            <button className="btn btn-primary" onClick={() => navigate('/search')}>
              ابحث عن عقارات
            </button>
          </div>
        ) : (
          <div>
            {/* Compare Headers */}
            <div className="compare-header" style={{ gridTemplateColumns: `200px repeat(${selectedProps.length}, 1fr)` }}>
              <div />
              {selectedProps.map(p => (
                <div key={p.id} className="card" style={{ overflow: 'hidden', position: 'relative' }}>
                  <button
                    style={{
                      position: 'absolute', top: 8, left: 8, background: 'rgba(0,0,0,0.5)', color: 'white',
                      border: 'none', borderRadius: '50%', width: 24, height: 24, cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1
                    }}
                    onClick={() => removeFromCompare(p.id)}
                  >
                    <X size={12} />
                  </button>
                  <img
                    src={p.images[0]}
                    alt={p.title}
                    style={{ width: '100%', height: 130, objectFit: 'cover' }}
                    onError={e => { e.target.src = `https://picsum.photos/seed/${p.id}/400/300`; }}
                  />
                  <div style={{ padding: 14 }}>
                    <div style={{ fontWeight: 800, fontSize: 13, marginBottom: 4 }}>{p.title}</div>
                    <div style={{ fontSize: 18, fontWeight: 900, color: 'var(--primary)' }}>
                      {formatPrice(p.price, p.saleType)}
                    </div>
                  </div>
                </div>
              ))}
              {selectedProps.length < 3 && (
                <div
                  className="card"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    minHeight: 200, cursor: 'pointer', border: '2px dashed var(--border)',
                    boxShadow: 'none', color: 'var(--text-muted)', fontSize: 14, flexDirection: 'column', gap: 8
                  }}
                  onClick={() => navigate('/search')}
                >
                  <div style={{ fontSize: 36 }}>+</div>
                  إضافة عقار للمقارنة
                </div>
              )}
            </div>

            {/* Compare Rows */}
            <div style={{ background: 'var(--card)', borderRadius: 16, border: '1px solid var(--border)', overflow: 'hidden', marginTop: 16 }}>
              {COMPARE_FIELDS.map((field, fi) => (
                <div
                  key={field.key}
                  className="compare-row"
                  style={{
                    gridTemplateColumns: `200px repeat(${selectedProps.length}, 1fr)`,
                    background: fi % 2 === 0 ? 'var(--bg-alt)' : 'var(--card)',
                    padding: '14px 20px',
                    borderBottom: '1px solid var(--border-light)',
                    display: 'grid',
                    alignItems: 'center'
                  }}
                >
                  <div className="compare-label">{field.label}</div>
                  {selectedProps.map(p => {
                    const isBest =
                      (field.key === 'price' && p.price === bestPrice) ||
                      (field.key === 'pricePerSqm' && (p.pricePerSqm || 0) === bestPricePerSqm);
                    return (
                      <div key={p.id} className={`compare-value ${isBest ? 'compare-best' : ''}`}>
                        {field.render(p)}
                        {isBest && <span style={{ fontSize: 11, marginRight: 4 }}>✓ أفضل</span>}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Amenities comparison */}
            <div style={{ background: 'var(--card)', borderRadius: 16, border: '1px solid var(--border)', padding: 24, marginTop: 16 }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: `200px repeat(${selectedProps.length}, 1fr)`,
                  alignItems: 'start',
                  gap: 0
                }}
              >
                <div className="compare-label" style={{ paddingTop: 8 }}>المميزات والخدمات</div>
                {selectedProps.map(p => (
                  <div key={p.id} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {p.amenities.map(a => (
                      <span key={a} style={{ fontSize: 12, display: 'flex', alignItems: 'center', gap: 5 }}>
                        <CheckCircle size={11} style={{ color: 'var(--teal)', flexShrink: 0 }} />
                        {a}
                      </span>
                    ))}
                    {p.amenities.length === 0 && <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>—</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
