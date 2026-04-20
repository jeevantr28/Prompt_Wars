import React, { useState, useEffect, useRef } from 'react';
import { Zap, Search, Clock, Trophy, Flame, PlayCircle, BarChart3 } from 'lucide-react';

const HIGHLIGHT_TEMPLATES = [
  "Incredible play! {team1} takes the initiative.",
  "{team2} responds with a stunning counter-attack!",
  "A massive roar from the crowd as {team1} gets closer to the objective.",
  "Unbelievable scenes! {team2} almost turned the tide.",
  "Strategic brilliance from {team1} in the last minute.",
  "Fierce competition! {team2} is holding strong.",
  "A momentary lapse from {team1}, can {team2} capitalize?",
  "What an outstanding performance by {team1}!"
];

export default function AnalyticsPanel() {
  const [eventInput, setEventInput] = useState('');
  const [isLive, setIsLive] = useState(false);
  
  // Parsed teams
  const [teamA, setTeamA] = useState('Team A');
  const [teamB, setTeamB] = useState('Team B');
  
  // Live Feed Data
  const [highlights, setHighlights] = useState([]);
  
  // Prediction Data
  const [winProbA, setWinProbA] = useState(50);
  const winProbB = 100 - winProbA;

  const highlightContainerRef = useRef(null);

  const startLiveFeed = () => {
    if (!eventInput.trim()) return;
    
    // Simple parser: try to split by "vs" or " vs "
    let parts = eventInput.split(/ vs /i);
    if (parts.length === 2) {
      setTeamA(parts[0].trim());
      setTeamB(parts[1].trim());
    } else {
      setTeamA(eventInput.substring(0, 15));
      setTeamB("Opponent");
    }

    setHighlights([{ id: Date.now(), text: `Live AI coverage of ${eventInput} has begun!`, time: 'Now' }]);
    setIsLive(true);
    setWinProbA(Math.floor(Math.random() * 20) + 40); // Initial random 40-60
  };

  useEffect(() => {
    let interval;
    if (isLive) {
      interval = setInterval(() => {
        // Add a highlight
        const template = HIGHLIGHT_TEMPLATES[Math.floor(Math.random() * HIGHLIGHT_TEMPLATES.length)];
        const highlightText = template.replace(/{team1}/g, teamA).replace(/{team2}/g, teamB);
        
        setHighlights(prev => {
          const newHighlights = [...prev, { id: Date.now(), text: highlightText, time: 'Just now', hasVideo: Math.random() > 0.6 }];
          // Keep last 20 highlights
          if (newHighlights.length > 20) return newHighlights.slice(newHighlights.length - 20);
          return newHighlights;
        });

        // Fluctuate probability
        setWinProbA(prev => {
          let change = Math.floor(Math.random() * 7) - 3; // -3 to +3
          let next = prev + change;
          if (next > 95) next = 95;
          if (next < 5) next = 5;
          return next;
        });

      }, 4000); // New highlight every 4 seconds
    }
    return () => clearInterval(interval);
  }, [isLive, teamA, teamB]);

  // Auto-scroll highlights
  useEffect(() => {
    if (highlightContainerRef.current) {
      highlightContainerRef.current.scrollTop = highlightContainerRef.current.scrollHeight;
    }
  }, [highlights]);

  return (
    <div className="glass-panel" style={{ gridColumn: '1 / -1', gridRow: '1 / -1', padding: '1.5rem', display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-glass)', paddingBottom: '1rem' }}>
        <h2 className="glow-text" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Zap size={24} style={{ color: 'var(--accent-orange)' }} />
          Live Event Highlights & Predictions
        </h2>
        {isLive && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-red)', fontWeight: 'bold' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--accent-red)', boxShadow: '0 0 8px var(--accent-red)' }} />
            LIVE
          </div>
        )}
      </div>

      {!isLive ? (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div className="animate-fade-in" style={{ background: 'rgba(255,255,255,0.05)', padding: '3rem', borderRadius: '16px', border: '1px solid var(--border-glass)', width: '100%', maxWidth: '600px', textAlign: 'center' }}>
            <PlayCircle size={48} style={{ color: 'var(--accent-blue)', marginBottom: '1rem' }} />
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Start AI Live Feed</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
              Enter the details of the live event (e.g., "India vs Australia Cricket") to activate the AI highlights and predictive model.
            </p>
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              <input 
                type="text" 
                value={eventInput}
                onChange={(e) => setEventInput(e.target.value)}
                placeholder="e.g. Manchester United vs Arsenal"
                className="input-field"
                style={{ flex: 1 }}
                onKeyDown={(e) => e.key === 'Enter' && startLiveFeed()}
              />
              <button 
                className="button-primary"
                onClick={startLiveFeed}
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <Search size={16} /> Track Event
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="animate-fade-in" style={{ flex: 1, display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', overflow: 'hidden' }}>
          
          {/* Live Highlights Feed */}
          <div style={{ display: 'flex', flexDirection: 'column', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', border: '1px solid var(--border-glass)', overflow: 'hidden' }}>
            <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--border-glass)', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Flame size={18} style={{ color: 'var(--accent-orange)' }} />
              <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Live GenAI Commentary</h3>
            </div>
            
            <div ref={highlightContainerRef} style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {highlights.map((h, i) => (
                <div key={h.id} className="animate-slide-up" style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', borderLeft: `3px solid ${i % 2 === 0 ? 'var(--accent-blue)' : 'var(--accent-purple)'}` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                    <Clock size={12} /> {h.time}
                  </div>
                  <div style={{ fontSize: '1.05rem', color: 'var(--text-primary)', lineHeight: '1.4' }}>
                    {h.text}
                  </div>
                  {h.hasVideo && (
                    <div style={{ marginTop: '12px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', overflow: 'hidden', position: 'relative', cursor: 'pointer', transition: 'transform 0.2s' }} 
                      onClick={() => alert('Playing highlight video overlay...')}
                      onMouseOver={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
                      onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      <img src={`https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&q=80`} alt="Highlight thumbnail" style={{ width: '100%', height: '120px', objectFit: 'cover', opacity: 0.7 }} />
                      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'rgba(0,0,0,0.6)', borderRadius: '50%', padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <PlayCircle size={28} style={{ color: '#fff' }} />
                      </div>
                      <div style={{ position: 'absolute', bottom: '8px', left: '8px', background: 'rgba(0,0,0,0.8)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', color: '#fff', fontWeight: 'bold' }}>WATCH</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Prediction Widget */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
              <h3 style={{ margin: '0 0 1.5rem 0', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)' }}>
                <Trophy size={18} style={{ color: 'var(--accent-green)' }} />
                Live Win Probability
              </h3>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <div style={{ fontWeight: 'bold', color: 'var(--accent-blue)', maxWidth: '40%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{teamA}</div>
                <div style={{ fontWeight: 'bold', color: 'var(--accent-purple)', maxWidth: '40%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{teamB}</div>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '1.5rem', fontWeight: 'bold' }}>
                <div style={{ color: 'var(--accent-blue)' }}>{winProbA}%</div>
                <div style={{ color: 'var(--accent-purple)' }}>{winProbB}%</div>
              </div>

              {/* Progress Bar */}
              <div style={{ width: '100%', height: '12px', background: 'rgba(255,255,255,0.1)', borderRadius: '6px', overflow: 'hidden', display: 'flex' }}>
                <div style={{ width: `${winProbA}%`, background: 'var(--accent-blue)', transition: 'width 1s ease' }}></div>
                <div style={{ width: `${winProbB}%`, background: 'var(--accent-purple)', transition: 'width 1s ease' }}></div>
              </div>
              
              <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', color: 'var(--accent-green)' }}>
                  <BarChart3 size={14} /> AI Insight
                </div>
                {winProbA > winProbB 
                  ? `${teamA} is currently showing stronger momentum based on real-time field data.` 
                  : `${teamB} has gained a strategic advantage in the last few minutes.`}
              </div>
            </div>

            <button 
              onClick={() => { setIsLive(false); setHighlights([]); setEventInput(''); }}
              style={{ background: 'transparent', border: '1px solid var(--border-glass)', padding: '1rem', borderRadius: '8px', color: 'var(--text-secondary)', cursor: 'pointer', transition: 'background 0.2s' }}
              onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
              onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
            >
              Track Different Event
            </button>
            
          </div>

        </div>
      )}

    </div>
  );
}
