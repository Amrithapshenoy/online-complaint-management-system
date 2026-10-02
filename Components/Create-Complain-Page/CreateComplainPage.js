import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../Complain-detail-card/Card.css";
import { createComplain } from "../../firebase-service/complain-service";
import { useAuth } from "../Contexts/AuthContext";
import axios from "axios";

export default function CreateComplainPage() {
  const { category } = useParams();
  const authContext = useAuth();
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [hostel, setHostel] = useState("");
  const [room, setRoom] = useState("");

  const handleCreateCard = async () => {
    console.log("Create Complaint button clicked");

    const userEmail =
      authContext?.currentUser?.email || "testuser@gmail.com";

    const details = {
      category,
      description,
      hostel,
      room,
      status: "pending",
      createdAt: new Date().toLocaleString(),
      createdBy: userEmail,
    };

    console.log(details);

    try {
      // Save complaint to Firebase
      console.log("Saving to Firebase...");

      const result = await createComplain(details);

      console.log("Firebase save successful");
      console.log("Document ID:", result.id);


      // Send Telegram notification
      try {
        console.log("Sending Telegram...");

        await axios.post("http://localhost:5000/complaint", {
  id: result.id,
  name: userEmail,
  department: hostel,
  category,
  message: description,
});

        console.log("Telegram sent");

      } catch (error) {
        console.error("Telegram Error:", error);
      }


      alert("Complaint Submitted Successfully!");

      // Redirect to dashboard
      navigate("/dashboard");

    } catch (error) {
      console.error("Firebase Error:", error.message);
      alert(error.message);
    }
  };


  return (
    <>
      <section className="text-area">
        <div className="container my-5 py-5 text-dark">
          <div className="row d-flex justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-6">
              <div className="card">
                <div className="w-100">
                  <h2>Create Your Complaint</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <div className="multiple-cards">
        <div className="create-card">

          <textarea
            className="form-control"
            placeholder="Description"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />


          <textarea
            className="form-control"
            placeholder="Enter your Hostel Name"
            value={hostel}
            onChange={(e) => setHostel(e.target.value)}
          />


          <textarea
            className="form-control"
            placeholder="Enter your room No."
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />


          <button onClick={handleCreateCard}>
            Create Complaint
          </button>

        </div>
      </div>
    </>
  );
}