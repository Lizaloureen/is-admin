import React, { useEffect, useState } from 'react';
import '../assets/css/Clients.css';
import axios from 'axios';

const ClientsPage = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => { 
    getClients()
  }, []);

  const getClients = async () => {
    try{
      const res = await axios.get('http://localhost:8000/admin/clients')
      const data = res.data
      setClients(data?.data)
    } catch (error) {
      console.error(error)
    }

  }

  const handleApprove = (id) => {
    setClients(clients?.map(client => 
      client.id === id ? { ...client, status: 'Approved' } : client
    ));
  };

  const handleReject = (id) => {
    setClients(clients?.map(client => 
      client.id === id ? { ...client, status: 'Rejected' } : client
    ));
  };

  return (
    <div className="clients-container">
      <h2>Clients Management</h2>
      <table>
        <thead>
          <tr>
            <th>Client Email</th>
            <th>Client Name</th>
            <th>Phone Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients && clients?.map(client => (
            <tr key={client?.id}>
              <td>{client?.ID_Number}</td>
              <td>{client?.first_Name} {client?.last_Name}</td>
              <td>{client?.phone_number}</td>
              <td>
                {client?.status === 'Pending' && (
                  <>
                    <button onClick={() => handleApprove(client?.id)}>Approve</button>
                    <button onClick={() => handleReject(client?.id)}>Reject</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientsPage;
