import React, { useState, useEffect } from 'react';
import '../assets/css/Application.css';
import 'moment';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ApproveModal from '../components/ApproveModal';
// import Moment from 'react-moment';

const AdminApplicationsPage = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [interviewDate, setInterviewDate] = useState('');
  const [appId, setAppId] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(undefined);

  const openModal = (id) => {
    setIsModalOpen(id);
    setAppId(id)
  };

  const closeModal = () => {
    setIsModalOpen(undefined);
  };

  useEffect(() => {
    // Fetch applications from the backend
    fetch('http://localhost:8000/admin/applications')
      .then(response => response.json())
      .then(data => setApplications(data))
      .catch(error => console.error('Error fetching applications:', error));
  }, []);


  const handleApproveInterview = async (e) => {
    e.preventDefault()

    if (!interviewDate) return alert('Please set an interview date')

    const url = `http://localhost:8000/admin/applications/approve_interview`
    // const token = getToken() 
    try {
      const formData = {id: appId, interview_date: interviewDate}
      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Token ${token}`
        },
        
      });
      const data = response.data;
      console.log(data);
      // Update the applications state
      navigate(0);
    } catch (error) { 
      console.error('Error approving interview application:', error);
    }
  }

  const handleApprove = async (e) => {
    e.preventDefault()


    const url = `http://localhost:8000/admin/applications/approve`
    // const token = getToken() 
    try {
      const formData = {id: appId}
      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Token ${token}`
        },
        
      });
      const data = response.data;
      console.log(data);
      // Update the applications state
      navigate(0);
    } catch (error) { 
      console.error('Error approving application:', error);
    }
  }

  const handleReject = async (id) => {
    const url = `http://localhost:8000/admin/applications/reject`
    // const token = getToken()
    try {
      const formData = {id: id, status: 'Rejected'}
      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Token ${token}`
        },
        
      });
      const data = response.data;
      console.log(data);
      // Update the applications state
      navigate(0);
    } catch (error) { 
      console.error('Error rejecting application:', error);
    }
  }

  return (
    <div className="applications-container" >
      <div style={{width: '80%', padding: '10px', margin:'5px auto'}}>
      <h2 style={{textAlign: 'left'}}>Client Applications</h2>
      <table className="applications-table">
        <thead>
          <tr>
            <th>Application ID</th>
            <th>Client Name</th>
            <th>Type of firearm</th>
            <th>Status</th>
            <th>Interview Date</th>
            <th>Submitted On</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {applications?.data?.map((application, key) => (
            <tr key={key + 1}>
              <td>{key + 1}</td>
              <td>{application?.client?.first_Name} {application?.client?.last_Name}</td>
              <td>{application.type_of_firearm}</td>
              <td>{application.status}</td>
              <td>{application.interview_date ? (new Date(application.interview_date).toLocaleString())  : '--'}</td>
              <td>{new Date(application?.create_at).toLocaleString()} </td>
              <td>
                { 
                application.status == 'Pending' 
                  ? 
                    <div style={{display: 'flex', justifyContent:'center', alignItems: 'center'}}>
                        <button onClick={() => openModal(application.id)}>Schedule Interview</button>  
                        <button onClick={() => handleReject(application.id)}>Reject</button>  
                    </div>
                  :  application.status == 'Pending_Interview' 
                  ? 
                    <div style={{display: 'flex', justifyContent:'center', alignItems: 'center'}}>
                        <button onClick={() => handleApprove(application.id)}>Approve</button>  
                        <button onClick={() => handleReject(application.id)}>Reject</button>  
                    </div>
                  : 
                    application.status == 'Rejected' ? <p>Rejected</p> : <p>Approved</p>  
                }

                {isModalOpen == application.id && 
                <ApproveModal id={application.id} isOpen={isModalOpen} onClose={closeModal}>
                  <p>Approve Application ID {application.id}.</p>
                  <form onSubmit={handleApproveInterview} style={{margin:'0px', padding: '0px',border: 'none', width:'100%'}}>
                    <div className="form-group">
                      <label htmlFor="interviewDate">Set Interview Date</label>
                      <input 
                        style={{padding:'10px', width:'95%', borderRadius:'5px', backgroundColor: 'white', border: '1px solid #ccc'}} 
                        name='interviewDate' 
                        value={interviewDate} 
                        onChange={e =>setInterviewDate( e.target.value)}  
                        type="datetime-local" 
                        placeholder="Interview data" 
                      />
                    </div>
                    <input type="submit" value="Approve" className="button" style={{backgroundColor: 'green'}} onClick={() => {}} />
                  </form>
                </ApproveModal>
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      </div>
    </div>
  );
};

export default AdminApplicationsPage;
