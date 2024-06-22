import React, { useEffect, useState } from 'react';
import '../assets/css/Vendor.css';
import { Link } from 'react-router-dom';

const VendorsPage = () => {
  const [vendors, setVendors] = useState([]);

  const fetchVendors = async () => {
    try {
      const response = await fetch('http://localhost:8000/admin/vendors');
      const data = await response.json();
      setVendors(data);
    } catch (error) {
      console.error('Error fetching vendors:', error);
    }
  }

  useEffect(() => {
    fetchVendors();
  }, []);

  return (
    <div className="applications-container">

<div style={{width: '80%', padding: '10px', margin:'5px auto'}}>
      <div style={{display: 'flex', justifyContent:'space-between', alignItems: 'center'}}>
      <h2>Vendors Management</h2>
       <Link to='/vendors/add'><button style={{backgroundColor: 'green'}}> Add Vendor</button></Link>
      </div>
      <table className="applications-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Vendor Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {vendors?.data?.map(vendor => (
            <tr key={vendor.id}>
              <td>{vendor.id}</td>
              <td>{vendor.name}</td>
              <td>{vendor.company_phone}</td>
              <td>{vendor.company_email}</td>
              <td>{vendor.company_address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default VendorsPage;
