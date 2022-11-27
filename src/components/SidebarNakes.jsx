import "./SidebarNakes.css";

function SidebarNakes() {
  return (
    <>
      <aside>
        <div className="container">
          <div className="logo">
            <img src={require("../Img/Medtech_sm.png")} alt="Logo MedTech" />
          </div>
          <div className="navbar-side">
            <button>
              <i className="fas fa-file-signature"></i> Pendaftaran
            </button>
            <button>
              <i className="fas fa-book"></i> Data Pasien
            </button>
            <button>
              <i className="fas fa-sign-out-alt"></i> Keluar
            </button>
          </div>
          <div className="home">
            <span className="fas fa-house-user"></span>
          </div>
        </div>
      </aside>
    </>
  );
}

export default SidebarNakes;
