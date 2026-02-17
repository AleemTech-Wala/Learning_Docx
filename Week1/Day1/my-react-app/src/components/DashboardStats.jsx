function DashboardStats() {
  const stats = [
    { title: 'Total Users', value: 150, color: '#3498db', icon: '👥' },
    { title: 'Active Orders', value: 45, color: '#2ecc71', icon: '📦' },
    { title: 'Revenue', value: '50,000', color: '#e74c3c', icon: '💰' },
    { title: 'Products', value: 200, color: '#f39c12', icon: '📱' }
  ];

  const containerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    padding: '20px'
  };

  const cardStyle = (color) => ({
    backgroundColor: color,
    color: 'white',
    padding: '30px',
    borderRadius: '10px',
    textAlign: 'center',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  });

  return (
    <div>
      <h2 style={{ paddingLeft: '20px' }}>Dashboard Overview</h2>
      <div style={containerStyle}>
        {stats.map((stat, index) => (
          <div key={index} style={cardStyle(stat.color)}>
            <div style={{ fontSize: '3rem' }}>{stat.icon}</div>
            <h3>{stat.title}</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DashboardStats;