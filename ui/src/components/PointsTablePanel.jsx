import React, { useState } from 'react';
import { ListOrdered, Search, Activity, Loader, AlertCircle } from 'lucide-react';
import { database } from '../services/database';

const LEAGUES = {
  'epl': 4328,
  'premier league': 4328,
  'england': 4328,
  'la liga': 4335,
  'spain': 4335,
  'serie a': 4332,
  'italy': 4332,
  'bundesliga': 4331,
  'germany': 4331,
  'ligue 1': 4334,
  'france': 4334,
};

export default function PointsTablePanel() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle', 'loading', 'success', 'error'
  const [tableData, setTableData] = useState([]);
  const [leagueName, setLeagueName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearch = async () => {
    if (!query.trim()) return;
    setStatus('loading');
    setErrorMessage('');
    
    const lowerQuery = query.toLowerCase();
    let leagueId = 4328; // Default to EPL
    let season = '2023-2024';

    // Find if the query matches our known leagues
    for (const [key, id] of Object.entries(LEAGUES)) {
      if (lowerQuery.includes(key)) {
        leagueId = id;
        break;
      }
    }

    // Handle IPL specifically by querying the live database
    if (lowerQuery.includes('ipl') || lowerQuery.includes('indian premier league')) {
      try {
        const liveData = await database.fetchIPLStandings();
        setSportType('cricket');
        setLeagueName('Indian Premier League (Live DB)');
        setTableData(liveData);
        setStatus('success');
      } catch (err) {
        setErrorMessage("Failed to fetch from local database.");
        setStatus('error');
      }
      return;
    }

    try {
      // Fetch real-time data from TheSportsDB (Open public free tier API)
      const res = await fetch(`https://www.thesportsdb.com/api/v1/json/3/lookuptable.php?l=${leagueId}&s=${season}`);
      const data = await res.json();
      
      if (data && data.table && data.table.length > 0) {
        const formattedData = data.table.map(row => ({
          rank: parseInt(row.intRank),
          team: row.strTeam,
          pld: row.intPlayed,
          w: row.intWin,
          d: row.intDraw,
          l: row.intLoss,
          gd: row.intGoalDifference,
          pts: row.intPoints,
          badge: row.strBadge
        }));
        
        setLeagueName(data.table[0].strLeague);
        setTableData(formattedData);
        setStatus('success');
      } else {
        // Fallback if league/season not found or API limits exceeded
        throw new Error("No data found for this query");
      }
    } catch (err) {
      console.error(err);
      // Fallback to mock data if the API fails
      if (lowerQuery.includes('premier') || lowerQuery.includes('epl')) {
        setLeagueName('English Premier League (Fallback Data)');
        setTableData(MOCK_FOOTBALL_TABLE);
        setStatus('success');
      } else {
        setErrorMessage("Could not fetch real-time data for that tournament. Try 'Premier League' or 'La Liga'.");
        setStatus('error');
      }
    }
  };

  return (
    <div className="glass-panel" style={{ gridColumn: '1 / -1', gridRow: '1 / -1', padding: '1.5rem', display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-glass)', paddingBottom: '1rem' }}>
        <h2 className="glow-text" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ListOrdered size={24} style={{ color: 'var(--accent-blue)' }} />
          Live Tournament Standings
        </h2>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter tournament (e.g., IPL 2024, Premier League, La Liga)"
          className="input-field"
          style={{ flex: 1, maxWidth: '600px' }}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button 
          className="button-primary"
          onClick={handleSearch}
          disabled={status === 'loading'}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: status === 'loading' ? 0.7 : 1 }}
        >
          {status === 'loading' ? <Loader size={16} className="spin" style={{ animation: 'spin 1s linear infinite' }} /> : <Search size={16} />} 
          {status === 'loading' ? 'Fetching Internet Data...' : 'Fetch Live Standings'}
        </button>
      </div>
      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>* Connected to Live Data APIs for real-time standings.</p>

      <div style={{ flex: 1, overflowY: 'auto', paddingRight: '0.5rem' }}>
        {status === 'idle' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-secondary)' }}>
            <ListOrdered size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
            <p>Search for a tournament to view the latest points table from the web.</p>
          </div>
        )}

        {status === 'loading' && (
          <div className="animate-pulse" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-primary)' }}>
            <Loader size={40} style={{ color: 'var(--accent-blue)', marginBottom: '1rem', animation: 'spin 1s linear infinite' }} />
            <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
            <p>Fetching real-time standings from the internet...</p>
          </div>
        )}

        {status === 'error' && (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--accent-red)' }}>
            <AlertCircle size={48} style={{ marginBottom: '1rem' }} />
            <p>{errorMessage}</p>
          </div>
        )}

        {status === 'success' && (
          <div className="animate-fade-in" style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '12px', border: '1px solid var(--border-glass)', overflow: 'hidden' }}>
            <div style={{ padding: '1rem 1.5rem', background: 'rgba(255,255,255,0.05)', borderBottom: '1px solid var(--border-glass)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Activity size={18} style={{ color: 'var(--accent-green)' }} />
              <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{leagueName}</h3>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.02)', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  <th style={{ padding: '1rem', borderBottom: '1px solid var(--border-glass)' }}>Pos</th>
                  <th style={{ padding: '1rem', borderBottom: '1px solid var(--border-glass)' }}>Team</th>
                  <th style={{ padding: '1rem', borderBottom: '1px solid var(--border-glass)' }}>Pld</th>
                  <th style={{ padding: '1rem', borderBottom: '1px solid var(--border-glass)' }}>W</th>
                  <th style={{ padding: '1rem', borderBottom: '1px solid var(--border-glass)' }}>D</th>
                  <th style={{ padding: '1rem', borderBottom: '1px solid var(--border-glass)' }}>L</th>
                  <th style={{ padding: '1rem', borderBottom: '1px solid var(--border-glass)' }}>GD</th>
                  <th style={{ padding: '1rem', borderBottom: '1px solid var(--border-glass)' }}>Pts</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: index < 4 ? 'rgba(2, 132, 199, 0.05)' : index > tableData.length - 4 ? 'rgba(244, 63, 94, 0.05)' : 'transparent', transition: 'background 0.2s', cursor: 'default' }} onMouseOver={e => e.currentTarget.style.background='rgba(255,255,255,0.05)'} onMouseOut={e => e.currentTarget.style.background=index < 4 ? 'rgba(2, 132, 199, 0.05)' : index > tableData.length - 4 ? 'rgba(244, 63, 94, 0.05)' : 'transparent'}>
                    <td style={{ padding: '1rem', fontWeight: 'bold' }}>{row.rank}</td>
                    <td style={{ padding: '1rem', fontWeight: 'bold', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {row.badge && <img src={row.badge} alt="badge" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />}
                      {row.team}
                    </td>
                    <td style={{ padding: '1rem' }}>{row.pld}</td>
                    <td style={{ padding: '1rem', color: 'var(--accent-green)' }}>{row.w}</td>
                    <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{row.d}</td>
                    <td style={{ padding: '1rem', color: 'var(--accent-red)' }}>{row.l}</td>
                    <td style={{ padding: '1rem', fontFamily: 'monospace' }}>{row.gd > 0 ? `+${row.gd}` : row.gd}</td>
                    <td style={{ padding: '1rem', fontWeight: 'bold', fontSize: '1.1rem', color: 'var(--accent-blue)' }}>{row.pts}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
