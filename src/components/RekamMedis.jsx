import Navbar from "./Navbar";
import { Accordion } from "react-bootstrap";
import "../components/RekamMedis.css";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { sendData } from "./Redux/action/dataAction";
import { useEffect } from "react";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import swal from "sweetalert";

function RekamMedis() {
    const tele = useNavigate();
    const dispatch = useDispatch();
    let { id } = useParams();
    const state = useSelector((state) => state.data);
    const stateId = useSelector((state) => state.id);
    console.log(state.pasien);
    console.log(stateId.id);

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
                setCleanDataPasien(response.data);
                console.log(cleanDataPasien);
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
    const [isiTanggal, setIsiTanggal] = useState("");
    const [isiAnamnesis, setIsiAnamnesis] = useState("");
    const [isiDiagnosis, setIsiDiagnosis] = useState("");
    const [isiObat, setIsiObat] = useState("");
    const [isiCatatan, setIsiCatatan] = useState("");
    const [cleanDataPasien, setCleanDataPasien] = useState({});
    console.log(dataRiwayat);
    const handleSubmit = (e) => {
        e.preventDefault();
        const postData = {
            konsultasi: stateId.id,
            pasien: id,
            anamnesis: isiAnamnesis,
            diagnosis: isiDiagnosis,
            obat: isiObat,
            catatan: isiCatatan,
        };

        axios

            .post(`https://groupproject2-production.up.railway.app/rekam`, postData)

            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });

        setIsiTanggal("");
        setIsiAnamnesis("");
        setIsiDiagnosis("");
        setIsiObat("");
        setIsiCatatan("");

        const editStatus = { status: true };

        // mengupdate data menjadi true
        axios.patch(`https://groupproject2-production.up.railway.app/konsultasi/${stateId.id}`, editStatus).then((res) => {
            console.log(res);
        });

        swal({
            title: "Sukses!",
            text: "Berhasil Menambahkan Rekam Medis!",
            icon: "success",
        });
    };

    const user = localStorage.getItem("credentialLogin");
    // console.log(JSON.parse(user));
    const users = JSON.parse(user);
    useEffect(() => {
        console.log(users.role);
    }, []);
    useEffect(() => {
        console.log(id);
    }, []);

    // end ambil data role guard

    // start role guard
    if (users.role === "nakes") {
        console.log("anda tidak boleh masuk");
        return <Navigate to="/error" />;
        // tele("/error");
    }
    // end role guard

    return (
        <div className="global">
            <Navbar />
            {/*start riwayat penyakit*/}
            <section className="pasien">
                {/*start identitas pasien*/}
                <div id="identitas" className="Identitas">
                    {/*isi dari js*/}
                    <div className="head-isi">
                        <h1>Data Pasien</h1>
                        <h6>Identitas Pasien</h6>
                    </div>
                    <div className="id-pasien">
                        <div className="isi-id">
                            <div className="mb-3">
                                <div className="p-2">
                                    <h5>ID Pasien</h5>
                                    <p>{cleanDataPasien._id}</p>
                                </div>
                                <div className="p-2">
                                    <h5>Jenis Kelamin</h5>
                                    <p>{cleanDataPasien.jenis_kelamin}</p>
                                </div>
                                <div className="p-2">
                                    <h5>Pekerjaan</h5>
                                    <p>{cleanDataPasien.pekerjaan}</p>
                                </div>
                            </div>
                            <div className="mb-3">
                                <div className="p-2">
                                    <h5>Nama Lengkap</h5>
                                    <p>{cleanDataPasien.nama}</p>
                                </div>
                                <div className="p-2">
                                    <h5>Tanggal lahir</h5>
                                    <p>{cleanDataPasien.tanggal_lahir}</p>
                                </div>
                                <div className="p-2">
                                    <h5>Alergi Obat</h5>
                                    <p>{cleanDataPasien.alergi_obat}</p>
                                </div>
                            </div>
                            <div className="mb-3">
                                <div className="p-2">
                                    <h5>NIK</h5>
                                    <p>{cleanDataPasien.nik}</p>
                                </div>
                                <div className="p-2">
                                    <h5>Alamat</h5>
                                    <p>{cleanDataPasien.alamat}</p>
                                </div>
                                <div className="p-2">
                                    <h5>Telepon</h5>
                                    <p>{cleanDataPasien.no_telp}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*end identitas pasien*/}

                {/* start akordion riwayat */}
                <div className="riwayat">
                    <div className="head-isi">
                        <h1>Riwayat Penyakit</h1>
                        <div>
                            <div className="akord-riwayat">
                                {/*codingan bootstrap */}
                                <Accordion defaultActiveKey={0}>
                                    {dataRiwayat.map((item, index) => (
                                        <Accordion.Item eventKey={index} key={index}>
                                            <Accordion.Header>Periksa {index + 1}</Accordion.Header>
                                            <Accordion.Body>
                                                <div>
                                                    <ul>
                                                        <li>
                                                            <h5>Tanggal Periksa</h5>
                                                        </li>
                                                        <h6>{item.tanggal_rekam}</h6>
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
                {/* end akordion riwayat */}
                {/* start form isi rekam medis */}
                <div className="rekam">
                    <div className="head-rekam">
                        <h1>Isi Rekam Medis</h1>
                    </div>
                    <div className="form-rekam">
                        <form id="tArea" onSubmit={handleSubmit}>
                            <div className="grid-container">
                                <div className="field">
                                    <label>Anamnesis</label>
                                    <textarea id="isiAnamnesis" value={isiAnamnesis} onChange={(e) => setIsiAnamnesis(e.target.value)} rows="4" cols="50" placeholder="Masukkan anamnesis..." required></textarea>
                                </div>
                                <div className="field">
                                    <label>Diagnosis</label>
                                    <textarea id="isiDiagnosis" value={isiDiagnosis} onChange={(e) => setIsiDiagnosis(e.target.value)} rows="4" cols="50" placeholder="Masukkan diagnosis..." required></textarea>
                                </div>
                                <div className="field">
                                    <label>Obat</label>
                                    <textarea id="isiObat" value={isiObat} onChange={(e) => setIsiObat(e.target.value)} rows="4" cols="50" placeholder="Masukkan obat..." required></textarea>
                                </div>
                                <div className="field">
                                    <label>Catatan</label>
                                    <textarea id="isiCatatan" value={isiCatatan} onChange={(e) => setIsiCatatan(e.target.value)} rows="4" cols="50" placeholder="Masukkan catatan..." required></textarea>
                                    <p className="text-muted fst-italic">
                                        isi dengan kata <b>tidak ada</b> jika tidak tambahan
                                    </p>
                                </div>
                            </div>
                            <div className="button-rekam">
                                <button id="submitRiwayat" type="submit">
                                    Simpan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default RekamMedis;
