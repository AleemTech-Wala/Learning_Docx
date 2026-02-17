function ProductCard({ name, price, stock, image, category, onEdit, onDelete }) {
  const cardStyle = {
    border: '1px solid #ddd',
    borderRadius: '10px',
    padding: '20px',
    width: '250px',
    backgroundColor: 'white',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
  };

  const imageStyle = {
    width: '100%',
    height: '180px',
    backgroundColor: '#f0f0f0',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '3rem',
    marginBottom: '15px'
  };

  const priceStyle = {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: '#2ecc71',
    margin: '10px 0'
  };

  const stockStyle = {
    color: stock > 0 ? '#27ae60' : '#e74c3c',
    fontWeight: 'bold',
    fontSize: '0.9rem'
  };

  const buttonStyle = {
    padding: '8px 16px',
    margin: '5px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: 'bold'
  };

  return (
    <div style={cardStyle}>
      <div style={imageStyle}>
        {image || '📦'}
      </div>
      
      <span style={{ 
        backgroundColor: '#3498db', 
        color: 'white', 
        padding: '4px 10px', 
        borderRadius: '5px',
        fontSize: '0.8rem'
      }}>
        {category}
      </span>
      
      <h3 style={{ margin: '15px 0 5px', color: '#2c3e50' }}>{name}</h3>
      
      <div style={priceStyle}>Rs. {price.toLocaleString()}</div>
      
      <p style={stockStyle}>
        {stock > 0 ? `${stock} in stock` : 'Out of stock'}
      </p>
      
      <div style={{ marginTop: '15px' }}>
        <button 
          style={{ ...buttonStyle, backgroundColor: '#3498db', color: 'white' }}
          onClick={onEdit}
        >
          Edit
        </button>
        <button 
          style={{ ...buttonStyle, backgroundColor: '#e74c3c', color: 'white' }}
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default ProductCard;