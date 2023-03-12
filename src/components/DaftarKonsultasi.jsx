import Navbar from "./Navbar";
import "./DaftarKonsultasi.css";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";

function DaftarKonsultasi() {
    // ================= STATE ============================
    // Data Table
    const [APIPasien, setAPIPasien] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const [inputSearch, setInputSearch] = useState("");
    // Data Selected
    const [APIDokter, setAPIDokter] = useState([]);
    // Form Data
    const [inputPasien, setInputPasien] = useState("");
    const [inputPoli, setInputPoli] = useState("");
    const [inputDokter, setInputDokter] = useState("");
    // Role guard
    const user = localStorage.getItem("credentialLogin");
    const users = JSON.parse(user);

    // ====================== USE EFFECT =====================
    // get data pasien
    useEffect(() => {
        axios
            .get("https://groupproject2-production.up.railway.app/pasien")
            .then(function (response) {
                // console.log(response.data.data);
                setAPIPasien(response.data.data);
            })
            .catch(function (error) {
                console.error(error);
            });
    }, []);

    // get data dokter
    useEffect(() => {
        axios
            .get("https://groupproject2-production.up.railway.app/user?role=dokter")
            .then((response) => {
                setAPIDokter(response.data.data);
                // console.log(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    // ==================== HANDLE FUNCTION =================
    // search handle
    const handleSearch = (searchValue) => {
        setInputSearch(searchValue);

        if (inputSearch !== "") {
            const filteredData = APIPasien.filter((item) => {
                return Object.values(item.nama).join("").toLowerCase().includes(searchValue.toLowerCase());
            });
            setFilteredList(filteredData);
        } else {
            setFilteredList(APIPasien);
        }
    };

    // submit handle
    const handleSubmit = (e) => {
        e.preventDefault();

        const postData = {
            pasien: inputPasien,
            dokter: inputDokter,
            poli: inputPoli,
            status: false,
        };

        axios
            .post("https://groupproject2-production.up.railway.app/konsultasi", postData, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((res) => {
                console.log(res);
                if (res.status === 200) {
                    swal({
                        title: "Sukses!",
                        text: "Pendaftaran Konsultasi Berhasil!",
                        icon: "success",
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                if (err.status !== 200) {
                    swal({
                        title: "Gagal",
                        text: "Gagal Mendaftarkan Konsultasi",
                        icon: "error",
                    });
                }
            });

        handleReset();
    };

    // handle radio button
    const handleRadio = (e) => {
        setInputPoli(e.target.value);
        // console.log(e.target.value);
    };

    // handle reset form
    const handleReset = () => {
        setInputPasien("");
        setInputPoli("");
        setInputDokter("");
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
                                    <input type="text" className="form-control" placeholder="Cari berdasarkan Nama Pasien" id="inputSearch" onChange={(e) => handleSearch(e.target.value)} />
                                    <span className="input-group-text" id="icon-search">
                                        <i className="material-icons">search</i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {inputSearch.length > 1 ? tableSearch(filteredList) : null}

                    <div className="daftar">
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="pasien">
                                <strong>ID Pasien</strong>
                            </label>
                            <input type="text" id="pasien" name="pasien" className="inputText" value={inputPasien} onChange={(e) => setInputPasien(e.target.value)} placeholder="Masukkan ID Pasien" required />
                            <p className="text-muted fst-italic">
                                <small>Salin ID Pasien dari hasil pencarian berdasarkan nama</small>
                            </p>
                            <label htmlFor="poli">
                                <strong>Poli</strong>
                            </label>
                            <div className="radio">
                                <label htmlFor="umum" className="labelRadio">
                                    <input type="radio" value="umum" name="poli" checked={inputPoli === "umum"} onChange={handleRadio} /> Umum
                                </label>
                                <br />
                                <label htmlFor="gigi" className="labelRadio">
                                    <input type="radio" value="gigi" name="poli" checked={inputPoli === "gigi"} onChange={handleRadio} /> Gigi
                                </label>
                            </div>
                            <label htmlFor="dokter" className="mt-2">
                                <strong>Dokter</strong>
                            </label>
                            <select name="dokter" id="dokter" value={inputDokter} onChange={(e) => setInputDokter(e.target.value)} required>
                                <option>Opsi Dokter</option>
                                {APIDokter.length ? (
                                    APIDokter.map((item) => {
                                        return <option value={item._id}>{item.nama}</option>;
                                    })
                                ) : (
                                    <></>
                                )}
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

const tableSearch = (filteredList) => {
    return (
        <div className="row">
            <div className="col-md table-responsive-md con-table">
                <table className="table table-striped table-hover table-bordered table-md text-center vertical-align: middle;">
                    <thead>
                        <tr>
                            <th scope="col" className="col-sm-1">
                                No
                            </th>
                            <th scope="col" className="col-sm-2">
                                ID Pasien
                            </th>
                            <th scope="col" className="col-sm-2">
                                NIK
                            </th>
                            <th scope="col" className="col-sm-2">
                                Nama Pasien
                            </th>
                            <th scope="col" className="col-sm-2">
                                Jenis Kelamin
                            </th>
                            <th scope="col" className="col-sm-2">
                                Tanggal Lahir
                            </th>
                            <th scope="col" className="col-sm-2">
                                Alamat
                            </th>
                        </tr>
                    </thead>
                    <tbody className="table-body">
                        {filteredList.map((item, index) => {
                            return (
                                <tr id="row" key={index}>
                                    <td scope="col">{index + 1}</td>
                                    <td scope="col">{item._id}</td>
                                    <td scope="col">{item.nik}</td>
                                    <td scope="col">{item.nama}</td>
                                    <td scope="col">{item.jenis_kelamin}</td>
                                    <td scope="col">{item.tanggal_lahir.split("T")[0]}</td>
                                    <td scope="col">{item.alamat}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
