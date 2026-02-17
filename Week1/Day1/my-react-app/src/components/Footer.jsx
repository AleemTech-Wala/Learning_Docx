function Footer() {
  const footerStyle = {
    backgroundColor: '#34495e',
    color: 'white',
    textAlign: 'center',
    padding: '20px',
    marginTop: '50px'
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer style={footerStyle}>
      <p>© {currentYear} Admin Panel. All rights reserved.</p>
      <p>Built with React ⚛️</p>
    </footer>
  )
}

export default Footer;