import "../components/Dashboard.css";
import Navbar from "./Navbar";

function InnerDashboardNakes() {
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
