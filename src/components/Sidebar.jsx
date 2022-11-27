import "../components/Sidebar.css";
import "../Img/Medtech_sm.png";
import { Outlet, useNavigate } from "react-router-dom";

function Sidebar() {
  const tele = useNavigate();
  function teleData() {
    tele("data");
  }
  const teleKonsultasi = () => {
    tele("konsultasi");
  };
  function teleDashboard() {
    tele("/dashboard");
  }
  function teleLogin() {
    tele("/");
  }

  return (
    <div>
      <aside>
        <div className="container">
          <div className="logo">
            <img src={require("../Img/Medtech_sm.png")} alt="Logo MedTech" />
          </div>
          <div className="navbar-side">
            <button onClick={() => teleData()}>
              <i className="fas fa-book"></i> Data Pasien
            </button>
            <button onClick={() => teleKonsultasi()}>
              <i className="fas fa-stethoscope"></i> Konsultasi
            </button>
            <button onClick={() => teleLogin()}>
              <i className="fas fa-sign-out-alt"></i> Keluar
            </button>
          </div>
          <div className="home" onClick={() => teleDashboard()}>
            <span className="fas fa-house-user"></span>
          </div>
        </div>
      </aside>
      {/* end sidebar */}
    </div>
  );
}

export default Sidebar;
