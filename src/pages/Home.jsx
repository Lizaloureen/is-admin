import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../assets/css/Home.css";
import axios from "axios";

import Chart from "react-apexcharts";

const AdminHome = () => {
  const [firearmsArray, setFirearmsArray] = useState([]);
  const [firearmsTitle, setFirearmsTitle] = useState([]);

  const chartData = {
    options: {
      chart: {
        id: "Type of Firearm",
      },
      xaxis: {
        categories: firearmsTitle,
      },
    },
    series: [
      {
        name: "Number of Applications",
        data: firearmsArray,
      },
    ],
  };

  const [stats, setStats] = useState({});
  const [statAppDist, setStatAppDist] = useState({});

  useEffect(() => {
    getStats();
    getStatsFirearms();
    getStatAppDist();
  }, []);

  const getStatsFirearms = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/admin/stats/firearms-dist"
      );
      const data = res.data;
      const firearms_stats = data.data;
      let ser = [];
      let cats = [];
      for (let [key, value] of Object.entries(firearms_stats)) {
        ser.push(value);
        cats.push(key);
      }
      setFirearmsArray(ser);
      setFirearmsTitle(cats);
    } catch (error) {
      console.error(error);
    }
  };

  const getStats = async () => {
    try {
      const res = await axios.get("http://localhost:8000/admin/stats");
      const data = res.data;
      setStats(data);
    } catch (error) {
      console.error(error);
    }
  };
  const getStatAppDist = async () => {
    try {
      const res = await axios.get("http://localhost:8000/admin/stats/app-dist");
      const data = res.data;
      setStatAppDist(data.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="admin-home-container">
      <h2 className="h2">Admin Dashboard</h2>
      <div className="cards">
        <div className="card">
          <h2>Total Applications</h2>
          <p id="applications-count">{stats?.applications}</p>
        </div>
        <div className="card">
          <h2>Total Vendors</h2>
          <p id="vendors-count">{stats?.vendors}</p>
        </div>
        <div className="card">
          <h2>Total Clients</h2>
          <p id="clients-count">{stats?.clients}</p>
        </div>
        <div className="card">
          <h2>Total Firearms</h2>
          <p id="firearms-count">{stats?.firearms}</p>
        </div>
      </div>

      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div style={{ padding: "5px", backgroundColor: "white", width: "48%" }}>
          <h3>No of Application against the type of firearm</h3>
          <Chart
            options={chartData.options}
            series={chartData.series}
            type="bar"
            width="500"
          />
        </div>
        <div
          style={{ padding: "20px", backgroundColor: "white", width: "48%" }}
        >
          <h3>Regional Firearm Distribution</h3>
          <table className="table">
            <tbody
              style={{
                backgroundColor: "white",
                color: "black",
              }}
            >
              {statAppDist &&
                Object.keys(statAppDist).map((key, index) => {
                  return (
                    <tr
                      key={index}
                      style={{
                        backgroundColor: "white",
                        color: "black",
                        textAlign: "left",
                      }}
                    >
                      <td
                        style={{
                          backgroundColor: "white",
                          color: "black",
                          textAlign: "left",
                        }}
                      >
                        {key} :
                      </td>{" "}
                      <td
                        style={{
                          backgroundColor: "white",
                          color: "black",
                          textAlign: "left",
                        }}
                      >
                        {statAppDist[key]}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>

      <h2 className="h2">Easy Navigations</h2>
      <div className="admin-card-container">
        <div className="admin-card">
          <h3>View Clients</h3>
          <p>View all clients in the portal.</p>
          <Link to="/clients" className="admin-button">
            Go to Clients
          </Link>
        </div>
        <div className="admin-card">
          <h3>Handle Applications</h3>
          <p>Approve or reject user applications.</p>
          <Link to="/applications" className="admin-button">
            Go to Applications
          </Link>
        </div>
        <div className="admin-card">
          <h3>View Vendors</h3>
          <p>View all vendors.</p>
          <Link to="/vendors" className="admin-button">
            Go to Vendors
          </Link>
        </div>
        <div className="admin-card">
          <h3>View Firearms</h3>
          <p>View all registered firearms and accredited holders.</p>
          <Link to="/vendors" className="admin-button">
            Go to Vendors
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
