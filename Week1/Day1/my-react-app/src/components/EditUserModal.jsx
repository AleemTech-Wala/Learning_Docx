import { useState, useEffect } from 'react';

function EditUserModal({ isOpen, onClose, onEditUser, user }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Employee",
    department: "IT",
    status: "Active"
  });

  // Jab user prop change ho, form update karo
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
        status: user.status
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEditUser(user.id, formData);
    onClose();
  };

  if (!isOpen || !user) return null;

  const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  };

  const modalStyle = {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '10px',
    width: '500px',
    maxWidth: '90%'
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '1rem'
  };

  const buttonStyle = {
    padding: '12px 24px',
    margin: '5px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold'
  };

  return (
    <div style={modalOverlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <h2 style={{ marginBottom: '20px', color: '#2c3e50' }}>
          Edit User
        </h2>

        <form onSubmit={handleSubmit}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Name
            </label>
            <input 
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Email
            </label>
            <input 
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Role
            </label>
            <select 
              name="role"
              value={formData.role}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="Administrator">Administrator</option>
              <option value="Manager">Manager</option>
              <option value="Employee">Employee</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Department
            </label>
            <select 
              name="department"
              value={formData.department}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="IT">IT</option>
              <option value="Sales">Sales</option>
              <option value="Marketing">Marketing</option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Status
            </label>
            <select 
              name="status"
              value={formData.status}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div style={{ marginTop: '25px', textAlign: 'right' }}>
            <button 
              type="button"
              onClick={onClose}
              style={{
                ...buttonStyle,
                backgroundColor: '#95a5a6',
                color: 'white'
              }}
            >
              Cancel
            </button>
            <button 
              type="submit"
              style={{
                ...buttonStyle,
                backgroundColor: '#3498db',
                color: 'white'
              }}
            >
              Update User
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditUserModal;