import { useState } from 'react';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleClear = () => {
    setSearchTerm("");
    onSearch("");
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <input 
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search users by name or email..."
        style={{
          padding: '12px',
          fontSize: '1rem',
          width: '400px',
          borderRadius: '5px',
          border: '2px solid #3498db'
        }}
      />
      {searchTerm && (
        <button 
          onClick={handleClear}
          style={{
            padding: '12px 20px',
            marginLeft: '10px',
            backgroundColor: '#e74c3c',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Clear
        </button>
      )}
    </div>
  )
}

export default SearchBar;