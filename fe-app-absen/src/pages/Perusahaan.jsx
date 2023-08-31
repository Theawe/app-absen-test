import { useEffect, useState } from "react";

const Perusahaan = () => {
    const [data, setData] = useState([]);
    const [namaPerusahaan, setNamaPerusahaan] = useState('');
    const [alamatPerusahaan, setAlamatPerusahaan] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newData = {
            nama_perusahaan: namaPerusahaan,
            alamat_perusahaan: alamatPerusahaan,
        };

        try {
            const response = await fetch('http://localhost:8000/api/v1/perusahaan', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newData),
            });
            const result = await response.json();
            console.log('Response:', result);
            // Lakukan pembaruan data setelah menambahkan
            fetchData();
        } catch (error) {
            console.error('Error adding data:', error);
        }

        // Reset nilai input setelah mengirimkan data
        setNamaPerusahaan('');
        setAlamatPerusahaan('');
    };
    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/v1/perusahaan');
            const jsonData = await response.json();
            setData(jsonData.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {

        fetchData()
    }, []);

    return (
        <>
            <div className="container">
                <h1 className="mt-4">Data Perusahaan</h1>
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nama Perusahaan</th>
                            <th>Alamat Perusahaan</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{item.nama_perusahaan}</td>
                                <td>{item.alamat_perusahaan}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="container">
                <h1 className="mt-4">Tambah Data Perusahaan</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="namaPerusahaan" className="form-label">Nama Perusahaan</label>
                        <input
                            className="form-control"
                            type="text"
                            id="namaPerusahaan"
                            value={namaPerusahaan}
                            onChange={(e) => setNamaPerusahaan(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="alamatPerusahaan" className="form-label" >Alamat Perusahaan</label>
                        <input
                            className="form-control"
                            type="text"
                            id="alamatPerusahaan"
                            value={alamatPerusahaan}
                            onChange={(e) => setAlamatPerusahaan(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Tambah Data</button>
                </form>
            </div>
        </>
    )
}
export default Perusahaan