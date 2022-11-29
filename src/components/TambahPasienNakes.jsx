import "./TambahPasienNakes.css";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function TambahPasienNakes() {
    // start ambil data role guard
    const tele = useNavigate();
    const user = localStorage.getItem("credentialLogin");
    const users = JSON.parse(user);
    // end ambil data role guard

    const [NIK, setNIK] = useState("");
    const [nama, setNama] = useState("");
    const [tglLahir, setTglLahir] = useState("");
    const [telp, setTelp] = useState("");
    const [pekerjaan, setPekerjaan] = useState("");
    const [alamat, setAlamat] = useState("");
    const [jenisKelamin, setJenisKelamin] = useState("");
    const [alergiObat, setAlergiObat] = useState("");

    // biar masukan cuman bisa angka
    const handleNumberNIK = (e) => {
        const re = e.target.value.replace(/\D/g, "");
        setNIK(re);
    };

    const handleNumberTelp = (e) => {
        const re = e.target.value.replace(/\D/g, "");
        setTelp(re);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const postData = {
            nik: NIK,
            nama: nama,
            jenis_kelamin: jenisKelamin,
            tanggal_lahir: tglLahir,
            alamat: alamat,
            no_telp: telp,
            alergi_obat: alergiObat,
            pekerjaan: pekerjaan,
        };

        axios
            .post("https://groupproject2-production.up.railway.app/pasien", postData, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((res) => {
                console.log(res);
                alert("Data telah tersimpan");
            })
            .catch((err) => {
                console.log(err);
            });

        setNIK("");
        setNama("");
        setTglLahir("");
        setTelp("");
        setPekerjaan("");
        setAlamat("");
        setJenisKelamin("");
        setAlergiObat("");
    };

    // start role guard
    useEffect(() => {
        console.log(users);
    }, []);
    if (users.role === "dokter") {
        console.log("anda tidak boleh masuk");
        return <Navigate to="/error" />;
        // tele("/error");
    }
    // end role guard

    return (
        <>
            <Sidebar />
            <Navbar />
            <div className="global">
                <div className="row mx-3">
                    <div className="container-sm">
                        {/* BARIS*/}
                        <div className="row">
                            <div className="col-md">
                                <h1 className="title">Tambah Pasien</h1>
                            </div>
                        </div>
                        {/*END BARIS*/}

                        {/* Baris */}
                        <div className="row form-con">
                            <form id="form" onSubmit={handleSubmit}>
                                <div className="row rowForm m-0">
                                    {/* Bagian Kanan */}
                                    <div className="col leftForm p-3">
                                        <div className="row mb-2 inputRow">
                                            <label htmlFor="inputNIK" className="col-sm-4 col-form-label">
                                                NIK
                                            </label>
                                            <div className="col-sm-8">
                                                <input type="text" name="inputNIK" id="inputNIK" placeholder="NIK" min={0} value={NIK} onChange={handleNumberNIK} />
                                            </div>
                                        </div>

                                        <div className="row mb-2 inputRow">
                                            <label htmlFor="inputNama" className="col-sm-4 col-form-label">
                                                Nama Lengkap
                                            </label>
                                            <div className="col-sm-8">
                                                <input type="text" name="inputNama" id="inputNama" placeholder="Nama Lengkap" value={nama} onChange={(e) => setNama(e.target.value)} />
                                            </div>
                                        </div>

                                        <div className="row mb-2 inputRow">
                                            <label htmlFor="inputTglLahir" className="col-sm-4 col-form-label">
                                                Tanggal Lahir
                                            </label>
                                            <div className="col-sm-8">
                                                <input type="date" name="inputTglLahir" id="inputTglLahir" value={tglLahir} onChange={(e) => setTglLahir(e.target.value)} />
                                            </div>
                                        </div>

                                        <div className="row mb-2 inputRow">
                                            <label htmlFor="inputTelp" className="col-sm-4 col-form-label">
                                                No Telepon
                                            </label>
                                            <div className="col-sm-8">
                                                <input type="text" name="inputTelp" id="inputTelp" placeholder="No Telepon" min={0} value={telp} onChange={handleNumberTelp} />
                                            </div>
                                        </div>

                                        <div className="row mb-2 inputRow">
                                            <label htmlFor="inputPekerjaan" className="col-sm-4 col-form-label">
                                                Pekerjaan
                                            </label>
                                            <div className="col-sm-8">
                                                <input type="text" name="inputPekerjaan" id="inputPekerjaan" placeholder="Pekerjaan" value={pekerjaan} onChange={(e) => setPekerjaan(e.target.value)} />
                                            </div>
                                        </div>

                                        <div className="row mb-2 inputRow">
                                            <label htmlFor="inputAlamat" className="col-sm-4 col-form-label">
                                                Alamat
                                            </label>
                                            <div className="col-sm-8">
                                                <textarea name="inputAlamat" id="inputAlamat" placeholder="Alamat" value={alamat} onChange={(e) => setAlamat(e.target.value)}></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    {/* End Bagian kanan */}

                                    {/* Bagian kiri */}
                                    <div className="col rightForm p-3">
                                        <div className="row mb-2 inputRow">
                                            <label htmlFor="gender" className="col-sm-4 col-form-label">
                                                Jenis Kelamin
                                            </label>
                                            <div className="col-sm-8">
                                                <select name="gender" id="gender" className="form-select" defaultValue={"DEFAULT"} onChange={(e) => setJenisKelamin(e.target.value)}>
                                                    <option value="DEFAULT" disabled>
                                                        Pilih Jenis Kelamin
                                                    </option>
                                                    <option value="P">Perempuan</option>
                                                    <option value="L">Laki-Laki</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="row mb-2 inputRow">
                                            <label htmlFor="inputAlergiObat" className="col-sm-4 col-form-label">
                                                Alergi Obat
                                            </label>
                                            <div className="col-sm-8">
                                                <textarea name="inputAlergiObat" id="inputAlergiObat" placeholder="Alergi Obat" rows={5} value={alergiObat} onChange={(e) => setAlergiObat(e.target.value)}></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    {/* end bagian kiri */}
                                    <div className="row buttonRow m-0 mb-3">
                                        <div className="col">
                                            <button id="submitTambahPasien" type="submit">
                                                Simpan
                                            </button>
                                            <button id="submitReset" type="reset">
                                                Reset
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        {/* END Baris */}
                    </div>
                </div>
            </div>
        </>
    );
}

export default TambahPasienNakes;
