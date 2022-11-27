import Navbar from "./Navbar";
import { Accordion } from "react-bootstrap";
import "../components/RekamMedis.css";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { sendData } from "./Redux/action/dataAction";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function RekamMedis() {
  const tele = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.data);
  const stateId = useSelector((state) => state.id);

  useEffect(() => {
    dispatch(sendData());
  }, []);

  const [isiTanggal, setIsiTanggal] = useState("");
  const [isiAnamnesis, setIsiAnamnesis] = useState("");
  const [isiDiagnosis, setIsiDiagnosis] = useState("");
  const [isiObat, setIsiObat] = useState("");
  const [isiCatatan, setIsiCatatan] = useState("");
  const [tes, setTes] = useState([]);
  useEffect(() => {
    axios.get("https://6350e03cdfe45bbd55b074ed.mockapi.io/medTechAPI/pasien/3").then((element) => {
      setTes(element.data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const postData = {
      tanggalBerobat: isiTanggal,
      anamnesis: isiAnamnesis,
      diagnosis: isiDiagnosis,
      obat: isiObat,
      catatan: isiCatatan,
    };

    axios

      .post(`https://6350e03cdfe45bbd55b074ed.mockapi.io/medTechAPI/pasien/3`, postData)

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
  };
  // start ambil data role guard

  const user = localStorage.getItem("user");
  // console.log(JSON.parse(user));
  const users = JSON.parse(user);
  console.log(users.roles);
  // end ambil data role guard

  // start role guard
  if (users.roles === "nakes") {
    console.log("anda tidak boleh masuk");
    return <Navigate to="/error" />;
    // tele("/error");
  } else {
    tele("/data");
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
          {state.pasien
            .filter((pasien) => pasien.id == stateId.id + 1)
            .map((item, index) => (
              <div className="id-pasien" key={index}>
                <div className="isi-id">
                  <div className="mb-3">
                    <div className="p-2">
                      <h5>NIK</h5>
                      <p>{item.NIK}</p>
                    </div>
                    <div className="p-2">
                      <h5>Jenis Kelamin</h5>
                      <p>{item.jenisKelamin}</p>
                    </div>
                    <div className="p-2">
                      <h5>Pekerjaan</h5>
                      <p>{item.pekerjaan}</p>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="p-2">
                      <h5>Nama Lengkap</h5>
                      <p>{item.namaLengkap}</p>
                    </div>
                    <div className="p-2">
                      <h5>Tanggal lahir</h5>
                      <p>{item.tanggalLahir}</p>
                    </div>
                    <div className="p-2">
                      <h5>Alergi Obat</h5>
                      <p>{item.alergiObat[0]}</p>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="p-2">
                      <h5>Umur</h5>
                      <p>{item.umur}</p>
                    </div>
                    <div className="p-2">
                      <h5>Alamat</h5>
                      <p>{item.alamat}</p>
                    </div>
                    <div className="p-2">
                      <h5>Konsultasi Pertama</h5>
                      <p>{item.konsultasiPertama}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {/*end identitas pasien*/}

        {/* start akordion riwayat */}
        <div className="riwayat">
          <div className="head-isi">
            <h1>Riwayat Penyakit</h1>
            {state.pasien
              .filter((pasien) => pasien.id == stateId.id + 1)
              .map((item, index) => (
                <div>
                  <div className="akord-riwayat" key={index}>
                    {/*codingan bootstrap */}
                    <Accordion defaultActiveKey={index}>
                      {item.riwayatPenyakit.map((itemm, indexx) => (
                        <Accordion.Item eventKey={indexx} key={indexx}>
                          <Accordion.Header>Periksa {indexx + 1}</Accordion.Header>
                          <Accordion.Body key={indexx}>
                            <div>
                              <ul>
                                <li>
                                  <h5>Tanggal Periksa</h5>
                                </li>
                                <h6>{itemm.tanggalBerobat}</h6>
                                <li>
                                  <h5>Anamnesis</h5>
                                </li>
                                <h6>{itemm.anamnesis}</h6>
                                <li>
                                  <h5>Diagnosa</h5>
                                </li>
                                <h6>{itemm.diagnosis}</h6>
                              </ul>
                            </div>
                            <div>
                              <ul>
                                <li>
                                  <h5>Obat</h5>
                                </li>
                                <h6>{itemm.obat}</h6>
                                <li>
                                  <h5>Catatan</h5>
                                </li>
                                <h6>{itemm.catatan}</h6>
                              </ul>
                            </div>
                          </Accordion.Body>
                        </Accordion.Item>
                      ))}
                    </Accordion>
                    {/*end codingan bootstrap*/}
                  </div>
                </div>
              ))}
          </div>

          {/*end riwayat penyakit*/}
        </div>
        {/* end akordion riwayat */}
        {/* start form isi rekam medis */}
        <div className="rekam">
          <div className="head-rekam">
            <h1>Isi Rekam Medis</h1>
          </div>
          <div className="date">
            <form onSubmit={handleSubmit}>
              <label>Tanggal periksa</label>
              <input type="text" value={isiTanggal} onChange={(e) => setIsiTanggal(e.target.value)} id="isiTanggal" placeholder="19 agustus 2021" />
            </form>
          </div>
          <div className="form-rekam">
            <form id="tArea" onSubmit={handleSubmit}>
              <div className="grid-container">
                <div className="field">
                  <label>Anamnesis</label>
                  <textarea id="isiAnamnesis" value={isiAnamnesis} onChange={(e) => setIsiAnamnesis(e.target.value)} rows="4" cols="50" placeholder="Masukkan hasil anamnesis..."></textarea>
                </div>
                <div className="field">
                  <label>Diagnosis</label>
                  <textarea id="isiDiagnosis" value={isiDiagnosis} onChange={(e) => setIsiDiagnosis(e.target.value)} rows="4" cols="50" placeholder="Masukkan diagnosis..."></textarea>
                </div>
                <div className="field">
                  <label>Obat</label>
                  <textarea id="isiObat" value={isiObat} onChange={(e) => setIsiObat(e.target.value)} rows="4" cols="50" placeholder="Masukkan obat..."></textarea>
                </div>
                <div className="field">
                  <label>Catatan</label>
                  <textarea id="isiCatatan" value={isiCatatan} onChange={(e) => setIsiCatatan(e.target.value)} rows="4" cols="50" placeholder="Masukkan catatan..."></textarea>
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
