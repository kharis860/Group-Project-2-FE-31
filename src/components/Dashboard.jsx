import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import "../components/Dashboard.css";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { sendData } from "./Redux/action/dataAction";
import { useDispatch } from "react-redux";
import { Redirect, useNavigate } from "react-router-dom";

function Dashboard() {
  const tele = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.data);
  // console.log(state.pasien[0]);
  state.pasien.map((item, index) => {
    // console.log(item);
    {
      if (state.pasien.id === 2) {
        // <Redirect to="/daftar" />;
        tele("/daftar");
      }
    }
  });

  useEffect(() => {
    dispatch(sendData());
  }, []);
  return (
    <div>
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default Dashboard;
