import React from 'react'

const Firearms = () => {
  return (
    <div className="applications-container" >
      <div style={{width: '80%', padding: '10px', margin:'5px auto'}}>
      <h2 style={{textAlign: 'left'}}>Firearms</h2>
      <table className="applications-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Type</th>
            <th>Serial No.</th>
            <th>Holder</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* {applications?.data?.map((application, key) => (
            <tr key={key + 1}>
              <td>{key + 1}</td>
              <td>{application?.client?.first_Name} {application?.client?.last_Name}</td>
              <td>{application.type_of_firearm}</td>
              <td>{application.status}</td>
            </tr>
          ))} */}
        </tbody>
      </table>

      </div>
    </div>
  )
}

export default Firearms