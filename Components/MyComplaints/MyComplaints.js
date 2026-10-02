import React, { useEffect, useState } from "react";
import { listComplain } from "../../firebase-service/complain-service";
import { useAuth } from "../Contexts/AuthContext";
import ComplainCard from "../Complain-detail-card/ComplainCard";

export default function MyComplaints() {
  const [complaints, setComplaints] = useState([]);

  const authContext = useAuth();
  const email = authContext?.currentUser?.email || "testuser@gmail.com";

  useEffect(() => {
    listComplain(email)
      .then((data) => {
        setComplaints(data);
      })
      .catch((err) => console.log(err));
  }, [email]);

  return (
    <div className="container mt-4">
      <h2 style={{ textAlign: "center" }}>My Complaints</h2>

      {complaints.length === 0 ? (
        <h4 style={{ textAlign: "center", marginTop: "30px" }}>
          No complaints submitted yet.
        </h4>
      ) : (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            justifyContent: "center",
          }}
        >
          {complaints.map((complaint) => (
            <ComplainCard
              key={complaint.id}
              {...complaint}
            />
          ))}
        </div>
      )}
    </div>
  );
}