import { useEffect, useState } from "react";

const formatDateString = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
};

const Absen = () => {
    const [absenList, setAbsenList] = useState([]);
    const [formData, setFormData] = useState({
        id: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:8000/api/v1/karyawan/${formData.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // body: JSON.stringify(formData),
            });
            const result = await response.json();
            console.log('Response:', result);
            // Lakukan pembaruan data setelah menambahkan
            fetchDataAbsen();
        } catch (error) {
            console.error('Error adding data:', error);
        }
        setFormData({
            id: ''
        })
        // Reset nilai input setelah mengirimkan data
    }
    const fetchDataAbsen = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/v1/karyawan/list-absen');
            const jsonData = await response.json();
            setAbsenList(jsonData.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    useEffect(() => {
        fetchDataAbsen()
    }, []);

    return (
        <>

            <div className="container">
                <h1 className="mt-4">Data Absen Karyawan</h1>
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nama Karyawan</th>
                            <th>Tanggal Absen</th>
                        </tr>
                    </thead>
                    <tbody>
                        {absenList.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.nama}</td>
                                <td>{formatDateString(item.date)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="container">
                <h1 className="mt-4">Absen Karyawan</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="idKaryawan" className="form-label">Id Karyawan</label>
                        <input
                            className="form-control"
                            type="text"
                            id="idKaryawan"
                            name="id"
                            value={formData.id}
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
export default Absen