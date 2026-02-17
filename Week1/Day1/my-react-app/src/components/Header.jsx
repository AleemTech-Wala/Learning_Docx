function Header({ currentPage, setCurrentPage, userEmail, onLogout }) {
  const headerStyle = {
    backgroundColor: '#2c3e50',
    color: 'white',
    padding: '20px 30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
  };

  const logoStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    cursor: 'pointer'
  };

  const navStyle = {
    display: 'flex',
    gap: '30px',
    listStyle: 'none',
    margin: 0,
    padding: 0
  };

  const linkStyle = (page) => ({
    color: 'white',
    textDecoration: 'none',
    cursor: 'pointer',
    padding: '8px 16px',
    borderRadius: '5px',
    backgroundColor: currentPage === page ? '#34495e' : 'transparent',
    fontWeight: currentPage === page ? 'bold' : 'normal',
    transition: 'all 0.3s'
  });

  const userSectionStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '15px'
  };

  const logoutButtonStyle = {
    padding: '8px 16px',
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold'
  };

  return (
    <header style={headerStyle}>
      <div style={logoStyle} onClick={() => setCurrentPage('dashboard')}>
        🏢 Admin Panel
      </div>
      <nav>
        <ul style={navStyle}>
          <li>
            <a 
              style={linkStyle('dashboard')}
              onClick={() => setCurrentPage('dashboard')}
            >
              Dashboard
            </a>
          </li>
          <li>
            <a 
              style={linkStyle('users')}
              onClick={() => setCurrentPage('users')}
            >
              Users
            </a>
          </li>
          <li>
            <a style={linkStyle('products')}>Products</a>
          </li>
          <li>
            <a style={linkStyle('settings')}>Settings</a>
          </li>
        </ul>
      </nav>
      <div style={userSectionStyle}>
        <span>👤 {userEmail}</span>
        <button style={logoutButtonStyle} onClick={onLogout}>
          Logout
        </button>
      </div>
    </header>
  )
}

export default Header;