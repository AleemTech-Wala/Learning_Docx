import { useState } from 'react';

function LoginForm({ onLogin }) {
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value
    });

    // Clear error
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!credentials.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!credentials.password) {
      newErrors.password = "Password is required";
    } else if (credentials.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Dummy validation
      if (credentials.email === "admin@admin.com" && credentials.password === "admin123") {
        onLogin(credentials.email);
      } else {
        setErrors({ general: "Invalid email or password" });
        setIsLoading(false);
      }
    }, 1000);
  };

  const containerStyle = {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5'
  };

  const cardStyle = {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    width: '400px',
    maxWidth: '90%'
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    marginBottom: '5px',
    borderRadius: '6px',
    border: '2px solid #ddd',
    fontSize: '1rem',
    boxSizing: 'border-box'
  };

  const errorInputStyle = {
    ...inputStyle,
    borderColor: '#e74c3c'
  };

  const buttonStyle = {
    width: '100%',
    padding: '14px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    cursor: isLoading ? 'not-allowed' : 'pointer',
    opacity: isLoading ? 0.7 : 1
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ color: '#2c3e50', marginBottom: '10px' }}>
            🏢 Admin Panel
          </h1>
          <p style={{ color: '#7f8c8d', fontSize: '1rem' }}>
            Sign in to your account
          </p>
        </div>

        {errors.general && (
          <div style={{
            padding: '12px',
            backgroundColor: '#f8d7da',
            color: '#721c24',
            borderRadius: '6px',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            ❌ {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#2c3e50' }}>
              Email Address
            </label>
            <input 
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              placeholder="admin@admin.com"
              style={errors.email ? errorInputStyle : inputStyle}
            />
            {errors.email && (
              <p style={{ color: '#e74c3c', fontSize: '0.85rem', marginTop: '5px' }}>
                {errors.email}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#2c3e50' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input 
                type={showPassword ? "text" : "password"}
                name="password"
                value={credentials.password}
                onChange={handleChange}
                placeholder="Enter your password"
                style={errors.password ? errorInputStyle : inputStyle}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1.2rem'
                }}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            {errors.password && (
              <p style={{ color: '#e74c3c', fontSize: '0.85rem', marginTop: '5px' }}>
                {errors.password}
              </p>
            )}
          </div>

          {/* Remember Me */}
          <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <input type="checkbox" style={{ marginRight: '8px' }} />
              <span style={{ fontSize: '0.9rem', color: '#7f8c8d' }}>Remember me</span>
            </label>
            <a href="#" style={{ color: '#3498db', fontSize: '0.9rem', textDecoration: 'none' }}>
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <button type="submit" style={buttonStyle} disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Demo Credentials */}
        <div style={{
          marginTop: '20px',
          padding: '15px',
          backgroundColor: '#fff3cd',
          borderRadius: '6px',
          fontSize: '0.85rem'
        }}>
          <p style={{ margin: '0 0 5px 0', fontWeight: 'bold' }}>Demo Credentials:</p>
          <p style={{ margin: '0' }}>Email: admin@admin.com</p>
          <p style={{ margin: '0' }}>Password: admin123</p>
        </div>
      </div>
    </div>
  )
}

export default LoginForm;