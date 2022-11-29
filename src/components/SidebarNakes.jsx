import "./SidebarNakes.css";
import { useNavigate } from "react-router-dom";

function SidebarNakes() {
    const tele = useNavigate();
    function teleDaftar() {
        tele("daftar");
    }
    function telePasienNakes() {
        tele("list");
    }
    function teleDashboards() {
        tele("/dashboardNakes");
    }
    function teleLogin() {
        tele("/");
    }
    return (
        <>
            <aside>
                <div className="container">
                    <div className="logo">
                        <img src={require("../Img/Medtech_sm.png")} alt="Logo MedTech" />
                    </div>
                    <div className="navbar-side">
                        <button onClick={() => teleDaftar()}>
                            <i className="fas fa-file-signature"></i> Pendaftaran
                        </button>
                        <button onClick={() => telePasienNakes()}>
                            <i className="fas fa-book"></i> Data Pasien
                        </button>
                        <button onClick={() => teleLogin()}>
                            <i className="fas fa-sign-out-alt"></i> Keluar
                        </button>
                    </div>
                    <div className="home" onClick={() => teleDashboards()}>
                        <span className="fas fa-house-user"></span>
                    </div>
                </div>
            </aside>
        </>
    );
}

export default SidebarNakes;
