import SidebarNakes from "./SidebarNakes";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

function DashboardNakes() {
  // start ambil data role guard
  const user = localStorage.getItem("credentialLogin");
  // console.log(JSON.parse(user));
  const users = JSON.parse(user);
  useEffect(() => {
    console.log(users);
  }, []);

  // end ambil data role guard

  // start role guard
  if (users.role === "dokter") {
    console.log("anda tidak boleh masuk");
    return <Navigate to="/error" />;
    // tele("/error");
  }
  // end role guard
  return (
    <div>
      <SidebarNakes />
      <Outlet />
    </div>
  );
}

export default DashboardNakes;
