import Navbar from "./Navbar";
import SidebarNakes from "./SidebarNakes";
import "./DaftarKonsultasi.css";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";

function DaftarKonsultasi() {
  // start ambil data role guard
  const tele = useNavigate();
  const user = localStorage.getItem("user");
  // console.log(JSON.parse(user));
  const users = JSON.parse(user);
  console.log(users);
  // end ambil data role guard

  // start role guard
  if (users.roles === "dokter") {
    console.log("anda tidak boleh masuk");
    return <Navigate to="/error" />;
    // tele("/error");
  } else {
    tele("/daftar");
  }
  // end role guard
  // useEffect(() => {}, []);
  return (
    <>
      <SidebarNakes />
      <Navbar />
      <div className="global">
        <section className="row ">
          <div className="container-sm">
            <div className="row">
              <div className="col-md">
                <h1 className="title">Pendaftaran Konsultasi</h1>
              </div>
            </div>
            {/* search bar */}
            <div className="row">
              <div className="col-xl-6">
                <div className="input-group flex-nowrap">
                  <input type="text" className="form-control" placeholder="Cari berdasarkan ID Pasien atau Nama" id="inputSearch" />
                  <span className="input-group-text" id="icon-search">
                    <i className="material-icons">search</i>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="daftar">
            <form>
              <label>Nama lengkap</label>
              <input type="text" className="inputText" />
              <label>poli</label>
              <div className="radio">
                <input type="radio" value="umum" name="poli" />
                <label htmlFor="" className="labelRadio">
                  Umum
                </label>
                <br />
                <input type="radio" value="gigi" name="poli" className="inputRadio" />
                <label htmlFor="" className="labelRadio">
                  Gigi
                </label>
              </div>
              <label>Dokter</label>
              <select name="dokter" id="dokter">
                <option>Opsi Dokter</option>
                <option value="Dr. Danar Riko">Dr. Danar Riko</option>
              </select>
              <button type="submit" className="buttonSubmit">
                Submit
              </button>
            </form>
          </div>
        </section>
      </div>
    </>
  );
}

export default DaftarKonsultasi;
