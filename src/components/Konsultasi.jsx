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
  function teleRekamMedis(index) {
    dispatch(addId(index));
    tele("/dashboard/rekam");
  }
  const dispatch = useDispatch();
  const state = useSelector((state) => state.data);
  const stateId = useSelector((state) => state.id);

  const [filteredList, setFilteredList] = useState(state.pasien);
  filteredList.map((item, index) => {
    if (item.konsultasi == false) {
    }
  });

  const handleSearch = (e) => {
    const inputSearch = e.target.value;

    let updatedList = [...state.pasien];

    updatedList = state.pasien.filter((o) => o.idPasien.includes(inputSearch) || o.namaLengkap.includes(inputSearch));
    setFilteredList(updatedList);
  };

  useEffect(() => {
    dispatch(sendData());
  }, []);
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
                <input type="text" onChange={handleSearch} className="form-control" placeholder="Cari berdasarkan ID Pasien atau Nama" id="inputSearch" />
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
                      ID Pasien
                    </th>
                    <th scope="col">Nama Pasien</th>
                    <th scope="col" className="col-sm-1">
                      Jenis Kelamin
                    </th>
                    <th scope="col" className="col-sm-1">
                      Umur
                    </th>
                    <th scope="col" className="col-sm-2">
                      Tanggal Lahir
                    </th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>

                <tbody className="table-body">
                  {filteredList.map((item, index) =>
                    item.konsultasi ? null : (
                      <tr key={item.id}>
                        <td scope="col">{index + 1}</td>
                        <td scope="col">{item.idPasien}</td>
                        <td scope="col">{item.namaLengkap}</td>
                        <td scope="col">{item.jenisKelamin}</td>
                        <td scope="col">{item.umur}</td>
                        <td scope="col">{item.tanggalLahir}</td>
                        <td scope="col">
                          <button id="submit${i}" onClick={() => teleRekamMedis(index)} className="btn btn-sm" role="button">
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
