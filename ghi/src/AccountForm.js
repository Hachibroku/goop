import React, { useState, useEffect } from 'react';
// commenting out the styling changes nothing
// I do not know where this page is getting it's styling from
// It should really be renamed LoginForm but I'll change that another time
// import './LoginForm.css';
import { useNavigate } from "react-router-dom"

const AccountForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
  });

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/accounts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log('Account created successfully');
        setSuccess(true);
        setError(false);
        setFormData({
          email: '',
          username: '',
          password: '',
        });
      } else {
        console.log('Account was not created');
        setSuccess(false);
        setError(true);

        if (responseData && responseData.error) {
          console.log('Error:', responseData.error);
        }

      }
    } catch (error) {
      console.log('An error occurred:', error);
    }
  };

  useEffect(() => {
    if (success || error) {
      navigate("/login");
    }
  }, [success, error, navigate]);

  return (
    <div>
      <h1 className='formHeader'> Create an Account </h1>
      <form onSubmit={handleSubmit}>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </label>
        <br />

        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </label>
        <br />

        <label>
          Password:
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </label>
        <button type="button"
          onClick={togglePasswordVisibility}>
          {showPassword ? 'Hide' : 'Show'} Password
        </button>
        <br />


        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AccountForm;
