import React, { useEffect, useState } from "react";
import "../assets/css/Clients.css";
import axios from "axios";

const ClientsPage = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    getClients();
  }, []);

  const getClients = async () => {
    try {
      const res = await axios.get("http://localhost:8000/admin/clients");
      const data = res.data;
      setClients(data?.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleApprove = (id) => {
    setClients(
      clients?.map((client) =>
        client.id === id ? { ...client, status: "Approved" } : client
      )
    );
  };

  const handleReject = (id) => {
    setClients(
      clients?.map((client) =>
        client.id === id ? { ...client, status: "Rejected" } : client
      )
    );
  };

  return (
    <div className="container">
      <h4 className="text-dark text-start my-4">Clients Management</h4>
      <div className="table-responsive">
        <table className="table table-light table-striped table-sm table-hover text-start p-2">
          <thead className="text-start">
            <tr>
              <th className="text-start p-2">#</th>
              <th className="p-2">Client Email</th>
              <th className="p-2">Client Name</th>
              <th className="p-2">Phone Number</th>
              {/* <th className="p-2">Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {clients &&
              clients?.map((client, index) => (
                <tr key={client?.id}>
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{client?.user_email}</td>
                  <td className="p-2">
                    {client?.first_Name} {client?.last_Name}
                  </td>
                  <td className="p-2">{client?.phone_number}</td>
                  {/* <td className="p-2">
                    {client?.status === "Pending" && (
                      <>
                        <button onClick={() => handleApprove(client?.id)}>
                          Approve
                        </button>
                        <button onClick={() => handleReject(client?.id)}>
                          Reject
                        </button>
                      </>
                    )}
                  </td> */}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientsPage;
