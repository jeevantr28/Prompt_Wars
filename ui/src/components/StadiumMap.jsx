import React, { useState } from 'react';
import { ArrowLeft, Navigation, XCircle } from 'lucide-react';

const SECTORS = [
  { id: 'north', name: 'North Stand', color: 'var(--accent-blue)', capacity: 15000, occupancy: '82%', path: "M 100 50 Q 250 10 400 50 L 350 120 Q 250 90 150 120 Z" },
  { id: 'south', name: 'South Stand', color: 'var(--accent-orange)', capacity: 15000, occupancy: '91%', path: "M 100 450 Q 250 490 400 450 L 350 380 Q 250 410 150 380 Z" },
  { id: 'east', name: 'East Stand', color: 'var(--accent-purple)', capacity: 10000, occupancy: '65%', path: "M 420 70 Q 480 250 420 430 L 370 360 Q 410 250 370 140 Z" },
  { id: 'west', name: 'West Stand', color: 'var(--accent-green)', capacity: 10000, occupancy: '98%', path: "M 80 70 Q 20 250 80 430 L 130 360 Q 90 250 130 140 Z" },
  { id: 'vip', name: 'VIP Lounge', color: 'var(--accent-red)', capacity: 2000, occupancy: '45%', path: "M 200 320 Q 250 340 300 320 L 290 350 Q 250 360 210 350 Z" }
];

