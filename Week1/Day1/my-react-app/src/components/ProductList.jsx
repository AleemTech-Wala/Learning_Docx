function ProductList() {
    const products = [
        { id: 1, name: 'Laptop', price: 50000, stock: 5 },
        { id: 2, name: 'Mouse', price: 1000, stock: 20 },
        { id: 3, name: 'Keyboard', price: 2500, stock: 0 },
        { id: 4, name: 'Monitor', price: 15000, stock: 8 }
  ];

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    margin: '20px 0'
  };

  const thStyle = {
    backgroundColor: '#3498db',
    color: 'white',
    padding: '12px',
    textAlign: 'left',
    border: '1px solid #ddd'
  };

  const tdStyle = {
    padding: '10px',
    border: '1px solid #ddd'
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Product Inventory</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Price</th>
            <th style={thStyle}>Stock</th>
            <th style={thStyle}>Status</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td style={tdStyle}>{product.id}</td>
              <td style={tdStyle}>{product.name}</td>
              <td style={tdStyle}>Rs. {product.price}</td>
              <td style={tdStyle}>{product.stock}</td>
              <td style={tdStyle}>
                {product.stock > 0 ? (
                  <span style={{ color: 'green' }}>In Stock</span>
                ) : (
                  <span style={{ color: 'red' }}>Out of Stock</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ProductList;
