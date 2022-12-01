import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import ModalDataPasien from "./ModalDataPasien";

function ListPasienNakes() {
    // ============================ STATE ===============
    const tele = useNavigate();
    // Modal
    const [modalShow, setModalShow] = useState(false);
    const [modalState, setModalState] = useState({});
    // Data Table
    const [APIData, setAPIData] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const [inputSearch, setInputSearch] = useState("");
    // Role Guard
    const user = localStorage.getItem("credentialLogin");
    const users = JSON.parse(user);

    // =============== HANDLE FUNCTION ====================
    // navigation of button Tambah Pasien
    const tambahPasien = (e) => {
        tele("/dashboardNakes/tambah");
    };

    // search handle
    const handleSearch = (searchValue) => {
        setInputSearch(searchValue);

        if (inputSearch !== "") {
            const filteredData = APIData.filter((item) => {
                return Object.values(item.nama).join("").toLowerCase().includes(searchValue.toLowerCase());
            });
            setFilteredList(filteredData);
        } else {
            setFilteredList(APIData);
        }
    };

    // role guard
    if (users.role === "dokter") {
        console.log("anda tidak boleh masuk");
        return <Navigate to="/error" />;
        // tele("/error");
    }

    // ====================== USE EFFECT ===============
    // Get Data Pasien
    useEffect(() => {
        axios
            .get("https://groupproject2-production.up.railway.app/pasien")
            .then((res) => {
                setAPIData(res.data.data);
                // console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    // Data role guard
    // useEffect(() => {
    //     console.log(users);
    // }, []);

    return (
        <>
            <Navbar />
            <div className="global">
                {/* start kanan*/}
                {/*start tabel*/}
                <div className="row mx-3">
                    <div className="container-sm">
                        {/* BARIS*/}
                        <div className="row">
                            <div className="col-md">
                                <h1 className="title">Data Pasien</h1>
                            </div>
                        </div>
                        {/*END BARIS*/}

                        {/*BARIS*/}
                        <div className="row">
                            <div className="col-3">
                                <div className="input-group flex-nowrap">
                                    <button className="btn" onClick={tambahPasien}>
                                        + Tambah Pasien
                                    </button>
                                </div>
                            </div>
                            <div className="col-3"></div>
                            <div className="col-6">
                                <div className="input-group flex-nowrap">
                                    <input type="text" onChange={(e) => handleSearch(e.target.value)} className="form-control" placeholder="Cari berdasarkan ID Pasien atau Nama" id="inputSearch" />
                                    <span className="input-group-text" id="icon-search">
                                        {" "}
                                        <i className="material-icons">search</i>
                                    </span>
                                </div>
                            </div>
                        </div>
                        {/* END BARIS */}

                        {/*BARIS*/}
                        <div className="row">
                            <div className="col-md table-responsive-md con-table">
                                <table className="table table-striped table-hover table-bordered table-md text-center vertical-align: middle;">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="col-sm-1">
                                                No
                                            </th>
                                            <th scope="col" className="col-sm-1">
                                                NIK
                                            </th>
                                            <th scope="col">Nama Pasien</th>
                                            <th scope="col" className="col-sm-1">
                                                Jenis Kelamin
                                            </th>
                                            <th scope="col" className="col-sm-1">
                                                Tanggal Lahir
                                            </th>
                                            <th scope="col" className="col-sm-2">
                                                Alamat
                                            </th>
                                            <th scope="col" className="col-sm-1">
                                                No. Telp
                                            </th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="table-body">
                                        {inputSearch.length > 1
                                            ? filteredList.map((item, index) => {
                                                  return (
                                                      <tr id="row" key={index}>
                                                          <td scope="col">{index + 1}</td>
                                                          <td scope="col">{item.nik}</td>
                                                          <td scope="col">{item.nama}</td>
                                                          <td scope="col">{item.jenis_kelamin}</td>
                                                          <td scope="col">{item.tanggal_lahir.split("T")[0]}</td>
                                                          <td scope="col">{item.alamat}</td>
                                                          <td scope="col">{item.no_telp}</td>
                                                          <td scope="col">
                                                              <button
                                                                  id=""
                                                                  className="btn btn-sm"
                                                                  role="button"
                                                                  onClick={() => {
                                                                      setModalShow(true);
                                                                  }}
                                                              >
                                                                  <i className="material-icons">zoom_in</i>
                                                                  Lihat
                                                              </button>
                                                          </td>
                                                      </tr>
                                                  );
                                              })
                                            : APIData.map((item, index) => {
                                                  return (
                                                      <tr id="row" key={index}>
                                                          <td scope="col">{index + 1}</td>
                                                          <td scope="col">{item.nik}</td>
                                                          <td scope="col">{item.nama}</td>
                                                          <td scope="col">{item.jenis_kelamin}</td>
                                                          <td scope="col">{item.tanggal_lahir.split("T")[0]}</td>
                                                          <td scope="col">{item.alamat}</td>
                                                          <td scope="col">{item.no_telp}</td>
                                                          <td scope="col">
                                                              <button
                                                                  id=""
                                                                  className="btn btn-sm"
                                                                  role="button"
                                                                  onClick={() => {
                                                                      setModalState(item);
                                                                      setModalShow(true);
                                                                  }}
                                                              >
                                                                  <i className="material-icons">zoom_in</i>
                                                                  Lihat
                                                              </button>
                                                          </td>
                                                      </tr>
                                                  );
                                              })}
                                        {modalShow ? <ModalDataPasien show={modalShow} onHide={() => setModalShow(false)} data={modalState} /> : null}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ListPasienNakes;
