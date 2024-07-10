import axios from "axios";
import React, { useEffect, useState } from "react";
import ApproveModal from "../components/ApproveModal";
import { useNavigate } from "react-router-dom";

const Licences = () => {
  const navigate = useNavigate();
  const [interview_date, setInterviewDate] = useState("");
  const [trans_id, settrans_id] = useState("");
  const [appId, setAppId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(undefined);

  const openModal = (modalId, id) => {
    setIsModalOpen(modalId);
    setAppId(id);
  };

  const closeModal = () => {
    setIsModalOpen(undefined);
  };

  const [licences, setLicences] = useState([]);

  useEffect(() => {
    // Fetch licences from the backend
    fetch("http://localhost:8000/admin/licences")
      .then((response) => response.json())
      .then((data) => setLicences(data))
      .catch((error) => console.error("Error fetching licences:", error));
  }, []);

  const handleApproval = async (e) => {
    e.preventDefault();
    if (!interview_date) return alert("Please set an interview date");
    if (!trans_id) return alert("Please enter transaction ID");
    const url = `http://localhost:8000/admin/licences/confirm_payment`;
    try {
      const formData = {
        licence_id: appId,
        interview_date: interview_date,
        trans_id: trans_id,
      };
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = response.data;
      console.log(data);
      if (data.success) {
        alert(data.message);
        closeModal();
        navigate(0);
      } else {
        closeModal();
        alert(data.message);
      }
      // Update the applications state
    } catch (error) {
      console.error("Error approving interview application:", error);
    }
  };

  const handleRenew = async (id) => {
    const url = `http://localhost:8000/admin/licences/change_status`;
    // const token = getToken()
    try {
      const formData = { id: id, status: "Active" };
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Token ${token}`
        },
      });
      const data = response.data;
      console.log(data);
      // Update the applications state
      navigate(0);
    } catch (error) {
      console.error("Error rejecting application:", error);
    }
  };

  return (
    <div className="applications-container">
      <div style={{ width: "80%", padding: "10px", margin: "5px auto" }}>
        <h2 style={{ textAlign: "left" }}>Client Licences</h2>
        <div className=" table-responsive p-2  rounded border bg-light">
          <table className="table table-light table-striped table-md table-hover text-start ">
            <thead>
              <tr>
                <th>#</th>
                <th>Client Name</th>
                <th>Application</th>
                <th>Serial Number</th>
                <th>Status</th>
                <th>Issued On</th>
                <th>Expires On</th>
                <th>Renewed On</th>
                <th>Revoked On</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {licences?.data?.map((licence, key) => (
                <tr key={key + 1}>
                  <td>{key + 1}</td>
                  <td>
                    {licence?.client?.first_Name} {licence?.client?.last_Name}
                  </td>
                  <td>{licence.application.id}</td>
                  <td>{licence.license_number}</td>
                  <td>{licence.status}</td>
                  <td>
                    {licence.issued_on
                      ? new Date(licence.issued_on).toLocaleString()
                      : "--"}
                  </td>
                  <td>
                    {licence.expiry_on
                      ? new Date(licence.expiry_on).toLocaleString()
                      : "--"}
                  </td>
                  <td>
                    {licence.renewed_on
                      ? new Date(licence.renewed_on).toLocaleString()
                      : "--"}
                  </td>
                  <td>
                    {licence.revoked_on
                      ? new Date(licence.revoked_on).toLocaleString()
                      : "--"}
                  </td>
                  <td>
                    {licence.status == "Awaiting Payment Approval" ? (
                      // {licence.status == "Active" ? (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <button
                          onClick={() =>
                            openModal(`approve_${licence.id}`, licence.id)
                          }
                        >
                          Approve Payment
                        </button>
                      </div>
                    ) : licence.status == "Awaiting Interview" ? (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <button onClick={() => handleRenew(licence.id)}>
                          Renew Licence
                        </button>
                        <button onClick={() => handleRevoke(licence.id)}>
                          Revoke Licence
                        </button>
                      </div>
                    ) : licence.status == "Revoked" ? (
                      <p style={{ color: "red" }}>{licence.status}</p>
                    ) : (
                      <p className="text-success">{licence.status}</p>
                    )}

                    {isModalOpen == `approve_${licence.id}` && (
                      <ApproveModal
                        id={licence.id}
                        isOpen={isModalOpen}
                        onClose={closeModal}
                      >
                        <p>
                          Approve Licence Renewal payment on license{" "}
                          {licence.license_number}.
                        </p>
                        <form
                          onSubmit={handleApproval}
                          style={{
                            margin: "0px",
                            padding: "0px",
                            border: "none",
                            width: "100%",
                          }}
                        >
                          <div className="form-group">
                            <label htmlFor="interviewDate">
                              Enter Mpesa Transaction ID
                            </label>
                            <input
                              style={{
                                padding: "10px",
                                width: "95%",
                                borderRadius: "5px",
                                backgroundColor: "white",
                                border: "1px solid #ccc",
                              }}
                              name="trans_id"
                              value={trans_id}
                              onChange={(e) => settrans_id(e.target.value)}
                              type="text"
                              placeholder="Transaction ID"
                            />{" "}
                            <br />
                            <br />
                            <label htmlFor="interviewDate">
                              Set Interview Date
                            </label>
                            <input
                              style={{
                                padding: "10px",
                                width: "95%",
                                borderRadius: "5px",
                                backgroundColor: "white",
                                border: "1px solid #ccc",
                              }}
                              name="interview_date"
                              value={interview_date}
                              onChange={(e) => setInterviewDate(e.target.value)}
                              type="date"
                              placeholder="Interview date"
                            />
                          </div>
                          <input
                            type="submit"
                            value="Approve"
                            className="button"
                            style={{ backgroundColor: "green" }}
                            onClick={() => {}}
                          />
                        </form>
                      </ApproveModal>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Licences;
