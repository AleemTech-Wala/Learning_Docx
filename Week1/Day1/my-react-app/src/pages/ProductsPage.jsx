import ProductCard from '../components/ProductCard';

function ProductsPage() {
  const products = [
    {
      id: 1,
      name: 'iPhone 15 Pro',
      price: 450000,
      stock: 25,
      image: '📱',
      category: 'Electronics'
    },
    {
      id: 2,
      name: 'Samsung Galaxy Tab',
      price: 85000,
      stock: 15,
      image: '📱',
      category: 'Electronics'
    },
    {
      id: 3,
      name: 'Sony Headphones',
      price: 25000,
      stock: 50,
      image: '🎧',
      category: 'Audio'
    },
    {
      id: 4,
      name: 'Dell Laptop',
      price: 120000,
      stock: 0,
      image: '💻',
      category: 'Computers'
    },
    {
      id: 5,
      name: 'Apple Watch Ultra',
      price: 95000,
      stock: 30,
      image: '⌚',
      category: 'Wearables'
    }
  ];

  const handleEdit = (productName) => {
    alert(`Edit: ${productName}`);
  };

  const handleDelete = (productName) => {
    alert(`Delete: ${productName}`);
  };

  const pageStyle = {
    padding: '30px',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh'
  };

  const headerStyle = {
    marginBottom: '30px'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '25px',
    marginTop: '20px'
  };

  return (
    <div style={pageStyle}>
      <div style={headerStyle}>
        <h1 style={{ color: '#2c3e50', marginBottom: '10px' }}>
          📦 Products
        </h1>
        <p style={{ color: '#7f8c8d', fontSize: '1.1rem' }}>
          Browse and manage all products
        </p>
      </div>

      <div style={gridStyle}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            price={product.price}
            stock={product.stock}
            image={product.image}
            category={product.category}
            onEdit={() => handleEdit(product.name)}
            onDelete={() => handleDelete(product.name)}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;
