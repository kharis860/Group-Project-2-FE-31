import "./TambahPasienNakes.css";
import Navbar from "./Navbar";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Col, Container, Form, FormGroup, Row } from "react-bootstrap";
import swal from "sweetalert";

function TambahPasienNakes() {
    // ======================= STATE =====================
    // role guard
    const user = localStorage.getItem("credentialLogin");
    const users = JSON.parse(user);
    // form state
    const [NIK, setNIK] = useState("");
    const [nama, setNama] = useState("");
    const [tglLahir, setTglLahir] = useState("");
    const [telp, setTelp] = useState("");
    const [pekerjaan, setPekerjaan] = useState("");
    const [alamat, setAlamat] = useState("");
    const [jenisKelamin, setJenisKelamin] = useState("");
    const [alergiObat, setAlergiObat] = useState("");

    // ================ HANDLE FUNCTION ====================
    // Input just for number func
    const handleNumberNIK = (e) => {
        const re = e.target.value.replace(/\D/g, "");
        setNIK(re);
    };

    // Input just for number func
    const handleNumberTelp = (e) => {
        const re = e.target.value.replace(/\D/g, "");
        setTelp(re);
    };

    // submit form handle
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
            .post("https://groupproject2-production.up.railway.app/pasien", postData)
            .then((res) => {
                console.log(res);
                if (res.status === 200) {
                    swal({
                        title: "Sukses!",
                        text: "Berhasil Menambahkan Data Pasien!",
                        icon: "success",
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                if (err.status !== 200) {
                    swal({
                        title: "Gagal",
                        text: "Gagal Menambahkan Data Pasien",
                        icon: "error",
                    });
                }
            });

        handleReset();
    };

    // reset form handle
    const handleReset = () => {
        setNIK("");
        setNama("");
        setTglLahir("");
        setTelp("");
        setPekerjaan("");
        setAlamat("");
        setJenisKelamin("");
        setAlergiObat("");
    };

    const handleInfoAlert = () => {
        swal({
            title: "Sukses!",
            text: "Reset Form Berhasil",
            icon: "info",
        });
    };

    // role guard
    if (users.role === "dokter") {
        console.log("anda tidak boleh masuk");
        return <Navigate to="/error" />;
    }

    return (
        <>
            <Navbar />
            <div className="global">
                <div className="row mx-3 ">
                    <div className="container-sm mb-2">
                        {/* BARIS*/}
                        <div className="row">
                            <div className="col-md">
                                <h1 className="title">Tambah Pasien</h1>
                            </div>
                        </div>
                        {/*END BARIS*/}

                        {/* Baris */}
                        <Form id="form" className="mt-3 ms-3 pb-3 pe-3" onSubmit={handleSubmit} style={{ border: "1px solid black", boxShadow: "1px 1px 5px black" }}>
                            <Row>
                                {/* KOLOM 1 */}
                                <Col className="colLeft">
                                    <Form.Group className="mb-3">
                                        <Form.Label className="formLabel">NIK</Form.Label>
                                        <Form.Control type="text" name="inputNIK" className="inputForm" placeholder="Masukkan 16 digit angka NIK" min={0} value={NIK} onChange={handleNumberNIK} maxLength={16} required />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="formLabel">Nama Lengkap</Form.Label>
                                        <Form.Control type="text" name="inputNama" className="inputForm" placeholder="Nama Lengkap" min={0} value={nama} onChange={(e) => setNama(e.target.value)} required />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="formLabel">Tanggal Lahir</Form.Label>
                                        <Form.Control type="date" name="inputTglLahir" className="inputForm" value={tglLahir} onChange={(e) => setTglLahir(e.target.value)} required />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="formLabel">Jenis Kelamin</Form.Label>
                                        <Form.Select name="gender" className="inputForm" onChange={(e) => setJenisKelamin(e.target.value)} value={jenisKelamin} required>
                                            <option>Pilih Jenis Kelamin</option>
                                            <option value="Perempuan">Perempuan</option>
                                            <option value="Laki-laki">Laki-Laki</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="formLabel">Pekerjaan</Form.Label>
                                        <Form.Control type="text" name="inputPekerjaan" className="inputForm" placeholder="Pekerjaan" value={pekerjaan} onChange={(e) => setPekerjaan(e.target.value)} required />
                                    </Form.Group>
                                </Col>
                                {/* KOLOM 2 */}
                                <Col className=" colRight me-3">
                                    <Form.Group className="mb-3">
                                        <Form.Label className="formLabel">Alamat</Form.Label>
                                        <Form.Control as={"textarea"} name="inputAlamat" className="inputForm" placeholder="Alamat" value={alamat} onChange={(e) => setAlamat(e.target.value)} required />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="formLabel">No Telpon</Form.Label>
                                        <Form.Control type="text" name="inputTelp" className="inputForm" placeholder="No Telepon" min={0} value={telp} onChange={handleNumberTelp} maxLength={12} required />
                                        <Form.Text className="text-muted fst-italic">max 12 digit angka, ex. 08XXXXXXXXXX</Form.Text>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="formLabel">Alergi Obat</Form.Label>
                                        <Form.Control as={"textarea"} name="inputAlergiObat" className="inputForm" placeholder="Alergi Obat" rows={3} value={alergiObat} onChange={(e) => setAlergiObat(e.target.value)} required />
                                        <Form.Text className="text-muted fst-italic">isi dengan tanda strip (-) jika tidak memiliki alergi</Form.Text>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="d-grid gap-2 d-md-flex justify-content-md-end buttonRow">
                                    <Button id="submitTambahPasien" type="submit">
                                        Simpan
                                    </Button>
                                    <Button id="submitReset" type="reset" onClick={(handleReset, handleInfoAlert)}>
                                        Reset
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                        {/* END Baris */}
                    </div>
                </div>
            </div>
        </>
    );
}

export default TambahPasienNakes;
