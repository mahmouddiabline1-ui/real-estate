import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, Building2, Home, TreePine, Layers, Pill, ShoppingBag,
  ArrowLeft, TrendingUp, MapPin, Star, CheckCircle, ChevronLeft, ChevronRight
} from 'lucide-react';
import PublicNav from '../../components/public/PublicNav';
import PropertyCard from '../../components/shared/PropertyCard';
import { VerifiedBadge, StarRating } from '../../components/shared/Badges';
import { properties, projects, priceGuide, brokers, formatPrice } from '../../data/mockData';
import { useCompare } from '../../App';

const CATEGORIES = [
  { label: 'شقق', icon: '🏢', count: '8,420', color: '#EFF6FF', iconColor: '#3B82F6', type: 'شقة' },
  { label: 'فيلات', icon: '🏡', count: '1,230', color: '#F0FDF4', iconColor: '#10B981', type: 'فيلا' },
  { label: 'أراضي', icon: '🌿', count: '2,100', color: '#FFFBEB', iconColor: '#F59E0B', type: 'أرض' },
  { label: 'كمبوندات', icon: '🏙️', count: '340', color: '#FDF4FF', iconColor: '#A855F7', type: 'كمبوند' },
  { label: 'صيدليات', icon: '💊', count: '180', color: '#FFF1F2', iconColor: '#EF4444', type: 'صيدلية' },
  { label: 'محلات تجارية', icon: '🏪', count: '970', color: '#F0FDFA', iconColor: '#0D9488', type: 'محل تجاري' },
];

function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand-title">🏠 عقارات مصر</div>
            <div className="footer-brand-desc">
              أكبر منصة عقارية متكاملة في مصر. نربط المشترين والمستأجرين بأفضل الوسطاء والمطورين العقاريين الموثوقين.
            </div>
          </div>
          <div>
            <div className="footer-section-title">روابط سريعة</div>
            <span className="footer-link" onClick={() => navigate('/')}>الرئيسية</span>
            <span className="footer-link" onClick={() => navigate('/search')}>البحث عن عقار</span>
            <span className="footer-link" onClick={() => navigate('/dashboard/broker')}>لوحة الوسطاء</span>
            <span className="footer-link" onClick={() => navigate('/dashboard/developer')}>لوحة المطورين</span>
          </div>
          <div>
            <div className="footer-section-title">للمطورين</div>
            <span className="footer-link">إضافة مشروع</span>
            <span className="footer-link">باقات الإعلانات</span>
            <span className="footer-link">الشراكات</span>
          </div>
          <div>
            <div className="footer-section-title">تواصل معنا</div>
            <span className="footer-link">📞 19XXX</span>
            <span className="footer-link">✉️ info@aqarat-masr.com</span>
            <span className="footer-link">📍 القاهرة، مصر</span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2024 عقارات مصر. جميع الحقوق محفوظة.</span>
          <span>صُنع بـ ❤️ في مصر</span>
        </div>
      </div>
    </footer>
  );
}

