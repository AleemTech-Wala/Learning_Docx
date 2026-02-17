function UserTable({ users, onEdit, onDelete }) {
  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: 'white',
    color: '#2c3e50'
  };

  const thStyle = {
    backgroundColor: '#2c3e50',
    color: 'white',
    padding: '15px',
    textAlign: 'left',
    fontWeight: 'bold'
  };

  const tdStyle = {
    padding: '12px 15px',
    borderBottom: '1px solid #e0e0e0'
  };

  const statusBadgeStyle = (status) => ({
    padding: '5px 12px',
    borderRadius: '15px',
    fontSize: '0.85rem',
    fontWeight: 'bold',
    backgroundColor: status === 'Active' ? '#d4edda' : '#f8d7da',
    color: status === 'Active' ? '#155724' : '#721c24',
    display: 'inline-block'
  });

  const buttonStyle = {
    padding: '6px 12px',
    margin: '0 3px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.85rem',
    fontWeight: 'bold'
  };

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Role</th>
            <th style={thStyle}>Department</th>
            <th style={thStyle}>Status</th>
            <th style={thStyle}>Join Date</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="8" style={{ ...tdStyle, textAlign: 'center', padding: '40px' }}>
                <div style={{ color: '#7f8c8d' }}>
                  <h3>No users found</h3>
                  <p>Click "Add New User" to create your first user.</p>
                </div>
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id}>
                <td style={tdStyle}>{user.id}</td>
                <td style={tdStyle}><strong>{user.name}</strong></td>
                <td style={tdStyle}>{user.email}</td>
                <td style={tdStyle}>{user.role}</td>
                <td style={tdStyle}>{user.department}</td>
                <td style={tdStyle}>
                  <span style={statusBadgeStyle(user.status)}>
                    {user.status}
                  </span>
                </td>
                <td style={tdStyle}>{user.joinDate}</td>
                <td style={tdStyle}>
                  <button 
                    style={{ ...buttonStyle, backgroundColor: '#3498db', color: 'white' }}
                    onClick={() => onEdit(user)}
                  >
                    Edit
                  </button>
                  <button 
                    style={{ ...buttonStyle, backgroundColor: '#e74c3c', color: 'white' }}
                    onClick={() => onDelete(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default UserTable;