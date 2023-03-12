import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sendData } from "./Redux/action/dataAction";
import { useEffect, useState } from "react";
import { isDocument } from "@testing-library/user-event/dist/utils";
import { addId } from "./Redux/action/idAction";
import { Navigate } from "react-router-dom";

function Konsultasi() {
    const tele = useNavigate();
    function teleRekamMedis(idKonsul, id) {
        dispatch(addId(idKonsul));
        tele("/dashboard/rekam/" + id);

        // localStorage.setItem("credentialConsultasi", JSON.stringify(credential));
    }
    const dispatch = useDispatch();
    const state = useSelector((state) => state.data);
    const stateId = useSelector((state) => state.id);

    const APIData = state.pasien;
    const [filteredList, setFilteredList] = useState([]);
    const [inputSearch, setInputSearch] = useState("");

    const handleSearch = (searchValue) => {
        setInputSearch(searchValue);

        if (inputSearch !== "") {
            const filteredData = APIData.filter((item) => {
                console.log(item.pasien.nama);
                // return item.pasien.nama;
                return Object.values(item.pasien.nama).join("").toLowerCase().includes(searchValue.toLowerCase());
            });
            console.log(filteredData);
            setFilteredList(filteredData);
        } else {
            setFilteredList(APIData);
        }
    };

    filteredList.map((item, index) => (item.status ? null : console.log(item.pasien)));

    useEffect(() => {
        dispatch(sendData());
    }, []);
    // start ambil data role guard

    const user = localStorage.getItem("credentialLogin");
    // console.log(JSON.parse(user));
    const users = JSON.parse(user);
    console.log(users.roles);
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
            {/*start tabel*/}
            <div className="row mx-3">
                <div className="container-sm">
                    {/*BARIS*/}
                    <div className="row">
                        <div className="col-md">
                            <h1 className="title">Konsultasi Hari Ini</h1>
                        </div>
                    </div>

                    {/*END BARIS*/}

                    {/*BARIS*/}
                    <div className="row">
                        <div className="col-xl-6">
                            <div className="input-group flex-nowrap">
                                <input type="text" onChange={(e) => handleSearch(e.target.value)} className="form-control" placeholder="Cari berdasarkan Nama Pasien" id="inputSearch" />
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
                        <div className="col-md table-responsive-md">
                            <table className="table table-striped table-hover table-bordered table-md text-center vertical-align: middle;">
                                <thead>
                                    <tr>
                                        <th scope="col" className="col-sm-1">
                                            No
                                        </th>
                                        <th scope="col" className="col-sm-2">
                                            NIK
                                        </th>
                                        <th scope="col">Nama Pasien</th>
                                        <th scope="col" className="col-sm-1">
                                            Jenis Kelamin
                                        </th>
                                        <th scope="col" className="col-sm-1">
                                            Telepon
                                        </th>
                                        <th scope="col" className="col-sm-2">
                                            Tanggal Lahir
                                        </th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>

                                <tbody className="table-body">
                                    {inputSearch.length > 1
                                        ? filteredList.map((item, index) =>
                                              item.status ? null : (
                                                  <tr key={index}>
                                                      <td scope="col">{index + 1}</td>
                                                      <td scope="col">{item.pasien.nik}</td>
                                                      <td scope="col">{item.pasien.nama}</td>
                                                      <td scope="col">{item.pasien.jenis_kelamin}</td>
                                                      <td scope="col">{item.pasien.no_telp}</td>
                                                      <td scope="col">{item.pasien.tanggal_lahir.split("T")[0]}</td>
                                                      <td scope="col">
                                                          <button id="submit${i}" onClick={() => teleRekamMedis(item._id, item.pasien._id)} className="btn btn-sm" role="button">
                                                              <i className="material-icons" style={{ font_size: "15px" }}>
                                                                  edit
                                                              </i>
                                                              Edit
                                                          </button>
                                                      </td>
                                                  </tr>
                                              )
                                          )
                                        : APIData.map((item, index) =>
                                              item.status ? null : (
                                                  <tr key={index}>
                                                      <td scope="col">{index + 1}</td>
                                                      <td scope="col">{item.pasien.nik}</td>
                                                      <td scope="col">{item.pasien.nama}</td>
                                                      <td scope="col">{item.pasien.jenis_kelamin}</td>
                                                      <td scope="col">{item.pasien.no_telp}</td>
                                                      <td scope="col">{item.pasien.tanggal_lahir.split("T")[0]}</td>
                                                      <td scope="col">
                                                          <button id="submit${i}" onClick={() => teleRekamMedis(item._id, item.pasien._id)} className="btn btn-sm" role="button">
                                                              <i className="material-icons" style={{ font_size: "15px" }}>
                                                                  edit
                                                              </i>
                                                              Edit
                                                          </button>
                                                      </td>
                                                  </tr>
                                              )
                                          )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Konsultasi;
