import { useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const addTodo = () => {
    if (inputValue.trim() !== "") {
      setTodos([...todos, inputValue]);  // Add new item
      setInputValue("");  // Clear input
    }
  };

  const deleteTodo = (indexToDelete) => {
    setTodos(todos.filter((_, index) => index !== indexToDelete));
  };

  return (
    <div style={{ padding: '30px', maxWidth: '500px' }}>
      <h2>📝 Todo List</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <input 
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new task..."
          style={{
            padding: '10px',
            fontSize: '1rem',
            width: '300px',
            borderRadius: '5px',
            border: '2px solid #3498db'
          }}
        />
        <button 
          onClick={addTodo}
          style={{
            padding: '10px 20px',
            marginLeft: '10px',
            backgroundColor: '#27ae60',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Add
        </button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map((todo, index) => (
          <li 
            key={index}
            style={{
              padding: '15px',
              marginBottom: '10px',
              backgroundColor: '#f8f9fa',
              border: '1px solid #ddd',
              borderRadius: '5px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <span>{todo}</span>
            <button 
              onClick={() => deleteTodo(index)}
              style={{
                padding: '5px 15px',
                backgroundColor: '#e74c3c',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <p style={{ color: '#7f8c8d' }}>
        Total tasks: {todos.length}
      </p>
    </div>
  )
}

export default TodoList;