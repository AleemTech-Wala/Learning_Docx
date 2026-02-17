import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);

  return (
    <div style={{ 
      padding: '30px', 
      textAlign: 'center',
      border: '2px solid #3498db',
      borderRadius: '10px',
      margin: '20px'
    }}>
      <h2>Counter App</h2>
      <h1 style={{ fontSize: '4rem', color: '#3498db' }}>
        {count}
      </h1>
      
      <button 
        onClick={increment}
        style={{
          padding: '10px 20px',
          margin: '5px',
          backgroundColor: '#27ae60',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '1rem'
        }}
      >
        + Increment
      </button>
      
      <button 
        onClick={decrement}
        style={{
          padding: '10px 20px',
          margin: '5px',
          backgroundColor: '#e74c3c',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '1rem'
        }}
      >
        - Decrement
      </button>
      
      <button 
        onClick={reset}
        style={{
          padding: '10px 20px',
          margin: '5px',
          backgroundColor: '#95a5a6',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '1rem'
        }}
      >
        Reset
      </button>
    </div>
  )
}

export default Counter;