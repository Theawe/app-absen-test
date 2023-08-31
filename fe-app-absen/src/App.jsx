import { Route, Routes } from "react-router-dom"
import Navbar from "./layout/Navbar"
import Home from "./layout/Home"
import Absen from "./pages/Absen"
import Karyawan from "./pages/Karyawan"
import Perusahaan from "./pages/Perusahaan"

function App() {

  return (
    <>
      <Navbar />
      <div className="home">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/absen" element={<Absen />} />
          <Route path="/karyawan" element={<Karyawan />} />
          <Route path="/perusahaan" element={<Perusahaan />} />
        </Routes>
      </div>
    </>

  )
}

export default App
