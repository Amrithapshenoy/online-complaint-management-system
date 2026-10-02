import React, { useEffect, useState } from "react";
import { listAllComplaints, updateComplaintStatus } from "../../firebase-service/complain-service";

export default function AdminDashboard() {

  const [complaints, setComplaints] = useState([]);

  useEffect(() => {

    listAllComplaints()
      .then((data) => {
        setComplaints(data);
      })
      .catch((error) => {
        console.log(error);
      });

  }, []);


  const handleComplete = async (id) => {

    await updateComplaintStatus(id, "completed");

    setComplaints((prev) =>
      prev.map((complaint) =>
        complaint.id === id
          ? { ...complaint, status: "completed" }
          : complaint
      )
    );

  };


  return (
    <div className="container mt-4">

      <h2 style={{textAlign:"center"}}>
        Admin Dashboard
      </h2>


      {complaints.map((complaint) => (

        <div className="card p-3 mt-3" key={complaint.id}>

          <h4>{complaint.category}</h4>

          <p>
            Description: {complaint.description}
          </p>

          <p>
            Hostel: {complaint.hostel}
          </p>

          <p>
            Room: {complaint.room}
          </p>


          <p>
            Status: {complaint.status}
          </p>


          {complaint.status !== "completed" && (

            <button
              className="btn btn-success"
              onClick={() => handleComplete(complaint.id)}
            >
              Mark as Completed
            </button>

          )}

        </div>

      ))}


    </div>
  );
}