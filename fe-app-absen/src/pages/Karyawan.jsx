import { useEffect, useState } from "react";

const Karyawan = () => {
    const [dataKaryawan, setDataKaryawan] = useState([]);
    const [formData, setFormData] = useState({
        nama_karyawan: '',
        umur_karyawan: '',
        alamat_karyawan: '',
        nama_perusahaan: ''
    });


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/api/v1/karyawan', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const result = await response.json();
            console.log('Response:', result);
            // Lakukan pembaruan data setelah menambahkan
            fetchDataKaryawan();
        } catch (error) {
            console.error('Error adding data:', error);
        }
        setFormData({
            nama_karyawan: '',
            umur_karyawan: '',
            alamat_karyawan: '',
            nama_perusahaan: ''
        })
        // Reset nilai input setelah mengirimkan data
    }
    const fetchDataKaryawan = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/v1/karyawan');
            const jsonData = await response.json();
            setDataKaryawan(jsonData.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    useEffect(() => {
        fetchDataKaryawan()
    }, []);

    return (
        <>
            <div className="container">
                <h1 className="mt-4">Data Karyawan</h1>
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nama Karyawan</th>
                            <th>Umur Karyawan</th>
                            <th>Alamat Karyawan</th>
                            <th>Nama Perusahaan</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataKaryawan.map((item) => (
                            <tr key={item._id}>
                                <td>{item._id}</td>
                                <td>{item.nama_karyawan}</td>
                                <td>{item.umur_karyawan}</td>
                                <td>{item.alamat_karyawan}</td>
                                <td>{item.nama_perusahaan}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="container">
                <h1 className="mt-4">Tambah Data Karyawan</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="namaKaryawan" className="form-label">Nama Karyawan</label>
                        <input
                            className="form-control"
                            type="text"
                            id="namaKaryawan"
                            name="nama_karyawan"
                            value={formData.nama_karyawan}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="umurKaryawan" className="form-label">Umur Karyawan</label>
                        <input
                            className="form-control"
                            type="number"
                            id="umurKaryawan"
                            name="umur_karyawan"
                            value={formData.umur_karyawan}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="alamatKaryawan" className="form-label">Alamat Karyawan</label>
                        <input
                            className="form-control"
                            type="text"
                            id="alamatKaryawan"
                            name="alamat_karyawan"
                            value={formData.alamat_karyawan}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="namaPerusahaan" className="form-label">Nama Perusahaan</label>
                        <input
                            className="form-control"
                            type="text"
                            id="namaPerusahaan"
                            name="nama_perusahaan"
                            value={formData.nama_perusahaan}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Tambah Data</button>
                </form>
            </div>
        </>
    )
}
export default Karyawan