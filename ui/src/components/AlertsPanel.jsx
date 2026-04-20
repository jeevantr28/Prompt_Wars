import React, { useEffect, useState } from 'react';
import { ShieldAlert, Navigation, MessageSquare, Megaphone, UserCircle } from 'lucide-react';

const initialUserAlerts = [
  { id: 101, time: '19:28:45', msg: 'Auto-reply sent to Fan #8912: "Restroom at 114 is empty!"', icon: MessageSquare, color: 'var(--accent-purple)' },
  { id: 102, time: '19:25:12', msg: 'Seat upgrade offered to Fan #4521 (Loyalty Tier: Gold)', icon: UserCircle, color: 'var(--accent-green)' },
];

const initialBroadcastAlerts = [
  { id: 201, time: '19:28:02', msg: 'Dispatched 3 personnel to Sector 4 (Bottleneck predicted)', icon: ShieldAlert, color: 'var(--accent-orange)' },
  { id: 202, time: '19:28:15', msg: 'Digital Signage updated at Concourse B to divert traffic', icon: Navigation, color: 'var(--accent-blue)' },
];

export default function AlertsPanel() {
  const [userAlerts, setUserAlerts] = useState(initialUserAlerts);
  const [broadcastAlerts, setBroadcastAlerts] = useState(initialBroadcastAlerts);

  useEffect(() => {
    const timer = setInterval(() => {
      if (Math.random() > 0.5) {
        // Add User Alert
        const newLog = {
          id: Date.now(),
          time: new Date().toLocaleTimeString('en-US', { hour12: false }),
          msg: `Auto-reply sent to Fan #${Math.floor(Math.random() * 9000) + 1000}: "Food ready for pickup at Gate B"`,
          icon: MessageSquare,
          color: 'var(--accent-purple)'
        };
        setUserAlerts(prev => [newLog, ...prev].slice(0, 15));
      } else {
        // Add Broadcast Alert
        const newLog = {
          id: Date.now(),
          time: new Date().toLocaleTimeString('en-US', { hour12: false }),
          msg: `Global PA System: "Please clear the aisles in Sector ${Math.floor(Math.random() * 5) + 1}"`,
          icon: Megaphone,
          color: 'var(--accent-red)'
        };
        setBroadcastAlerts(prev => [newLog, ...prev].slice(0, 15));
      }
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const AlertList = ({ title, icon: Icon, alerts, color }) => (
    <div className="glass-panel" style={{ flex: 1, padding: '1.5rem', display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h3 className="glow-text" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: color }}>
          <Icon size={24} style={{ filter: `drop-shadow(0 0 8px ${color})` }} />
          {title}
        </h3>
        <div className="live-badge" style={{ transform: 'scale(0.85)' }}>LIVE</div>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', overflowY: 'auto', flex: 1, paddingRight: '8px' }}>
        {alerts.map((log) => {
          const LogIcon = log.icon;
          return (
            <div key={log.id} className="animate-slide-up" style={{ 
              display: 'flex', 
              alignItems: 'flex-start', 
              gap: '12px', 
              padding: '16px', 
              background: 'rgba(255,255,255,0.03)', 
              borderRadius: '12px',
              borderLeft: `4px solid ${log.color}`
            }}>
              <div style={{ color: log.color, padding: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                <LogIcon size={18} />
              </div>
              <div style={{ textAlign: 'left', width: '100%' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  System Time: {log.time}
                </div>
                <div style={{ fontSize: '0.95rem', color: 'var(--text-primary)', lineHeight: '1.4' }}>
                  {log.msg}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', gap: '1.5rem', height: '100%', width: '100%' }}>
      <AlertList title="User Alerts" icon={UserCircle} alerts={userAlerts} color="var(--accent-purple)" />
      <AlertList title="Broadcast Alerts" icon={Megaphone} alerts={broadcastAlerts} color="var(--accent-blue)" />
    </div>
  );
}
