import "./TambahPasienNakes.css";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function TambahPasienNakes() {
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
                        <div className="row form-con mb-3">
                            <form className="form">
                                <div className="row rowForm m-0">
                                    {/* Bagian Kanan */}
                                    <div className="col leftForm p-3">
                                        <div className="row mb-2 inputRow">
                                            <label htmlFor="inputNIK" className="col-sm-4 col-form-label">
                                                NIK
                                            </label>
                                            <div className="col-sm-8">
                                                <input type="number" name="inputNIK" id="inputNIK" placeholder="NIK" min={0} />
                                            </div>
                                        </div>

                                        <div className="row mb-2 inputRow">
                                            <label htmlFor="inputNama" className="col-sm-4 col-form-label">
                                                Nama Lengkap
                                            </label>

                                            <div className="col-sm-8">
                                                <input type="text" name="inputNama" id="inputNama" placeholder="Nama Lengkap" />
                                            </div>
                                        </div>

                                        <div className="row mb-2 inputRow">
                                            <label htmlFor="inputTglLahir" className="col-sm-4 col-form-label">
                                                Tanggal Lahir
                                            </label>
                                            <div className="col-sm-8">
                                                <input type="date" name="inputTglLahir" id="inputTglLahir" />
                                            </div>
                                        </div>

                                        <div className="row mb-2 inputRow">
                                            <label htmlFor="inputUmur" className="col-sm-4 col-form-label">
                                                Umur
                                            </label>
                                            <div className="col-sm-8">
                                                <input type="number" name="inputUmur" id="inputUmur" placeholder="Umur" min={0} />
                                            </div>
                                        </div>

                                        <div className="row mb-2 inputRow">
                                            <label htmlFor="inputPekerjaan" className="col-sm-4 col-form-label">
                                                Pekerjaan
                                            </label>
                                            <div className="col-sm-8">
                                                <input type="text" name="inputPekerjaan" id="inputPekerjaan" placeholder="Pekerjaan" />
                                            </div>
                                        </div>

                                        <div className="row mb-2 inputRow">
                                            <label htmlFor="inputAlamat" className="col-sm-4 col-form-label">
                                                Alamat
                                            </label>
                                            <div className="col-sm-8">
                                                <textarea name="inputAlamat" id="inputAlamat" placeholder="Alamat"></textarea>
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
                                                <select name="gender" id="gender" className="form-select">
                                                    <option selected>Pilih Jenis Kelamin</option>
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
                                                <textarea name="inputAlergiObat" id="inputAlergiObat" placeholder="Alergi Obat" rows={5}></textarea>
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
