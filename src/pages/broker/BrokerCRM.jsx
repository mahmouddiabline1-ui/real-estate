import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  DndContext, closestCenter, PointerSensor, useSensor, useSensors,
} from '@dnd-kit/core';
import {
  SortableContext, verticalListSortingStrategy, useSortable, arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Phone, MessageSquare, Home, GripVertical, Plus } from 'lucide-react';
import DashboardSidebar from '../../components/dashboard/DashboardSidebar';
import { brokerLeads } from '../../data/mockData';
import { useRole } from '../../App';

const COLUMNS = [
  { key: 'new', label: 'جديد', color: '#3B82F6', bg: '#EFF6FF' },
  { key: 'contacted', label: 'تم التواصل', color: '#F59E0B', bg: '#FFFBEB' },
  { key: 'interested', label: 'مهتم', color: '#0D9488', bg: '#E6F7F6' },
  { key: 'closed', label: 'مغلق ✓', color: '#10B981', bg: '#ECFDF5' },
  { key: 'lost', label: 'خسارة', color: '#EF4444', bg: '#FEF2F2' },
];

function KanbanCard({ lead }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: lead.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const sourceColors = {
    'موقع': 'badge-primary',
    'واتساب': 'badge-success',
    'إحالة': 'badge-teal',
    'مكالمة': 'badge-warning',
  };

  return (
    <div ref={setNodeRef} style={style} className="kanban-card">
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <span {...attributes} {...listeners} style={{ cursor: 'grab', color: 'var(--text-muted)' }}>
          <GripVertical size={14} />
        </span>
        <div className="kanban-card-name">{lead.name}</div>
      </div>
      <div className="kanban-card-phone">
        <Phone size={11} style={{ display: 'inline', marginLeft: 4 }} />
        {lead.phone}
      </div>
      <div className="kanban-card-property">
        <Home size={11} />
        {lead.property}
      </div>
      {lead.budget && (
        <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 8 }}>
          💰 {lead.budget}
        </div>
      )}
      {lead.notes && (
        <div style={{ fontSize: 11, color: 'var(--text-muted)', background: 'var(--bg-alt)', borderRadius: 6, padding: '5px 8px', marginBottom: 8, lineHeight: 1.5 }}>
          {lead.notes}
        </div>
      )}
      <div className="kanban-card-footer">
        <span className="kanban-card-date">📅 {lead.date}</span>
        <span className={`kanban-card-source badge ${sourceColors[lead.source] || 'badge-gray'}`}>
          {lead.source}
        </span>
      </div>
      <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
        <a href={`tel:${lead.phone}`} className="btn btn-outline btn-sm" style={{ flex: 1, justifyContent: 'center', fontSize: 11 }}>
          <Phone size={12} /> اتصل
        </a>
        <a href={`https://wa.me/2${lead.phone}`} target="_blank" rel="noreferrer" className="btn whatsapp-btn btn-sm" style={{ flex: 1, justifyContent: 'center', fontSize: 11 }}>
          <MessageSquare size={12} /> واتساب
        </a>
      </div>
    </div>
  );
}

export default function BrokerCRM() {
  const location = useLocation();
  const { role, setRole } = useRole();
  const [leads, setLeads] = useState(brokerLeads);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;
    // Check if dropped on a column header area
    const targetColumn = COLUMNS.find(c => c.key === over.id);
    if (targetColumn) {
      setLeads(prev => prev.map(l => l.id === active.id ? { ...l, status: targetColumn.key } : l));
    }
  };

  const getColumnLeads = (colKey) => leads.filter(l => l.status === colKey);

  return (
    <div className="dashboard-layout">
      <DashboardSidebar role={role} onRoleChange={setRole} currentPath={location.pathname} />
      <main className="dashboard-main">
        <div className="dashboard-header">
          <div>
            <div className="dashboard-header-title">إدارة العملاء (CRM)</div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>
              {leads.length} عميل — اسحب البطاقات لتحديث الحالة
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <div style={{ display: 'flex', gap: 8 }}>
              {COLUMNS.map(c => (
                <span
                  key={c.key}
                  className="badge"
                  style={{ background: c.bg, color: c.color, fontSize: 12 }}
                >
                  {c.label}: {getColumnLeads(c.key).length}
                </span>
              ))}
            </div>
            <button className="btn btn-primary btn-sm">
              <Plus size={16} />
              عميل جديد
            </button>
          </div>
        </div>

        <div className="dashboard-content" style={{ overflowX: 'auto' }}>
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <div style={{ display: 'flex', gap: 14, minWidth: 1100 }}>
              {COLUMNS.map(col => (
                <div
                  key={col.key}
                  style={{
                    flex: 1, minWidth: 200,
                    background: col.bg,
                    border: `1.5px solid ${col.color}25`,
                    borderRadius: 14,
                    padding: 14,
                    minHeight: 500,
                  }}
                  id={col.key}
                >
                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    marginBottom: 14, paddingBottom: 10,
                    borderBottom: `2px solid ${col.color}40`,
                  }}>
                    <span style={{ fontWeight: 800, color: col.color, fontSize: 14 }}>{col.label}</span>
                    <span style={{
                      background: 'white', border: `1px solid ${col.color}50`,
                      borderRadius: 20, width: 24, height: 24,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 12, fontWeight: 800, color: col.color
                    }}>
                      {getColumnLeads(col.key).length}
                    </span>
                  </div>

                  <SortableContext
                    items={getColumnLeads(col.key).map(l => l.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {getColumnLeads(col.key).map(lead => (
                      <KanbanCard key={lead.id} lead={lead} />
                    ))}
                  </SortableContext>

                  {getColumnLeads(col.key).length === 0 && (
                    <div style={{
                      border: `2px dashed ${col.color}30`, borderRadius: 10,
                      padding: '20px', textAlign: 'center',
                      color: col.color, fontSize: 13, opacity: 0.6
                    }}>
                      اسحب بطاقة هنا
                    </div>
                  )}
                </div>
              ))}
            </div>
          </DndContext>
        </div>
      </main>
    </div>
  );
}
