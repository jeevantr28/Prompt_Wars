import React, { useEffect, useState } from 'react';
import { Cpu, ShieldAlert, Navigation, MessageSquare } from 'lucide-react';

const initialLogs = [
  { id: 1, time: '19:28:02', type: 'security', msg: 'Dispatched 3 personnel to Sector 4 (Bottleneck predicted)', icon: ShieldAlert, color: 'var(--accent-orange)' },
  { id: 2, time: '19:28:15', type: 'routing', msg: 'Digital Signage updated at Concourse B to divert traffic', icon: Navigation, color: 'var(--accent-blue)' },
];

export default function GenAIFeed() {
  const [logs, setLogs] = useState(initialLogs);

  useEffect(() => {
    const timer = setInterval(() => {
      const newLog = {
        id: Date.now(),
        time: new Date().toLocaleTimeString('en-US', { hour12: false }),
        type: 'comms',
        msg: 'Auto-reply sent to Fan #8912: "Restroom at 114 is empty!"',
        icon: MessageSquare,
        color: 'var(--accent-purple)'
      };
      setLogs(prev => [newLog, ...prev].slice(0, 5));
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="glass-panel" style={{ gridColumn: '1 / -1', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 className="glow-text" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Cpu size={20} className="glow-purple" />
          Live GenAI Orchestrator Actions
        </h3>
        <div className="live-badge">LIVE</div>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', overflowY: 'auto' }}>
        {logs.map((log) => {
          const Icon = log.icon;
          return (
            <div key={log.id} className="animate-slide-in" style={{ 
              display: 'flex', 
              alignItems: 'flex-start', 
              gap: '12px', 
              padding: '12px', 
              background: 'rgba(255,255,255,0.03)', 
              borderRadius: '8px',
              borderLeft: `3px solid ${log.color}`
            }}>
              <div style={{ color: log.color, padding: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px' }}>
                <Icon size={16} />
              </div>
              <div style={{ textAlign: 'left', width: '100%' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '4px', textAlign: 'left' }}>
                  System Time: {log.time}
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)', textAlign: 'left' }}>
                  {log.msg}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
