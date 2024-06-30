import React, { useState } from 'react';
import '../assets/css/Login.css';
import axios from 'axios';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form_data = { password: formData.password, username: formData.email };
    console.log(form_data)
    try {
      const url = "http://127.0.0.1:8000/auth/login";
      const headers = {
        "Content-Type": "application/json",
      };
      const res = await axios.post(url, form_data, headers);
      const data = res.data;
      console.log("data", data);
      if (data?.success === true) {
        localStorage.setItem("isAdminToken", data.data.token);
        localStorage.setItem("isAdminTokenData", JSON.stringify(data.data.user));
        window.location.href = "/";
        alert("Login successful");
      }else{
        alert("Login failed");
      }
      console.log("data", data);
    } catch (error) {
      console.log("The Error", error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="login-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
