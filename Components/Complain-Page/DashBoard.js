import React,{useEffect, useState}from "react";
import "./DashBoard.css";
import { Services } from "../../Constant/Services";
import { useNavigate } from "react-router-dom";
import ComplainCard from "../Complain-detail-card/ComplainCard";
import { listComplain } from "../../firebase-service/complain-service";
import { useAuth } from "../Contexts/AuthContext";

export default function DashBoard() {
  const [complainList, setComplainList] = useState([]);
  
  // Safety Bypass: Pull the user safely or use a mock fallback email
  const authContext = useAuth();

  // useNavigate use hua hai ek page se dushre page pe jane k liya
  const navigate = useNavigate();
  const handleLogout = () => {
  navigate("/login");
};
  function navigateToCreateComplainPage(category) {
    navigate(`/${category}/create-complain`);
  }
  
  useEffect(() => {
  listComplain()
    .then((res) => {
      console.log(res);
      setComplainList(res);
    })
    .catch((err) => console.log(err));
}, []);

  return (
    <>
  
      <div className="card-body">
        <b className="text-center pt-3">Lodge Your Complain/Request</b>
        <div className="body-item">
          {Object.keys(Services).map((name) => (
            <div
              key={name}
              onClick={() => navigateToCreateComplainPage(name)}
              className="img-resize"
            >
              <img src={Services[name].image} alt={name} />
              <span>{Services[name].name} </span>
            </div>
          ))}
        </div>
      </div>
      <div className="text-centre pt-3 complain-page">
  <button
    className="btn btn-success"
    onClick={() => navigate("/my-complaints")}
  >
    Open Complaints
  </button>
        <div style={{ display: "flex", gap: "20px",
    flexWrap: "wrap",
    justifyContent: "space-between"}}>
        {complainList?.map((complain, idx) => <ComplainCard key={idx} {...complain} />)}
        </div>
      </div>
    </>
  );
}