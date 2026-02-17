function UserCard({ name, role, email, status, avatar, onViewDetails }) {
  const cardStyle = {
    border: '2px solid #e0e0e0',
    borderRadius: '12px',
    padding: '25px',
    margin: '15px',
    maxWidth: '350px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    backgroundColor: 'white'
  };

  const avatarStyle = {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    backgroundColor: '#3498db',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2rem',
    fontWeight: 'bold',
    margin: '0 auto 15px'
  };

  const statusStyle = {
    display: 'inline-block',
    padding: '5px 15px',
    borderRadius: '20px',
    fontSize: '0.9rem',
    fontWeight: 'bold',
    backgroundColor: status === 'Active' ? '#d4edda' : '#f8d7da',
    color: status === 'Active' ? '#155724' : '#721c24'
  };

  const buttonStyle = {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
    width: '100%',
    transition: 'background-color 0.3s'
  };

  // First letter for avatar
  const initial = name ? name.charAt(0).toUpperCase() : '?';

  return (
    <div style={cardStyle}>
      <div style={avatarStyle}>
        {avatar ? <img src={avatar} alt={name} /> : initial}
      </div>
      
      <h3 style={{ textAlign: 'center', marginBottom: '10px', color: '#2c3e50' }}>
        {name}
      </h3>
      
      <p style={{ textAlign: 'center', color: '#7f8c8d', marginBottom: '15px' }}>
        <strong>Role:</strong> {role}
      </p>
      
      <p style={{ textAlign: 'center', color: '#7f8c8d', marginBottom: '15px' }}>
        <strong>Email:</strong> {email}
      </p>
      
      <div style={{ textAlign: 'center' }}>
        <span style={statusStyle}>{status}</span>
      </div>

      <button 
        style={buttonStyle}
        onClick={onViewDetails}
        onMouseOver={(e) => e.target.style.backgroundColor = '#2980b9'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#3498db'}
      >
        View Details
      </button>
    </div>
  )
}

export default UserCard;