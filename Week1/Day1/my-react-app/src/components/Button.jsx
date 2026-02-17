function Button({ text, color, onClick }) {
  const buttonStyle = {
    padding: '12px 24px',
    backgroundColor: color || '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1rem',
    cursor: 'pointer',
    fontWeight: 'bold'
  };

  return (
    <button style={buttonStyle} onClick={onClick}>
      {text}
    </button>
  )
}

export default Button;