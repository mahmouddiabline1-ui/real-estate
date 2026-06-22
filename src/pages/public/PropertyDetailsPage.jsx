import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  MapPin, Maximize2, BedDouble, Bath, Calendar, CheckCircle,
  Phone, MessageSquare, Share2, Heart, Eye, ChevronLeft, ChevronRight,
  Play, Compass, Calculator
} from 'lucide-react';
import PublicNav from '../../components/public/PublicNav';
import PropertyCard from '../../components/shared/PropertyCard';
import { VerifiedBadge, ActiveBadge, StarRating } from '../../components/shared/Badges';
import { properties, brokers, formatPrice } from '../../data/mockData';
import { useCompare } from '../../App';

function InstallmentCalculator({ price }) {
  const [downPct, setDownPct] = useState(20);
  const [years, setYears] = useState(7);
  const downAmount = Math.round(price * downPct / 100);
  const remaining = price - downAmount;
  const monthly = Math.round(remaining / (years * 12));

  return (
    <div className="calculator-card">
      <h3 style={{ fontWeight: 800, fontSize: 18, marginBottom: 20 }}>
        <Calculator size={18} style={{ display: 'inline', marginLeft: 8 }} />
        حاسبة التقسيط
      </h3>
      <div className="form-row">
        <div className="form-group">
          <label>المقدم (%)</label>
          <input
            type="number"
            min={5} max={50}
            value={downPct}
            onChange={e => setDownPct(+e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>مدة التقسيط (سنة)</label>
          <select value={years} onChange={e => setYears(+e.target.value)}>
            {[3, 5, 7, 10, 15, 20].map(y => <option key={y} value={y}>{y} سنوات</option>)}
          </select>
        </div>
      </div>
      <div className="calculator-result">
        <div style={{ fontSize: 13, opacity: 0.8, marginBottom: 8, textAlign: 'center' }}>القسط الشهري التقريبي</div>
        <div className="calculator-monthly">
          {monthly.toLocaleString('ar-EG')} <span style={{ fontSize: 18 }}>ج.م</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 16 }}>
          <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 8, padding: 12, textAlign: 'center' }}>
            <div style={{ fontWeight: 800, fontSize: 16 }}>{downAmount.toLocaleString('ar-EG')}</div>
            <div style={{ fontSize: 11, opacity: 0.7 }}>المقدم ({downPct}%)</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 8, padding: 12, textAlign: 'center' }}>
            <div style={{ fontWeight: 800, fontSize: 16 }}>{remaining.toLocaleString('ar-EG')}</div>
            <div style={{ fontSize: 11, opacity: 0.7 }}>المبلغ المتبقي</div>
          </div>
        </div>
        <div style={{ fontSize: 11, opacity: 0.6, textAlign: 'center', marginTop: 12 }}>
          * حساب تقريبي بدون فوائد. تواصل مع الوسيط لخطط التمويل الفعلية
        </div>
      </div>
    </div>
  );
}