export default function HomePage() {
  const navigate = useNavigate();
  const { compareList, addToCompare } = useCompare();
  const [saleType, setSaleType] = useState('بيع');
  const [propertyType, setPropertyType] = useState('');
  const [location, setLocation] = useState('');
  const [carouselIdx, setCarouselIdx] = useState(0);

  const featuredProperties = properties.filter(p => p.featured);
  const latestProjects = projects;

  const handleSearch = () => {
    navigate(`/search?type=${propertyType}&saleType=${saleType}&location=${location}`);
  };

  // carousel
  const visibleCount = 3;
  const maxIdx = Math.max(0, featuredProperties.length - visibleCount);
  const prevSlide = () => setCarouselIdx(i => Math.max(0, i - 1));
  const nextSlide = () => setCarouselIdx(i => Math.min(maxIdx, i + 1));
  const visibleProps = featuredProperties.slice(carouselIdx, carouselIdx + visibleCount);

  return (
    <div>
      <PublicNav compareCount={compareList.length} />

      {/* HERO */}
      <section className="hero">
        <div className="container hero-content">
          <div className="hero-badge">
            <CheckCircle size={14} />
            أكثر من 12,000 عقار موثق في مصر
          </div>
          <h1 className="hero-title">
            ابحث عن عقار <span>أحلامك</span>
            <br />في أي مكان بمصر
          </h1>
          <p className="hero-subtitle">
            شقق، فيلات، أراضي، مشاريع جديدة — كل ما تحتاجه في مكان واحد مع وسطاء موثوقين
          </p>

          {/* Search Box */}
          <div className="search-box">
            <div className="search-tabs">
              {['بيع', 'إيجار', 'مشاريع جديدة'].map(t => (
                <button
                  key={t}
                  className={`search-tab ${saleType === t ? 'active' : ''}`}
                  onClick={() => setSaleType(t)}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="search-fields">
              <div>
                <div className="search-field-label">نوع العقار</div>
                <select value={propertyType} onChange={e => setPropertyType(e.target.value)}>
                  <option value="">جميع الأنواع</option>
                  <option>شقة</option>
                  <option>فيلا</option>
                  <option>أرض</option>
                  <option>محل تجاري</option>
                  <option>صيدلية</option>
                </select>
              </div>
              <div>
                <div className="search-field-label">الموقع</div>
                <input
                  placeholder="مدينة، حي، شارع..."
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                />
              </div>
              <div>
                <div className="search-field-label">الميزانية</div>
                <select>
                  <option>أي سعر</option>
                  <option>أقل من مليون جنيه</option>
                  <option>1 - 3 مليون</option>
                  <option>3 - 7 مليون</option>
                  <option>أكثر من 7 مليون</option>
                </select>
              </div>
              <button className="btn btn-primary btn-lg" onClick={handleSearch}>
                <Search size={20} />
                بحث
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="trust-bar">
        <div className="container">
          <div className="trust-bar-inner">
            <div className="trust-stat">
              <div className="trust-number">+12,847</div>
              <div className="trust-label">عقار مُعلَن</div>
            </div>
            <div className="trust-stat">
              <div className="trust-number">+3,241</div>
              <div className="trust-label">وسيط موثّق</div>
            </div>
            <div className="trust-stat">
              <div className="trust-number">+218</div>
              <div className="trust-label">شركة تطوير</div>
            </div>
            <div className="trust-stat">
              <div className="trust-number">+48,000</div>
              <div className="trust-label">صفقة ناجحة</div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">تصفح حسب <span>النوع</span></h2>
              <div className="section-subtitle">اختر نوع العقار الذي تبحث عنه</div>
            </div>
          </div>
          <div className="category-grid">
            {CATEGORIES.map(cat => (
              <div
                key={cat.label}
                className="category-tile"
                onClick={() => navigate(`/search?type=${cat.type}`)}
              >
                <div className="category-icon" style={{ background: cat.color }}>
                  <span style={{ fontSize: 28 }}>{cat.icon}</span>
                </div>
                <div className="category-title">{cat.label}</div>
                <div className="category-count">{cat.count} عقار</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PROPERTIES */}
      <section style={{ padding: '60px 0', background: 'var(--bg-alt)' }}>
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">العقارات <span>المميزة</span></h2>
              <div className="section-subtitle">أفضل العقارات الموثقة المتاحة الآن</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn-icon" onClick={prevSlide} disabled={carouselIdx === 0} style={{ opacity: carouselIdx === 0 ? 0.4 : 1 }}>
                <ChevronRight size={18} />
              </button>
              <button className="btn-icon" onClick={nextSlide} disabled={carouselIdx >= maxIdx} style={{ opacity: carouselIdx >= maxIdx ? 0.4 : 1 }}>
                <ChevronLeft size={18} />
              </button>
              <button className="btn btn-outline btn-sm" onClick={() => navigate('/search')}>
                عرض الكل
                <ArrowLeft size={14} />
              </button>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {visibleProps.map(p => (
              <PropertyCard
                key={p.id}
                property={p}
                onAddCompare={addToCompare}
                compareList={compareList}
              />
            ))}
          </div>
        </div>
      </section>

      {/* LATEST PROJECTS */}
      <section style={{ padding: '60px 0' }}>
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">أحدث <span>المشاريع</span></h2>
              <div className="section-subtitle">مشاريع المطورين الكبار المتاحة للحجز</div>
            </div>
            <button className="btn btn-outline btn-sm" onClick={() => navigate('/search?tab=projects')}>
              جميع المشاريع <ArrowLeft size={14} />
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {latestProjects.map(project => (
              <div key={project.id} className="card" style={{ overflow: 'hidden' }}>
                <div style={{ position: 'relative', height: 200 }}>
                  <img
                    src={project.image}
                    alt={project.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={e => { e.target.src = `https://picsum.photos/seed/${project.id + 20}/800/400`; }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)' }} />
                  <div style={{ position: 'absolute', bottom: 14, right: 14, color: 'white' }}>
                    <div style={{ fontWeight: 800, fontSize: 18 }}>{project.name}</div>
                    <div style={{ fontSize: 13, opacity: 0.85, display: 'flex', alignItems: 'center', gap: 4 }}>
                      <MapPin size={12} />{project.location}
                    </div>
                  </div>
                  {project.verified && (
                    <div style={{ position: 'absolute', top: 12, right: 12 }}>
                      <VerifiedBadge />
                    </div>
                  )}
                </div>
                <div style={{ padding: 18 }}>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 10 }}>{project.developer}</div>
                  <div style={{ display: 'flex', gap: 16, marginBottom: 14 }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontWeight: 800, color: 'var(--primary)' }}>{project.totalUnits}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>إجمالي الوحدات</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontWeight: 800, color: 'var(--success)' }}>{project.availableUnits}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>متاح</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontWeight: 800, color: 'var(--gold)' }}>{project.soldUnits}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>مُباع</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>تبدأ من</div>
                      <div style={{ fontWeight: 800, color: 'var(--primary)' }}>{formatPrice(project.priceFrom, 'بيع')}</div>
                    </div>
                    <button className="btn btn-primary btn-sm" onClick={() => navigate('/search')}>
                      تفاصيل المشروع
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICE GUIDE + TOP BROKERS */}
      <section style={{ padding: '60px 0', background: 'var(--bg-alt)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
            {/* Price Guide */}
            <div>
              <div className="section-header" style={{ marginBottom: 20 }}>
                <div>
                  <h2 className="section-title" style={{ fontSize: 22 }}>دليل <span>الأسعار</span></h2>
                  <div className="section-subtitle">متوسط سعر المتر المربع حسب المنطقة</div>
                </div>
              </div>
              <div className="price-guide-card">
                {priceGuide.map(item => (
                  <div key={item.area} className="price-row">
                    <div>
                      <div className="price-area">{item.area}</div>
                      <div className="price-type">{item.type}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div className="price-value">{item.avgPricePerSqm.toLocaleString('ar-EG')} جنيه/م²</div>
                      <span className="price-trend">
                        <TrendingUp size={10} style={{ display: 'inline' }} /> {item.trend}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Brokers */}
            <div>
              <div className="section-header" style={{ marginBottom: 20 }}>
                <div>
                  <h2 className="section-title" style={{ fontSize: 22 }}>أفضل <span>الوسطاء</span></h2>
                  <div className="section-subtitle">وسطاء معتمدون بأعلى تقييمات</div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {brokers.slice(0, 4).map(broker => (
                  <div
                    key={broker.id}
                    className="card"
                    style={{ padding: 16, cursor: 'pointer', display: 'flex', gap: 14, alignItems: 'center' }}
                    onClick={() => navigate(`/broker/${broker.id}`)}
                  >
                    <div style={{ position: 'relative', flexShrink: 0 }}>
                      <img
                        src={broker.avatar}
                        alt={broker.name}
                        style={{ width: 52, height: 52, borderRadius: '50%', objectFit: 'cover' }}
                        onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(broker.name)}&background=0C447C&color=fff`; }}
                      />
                      {broker.activeNow && (
                        <span className="active-dot" style={{ position: 'absolute', bottom: 2, left: 2, border: '2px solid white' }} />
                      )}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                        <span style={{ fontWeight: 700 }}>{broker.name}</span>
                        {broker.verified && <VerifiedBadge />}
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4 }}>{broker.agency}</div>
                      <StarRating rating={broker.rating} count={broker.reviews} size={12} />
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontWeight: 800, color: 'var(--primary)' }}>{broker.listingsCount}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>إعلان</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{ padding: '60px 0', background: 'linear-gradient(135deg, var(--primary-dark), var(--teal-dark))' }}>
        <div className="container" style={{ textAlign: 'center', color: 'white' }}>
          <h2 style={{ fontSize: 32, fontWeight: 900, marginBottom: 16 }}>هل أنت وسيط أو مطور عقاري؟</h2>
          <p style={{ fontSize: 17, opacity: 0.85, marginBottom: 32, maxWidth: 500, margin: '0 auto 32px' }}>
            انضم لأكبر منصة عقارية في مصر وابدأ في نشر إعلاناتك الآن. أكثر من 2.8 مليون زيارة شهرية.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-gold btn-lg" onClick={() => navigate('/dashboard/broker')}>
              لوحة الوسيط
            </button>
            <button
              className="btn btn-lg"
              style={{ background: 'rgba(255,255,255,0.15)', border: '2px solid rgba(255,255,255,0.4)', color: 'white' }}
              onClick={() => navigate('/dashboard/developer')}
            >
              لوحة المطور
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
