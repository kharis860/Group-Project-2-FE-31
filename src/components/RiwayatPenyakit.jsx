import Navbar from "./Navbar";
import "../components/RiwayatPenyakit.css";
import { useDispatch, useSelector } from "react-redux";
import { sendData } from "./Redux/action/dataAction";
import { useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

function RiwayatPenyakit() {
    const tele = useNavigate();
    const dispatch = useDispatch();
    let { id } = useParams();
    const state = useSelector((state) => state.data);
    const stateId = useSelector((state) => state.id);

    console.log(state.pasien);
    console.log(stateId.id);
    state.pasien
        .filter((pasien) => pasien.id == 1)
        .map((val, index) => {
            console.log(val.riwayatPenyakit);
            val.riwayatPenyakit.map((item, index) => console.log(item));
        });
    // useEffect ambil data pasien berdasarkan ID yang dikirim dari halaman data pasien dokter
    useEffect(() => {
        dispatch(sendData());
        const options = {
            method: "GET",
            url: "https://groupproject2-production.up.railway.app/pasien/" + id,
            headers: { accept: "application/json" },
        };

        axios
            .request(options)
            .then(function (response) {
                console.log(response.data);
                setCleanDataRiwayat(response.data);
                console.log(cleanDataRiwayat);
            })
            .catch(function (error) {
                console.error(error);
            });
        console.log(id);
    }, []);

    // useEffect ambil data riwayat penyakit pasien
    useEffect(() => {
        const options = {
            method: "GET",
            url: `https://groupproject2-production.up.railway.app/rekam?id_pasien=${id}`,
            headers: { accept: "application/json" },
        };

        axios
            .request(options)
            .then(function (response) {
                console.log(response.data.data);
                setDataRiwayat(response.data.data);
                console.log(dataRiwayat);
            })
            .catch(function (error) {
                console.error(error);
            });
    }, []);
    const [dataRiwayat, setDataRiwayat] = useState([]);
    const [cleanDataRiwayat, setCleanDataRiwayat] = useState({});
    // start ambil data role guard

    const user = localStorage.getItem("credentialLogin");
    // console.log(JSON.parse(user));
    const users = JSON.parse(user);
    useEffect(() => {
        console.log(users.role);
    }, []);
    // end ambil data role guard

    // start role guard
    if (users.role === "nakes") {
        console.log("anda tidak boleh masuk");
        return <Navigate to="/error" />;
        // tele("/error");
    }
    // end role guard
    if (cleanDataRiwayat.tanggal_lahir) {
        return (
            <div className="global">
                <Navbar />
                {/*start riwayat penyakit*/}
                <section className="pasien">
                    {/*start identitas pasien*/}
                    <div id="identitas" className="Identitas">
                        <div className="head-isi">
                            <h1>Data Pasien</h1>
                            <h6>Identitas Pasien</h6>
                        </div>
                        <div className="id-pasien">
                            <div className="isi-id">
                                <div className="mb-3">
                                    <div className="p-2">
                                        <h5>ID Pasien</h5>
                                        <p>{cleanDataRiwayat._id}</p>
                                    </div>
                                    <div className="p-2">
                                        <h5>Jenis Kelamin</h5>
                                        <p>{cleanDataRiwayat.jenis_kelamin}</p>
                                    </div>
                                    <div className="p-2">
                                        <h5>Pekerjaan</h5>
                                        <p>{cleanDataRiwayat.pekerjaan}</p>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <div className="p-2">
                                        <h5>Nama Lengkap</h5>
                                        <p>{cleanDataRiwayat.nama}</p>
                                    </div>
                                    <div className="p-2">
                                        <h5>Tanggal lahir</h5>
                                        <p>{cleanDataRiwayat.tanggal_lahir.split("T")[0]}</p>
                                    </div>
                                    <div className="p-2">
                                        <h5>Alergi Obat</h5>
                                        <p>{cleanDataRiwayat.alergi_obat}</p>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <div className="p-2">
                                        <h5>NIK</h5>
                                        <p>{cleanDataRiwayat.nik}</p>
                                    </div>
                                    <div className="p-2">
                                        <h5>Alamat</h5>
                                        <p>{cleanDataRiwayat.alamat}</p>
                                    </div>
                                    <div className="p-2">
                                        <h5>Telepon</h5>
                                        <p>{cleanDataRiwayat.no_telp}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*end identitas pasien*/}
                    <div className="riwayat">
                        <div className="head-isi">
                            <h1>Riwayat Penyakit</h1>
                            <div>
                                <div className="akord-riwayat">
                                    {/*codingan bootstrap */}
                                    <Accordion defaultActiveKey={0}>
                                        {dataRiwayat.map((item, index) => (
                                            <Accordion.Item eventKey={index}>
                                                <Accordion.Header>Periksa {index + 1}</Accordion.Header>
                                                <Accordion.Body>
                                                    <div>
                                                        <ul>
                                                            <li>
                                                                <h5>Tanggal Periksa</h5>
                                                            </li>
                                                            <h6>{item.tanggal_rekam.split("T")[0]}</h6>
                                                            <li>
                                                                <h5>Anamnesis</h5>
                                                            </li>
                                                            <h6>{item.anamnesis}</h6>
                                                            <li>
                                                                <h5>Diagnosa</h5>
                                                            </li>
                                                            <h6>{item.diagnosis}</h6>
                                                        </ul>
                                                    </div>
                                                    <div>
                                                        <ul>
                                                            <li>
                                                                <h5>Obat</h5>
                                                            </li>
                                                            <h6>{item.obat}</h6>
                                                            <li>
                                                                <h5>Catatan</h5>
                                                            </li>
                                                            <h6>{item.catatan}</h6>
                                                        </ul>
                                                    </div>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        ))}
                                    </Accordion>
                                    {/*end codingan bootstrap*/}
                                </div>
                            </div>
                        </div>
                        {/*end riwayat penyakit*/}
                    </div>
                </section>
            </div>
        );
    }
}

export default RiwayatPenyakit;
