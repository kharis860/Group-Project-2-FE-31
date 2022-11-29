import "../components/Dashboard.css";

function InnerDashboardNakes() {
  return (
    <div>
      {/*start kanan*/}
      <div className="global">
        {/* navbar start*/}
        <nav className="nav">
          <div className="profil">
            <h5>Danar Riko</h5>

            <img src={require("../Img/person.png")} alt="" width="40px" />
          </div>
        </nav>
        {/* end navbar*/}

        {/* start informasi */}
        <section className="info">
          <div className="general">
            <div className="card-container">
              <div className="card-1">
                <div className="inner-card-1">
                  <div className="counter">
                    <h1 id="jumlahPasien"></h1>
                  </div>
                  <div className="teks">
                    <h2>Jumlah Pasien</h2>
                  </div>
                </div>
              </div>
              <div className="card-2">
                <div className="inner-card-1">
                  <div className="counter">
                    <h1>18</h1>
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

export default InnerDashboardNakes;
