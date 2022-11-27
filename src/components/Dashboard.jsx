import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import "../components/Dashboard.css";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { sendData } from "./Redux/action/dataAction";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

function Dashboard() {
  const tele = useNavigate();
  const dispatch = useDispatch();

  const user = localStorage.getItem("user");
  // console.log(JSON.parse(user));
  const users = JSON.parse(user);
  useEffect(() => {
    console.log(users.roles);
    dispatch(sendData());
  }, []);

  // start role guard
  if (users.roles === "nakes") {
    console.log("anda tidak boleh masuk");
    return <Navigate to="/error" />;
    // tele("/error");
  }
  // end role guard

  return (
    <div>
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default Dashboard;
