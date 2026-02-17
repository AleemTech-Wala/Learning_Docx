import { useState } from 'react';
import { usersData as initialUsers } from '../data/usersData';
import UserTable from '../components/UserTable';
import StatsCard from '../components/StatsCard';
import AddUserModal from '../components/AddUserModal';
import EditUserModal from '../components/EditUserModal';
import DepartmentFilter from '../components/DepartmentFilter';
import SearchBar from '../components/SearchBar';

function UserPage() {
  // State management
  const [users, setUsers] = useState(initialUsers);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Add user function
  const handleAddUser = (newUserData) => {
    const newUser = {
      id: users.length + 1,
      ...newUserData,
      joinDate: new Date().toISOString().split('T')[0]
    };
    setUsers([...users, newUser]);
    alert("User added successfully!");
  };

  // Edit user function
  const handleEditUser = (userId, updatedData) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, ...updatedData } : user
    ));
    alert("User updated successfully!");
  };

  // Delete user function
  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter(user => user.id !== userId));
      alert("User deleted successfully!");
    }
  };

  // Open edit modal
  const openEditModal = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  // Get unique departments from users
  const departments = [...new Set(users.map(u => u.department))];
  
  // Filter users by department and search term
  const filteredUsers = users
    .filter(u => selectedDepartment === 'All' || u.department === selectedDepartment)
    .filter(u => 
      searchTerm === '' || 
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Calculate stats based on filtered users
  const totalUsers = filteredUsers.length;
  const activeUsers = filteredUsers.filter(u => u.status === 'Active').length;
  const inactiveUsers = filteredUsers.filter(u => u.status === 'Inactive').length;
  const admins = filteredUsers.filter(u => u.role === 'Administrator').length;

  const pageStyle = {
    padding: '30px',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh'
  };

  const headerStyle = {
    marginBottom: '30px'
  };

  const statsContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '20px',
    marginBottom: '30px'
  };

  const tableContainerStyle = {
    backgroundColor: 'white',
    padding: '25px',
    borderRadius: '10px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
  };

  return (
    <div style={pageStyle}>
      <div style={headerStyle}>
        <h1 style={{ color: '#2c3e50', marginBottom: '10px' }}>
          User Management
        </h1>
        <p style={{ color: '#7f8c8d', fontSize: '1.1rem' }}>
          Manage all users and their permissions
        </p>
      </div>

      {/* Stats Cards */}
      <div style={statsContainerStyle}>
        <StatsCard 
          title="Total Users"
          value={totalUsers}
          icon="👥"
          color="#3498db"
        />
        <StatsCard 
          title="Active Users"
          value={activeUsers}
          icon="✅"
          color="#2ecc71"
        />
        <StatsCard 
          title="Inactive Users"
          value={inactiveUsers}
          icon="⏸️"
          color="#e74c3c"
        />
        <StatsCard 
          title="Administrators"
          value={admins}
          icon="👑"
          color="#f39c12"
        />
      </div>

      {/* Users Table */}
      <div style={tableContainerStyle}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <h2 style={{ color: '#2c3e50' }}>All Users ({totalUsers})</h2>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            style={{
              padding: '12px 24px',
              backgroundColor: '#2ecc71',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '1rem'
            }}
          >
            + Add New User
          </button>
        </div>
        
        {/* Search Bar */}
        <SearchBar onSearch={setSearchTerm} />
        
        {/* Department Filter */}
        <DepartmentFilter 
          departments={departments}
          selectedDepartment={selectedDepartment}
          onSelect={setSelectedDepartment}
        />
        
        <UserTable 
          users={filteredUsers} 
          onEdit={openEditModal}
          onDelete={handleDeleteUser}
        />
      </div>

      {/* Modals */}
      <AddUserModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddUser={handleAddUser}
      />

      <EditUserModal 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onEditUser={handleEditUser}
        user={selectedUser}
      />
    </div>
  )
}

export default UserPage;