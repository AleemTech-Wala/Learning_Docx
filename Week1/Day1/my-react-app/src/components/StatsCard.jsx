function StatsCard({ title, value, icon, color, subtitle, trend }) {
  const cardStyle = {
    backgroundColor: color || '#3498db',
    color: 'white',
    padding: '30px',
    borderRadius: '12px',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    minWidth: '200px'
  };

  const iconStyle = {
    fontSize: '3rem',
    marginBottom: '10px'
  };

  const valueStyle = {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    margin: '15px 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px'
  };

  const trendStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold'
  };

  return (
    <div style={cardStyle}>
      <div style={iconStyle}>{icon}</div>
      <h3 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>{title}</h3>
      <div style={valueStyle}>
        {value}
        {trend && (
          <span style={trendStyle}>{trend}</span>
        )}
      </div>
      {subtitle && (
        <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>{subtitle}</p>
      )}
    </div>
  )
}

export default StatsCard;