function ToggleBox() {
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);  // Opposite value
  };

  return (
    <div style={{ padding: '30px' }}>
      <button 
        onClick={toggleVisibility}
        style={{
          padding: '12px 24px',
          backgroundColor: '#3498db',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '1rem',
          marginBottom: '20px'
        }}
      >
        {isVisible ? 'Hide' : 'Show'} Content
      </button>

      {isVisible && (
        <div style={{
          padding: '20px',
          backgroundColor: '#d5f4e6',
          border: '2px solid #27ae60',
          borderRadius: '8px'
        }}>
          <h3>🎉 This content is visible!</h3>
          <p>You can toggle this content using the button above.</p>
        </div>
      )}
    </div>
  )
}

export default ToggleBox;