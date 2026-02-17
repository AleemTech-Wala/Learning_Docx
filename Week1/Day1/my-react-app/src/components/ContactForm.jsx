import { useState } from 'react';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear error jab user type kare
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!/^\d{11}$/.test(formData.phone)) {
      newErrors.phone = "Phone must be 11 digits";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Form is valid
    console.log("Form submitted:", formData);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
      setIsSubmitted(false);
    }, 3000);
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    marginBottom: '5px',
    borderRadius: '5px',
    border: '2px solid #ddd',
    fontSize: '1rem',
    boxSizing: 'border-box'
  };

  const errorInputStyle = {
    ...inputStyle,
    borderColor: '#e74c3c'
  };

  const errorMessageStyle = {
    color: '#e74c3c',
    fontSize: '0.85rem',
    marginBottom: '10px',
    marginTop: '0'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
    color: '#2c3e50'
  };

  return (
    <div style={{ 
      maxWidth: '600px', 
      margin: '30px auto', 
      padding: '30px',
      backgroundColor: 'white',
      borderRadius: '10px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '30px' }}>
        Contact Us
      </h2>

      {isSubmitted && (
        <div style={{
          padding: '15px',
          backgroundColor: '#d4edda',
          color: '#155724',
          borderRadius: '5px',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          ✅ Message sent successfully!
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Name Field */}
        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>Name *</label>
          <input 
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            style={errors.name ? errorInputStyle : inputStyle}
          />
          {errors.name && <p style={errorMessageStyle}>{errors.name}</p>}
        </div>

        {/* Email Field */}
        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>Email *</label>
          <input 
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your.email@example.com"
            style={errors.email ? errorInputStyle : inputStyle}
          />
          {errors.email && <p style={errorMessageStyle}>{errors.email}</p>}
        </div>

        {/* Phone Field */}
        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>Phone *</label>
          <input 
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="03001234567"
            style={errors.phone ? errorInputStyle : inputStyle}
          />
          {errors.phone && <p style={errorMessageStyle}>{errors.phone}</p>}
        </div>

        {/* Subject Field */}
        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>Subject *</label>
          <input 
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="What is this about?"
            style={errors.subject ? errorInputStyle : inputStyle}
          />
          {errors.subject && <p style={errorMessageStyle}>{errors.subject}</p>}
        </div>

        {/* Message Field */}
        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>Message *</label>
          <textarea 
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your message here..."
            rows="5"
            style={errors.message ? errorInputStyle : inputStyle}
          />
          {errors.message && <p style={errorMessageStyle}>{errors.message}</p>}
        </div>

        {/* Submit Button */}
        <button 
          type="submit"
          style={{
            width: '100%',
            padding: '15px',
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'background-color 0.3s'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#2980b9'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#3498db'}
        >
          Send Message
        </button>
      </form>
    </div>
  )
}

export default ContactForm;