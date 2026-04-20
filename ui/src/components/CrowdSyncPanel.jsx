import React, { useState, useEffect } from 'react';
import { Users } from 'lucide-react';

export default function CrowdSyncPanel() {
  const [densities, setDensities] = useState({
    north: 25,
    south: 40,
    east: 85,
    west: 15,
    gateC: 92,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setDensities(prev => ({
        ...prev,
        east: Math.min(100, prev.east + (Math.random() > 0.5 ? 2 : -2)),
        gateC: Math.min(100, prev.gateC + (Math.random() > 0.2 ? 1 : -1)),
      }));
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const getColor = (density) => {
    if (density < 40) return 'rgba(16, 185, 129, 0.7)'; // Green
    if (density < 75) return 'rgba(245, 158, 11, 0.7)'; // Orange/Yellow
    return 'rgba(244, 63, 94, 0.8)'; // Red
  };

  const getGlow = (density) => {
    if (density < 40) return 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.4))';
    if (density < 75) return 'drop-shadow(0 0 8px rgba(245, 158, 11, 0.4))';
    return 'drop-shadow(0 0 12px rgba(244, 63, 94, 0.6))';
  };

  return (
    <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 className="glow-text" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Users size={20} className="glow-blue" />
          Crowd Density: M. Chinnaswamy Stadium
        </h3>
        <div className="status-dot safe"></div>
      </div>
      
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        
        <svg viewBox="0 0 400 300" style={{ width: '100%', maxHeight: '250px', overflow: 'visible' }}>
          {/* Pitch */}
          <ellipse cx="200" cy="150" rx="60" ry="80" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" />
          <rect x="190" y="120" width="20" height="60" fill="rgba(255,255,255,0.1)" />

          {/* North Stand */}
          <path d="M 120 40 Q 200 0 280 40 L 250 80 Q 200 50 150 80 Z" 
                fill={getColor(densities.north)} 
                stroke="#333" strokeWidth="2"
                style={{ filter: getGlow(densities.north), transition: 'all 1s ease' }} />
          <text x="200" y="30" fill="#fff" fontSize="12" textAnchor="middle" fontWeight="bold">North Stand</text>
          
          {/* South Pavilion */}
          <path d="M 120 260 Q 200 300 280 260 L 250 220 Q 200 250 150 220 Z" 
                fill={getColor(densities.south)} 
                stroke="#333" strokeWidth="2"
                style={{ filter: getGlow(densities.south), transition: 'all 1s ease' }} />
          <text x="200" y="280" fill="#fff" fontSize="12" textAnchor="middle" fontWeight="bold">Pavilion</text>

          {/* West Stand */}
          <path d="M 110 50 Q 50 150 110 250 L 140 210 Q 100 150 140 90 Z" 
                fill={getColor(densities.west)} 
                stroke="#333" strokeWidth="2"
                style={{ filter: getGlow(densities.west), transition: 'all 1s ease' }} />
          <text x="80" y="155" fill="#fff" fontSize="12" textAnchor="middle" transform="rotate(-90 80 155)" fontWeight="bold">West Stand</text>

          {/* East Stand */}
          <path d="M 290 50 Q 350 150 290 250 L 260 210 Q 300 150 260 90 Z" 
                fill={getColor(densities.east)} 
                stroke="#333" strokeWidth="2"
                style={{ filter: getGlow(densities.east), transition: 'all 1s ease' }} />
          <text x="320" y="155" fill="#fff" fontSize="12" textAnchor="middle" transform="rotate(90 320 155)" fontWeight="bold">East Stand</text>

          {/* Gate C (Hotspot) */}
          <circle cx="310" cy="240" r="15" fill={getColor(densities.gateC)} stroke="#fff" strokeWidth="2"
                  style={{ filter: getGlow(densities.gateC), transition: 'all 1s ease', animation: 'pulse 1.5s infinite' }} />
          <text x="310" y="244" fill="#fff" fontSize="12" textAnchor="middle" fontWeight="bold" style={{ textShadow: '0 0 4px #000' }}>C</text>
        </svg>

        <div style={{ display: 'flex', gap: '16px', marginTop: '1rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '12px', height: '12px', background: 'rgba(16, 185, 129, 0.7)', borderRadius: '2px' }}></div>
            Smooth
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '12px', height: '12px', background: 'rgba(245, 158, 11, 0.7)', borderRadius: '2px' }}></div>
            Moderate
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '12px', height: '12px', background: 'rgba(244, 63, 94, 0.8)', borderRadius: '2px' }}></div>
            Congested
          </div>
        </div>

      </div>
    </div>
  );
}
