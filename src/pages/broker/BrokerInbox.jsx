import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Send, Phone, Globe, MessageSquare } from 'lucide-react';
import DashboardSidebar from '../../components/dashboard/DashboardSidebar';
import { ChannelIcon } from '../../components/shared/Badges';
import { inboxMessages } from '../../data/mockData';
import { useRole } from '../../App';

export default function BrokerInbox() {
  const location = useLocation();
  const { role, setRole } = useRole();
  const [selected, setSelected] = useState(inboxMessages[0]);
  const [newMsg, setNewMsg] = useState('');
  const [conversations, setConversations] = useState(inboxMessages);

  const sendMessage = () => {
    if (!newMsg.trim()) return;
    const updated = conversations.map(c =>
      c.id === selected.id
        ? { ...c, messages: [...c.messages, { from: 'broker', text: newMsg, time: 'الآن' }], lastMessage: newMsg }
        : c
    );
    setConversations(updated);
    setSelected(updated.find(c => c.id === selected.id));
    setNewMsg('');
  };

  const channelLabel = (ch) => ({ whatsapp: 'واتساب', website: 'موقع', call: 'مكالمة' }[ch] || ch);

  return (
    <div className="dashboard-layout">
      <DashboardSidebar role={role} onRoleChange={setRole} currentPath={location.pathname} />
      <main className="dashboard-main">
        <div className="dashboard-header">
          <div>
            <div className="dashboard-header-title">صندوق الرسائل الموحد</div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>
              يجمع رسائل الواتساب، الموقع، والمكالمات في مكان واحد
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <span className="badge" style={{ background: '#dcfce7', color: '#16a34a', gap: 5 }}>💬 واتساب</span>
            <span className="badge badge-primary">🌐 موقع</span>
            <span className="badge" style={{ background: '#fffbeb', color: '#d97706', gap: 5 }}>📞 مكالمات</span>
          </div>
        </div>

        <div className="dashboard-content" style={{ padding: 0 }}>
          <div className="inbox-layout" style={{ margin: '0 32px 32px', height: 'calc(100vh - 180px)' }}>
            {/* Inbox List */}
            <div className="inbox-list">
              <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)', background: 'var(--bg-alt)' }}>
                <input placeholder="بحث في الرسائل..." style={{ fontSize: 13 }} />
              </div>
              {conversations.map(msg => (
                <div
                  key={msg.id}
                  className={`inbox-item ${selected?.id === msg.id ? 'active' : ''}`}
                  onClick={() => setSelected(conversations.find(c => c.id === msg.id))}
                >
                  <div style={{ position: 'relative', flexShrink: 0 }}>
                    <img className="inbox-item-avatar" src={msg.avatar} alt={msg.sender} onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(msg.sender)}&size=44`; }} />
                    <span style={{
                      position: 'absolute', bottom: 0, left: 0,
                      background: msg.channel === 'whatsapp' ? '#25D366' : msg.channel === 'call' ? '#F59E0B' : 'var(--primary)',
                      borderRadius: '50%', width: 16, height: 16, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 9, border: '2px solid white'
                    }}>
                      {msg.channel === 'whatsapp' ? '💬' : msg.channel === 'call' ? '📞' : '🌐'}
                    </span>
                  </div>
                  <div className="inbox-item-info">
                    <div className="inbox-item-name">
                      {msg.sender}
                      {msg.unread && <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--primary)', display: 'inline-block', marginRight: 'auto' }} />}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--primary)', marginBottom: 2 }}>{msg.property}</div>
                    <div className="inbox-item-msg">{msg.lastMessage}</div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4, flexShrink: 0 }}>
                    <div className="inbox-item-time">{msg.time}</div>
                    {msg.unread && <div className="inbox-unread-dot" />}
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Area */}
            {selected && (
              <div className="chat-area">
                <div className="chat-header">
                  <img
                    src={selected.avatar}
                    alt={selected.sender}
                    className="avatar-md"
                    onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(selected.sender)}&size=48`; }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 800 }}>{selected.sender}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 6 }}>
                      <ChannelIcon channel={selected.channel} />
                      عبر {channelLabel(selected.channel)} — {selected.property}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button className="btn btn-outline btn-sm">
                      <Phone size={14} />
                      اتصال
                    </button>
                    <button className="btn whatsapp-btn btn-sm">
                      <MessageSquare size={14} />
                      واتساب
                    </button>
                  </div>
                </div>

                <div className="chat-messages">
                  {selected.messages.map((m, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: m.from === 'broker' ? 'flex-start' : m.from === 'system' ? 'center' : 'flex-end' }}>
                      <div className={`chat-bubble from-${m.from}`}>
                        {m.text}
                        <div style={{ fontSize: 10, opacity: 0.6, marginTop: 4, textAlign: m.from === 'broker' ? 'left' : 'right' }}>
                          {m.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="chat-input-area">
                  <input
                    placeholder="اكتب رسالتك..."
                    value={newMsg}
                    onChange={e => setNewMsg(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && sendMessage()}
                  />
                  <button className="btn btn-primary" onClick={sendMessage}>
                    <Send size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
