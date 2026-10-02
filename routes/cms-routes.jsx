import { Routes, Route } from "react-router-dom";
import DashBoard from "../Components/Complain-Page/DashBoard";
import Login from "../Components/Login/Login";
import CreateComplainPage from "../Components/Create-Complain-Page/CreateComplainPage";
import MyComplaints from "../Components/MyComplaints/MyComplaints";
import AdminDashboard from "../Components/Admin/AdminDashboard";

export default function CMSRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/login" element={<Login />} />

      <Route path="/dashboard" element={<DashBoard />} />

      <Route
        path="/:category/create-complain"
        element={<CreateComplainPage />}
      />

      <Route path="/my-complaints" element={<MyComplaints />} />

    </Routes>
  );
}