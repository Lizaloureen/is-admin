import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Firearms = () => {
  const [firearms, setFirearms] = useState([]);

  useEffect(() => {
    // Fetch firearms from the backend
    fetch("http://localhost:8000/admin/firearms")
      .then((response) => response.json())
      .then((data) => setFirearms(data))
      .catch((error) => console.error("Error fetching firearms:", error));
  }, []);

  return (
    <div className="applications-container">
      <div style={{ width: "90%", padding: "10px", margin: "5px auto" }}>
        {/* <h2 style={{textAlign: 'left'}}>Firearms</h2> */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2>Firearms</h2>
          <Link to="/firearms/add">
            <button style={{ backgroundColor: "green" }}> Add Firearm</button>
          </Link>
        </div>
        <table className="applications-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Type</th>
              <th>Serial No.</th>
              <th>Manufacturer</th>
              <th>Manufactured On</th>
              <th>Vendor</th>
              <th>Description</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {firearms?.data?.map((firearm, key) => (
              <tr key={key + 1}>
                <td>
                  <img
                    src={`http://127.0.0.1:8000/${firearm.image}`}
                    alt=""
                    style={{ width: "50px", height: "50px" }}
                  />
                </td>
                <td>{firearm?.name} </td>
                <td>{firearm.firearm_type}</td>
                <td>{firearm.serial_number}</td>
                <td>{firearm.manufacturer}</td>
                <td>{firearm.date_of_manufacture}</td>
                <td>{firearm.vendor.name}</td>
                <td>{firearm.description}</td>
                <td>{firearm.status}</td>
                <td>
                  {firearm.status == "Available" && (
                    <p style={{ color: "lime", cursor: "pointer" }}>
                      Issue firearm
                    </p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Firearms;
