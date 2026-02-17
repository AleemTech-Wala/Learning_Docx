import { useState } from 'react';

function NameInput() {
  const [name, setName] = useState("");

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleClear = () => {
    setName("");
  };

  return (
    <div style={{ padding: '30px' }}>
      <h2>Enter Your Name</h2>
      
      <input 
        type="text"
        value={name}
        onChange={handleChange}
        placeholder="Type your name..."
        style={{
          padding: '10px',
          fontSize: '1rem',
          width: '300px',
          borderRadius: '5px',
          border: '2px solid #3498db'
        }}
      />
      
      <button 
        onClick={handleClear}
        style={{
          padding: '10px 20px',
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

      <div style={{ marginTop: '20px', fontSize: '1.2rem' }}>
        <strong>Your name is:</strong> {name || "(empty)"}
      </div>
    </div>
  )
}

export default NameInput;