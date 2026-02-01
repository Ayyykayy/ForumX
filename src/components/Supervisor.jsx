/* eslint-disable */
import React, { useState } from 'react';
import './Supervisor.css';

const Supervisor = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeNav, setActiveNav] = useState('observability');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'primary', team: 'Team Gamma', message: 'Consensus reached on "Q3 Goals"' },
    { id: 2, type: 'warning', team: 'Team Delta', message: 'Moderator assistance requested' }
  ]);

  const [teams] = useState([
    {
      id: 1,
      name: 'Design Ops - Alpha',
      subtitle: 'Q3 Branding Discussion',
      participants: { current: 12, total: 12 },
      status: 'active',
      statusText: 'Active Discussion',
      elapsed: '22m',
      type: 'ring',
      overlayTitle: 'Ongoing Design Review',
      users: ['Alex Rivera', 'Sam Chen', 'Jordan Lee']
    },
    {
      id: 2,
      name: 'Engineering - Beta',
      subtitle: 'Sprint Backlog Review',
      participants: { current: 5, total: 8 },
      status: 'stable',
      statusText: 'Stable Flow',
      elapsed: '15m',
      type: 'progress',
      overlayTitle: 'Engineering Sync',
      users: ['Taylor Swift', 'Morgan Freeman', 'Casey Jones']
    },
    {
      id: 3,
      name: 'Team Delta',
      subtitle: 'Incident Retrospective',
      participants: { current: 10, total: 10 },
      status: 'critical',
      statusText: 'Critical Support',
      elapsed: '08m',
      type: 'critical',
      overlayTitle: 'Support Required',
      critical: true,
      users: ['Pat Smith', 'Chris Johnson', 'Alex Rivera']
    },
    {
      id: 4,
      name: 'Marketing - Gamma',
      subtitle: 'Brand Strategy',
      participants: { current: 4, total: 6 },
      status: 'waiting',
      statusText: 'Waiting for consensus',
      type: 'waiting',
      users: ['Jamie Williams', 'Robin Davis']
    },
    {
      id: 5,
      name: 'UX Research',
      subtitle: 'Usability Interviews',
      participants: { current: 2, total: 2 },
      status: 'in-session',
      statusText: 'In Session',
      type: 'in-session',
      users: ['Drew Brown', 'Sage Martinez']
    }
  ]);

  // Filter teams based on search query
  const filteredTeams = teams.filter(team => {
    const query = searchQuery.toLowerCase();
    return (
      team.name.toLowerCase().includes(query) ||
      team.subtitle.toLowerCase().includes(query) ||
      team.users.some(user => user.toLowerCase().includes(query))
    );
  });

  const handleNavClick = (navItem) => {
    setActiveNav(navItem);
    setSidebarOpen(false);
    console.log(`Navigated to: ${navItem}`);
  };

  const handlePeekIntoTable = (tableName) => {
    alert(`Peeking into ${tableName}...`);
    console.log(`Peek action for: ${tableName}`);
  };

  const handleJoinAsModerator = (tableName) => {
    if (confirm(`Join ${tableName} as moderator?`)) {
      alert(`Joining ${tableName} as moderator...`);
      console.log(`Moderator joined: ${tableName}`);
    }
  };

  const handleSettings = () => {
    alert('Opening system settings...');
    console.log('Settings opened');
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to exit?')) {
      alert('Logging out...');
      console.log('User logged out');
    }
  };

  const handleFilter = () => {
    alert('Opening filters...');
    console.log('Filters opened');
  };

  const handleViewAll = () => {
    alert('Viewing all discussion tables...');
    console.log('View all clicked');
  };

  const handleStartNewSession = () => {
    alert('Starting new session...');
    console.log('New session started');
  };

  const dismissNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <div className="supervisor-container">
      <div className="layout-grid">
        {/* Mobile Menu Toggle */}
        <button 
          className="mobile-menu-toggle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle menu"
        >
          <span className="material-symbols-outlined">
            {sidebarOpen ? 'close' : 'menu'}
          </span>
        </button>

        {/* SideNavBar */}
        <aside className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
          <div className="sidebar-content">
            <div className="sidebar-top">
              <div className="brand-section">
                <div className="brand-icon">
                  <img src="logo.png" alt="ForumX Logo" style={{width: '100%', height: '100%', objectFit: 'contain'}} />
                </div>
              </div>

              <nav className="nav-menu">
                <div 
                  className={`nav-item ${activeNav === 'observability' ? 'active' : ''}`}
                  onClick={() => handleNavClick('observability')}
                >
                  <span className="material-symbols-outlined">dashboard</span>
                  <p className="nav-label">Observability</p>
                </div>
                <div 
                  className={`nav-item ${activeNav === 'team' ? 'active' : ''}`}
                  onClick={() => handleNavClick('team')}
                >
                  <span className="material-symbols-outlined">groups</span>
                  <p className="nav-label">Team Directory</p>
                </div>
                <div 
                  className={`nav-item ${activeNav === 'analytics' ? 'active' : ''}`}
                  onClick={() => handleNavClick('analytics')}
                >
                  <span className="material-symbols-outlined">analytics</span>
                  <p className="nav-label">Historical Data</p>
                </div>
                <div 
                  className={`nav-item ${activeNav === 'alerts' ? 'active' : ''}`}
                  onClick={() => handleNavClick('alerts')}
                >
                  <span className="material-symbols-outlined">notifications</span>
                  <p className="nav-label">Alert Logs</p>
                  <span className="nav-badge">12</span>
                </div>
              </nav>

              <div className="notifications-section">
                <p className="section-title">Priority Notifications</p>
                <div className="notifications-list">
                  {notifications.map(notif => (
                    <div key={notif.id} className={`notification-card ${notif.type}`}>
                      <div className="notification-header">
                        <p className="notification-title">{notif.team}</p>
                        <button 
                          className="dismiss-btn"
                          onClick={() => dismissNotification(notif.id)}
                          aria-label="Dismiss notification"
                        >
                          <span className="material-symbols-outlined">close</span>
                        </button>
                      </div>
                      <p className="notification-text">{notif.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="sidebar-bottom">
              <div className="bottom-item" onClick={handleSettings}>
                <span className="material-symbols-outlined">settings</span>
                <p className="bottom-label">System Settings</p>
              </div>
              <div className="bottom-item danger" onClick={handleLogout}>
                <span className="material-symbols-outlined">logout</span>
                <p className="bottom-label">Exit Session</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Sidebar Overlay for Mobile */}
        {sidebarOpen && (
          <div 
            className="sidebar-overlay"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content Area */}
        <main className="main-content">
          {/* TopNavBar */}
          <header className="top-header">
            <div className="header-left-section">
              <h2 className="page-title">Supervisor Overview</h2>
              <div className="divider"></div>
              <div className="live-status">
                <span className="status-dot"></span>
                <span className="status-label">Live System Feed</span>
              </div>
            </div>

            <div className="header-right-section">
              <div className="search-container">
                <span className="material-symbols-outlined search-icon">search</span>
                <input
                  className="search-input"
                  placeholder="Search teams or users..."
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button className="filter-button" onClick={handleFilter}>
                <span className="material-symbols-outlined">tune</span>
              </button>
              <div className="profile-section">
                <div className="profile-info">
                  <p className="profile-name">Alex Rivera</p>
                  <p className="profile-role">Lead Supervisor</p>
                </div>
                <img
                  className="profile-avatar"
                  alt="User profile avatar of Alex Rivera"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXCFHigz_Bh4w-V1MD9a-GzuEIA7rvvkX3flGNiGuR1ER52MRTPTm8fKiO_E-y6ZuS_2lP23KrBOPUa_9-9ZTAybrdXax-W9T47O__NaSJXT_-XiJ0NZo6LrcGRy-PrDMVSZDuh-xevzRK11zGDUIsnax5JKEBGfKzVj99NDZOv0GXNzuYa4OevwxaDdSKD2g_tI0RHT6D2Yqj_dxt7qq5wyj6RA0k_X7qAXv5jKmNcLmQ1Dgu6Hk-k5H_NlNwIrAvEM5EvWrri-E"
                />
              </div>
            </div>
          </header>

          {/* Scrollable Content */}
          <div className="scrollable-content">
            {/* Stats Row */}
            <div className="stats-grid">
              <div className="stat-card">
                <p className="stat-label">Total Active Users</p>
                <div className="stat-value-row">
                  <span className="stat-number">1,248</span>
                  <span className="stat-change positive">+12%</span>
                </div>
              </div>
              <div className="stat-card">
                <p className="stat-label">Live Discussions</p>
                <div className="stat-value-row">
                  <span className="stat-number">24</span>
                  <span className="stat-change positive">+3%</span>
                </div>
              </div>
              <div className="stat-card">
                <p className="stat-label">Avg. Consensus Time</p>
                <div className="stat-value-row">
                  <span className="stat-number">18m</span>
                  <span className="stat-change negative">-5%</span>
                </div>
              </div>
              <div className="stat-card">
                <p className="stat-label">Priority Alerts</p>
                <div className="stat-value-row">
                  <span className="stat-number">2</span>
                  <span className="stat-change warning">Pending</span>
                </div>
              </div>
            </div>

            {/* Active Tables Section */}
            <div className="section-header">
              <h3 className="section-title-large">Active Discussion Tables</h3>
              <button className="view-all-button" onClick={handleViewAll}>
                <span>View All</span>
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>

            {/* Team Cards Grid */}
            <div className="team-grid">
              {filteredTeams.length === 0 ? (
                <div className="no-results">
                  <span className="material-symbols-outlined">search_off</span>
                  <p>No teams or users found matching "{searchQuery}"</p>
                </div>
              ) : (
                filteredTeams.map(team => (
                  <div key={team.id} className={`team-card ${team.critical ? 'critical' : ''}`}>
                    <div className="card-header">
                      <div>
                        {team.critical ? (
                          <div className="title-with-warning">
                            <h4 className="card-title danger">{team.name}</h4>
                            <span className="material-symbols-outlined warning-icon">warning</span>
                          </div>
                        ) : (
                          <h4 className="card-title">{team.name}</h4>
                        )}
                        <p className="card-subtitle">{team.subtitle}</p>
                      </div>
                      <div className={`participant-count ${team.critical ? 'danger' : ''}`}>
                        <span className="material-symbols-outlined">person</span>
                        <span className="count-text">{team.participants.current}/{team.participants.total}</span>
                      </div>
                    </div>

                    {/* Visual based on type */}
                    {team.type === 'ring' && (
                      <div className="table-visual">
                        <div className="table-ring">
                          <div className="table-core">
                            <span className="core-text">CORE</span>
                          </div>
                          <div className="active-segment"></div>
                          <div className="marker marker-active marker-bottom"></div>
                          <div className="marker marker-right"></div>
                          <div className="marker marker-top"></div>
                        </div>
                      </div>
                    )}

                    {team.type === 'progress' && (
                      <div className="table-visual">
                        <div className="table-ring">
                          <div className="table-core">
                            <span className="core-text">CORE</span>
                          </div>
                          <div className="progress-segment"></div>
                          <div className="marker marker-progress marker-bottom"></div>
                          <div className="marker marker-inactive marker-left"></div>
                        </div>
                      </div>
                    )}

                    {team.type === 'critical' && (
                      <div className="table-visual">
                        <div className="table-ring critical-ring">
                          <div className="table-core critical-core">
                            <span className="core-text danger">HELP</span>
                          </div>
                          <div className="critical-border"></div>
                          <div className="marker marker-critical marker-top"></div>
                          <div className="marker marker-critical marker-bottom"></div>
                          <div className="marker marker-critical marker-left"></div>
                          <div className="marker marker-critical marker-right"></div>
                        </div>
                      </div>
                    )}

                    {team.type === 'waiting' && (
                      <div className="simple-visual">
                        <div className="waiting-indicator">
                          <span className="material-symbols-outlined">hourglass_empty</span>
                        </div>
                      </div>
                    )}

                    {team.type === 'in-session' && (
                      <div className="simple-visual">
                        <div className="in-session-indicator">
                          <div className="session-inner">
                            <span className="material-symbols-outlined">record_voice_over</span>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="card-footer">
                      <span className={`status-text ${team.status}`}>
                        <span className={`status-indicator ${team.critical ? 'ping' : ''}`}></span> {team.statusText}
                      </span>
                      {team.elapsed && <span className="elapsed-time">Elapsed: {team.elapsed}</span>}
                    </div>

                    <div className={`card-overlay ${team.critical ? 'critical-overlay' : ''}`}>
                      <p className="overlay-title">{team.overlayTitle}</p>
                      <button 
                        className={`overlay-button ${team.critical ? 'danger' : ''}`}
                        onClick={() => team.critical ? handleJoinAsModerator(team.name) : handlePeekIntoTable(team.name)}
                      >
                        <span className="material-symbols-outlined">
                          {team.critical ? 'support_agent' : 'visibility'}
                        </span>
                        {team.critical ? 'Join as Moderator' : 'Peek Into Table'}
                      </button>
                    </div>
                  </div>
                ))
              )}

              {/* Add Table Placeholder - only show when not searching */}
              {searchQuery === '' && (
                <div className="add-table-card" onClick={handleStartNewSession}>
                  <div className="add-icon">
                    <span className="material-symbols-outlined">add</span>
                  </div>
                  <div className="add-text">
                    <p className="add-title">Start New Session</p>
                    <p className="add-subtitle">Manual Override</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Supervisor;