export default function StadiumMap() {
  const [selectedSector, setSelectedSector] = useState(null);
  const [isRoutingOpen, setIsRoutingOpen] = useState(false);

  // Generate mock seats for a sector
  const getSeats = (sectorId) => {
    // Generate an array of 160 seats for demonstration
    return Array.from({ length: 160 }, (_, i) => {
      const rand = Math.random();
      let status = 'available';
      if (rand > 0.6) status = 'occupied';
      else if (rand > 0.45) status = 'reserved';
      return { id: `${sectorId}-${i}`, status };
    });
  };

  const renderStadiumView = () => (
    <div className="animate-fade-in" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 className="glow-text" style={{ fontSize: '1.2rem', marginBottom: '4px' }}>Interactive Stadium Map</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Select a sector to view live seating arrangements.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent-blue)' }}>52,000</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Total Attendance</div>
          </div>
        </div>
      </div>
      
      <div style={{ flex: 1, background: 'rgba(0,0,0,0.1)', borderRadius: '12px', border: '1px solid var(--border-glass)', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg viewBox="0 0 500 500" style={{ width: '100%', height: '100%', maxHeight: '400px' }}>
          {/* Pitch */}
          <rect x="160" y="150" width="180" height="200" rx="20" fill="rgba(16, 185, 129, 0.1)" stroke="var(--accent-green)" strokeWidth="2" />
          <circle cx="250" cy="250" r="30" fill="transparent" stroke="var(--accent-green)" strokeWidth="2" />
          <line x1="160" y1="250" x2="340" y2="250" stroke="var(--accent-green)" strokeWidth="2" />

          {/* Sectors */}
          {SECTORS.map((sector) => (
            <g key={sector.id} onClick={() => setSelectedSector(sector)} style={{ cursor: 'pointer' }} className="sector-group">
              <path 
                d={sector.path} 
                fill={sector.color} 
                opacity="0.2" 
                stroke={sector.color} 
                strokeWidth="2"
                style={{ transition: 'all 0.3s ease' }}
                onMouseOver={(e) => { e.currentTarget.setAttribute('opacity', '0.5'); }}
                onMouseOut={(e) => { e.currentTarget.setAttribute('opacity', '0.2'); }}
              />
              {/* Labels */}
              {sector.id === 'north' && <text x="250" y="75" fill="var(--text-primary)" fontSize="14" textAnchor="middle" fontWeight="bold" style={{ pointerEvents: 'none' }}>NORTH</text>}
              {sector.id === 'south' && <text x="250" y="440" fill="var(--text-primary)" fontSize="14" textAnchor="middle" fontWeight="bold" style={{ pointerEvents: 'none' }}>SOUTH</text>}
              {sector.id === 'east' && <text x="430" y="255" fill="var(--text-primary)" fontSize="14" textAnchor="middle" fontWeight="bold" style={{ pointerEvents: 'none' }}>EAST</text>}
              {sector.id === 'west' && <text x="70" y="255" fill="var(--text-primary)" fontSize="14" textAnchor="middle" fontWeight="bold" style={{ pointerEvents: 'none' }}>WEST</text>}
              {sector.id === 'vip' && <text x="250" y="340" fill="var(--text-primary)" fontSize="10" textAnchor="middle" fontWeight="bold" style={{ pointerEvents: 'none' }}>VIP</text>}
            </g>
          ))}
        </svg>
      </div>

      <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
        {SECTORS.map(s => (
          <div key={s.id} onClick={() => setSelectedSector(s)} style={{ flex: '1 0 auto', padding: '1rem', background: 'rgba(255,255,255,0.02)', border: `1px solid ${s.color}`, borderRadius: '8px', cursor: 'pointer', transition: 'background 0.2s' }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
          >
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>{s.name}</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: s.color }}>{s.occupancy} <span style={{ fontSize: '0.75rem', fontWeight: 'normal', color: 'var(--text-secondary)' }}>FULL</span></div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSectorView = () => {
    const seats = getSeats(selectedSector.id);
    const available = seats.filter(s => s.status === 'available').length;
    const occupied = seats.filter(s => s.status === 'occupied').length;
    const reserved = seats.filter(s => s.status === 'reserved').length;

    return (
      <div className="animate-slide-up" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button 
            onClick={() => { setSelectedSector(null); setIsRoutingOpen(false); }}
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-glass)', color: 'var(--text-primary)', padding: '8px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h3 className="glow-text" style={{ fontSize: '1.2rem', margin: 0, color: selectedSector.color }}>{selectedSector.name}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: 0 }}>Live Seating Arrangement</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ flex: 1, padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px', border: '1px solid var(--accent-green)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Available</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--accent-green)' }}>{available}</div>
          </div>
          <div style={{ flex: 1, padding: '1rem', background: 'rgba(244, 63, 94, 0.1)', borderRadius: '8px', border: '1px solid var(--accent-red)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Occupied</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--accent-red)' }}>{occupied}</div>
          </div>
          <div style={{ flex: 1, padding: '1rem', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '8px', border: '1px solid var(--accent-orange)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Reserved</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--accent-orange)' }}>{reserved}</div>
          </div>
        </div>

        <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', background: 'rgba(0,0,0,0.1)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
          {isRoutingOpen ? (
            <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <h4 style={{ margin: 0, color: 'var(--accent-blue)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Navigation size={18} /> Navigation to Pitch
                </h4>
                <button onClick={() => setIsRoutingOpen(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                  <XCircle size={20} />
                </button>
              </div>
              <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingRight: '1rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ padding: '8px', background: 'rgba(2, 132, 199, 0.1)', color: 'var(--accent-blue)', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>1</div>
                  <div>
                    <div style={{ fontWeight: 'bold' }}>Exit {selectedSector.name}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Walk down the stairs to the main concourse level.</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ padding: '8px', background: 'rgba(2, 132, 199, 0.1)', color: 'var(--accent-blue)', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>2</div>
                  <div>
                    <div style={{ fontWeight: 'bold' }}>Turn Right at Gate A</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Follow the blue signage towards the VIP entrance.</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ padding: '8px', background: 'rgba(2, 132, 199, 0.1)', color: 'var(--accent-blue)', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>3</div>
                  <div>
                    <div style={{ fontWeight: 'bold' }}>Take Elevator to Ground</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Use Elevator Bank 3 down to Level G.</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ padding: '8px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent-green)', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>4</div>
                  <div>
                    <div style={{ fontWeight: 'bold', color: 'var(--accent-green)' }}>Arrive at Pitch Level</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>You have successfully reached your destination!</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(28px, 1fr))', gap: '8px' }}>
                {seats.map(seat => {
                  let color = 'var(--accent-green)';
                  if (seat.status === 'occupied') color = 'var(--accent-red)';
                  if (seat.status === 'reserved') color = 'var(--accent-orange)';
                  
                  return (
                    <div 
                      key={seat.id} 
                      title={`Seat ${seat.id} - ${seat.status}`}
                      style={{ 
                        aspectRatio: '1', 
                        background: color, 
                        borderRadius: '6px',
                        opacity: seat.status === 'available' ? 0.2 : 0.8,
                        cursor: 'pointer',
                        boxShadow: seat.status !== 'available' ? `0 0 8px ${color}` : 'none'
                      }} 
                      onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.opacity = '1'; }}
                      onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.opacity = seat.status === 'available' ? '0.2' : '0.8'; }}
                    />
                  );
                })}
              </div>
              <div 
                onClick={() => setIsRoutingOpen(true)}
                style={{ 
                  cursor: 'pointer', 
                  marginTop: '2rem', 
                  textAlign: 'center', 
                  width: '100%', 
                  padding: '1rem', 
                  background: 'rgba(255,255,255,0.05)', 
                  borderRadius: '8px', 
                  color: 'var(--text-secondary)', 
                  fontSize: '0.85rem', 
                  letterSpacing: '0.1em',
                  border: '1px solid var(--border-glass)',
                  transition: 'background 0.2s',
                }}
                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
              >
                PITCH DIRECTION
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="glass-panel" style={{ gridColumn: '1', gridRow: '1 / -1', height: '100%', padding: '1.5rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {selectedSector ? renderSectorView() : renderStadiumView()}
    </div>
  );
}
