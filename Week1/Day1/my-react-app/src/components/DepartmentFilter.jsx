function DepartmentFilter({ departments, selectedDepartment, onSelect }) {
  const containerStyle = {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
    flexWrap: 'wrap'
  };

  const buttonStyle = (isSelected) => ({
    padding: '10px 20px',
    border: '2px solid #3498db',
    borderRadius: '25px',
    backgroundColor: isSelected ? '#3498db' : 'white',
    color: isSelected ? 'white' : '#3498db',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '0.95rem',
    transition: 'all 0.3s'
  });

  return (
    <div style={containerStyle}>
      <button 
        style={buttonStyle(selectedDepartment === 'All')}
        onClick={() => onSelect('All')}
      >
        All Departments
      </button>
      {departments.map((dept) => (
        <button 
          key={dept}
          style={buttonStyle(selectedDepartment === dept)}
          onClick={() => onSelect(dept)}
        >
          {dept}
        </button>
      ))}
    </div>
  )
}

export default DepartmentFilter;