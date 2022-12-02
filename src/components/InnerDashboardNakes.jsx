import axios from "axios";
import { useEffect, useState } from "react";
import "../components/Dashboard.css";
import Navbar from "./Navbar";

function InnerDashboardNakes() {
    const [APIData, setAPIData] = useState([]);
    const [APIKonsul, setAPIKonsul] = useState([]);

    useEffect(() => {
        axios
            .get("https://groupproject2-production.up.railway.app/pasien")
            .then((res) => {
                setAPIData(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        axios
            .get("https://groupproject2-production.up.railway.app/konsultasi")
            .then((res) => {
                setAPIKonsul(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

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
                                        <h1 id="jumlahPasien">{APIData.length}</h1>
                                    </div>
                                    <div className="teks mx-3">
                                        <h2>Pasien Terdaftar</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="card-2">
                                <div className="inner-card-1">
                                    <div className="counter">
                                        <h1>{APIKonsul.length}</h1>
                                    </div>
                                    <div className="teks mx-3">
                                        <h2>Pasien Konsultasi</h2>
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
