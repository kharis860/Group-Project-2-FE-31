import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ModalDataPasien(props) {
    return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Data Pasien</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>NIK</h5>
                <p>{props.data.nik}</p>
                <h5>Nama Lengkap</h5>
                <p>{props.data.nama}</p>
                <h5>Jenis Kelamin</h5>
                <p>{props.data.jenis_kelamin}</p>
                <h5>Tanggal Lahir</h5>
                <p>{props.data.tanggal_lahir.split("T")[0]}</p>
                <h5>Pekerjaan</h5>
                <p>{props.data.pekerjaan}</p>
                <h5>Alamat</h5>
                <p>{props.data.alamat}</p>
                <h5>No. Telpon</h5>
                <p>{props.data.no_telp}</p>
                <h5>Alergi Obat</h5>
                <p>{props.data.alergi_obat}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalDataPasien;
