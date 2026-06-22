import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Maximize2, BedDouble, Bath, Eye, PlusSquare } from 'lucide-react';
import { VerifiedBadge } from './Badges';
import { formatPrice } from '../../data/mockData';

export default function PropertyCard({ property, onAddCompare, compareList = [] }) {
  const navigate = useNavigate();
  const isInCompare = compareList.includes(property.id);

  return (
    <div className="property-card fade-in-up" style={{ cursor: 'pointer' }}>
      {property.featured && (
        <div className="featured-ribbon">مميز ⭐</div>
      )}
      <div className="property-card-image" onClick={() => navigate(`/property/${property.id}`)}>
        <img
          src={property.images[0]}
          alt={property.title}
          loading="lazy"
          onError={e => { e.target.src = `https://picsum.photos/seed/${property.id}/800/500`; }}
        />
        <div className="property-card-badges">
          {property.verified && <VerifiedBadge />}
          <span className="badge badge-primary">{property.saleType}</span>
        </div>
        <span className="property-card-type-badge">{property.type}</span>
      </div>

      <div className="property-card-body">
        <div className="property-card-price">{formatPrice(property.price, property.saleType)}</div>
        <div className="property-card-title" onClick={() => navigate(`/property/${property.id}`)}>
          {property.title}
        </div>
        <div className="property-card-location">
          <MapPin size={13} style={{ color: 'var(--teal)' }} />
          {property.location}
        </div>

        <div className="property-card-specs">
          <div className="property-spec">
            <Maximize2 size={13} />
            <span>{property.area} م²</span>
          </div>
          {property.rooms > 0 && (
            <div className="property-spec">
              <BedDouble size={13} />
              <span>{property.rooms} غرف</span>
            </div>
          )}
          {property.bathrooms > 0 && (
            <div className="property-spec">
              <Bath size={13} />
              <span>{property.bathrooms}</span>
            </div>
          )}
          <div className="property-spec" style={{ marginRight: 'auto' }}>
            <Eye size={13} />
            <span>{property.views.toLocaleString('ar-EG')}</span>
          </div>
        </div>

        <div className="property-card-actions">
          <button
            className="btn btn-primary btn-sm"
            onClick={() => navigate(`/property/${property.id}`)}
          >
            عرض التفاصيل
          </button>
          <button
            className={`btn btn-sm ${isInCompare ? 'btn-teal' : 'btn-ghost'}`}
            onClick={() => onAddCompare && onAddCompare(property.id)}
            title="إضافة للمقارنة"
          >
            <PlusSquare size={14} />
            {isInCompare ? 'تمت الإضافة' : 'مقارنة'}
          </button>
        </div>
      </div>
    </div>
  );
}
