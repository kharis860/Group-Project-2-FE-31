import "../components/Dashboard.css";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function InnerDashboard() {
  const state = useSelector((state) => state.data);
  const allPasien = state.pasien;

  // allPasien.map((item, index) => {
  //   // console.log(item);
  //   if (item.status === false) {
  //     // console.log(item);
  //     setJumlahPasien(item);
  //   }
  // });

  const filteredAllPasienFalse = allPasien.filter((pasien) => pasien.status === false);

  const filteredAllPasienTrue = allPasien.filter((pasien) => pasien.status === true);

  return (
    <div>
      {/*start kanan*/}
      <div className="global">
        <Navbar />

        {/* start informasi */}
        <section className="info">
          <div className="general">
            <div className="card-container">
              <div className="card-1">
                <div className="inner-card-1">
                  <div className="counter">
                    <h1 id="jumlahPasien">{filteredAllPasienFalse.length}</h1>
                  </div>
                  <div className="teks">
                    <h2>Jumlah Pasien</h2>
                  </div>
                </div>
              </div>
              <div className="card-2">
                <div className="inner-card-1">
                  <div className="counter">
                    <h1>{filteredAllPasienTrue.length}</h1>
                  </div>
                  <div className="teks">
                    <h2>Pasien Terlayani</h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="img-container">
              <img src={require("../Img/waiting room.jpg")} alt="gambar dashboard" />
            </div>
          </div>
        </section>
        {/* end informasi */}
      </div>
      {/* end kanan */}
    </div>
  );
}

export default InnerDashboard;
