import UserCard from './UserCard';

function UserGrid({ users }) {
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '20px',
    padding: '20px'
  };

  return (
    <div style={gridStyle}>
      {users.map((user) => (
        <UserCard 
          key={user.id}
          name={user.name}
          role={user.role}
          email={user.email}
          status={user.status}
        />
      ))}
    </div>
  )
}

export default UserGrid;