export default function PropertyDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { compareList, addToCompare } = useCompare();
  const [activeImg, setActiveImg] = useState(0);
  const [saved, setSaved] = useState(false);

  const property = properties.find(p => p.id === parseInt(id)) || properties[0];
  const broker = brokers.find(b => b.id === property.brokerId) || brokers[0];
  const similar = properties.filter(p => p.id !== property.id && p.type === property.type).slice(0, 3);

  const images = property.images.length ? property.images : [
    `https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800`
  ];

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <PublicNav compareCount={compareList.length} />

      <div className="container" style={{ padding: '28px 24px' }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20, fontSize: 13, color: 'var(--text-secondary)' }}>
          <span style={{ cursor: 'pointer', color: 'var(--primary)' }} onClick={() => navigate('/')}>الرئيسية</span>
          <span>›</span>
          <span style={{ cursor: 'pointer', color: 'var(--primary)' }} onClick={() => navigate('/search')}>البحث</span>
          <span>›</span>
          <span>{property.title}</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 28 }}>
          {/* Main Content */}
          <div>
            {/* Image Gallery */}
            <div style={{ marginBottom: 20 }}>
              <div className="gallery-main">
                <img
                  src={images[activeImg]}
                  alt={property.title}
                  onError={e => { e.target.src = `https://picsum.photos/seed/${property.id + 5}/800/600`; }}
                />
              </div>
              {images.length > 1 && (
                <div className="gallery-thumbs">
                  {images.map((img, i) => (
                    <div
                      key={i}
                      className={`gallery-thumb ${i === activeImg ? 'active' : ''}`}
                      onClick={() => setActiveImg(i)}
                    >
                      <img src={img} alt="" onError={e => { e.target.src = `https://picsum.photos/seed/${i + 10}/200/150`; }} />
                    </div>
                  ))}
                  {/* Virtual tour + video */}
                  <div
                    className="tour-placeholder"
                    style={{ width: 80, height: 60, fontSize: 13, gap: 4, flex: '0 0 80px', borderRadius: 8 }}
                  >
                    <Play size={16} />
                    <span style={{ fontSize: 10 }}>فيديو</span>
                  </div>
                  <div
                    className="tour-placeholder"
                    style={{ width: 80, height: 60, fontSize: 13, gap: 4, flex: '0 0 80px', borderRadius: 8, background: 'linear-gradient(135deg, var(--teal-dark), var(--teal))' }}
                  >
                    <Compass size={16} />
                    <span style={{ fontSize: 10 }}>جولة 360°</span>
                  </div>
                </div>
              )}
            </div>

            {/* Title + actions */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
              <div>
                <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                  {property.verified && <VerifiedBadge />}
                  <span className="badge badge-primary">{property.saleType}</span>
                  <span className="badge badge-gray">{property.type}</span>
                </div>
                <h1 style={{ fontSize: 26, fontWeight: 900, color: 'var(--text)', marginBottom: 8 }}>
                  {property.title}
                </h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-secondary)', fontSize: 14 }}>
                  <MapPin size={15} style={{ color: 'var(--teal)' }} />
                  {property.location}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  className="btn-icon"
                  onClick={() => setSaved(s => !s)}
                  title="حفظ"
                >
                  <Heart size={18} fill={saved ? '#EF4444' : 'none'} color={saved ? '#EF4444' : 'currentColor'} />
                </button>
                <button className="btn-icon" title="مشاركة"><Share2 size={18} /></button>
                <button
                  className={`btn btn-sm ${compareList.includes(property.id) ? 'btn-teal' : 'btn-outline'}`}
                  onClick={() => addToCompare(property.id)}
                >
                  {compareList.includes(property.id) ? '✓ في المقارنة' : 'إضافة للمقارنة'}
                </button>
              </div>
            </div>

            {/* Price */}
            <div style={{ background: 'var(--primary-50)', borderRadius: 12, padding: '16px 20px', marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 4 }}>السعر</div>
                <div style={{ fontSize: 28, fontWeight: 900, color: 'var(--primary)' }}>
                  {formatPrice(property.price, property.saleType)}
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>سعر المتر</div>
                <div style={{ fontWeight: 800, color: 'var(--teal)' }}>{property.pricePerSqm?.toLocaleString('ar-EG')} ج/م²</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>المشاهدات</div>
                <div style={{ fontWeight: 800 }}>
                  <Eye size={14} style={{ display: 'inline', marginLeft: 4 }} />
                  {property.views.toLocaleString('ar-EG')}
                </div>
              </div>
            </div>

            {/* Specs */}
            <div className="bg-card" style={{ marginBottom: 24 }}>
              <h2 style={{ fontSize: 17, fontWeight: 800, marginBottom: 18, color: 'var(--primary)' }}>مواصفات العقار</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                {[
                  { icon: '📐', label: 'المساحة', value: `${property.area} م²` },
                  ...(property.rooms > 0 ? [{ icon: '🛏', label: 'غرف النوم', value: `${property.rooms} غرف` }] : []),
                  ...(property.bathrooms > 0 ? [{ icon: '🚿', label: 'الحمامات', value: `${property.bathrooms}` }] : []),
                  { icon: '✨', label: 'التشطيب', value: property.finishing },
                  { icon: '📅', label: 'تاريخ التسليم', value: property.deliveryDate },
                  ...(property.floor > 0 ? [{ icon: '🏢', label: 'الدور', value: `الدور ${property.floor}` }] : []),
                  { icon: '📋', label: 'تاريخ الإعلان', value: property.listed },
                ].map(spec => (
                  <div key={spec.label} style={{ background: 'var(--bg-alt)', borderRadius: 10, padding: '12px 16px' }}>
                    <div style={{ fontSize: 20, marginBottom: 4 }}>{spec.icon}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 2 }}>{spec.label}</div>
                    <div style={{ fontWeight: 700 }}>{spec.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="bg-card" style={{ marginBottom: 24 }}>
              <h2 style={{ fontSize: 17, fontWeight: 800, marginBottom: 14, color: 'var(--primary)' }}>وصف العقار</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.9, fontSize: 15 }}>{property.description}</p>
            </div>

            {/* Amenities */}
            {property.amenities.length > 0 && (
              <div className="bg-card" style={{ marginBottom: 24 }}>
                <h2 style={{ fontSize: 17, fontWeight: 800, marginBottom: 14, color: 'var(--primary)' }}>المميزات والخدمات</h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {property.amenities.map(a => (
                    <span key={a} className="amenity-tag">
                      <CheckCircle size={12} style={{ color: 'var(--teal)' }} />
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Map */}
            <div className="bg-card" style={{ marginBottom: 24 }}>
              <h2 style={{ fontSize: 17, fontWeight: 800, marginBottom: 14, color: 'var(--primary)' }}>الموقع على الخريطة</h2>
              <div className="map-placeholder" style={{ height: 250 }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 40, marginBottom: 8 }}>📍</div>
                  <div style={{ fontWeight: 700, color: 'var(--primary)' }}>{property.location}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>
                    {property.lat?.toFixed(4)}°N, {property.lng?.toFixed(4)}°E
                  </div>
                </div>
              </div>
            </div>

            {/* Installment Calculator */}
            {property.saleType === 'بيع' && <InstallmentCalculator price={property.price} />}
          </div>

          {/* Sidebar */}
          <div>
            {/* Broker Card */}
            <div className="broker-card" style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 16 }}>
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <img
                    className="broker-avatar"
                    src={broker.avatar}
                    alt={broker.name}
                    onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(broker.name)}&background=0C447C&color=fff&size=80`; }}
                  />
                  {broker.activeNow && (
                    <span
                      className="active-dot"
                      style={{ position: 'absolute', bottom: 4, left: 4, border: '2px solid white', width: 11, height: 11 }}
                    />
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                    <span style={{ fontWeight: 800, fontSize: 15 }}>{broker.name}</span>
                    {broker.verified && <VerifiedBadge />}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6 }}>{broker.agency}</div>
                  <StarRating rating={broker.rating} count={broker.reviews} size={13} />
                  {broker.activeNow && (
                    <div style={{ marginTop: 6 }}>
                      <ActiveBadge text={broker.responseTime} />
                    </div>
                  )}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <a
                  href={`tel:${broker.phone}`}
                  className="btn btn-primary"
                  style={{ textDecoration: 'none', justifyContent: 'center' }}
                >
                  <Phone size={16} />
                  اتصل الآن — {broker.phone}
                </a>
                <a
                  href={`https://wa.me/${broker.whatsapp}?text=مرحباً، رأيت إعلان ${property.title}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn whatsapp-btn"
                  style={{ textDecoration: 'none', justifyContent: 'center' }}
                >
                  <MessageSquare size={16} />
                  واتساب
                </a>
                <button
                  className="btn btn-ghost"
                  onClick={() => navigate(`/broker/${broker.id}`)}
                >
                  عرض ملف الوسيط
                </button>
              </div>
            </div>

            {/* Quick stats */}
            <div className="bg-card" style={{ marginBottom: 16 }}>
              <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 12, color: 'var(--primary)' }}>معلومات سريعة</div>
              {[
                { label: 'الإعلانات النشطة', value: broker.listingsCount },
                { label: 'وقت الاستجابة', value: broker.responseTime },
                { label: 'انضم منذ', value: broker.joinDate?.split('-')[0] },
                { label: 'التقييم العام', value: `${broker.rating} / 5` },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border-light)', fontSize: 13 }}>
                  <span style={{ color: 'var(--text-secondary)' }}>{item.label}</span>
                  <span style={{ fontWeight: 700 }}>{item.value}</span>
                </div>
              ))}
            </div>

            {/* Safety note */}
            <div style={{ background: 'var(--success-50)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 12, padding: 14, fontSize: 12, color: 'var(--success)', marginBottom: 16 }}>
              <CheckCircle size={14} style={{ display: 'inline', marginLeft: 6 }} />
              هذا الإعلان محمي بضمان عقارات مصر. جميع بيانات الوسيط موثّقة ومعتمدة.
            </div>
          </div>
        </div>

        {/* Similar properties */}
        {similar.length > 0 && (
          <div style={{ marginTop: 48 }}>
            <div className="section-header">
              <h2 className="section-title">عقارات <span>مشابهة</span></h2>
              <button className="btn btn-outline btn-sm" onClick={() => navigate('/search')}>عرض المزيد</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
              {similar.map(p => (
                <PropertyCard key={p.id} property={p} onAddCompare={addToCompare} compareList={compareList} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
