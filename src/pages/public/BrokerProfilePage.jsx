import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Phone, MessageSquare, Star, CheckCircle, ArrowLeft } from 'lucide-react';
import PublicNav from '../../components/public/PublicNav';
import PropertyCard from '../../components/shared/PropertyCard';
import { VerifiedBadge, ActiveBadge, StarRating } from '../../components/shared/Badges';
import { brokers, properties } from '../../data/mockData';
import { useCompare } from '../../App';

const MOCK_REVIEWS = [
  { name: 'خالد محمود', rating: 5, date: '2024-03-10', text: 'وسيط محترف جداً، ساعدني في إيجاد شقة مناسبة في وقت قصير. أنصح به بشدة.' },
  { name: 'رانيا سامح', rating: 4, date: '2024-02-20', text: 'تعامل ممتاز وأمانة في المعلومات. سريع الرد على الاستفسارات.' },
  { name: 'عمرو الشافعي', rating: 5, date: '2024-01-15', text: 'أفضل وسيط تعاملت معه. أتمنى له مزيداً من التوفيق.' },
];

export default function BrokerProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { compareList, addToCompare } = useCompare();

  const broker = brokers.find(b => b.id === parseInt(id)) || brokers[0];
  const brokerProps = properties.filter(p => p.brokerId === broker.id);

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <PublicNav compareCount={compareList.length} />

      {/* Hero Banner */}
      <div style={{ background: 'linear-gradient(135deg, var(--primary-dark), var(--primary))', padding: '40px 0', color: 'white' }}>
        <div className="container">
          <button
            style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', color: 'white', borderRadius: 8, padding: '6px 14px', cursor: 'pointer', marginBottom: 24, fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}
            onClick={() => navigate('/')}
          >
            <ArrowLeft size={14} />
            العودة
          </button>
          <div style={{ display: 'flex', gap: 28, alignItems: 'flex-start' }}>
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <img
                src={broker.avatar}
                alt={broker.name}
                style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover', border: '4px solid rgba(255,255,255,0.4)' }}
                onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(broker.name)}&background=0C447C&color=fff&size=120`; }}
              />
              {broker.activeNow && (
                <span className="active-dot" style={{ position: 'absolute', bottom: 6, left: 6, width: 16, height: 16, border: '3px solid white' }} />
              )}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <h1 style={{ fontSize: 26, fontWeight: 900 }}>{broker.name}</h1>
                {broker.verified && <VerifiedBadge />}
                {broker.activeNow && <ActiveBadge text={broker.responseTime} />}
              </div>
              <div style={{ opacity: 0.85, marginBottom: 10 }}>{broker.agency}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 14, opacity: 0.85, fontSize: 14 }}>
                <MapPin size={14} />
                {broker.location}
              </div>
              <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                <div>
                  <div style={{ fontSize: 22, fontWeight: 900 }}>{broker.rating}</div>
                  <div style={{ fontSize: 12, opacity: 0.7 }}>التقييم</div>
                </div>
                <div>
                  <div style={{ fontSize: 22, fontWeight: 900 }}>{broker.reviews}</div>
                  <div style={{ fontSize: 12, opacity: 0.7 }}>تقييم</div>
                </div>
                <div>
                  <div style={{ fontSize: 22, fontWeight: 900 }}>{broker.listingsCount}</div>
                  <div style={{ fontSize: 12, opacity: 0.7 }}>إعلان نشط</div>
                </div>
                <div>
                  <div style={{ fontSize: 22, fontWeight: 900 }}>{broker.joinDate?.split('-')[0]}</div>
                  <div style={{ fontSize: 12, opacity: 0.7 }}>انضم منذ</div>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minWidth: 200 }}>
              <a
                href={`tel:${broker.phone}`}
                className="btn btn-gold"
                style={{ textDecoration: 'none', justifyContent: 'center' }}
              >
                <Phone size={16} />
                اتصل الآن
              </a>
              <a
                href={`https://wa.me/${broker.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn whatsapp-btn"
                style={{ textDecoration: 'none', justifyContent: 'center' }}
              >
                <MessageSquare size={16} />
                واتساب
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '32px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 28 }}>
          {/* Main */}
          <div>
            {/* Bio */}
            <div className="bg-card" style={{ marginBottom: 24 }}>
              <h2 style={{ fontWeight: 800, fontSize: 17, color: 'var(--primary)', marginBottom: 12 }}>نبذة عن الوسيط</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.9 }}>{broker.bio}</p>
            </div>

            {/* Active Listings */}
            <div style={{ marginBottom: 32 }}>
              <div className="section-header" style={{ marginBottom: 20 }}>
                <h2 className="section-title" style={{ fontSize: 20 }}>
                  إعلانات <span>{broker.name.split(' ')[0]}</span>
                </h2>
                <span className="badge badge-primary">{brokerProps.length} إعلان</span>
              </div>
              {brokerProps.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
                  {brokerProps.map(p => (
                    <PropertyCard key={p.id} property={p} onAddCompare={addToCompare} compareList={compareList} />
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                  لا توجد إعلانات نشطة حالياً
                </div>
              )}
            </div>

            {/* Reviews */}
            <div>
              <h2 className="section-title" style={{ fontSize: 20, marginBottom: 20 }}>
                آراء <span>العملاء</span>
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {MOCK_REVIEWS.map((rev, i) => (
                  <div key={i} className="bg-card">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{
                          width: 40, height: 40, borderRadius: '50%', background: 'var(--primary)',
                          color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontWeight: 800, fontSize: 16
                        }}>
                          {rev.name[0]}
                        </div>
                        <div>
                          <div style={{ fontWeight: 700 }}>{rev.name}</div>
                          <StarRating rating={rev.rating} size={13} />
                        </div>
                      </div>
                      <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{rev.date}</span>
                    </div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7 }}>{rev.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div className="bg-card" style={{ marginBottom: 16 }}>
              <div style={{ fontWeight: 800, fontSize: 15, color: 'var(--primary)', marginBottom: 16 }}>التقييم التفصيلي</div>
              {[
                { label: 'الاحترافية', val: 4.9 },
                { label: 'الصدق والأمانة', val: 4.8 },
                { label: 'سرعة الاستجابة', val: 4.7 },
                { label: 'جودة العقارات', val: 4.6 },
              ].map(item => (
                <div key={item.label} style={{ marginBottom: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4 }}>
                    <span>{item.label}</span>
                    <span style={{ fontWeight: 700 }}>{item.val}</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${(item.val / 5) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Verification status */}
            <div className="verification-progress">
              <div style={{ fontWeight: 800, fontSize: 14, color: 'var(--primary)', marginBottom: 14 }}>حالة التوثيق</div>
              {[
                { label: 'الهوية الشخصية', done: true },
                { label: 'ترخيص الوسيط', done: broker.verified },
                { label: 'التحقق من الهاتف', done: true },
                { label: 'الشهادة المهنية', done: broker.verified },
              ].map(step => (
                <div key={step.label} className="verification-step">
                  <div className={`v-step-dot ${step.done ? 'done' : 'pending'}`}>
                    <CheckCircle size={14} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{step.label}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{step.done ? 'تم التحقق' : 'قيد المراجعة'}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
