import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import ProductsPage from './pages/ProductsPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const handleLogin = (email) => {
    setIsLoggedIn(true);
    setUserEmail(email);
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      setIsLoggedIn(false);
      setUserEmail("");
      setCurrentPage('dashboard');
    }
  };

  // If not logged in, show login page
  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const renderPage = () => {
    switch(currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'users':
        return <UserPage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="App">
      <Header 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        userEmail={userEmail}
        onLogout={handleLogout}
      />
      
      <main style={{ minHeight: '80vh', backgroundColor: '#ecf0f1' }}>
        {renderPage()}
      </main>
      
      <Footer />
    </div>
  )
}

export default App;