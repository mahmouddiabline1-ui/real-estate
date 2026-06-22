import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Grid, List, Map, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import PublicNav from '../../components/public/PublicNav';
import PropertyCard from '../../components/shared/PropertyCard';
import { properties, AREAS, PROPERTY_TYPES, FINISHING } from '../../data/mockData';
import { useCompare } from '../../App';

const PRICE_RANGES = [
  { label: 'أقل من مليون', min: 0, max: 1000000 },
  { label: '1 - 3 مليون', min: 1000000, max: 3000000 },
  { label: '3 - 7 مليون', min: 3000000, max: 7000000 },
  { label: '7 - 15 مليون', min: 7000000, max: 15000000 },
  { label: 'أكثر من 15 مليون', min: 15000000, max: Infinity },
];

export default function SearchResultsPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { compareList, addToCompare } = useCompare();

  const [viewMode, setViewMode] = useState('grid');
  const [showMap, setShowMap] = useState(false);
  const [filters, setFilters] = useState({
    types: [],
    priceRange: null,
    rooms: [],
    locations: [],
    finishing: [],
    saleType: searchParams.get('saleType') || '',
  });
  const [sortBy, setSortBy] = useState('newest');

  const toggleFilter = (key, value) => {
    setFilters(prev => {
      const arr = prev[key];
      return {
        ...prev,
        [key]: arr.includes(value) ? arr.filter(x => x !== value) : [...arr, value],
      };
    });
  };

  const filtered = properties.filter(p => {
    if (filters.types.length && !filters.types.includes(p.type)) return false;
    if (filters.rooms.length && !filters.rooms.includes(p.rooms.toString())) return false;
    if (filters.locations.length && !filters.locations.some(l => p.location.includes(l))) return false;
    if (filters.finishing.length && !filters.finishing.includes(p.finishing)) return false;
    if (filters.saleType && p.saleType !== filters.saleType) return false;
    if (filters.priceRange) {
      const { min, max } = PRICE_RANGES[filters.priceRange];
      if (p.price < min || p.price > max) return false;
    }
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'area') return b.area - a.area;
    return b.id - a.id;
  });

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <PublicNav compareCount={compareList.length} />

      {/* Search bar top */}
      <div style={{ background: 'var(--primary)', padding: '16px 0' }}>
        <div className="container" style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <input
            placeholder="ابحث بالموقع أو المشروع..."
            style={{ flex: 1, background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', color: 'white', borderRadius: 8, padding: '10px 14px' }}
          />
          <select style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', color: 'white', borderRadius: 8, padding: '10px 14px' }}>
            <option value="">نوع العقار</option>
            {PROPERTY_TYPES.map(t => <option key={t}>{t}</option>)}
          </select>
          <select
            style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', color: 'white', borderRadius: 8, padding: '10px 14px' }}
            value={filters.saleType}
            onChange={e => setFilters(f => ({ ...f, saleType: e.target.value }))}
          >
            <option value="">بيع وإيجار</option>
            <option value="بيع">للبيع</option>
            <option value="إيجار">للإيجار</option>
          </select>
          <button className="btn btn-gold">بحث</button>
        </div>
      </div>

      <div className="container" style={{ padding: '24px 24px', display: 'flex', gap: 24 }}>
        {/* Sidebar Filters */}
        <aside className="filter-sidebar" style={{ flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <h3 style={{ fontWeight: 800, fontSize: 16 }}>
              <SlidersHorizontal size={16} style={{ display: 'inline', marginLeft: 6 }} />
              الفلاتر
            </h3>
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => setFilters({ types: [], priceRange: null, rooms: [], locations: [], finishing: [], saleType: '' })}
            >
              مسح الكل
            </button>
          </div>

          {/* Property Type */}
          <div className="filter-section">
            <div className="filter-title">نوع العقار</div>
            {PROPERTY_TYPES.map(t => (
              <label key={t} className="filter-option">
                <input type="checkbox" checked={filters.types.includes(t)} onChange={() => toggleFilter('types', t)} />
                {t}
              </label>
            ))}
          </div>

          {/* Price Range */}
          <div className="filter-section">
            <div className="filter-title">نطاق السعر</div>
            {PRICE_RANGES.map((r, i) => (
              <label key={i} className="filter-option">
                <input
                  type="radio"
                  name="price"
                  checked={filters.priceRange === i}
                  onChange={() => setFilters(f => ({ ...f, priceRange: f.priceRange === i ? null : i }))}
                />
                {r.label}
              </label>
            ))}
          </div>

          {/* Rooms */}
          <div className="filter-section">
            <div className="filter-title">عدد الغرف</div>
            {['1', '2', '3', '4', '5'].map(r => (
              <label key={r} className="filter-option">
                <input type="checkbox" checked={filters.rooms.includes(r)} onChange={() => toggleFilter('rooms', r)} />
                {r} {parseInt(r) === 1 ? 'غرفة' : 'غرف'}
              </label>
            ))}
          </div>

          {/* Location */}
          <div className="filter-section">
            <div className="filter-title">المنطقة</div>
            {AREAS.slice(0, 8).map(a => (
              <label key={a} className="filter-option">
                <input type="checkbox" checked={filters.locations.includes(a)} onChange={() => toggleFilter('locations', a)} />
                {a}
              </label>
            ))}
          </div>

          {/* Finishing */}
          <div className="filter-section">
            <div className="filter-title">حالة التشطيب</div>
            {FINISHING.map(f => (
              <label key={f} className="filter-option">
                <input type="checkbox" checked={filters.finishing.includes(f)} onChange={() => toggleFilter('finishing', f)} />
                {f}
              </label>
            ))}
          </div>
        </aside>

        {/* Results */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Results header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <div>
              <span style={{ fontWeight: 800, fontSize: 18 }}>{sorted.length.toLocaleString('ar-EG')}</span>
              <span style={{ color: 'var(--text-secondary)', fontSize: 14 }}> عقار مطابق للبحث</span>
            </div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                style={{ width: 'auto', padding: '8px 12px', fontSize: 13 }}
              >
                <option value="newest">الأحدث</option>
                <option value="price-asc">السعر: الأقل أولاً</option>
                <option value="price-desc">السعر: الأعلى أولاً</option>
                <option value="area">المساحة</option>
              </select>
              <div style={{ display: 'flex', border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden' }}>
                <button
                  onClick={() => { setViewMode('grid'); setShowMap(false); }}
                  style={{ padding: '8px 12px', background: viewMode === 'grid' ? 'var(--primary)' : 'white', color: viewMode === 'grid' ? 'white' : 'var(--text-secondary)', border: 'none', cursor: 'pointer' }}
                  title="عرض شبكي"
                >
                  <Grid size={16} />
                </button>
                <button
                  onClick={() => { setViewMode('list'); setShowMap(false); }}
                  style={{ padding: '8px 12px', background: viewMode === 'list' ? 'var(--primary)' : 'white', color: viewMode === 'list' ? 'white' : 'var(--text-secondary)', border: 'none', cursor: 'pointer' }}
                  title="عرض قائمة"
                >
                  <List size={16} />
                </button>
                <button
                  onClick={() => setShowMap(m => !m)}
                  style={{ padding: '8px 12px', background: showMap ? 'var(--teal)' : 'white', color: showMap ? 'white' : 'var(--text-secondary)', border: 'none', cursor: 'pointer' }}
                  title="عرض الخريطة"
                >
                  <Map size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Active filters chips */}
          {(filters.types.length > 0 || filters.locations.length > 0 || filters.finishing.length > 0) && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
              {[...filters.types, ...filters.locations, ...filters.finishing].map(tag => (
                <span key={tag} className="badge badge-primary" style={{ gap: 6 }}>
                  {tag}
                  <X size={10} style={{ cursor: 'pointer' }} />
                </span>
              ))}
            </div>
          )}

          {/* Map view */}
          {showMap && (
            <div className="map-placeholder" style={{ marginBottom: 20 }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 48, marginBottom: 8 }}>🗺️</div>
                <div style={{ fontWeight: 700, color: 'var(--primary)', fontSize: 18 }}>عرض الخريطة التفاعلية</div>
                <div style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 4 }}>
                  {sorted.length} نقطة على الخريطة — تحديد الموقع الجغرافي لكل عقار
                </div>
                <div style={{ marginTop: 16, display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
                  {sorted.slice(0, 5).map(p => (
                    <span key={p.id} className="badge badge-primary" style={{ cursor: 'pointer' }} onClick={() => navigate(`/property/${p.id}`)}>
                      📍 {p.location.split('،')[0]}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Grid / List */}
          {viewMode === 'grid' ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
              {sorted.map(p => (
                <PropertyCard key={p.id} property={p} onAddCompare={addToCompare} compareList={compareList} />
              ))}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {sorted.map(p => (
                <div
                  key={p.id}
                  className="card"
                  style={{ display: 'flex', gap: 0, overflow: 'hidden', cursor: 'pointer' }}
                  onClick={() => navigate(`/property/${p.id}`)}
                >
                  <img
                    src={p.images[0]}
                    alt={p.title}
                    style={{ width: 180, height: 130, objectFit: 'cover', flexShrink: 0 }}
                    onError={e => { e.target.src = `https://picsum.photos/seed/${p.id}/400/300`; }}
                  />
                  <div style={{ padding: '14px 18px', flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ fontWeight: 800, fontSize: 16, color: 'var(--primary)', marginBottom: 4 }}>
                          {p.saleType === 'إيجار' ? `${p.price.toLocaleString('ar-EG')} ج/شهر` : `${(p.price / 1000000).toFixed(1)} مليون جنيه`}
                        </div>
                        <div style={{ fontWeight: 700, marginBottom: 6 }}>{p.title}</div>
                        <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>📍 {p.location}</div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        {p.verified && <span className="verified-badge">✓ موثق</span>}
                        <span className="badge badge-primary">{p.type}</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 16, marginTop: 10, fontSize: 13, color: 'var(--text-secondary)' }}>
                      <span>📐 {p.area} م²</span>
                      {p.rooms > 0 && <span>🛏 {p.rooms} غرف</span>}
                      <span>✨ {p.finishing}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {sorted.length === 0 && (
            <div style={{ textAlign: 'center', padding: 60, color: 'var(--text-muted)' }}>
              <div style={{ fontSize: 64, marginBottom: 16 }}>🔍</div>
              <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>لا توجد نتائج</div>
              <div>حاول تغيير الفلاتر للحصول على نتائج أفضل</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
