import React, { useState, useEffect } from 'react';
import CrowdSyncPanel from './components/CrowdSyncPanel';
import StadiumMap from './components/StadiumMap';
import ConcessionLogistics from './components/ConcessionLogistics';
import GenAIFeed from './components/GenAIFeed';
import AlertsPanel from './components/AlertsPanel';
import AnalyticsPanel from './components/AnalyticsPanel';
import SettingsPanel from './components/SettingsPanel';
import PointsTablePanel from './components/PointsTablePanel';
import { Activity, Map, Coffee, Settings, Bell, LayoutDashboard, Zap, ListOrdered } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLightMode, setIsLightMode] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    if (isLightMode) {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
  }, [isLightMode]);

  // Trigger animation re-render when tab changes
  useEffect(() => {
    setAnimationKey(prev => prev + 1);
  }, [activeTab]);

  const getNavItemStyle = (tabId) => ({
    padding: '12px 16px',
    borderRadius: '12px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    background: activeTab === tabId ? 'var(--border-glass-hover)' : 'transparent',
    color: activeTab === tabId ? 'var(--accent-blue)' : 'var(--text-secondary)',
    fontWeight: activeTab === tabId ? '600' : '500',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative'
  });

  const renderContent = () => {
    // We wrap the content in a key to re-trigger the fade-in animation on tab switch
    return (
      <div key={animationKey} className="animate-fade-in" style={{ display: 'contents' }}>
        {(() => {
          switch (activeTab) {
            case 'overview':
              return (
                <>
                  <StadiumMap />
                  <div style={{ gridColumn: '2', gridRow: '1', height: '100%', overflow: 'hidden' }}>
                    <CrowdSyncPanel />
                  </div>
                  <div style={{ gridColumn: '2', gridRow: '2', height: '100%', overflow: 'hidden' }}>
                    <GenAIFeed />
                  </div>
                </>
              );

            case 'concessions':
              return (
                <div style={{ gridColumn: '1 / -1', gridRow: '1 / -1', height: '100%', overflow: 'hidden' }}>
                  <ConcessionLogistics />
                </div>
              );
            case 'analytics':
              return (
                <div style={{ gridColumn: '1 / -1', gridRow: '1 / -1', height: '100%', overflow: 'hidden' }}>
                  <AnalyticsPanel />
                </div>
              );
            case 'points':
              return (
                <div style={{ gridColumn: '1 / -1', gridRow: '1 / -1', height: '100%', overflow: 'hidden' }}>
                  <PointsTablePanel />
                </div>
              );
            case 'alerts':
              return (
                <div style={{ gridColumn: '1 / -1', gridRow: '1 / -1', height: '100%', overflow: 'hidden' }}>
                  <AlertsPanel />
                </div>
              );
            case 'settings':
              return (
                <div style={{ gridColumn: '1 / -1', gridRow: '1 / -1', height: '100%', overflow: 'hidden' }}>
                  <SettingsPanel isLightMode={isLightMode} setIsLightMode={setIsLightMode} />
                </div>
              );
            default:
              return null;
          }
        })()}
      </div>
    );
  };

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <nav className="glass-panel sidebar" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
        <div style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--border-glass)', marginBottom: '1rem' }}>
          <h1 className="glow-text" style={{ fontSize: '1.5rem', background: 'linear-gradient(90deg, var(--accent-blue), var(--accent-purple))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textAlign: 'left', lineHeight: '1.2' }}>
            Seemless Journey
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '8px', textAlign: 'left', lineHeight: '1.4' }}>
            An AI assistant on the event side for a personal guide.
          </p>
        </div>

        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: 0 }}>
          <li style={getNavItemStyle('overview')} onClick={() => setActiveTab('overview')}>
            {activeTab === 'overview' && <div style={{ position: 'absolute', left: 0, top: '20%', bottom: '20%', width: '3px', background: 'var(--accent-blue)', borderRadius: '0 4px 4px 0', boxShadow: '0 0 10px var(--accent-blue)' }} />}
            <LayoutDashboard size={20} /> Overview
          </li>

          <li style={getNavItemStyle('concessions')} onClick={() => setActiveTab('concessions')}>
            {activeTab === 'concessions' && <div style={{ position: 'absolute', left: 0, top: '20%', bottom: '20%', width: '3px', background: 'var(--accent-blue)', borderRadius: '0 4px 4px 0', boxShadow: '0 0 10px var(--accent-blue)' }} />}
            <Coffee size={20} /> Snacks & Essentials
          </li>
          <li style={getNavItemStyle('analytics')} onClick={() => setActiveTab('analytics')}>
            {activeTab === 'analytics' && <div style={{ position: 'absolute', left: 0, top: '20%', bottom: '20%', width: '3px', background: 'var(--accent-blue)', borderRadius: '0 4px 4px 0', boxShadow: '0 0 10px var(--accent-blue)' }} />}
            <Zap size={20} /> Event Highlights
          </li>
          <li style={getNavItemStyle('points')} onClick={() => setActiveTab('points')}>
            {activeTab === 'points' && <div style={{ position: 'absolute', left: 0, top: '20%', bottom: '20%', width: '3px', background: 'var(--accent-blue)', borderRadius: '0 4px 4px 0', boxShadow: '0 0 10px var(--accent-blue)' }} />}
            <ListOrdered size={20} /> Points Table
          </li>
        </ul>

        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-glass)' }}>
          <div style={getNavItemStyle('alerts')} onClick={() => setActiveTab('alerts')}>
            {activeTab === 'alerts' && <div style={{ position: 'absolute', left: 0, top: '20%', bottom: '20%', width: '3px', background: 'var(--accent-blue)', borderRadius: '0 4px 4px 0', boxShadow: '0 0 10px var(--accent-blue)' }} />}
            <Bell size={20} /> Alerts
            <span style={{ marginLeft: 'auto', background: 'var(--accent-red)', color: '#fff', fontSize: '0.75rem', fontWeight: 'bold', padding: '2px 8px', borderRadius: '12px', boxShadow: '0 0 10px rgba(244, 63, 94, 0.4)' }}>3</span>
          </div>
          <div style={getNavItemStyle('settings')} onClick={() => setActiveTab('settings')}>
            {activeTab === 'settings' && <div style={{ position: 'absolute', left: 0, top: '20%', bottom: '20%', width: '3px', background: 'var(--accent-blue)', borderRadius: '0 4px 4px 0', boxShadow: '0 0 10px var(--accent-blue)' }} />}
            <Settings size={20} /> Settings
          </div>
        </div>
      </nav>

      {/* Main Dashboard Content */}
      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
