import React, { useEffect, useState } from "react";
import fa_types from "../utils/firearmsTypes";
import manufacturers from "../utils/manufacturers";
import { Link } from "react-router-dom";
import axios from "axios";

const AddFirearm = () => {
  const [name, setName] = useState("");
  const [firearm_type, setFirearm_type] = useState("");
  const [serial_number, setSerial_number] = useState("");
  const [date_of_manufacture, setDate_of_manufacture] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [vendor, setVendor] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [vendors, setVendors] = useState([]);

  const fetchVendors = async () => {
    try {
      const response = await fetch("http://localhost:8000/admin/vendors");
      const data = await response.json();
      setVendors(data.data);
    } catch (error) {
      console.error("Error fetching vendors:", error);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you would typically send the firearm data to the server
    let formData = {
      name: name,
      firearm_type: firearm_type,
      serial_number: serial_number,
      date_of_manufacture: date_of_manufacture,
      manufacturer: manufacturer,
      vendor: vendor,
      image: image,
      description: description,
    };

    console.log("Firearm data:", formData);

    try {
      const url = `http://localhost:8000/admin/firearms/add`;
      const res = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const data = res.data;
      console.log("data", data);

      // Clear form fields
      setName("");
      setFirearm_type("");
      setSerial_number("");
      setDate_of_manufacture("");
      setManufacturer("");
      setVendor("");
      setImage("");
      setDescription("");

      alert("Firearm added successfully");
    } catch (error) {
      console.error("Error adding firearm:", error);
    }
  };

  return (
    <div className="applications-container ">
      <h2>Add Firearm</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="image">Firearm Image *</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Firearm Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Type *</label>
          <select
            id="firearm_type"
            name="firearm_type"
            value={firearm_type}
            onChange={(e) => setFirearm_type(e.target.value)}
            required
          >
            <option value="">Select Type</option>
            {fa_types.map((type, index) => (
              <option key={index + 1} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="serial_number">Serial Number *</label>
          <input
            type="text"
            id="serial_number"
            name="serial_number"
            value={serial_number}
            onChange={(e) => setSerial_number(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="manufacturer">Manufacturer *</label>
          <select
            id="manufacturer"
            value={manufacturer}
            name="manufacturer"
            onChange={(e) => setManufacturer(e.target.value)}
            required
          >
            <option value="">Select Manufacturer</option>
            {manufacturers.map((type, index) => (
              <option key={index + 1} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="vendor">Vendor *</label>
          <select
            id="vendor"
            value={vendor}
            name="vendor"
            onChange={(e) => setVendor(e.target.value)}
            required
          >
            <option value="">Select Vendor</option>
            {vendors?.map((v, index) => (
              <option key={index + 1} value={v.id}>
                {v.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="date_of_manufacture">Date of Manufacture *</label>
          <input
            type="date"
            id="date_of_manufacture"
            name="date_of_manufacture"
            value={date_of_manufacture}
            onChange={(e) => setDate_of_manufacture(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          >
            Enter description
          </textarea>
        </div>
        <button
          type="submit"
          className="submit-button"
          style={{ backgroundColor: "#4CAF50", padding: "10px" }}
        >
          Add Firearm
        </button>
        <br /> <br />
        <Link to="/firearms" className="back-link">
          Back to Firearms
        </Link>
      </form>
    </div>
  );
};

export default AddFirearm;
