import "./App.css";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import { Routes, Route, Link } from "react-router-dom";
import DataPasien from "./components/DataPasien";
import Konsultasi from "./components/Konsultasi";
import InnerDashboard from "./components/InnerDashboard";
import RiwayatPenyakit from "./components/RiwayatPenyakit";
import RekamMedis from "./components/RekamMedis";
import Login from "./components/Login";
import DaftarKonsultasi from "./components/DaftarKonsultasi";
import Forbidden from "./components/Forbidden";
import ListPasienNakes from "./components/ListPasienNakes";
import TambahPasienNakes from "./components/TambahPasienNakes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />}>
        <Route index element={<InnerDashboard />} />
        <Route path="data" element={<DataPasien />} />
        <Route path="konsultasi" element={<Konsultasi />} />
        <Route path="riwayat" element={<RiwayatPenyakit />} />
        <Route path="rekam" element={<RekamMedis />} />
      </Route>
      <Route path="/daftar" element={<DaftarKonsultasi />} />
      <Route path="/list" element={<ListPasienNakes />} />
      <Route path="/tambah" element={<TambahPasienNakes />} />
      <Route path="/error" element={<Forbidden />} />
    </Routes>
  );
}

export default App;
