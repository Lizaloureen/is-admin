import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const AddVendor = () => {
  const [vendorName, setVendorName] = useState("");
  const [vendorEmail, setVendorEmail] = useState("");
  const [vendorPhone, setVendorPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you would typically send the vendor data to the server
    let formData = {
      name: vendorName,
      phone_number: vendorPhone,
      email: vendorEmail,
      address: address,
    };
    formData["password"] = "vendor@123";
    formData["user_type"] = "Vendor";

    console.log("Vendor data:", formData);

    try {
      const url = `http://localhost:8000/auth/register`;
      const res = await axios.post(url, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = res.data;
      console.log("data", data);

      // Clear form fields
      setVendorName("");
      setVendorEmail("");
      setVendorPhone("");

      alert("Vendor added successfully");
    } catch (error) {
      console.error("Error adding vendor:", error);
    }
  };

  return (
    <div className="applications-container text-dark">
      <h2>Add Vendor</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="vendorName">
            Name *
          </label>
          <input
            className="form-control"
            type="text"
            id="vendorName"
            value={vendorName}
            onChange={(e) => setVendorName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="vendorEmail">
            Email *
          </label>
          <input
            className="form-control"
            type="email"
            id="vendorEmail"
            value={vendorEmail}
            onChange={(e) => setVendorEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="vendorPhone">
            Phone Number *
          </label>
          <input
            className="form-control"
            type="text"
            id="vendorPhone"
            value={vendorPhone}
            onChange={(e) => setVendorPhone(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="address">
            Address *
          </label>
          <textarea
            className="form-control"
            id="address"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          >
            Enter Address
          </textarea>
        </div>
        <button
          type="submit"
          className="submit-button"
          style={{ backgroundColor: "#4CAF50", padding: "10px" }}
        >
          Add Vendor
        </button>
        <br /> <br />
        <Link to="/vendors" className="back-link">
          Back to Vendors
        </Link>
      </form>
    </div>
  );
};

export default AddVendor;
