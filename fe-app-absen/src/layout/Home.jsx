import { useEffect, useState } from "react";


const formatDateString = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
};

function Home() {
    const [data, setData] = useState([]);
    const [dataKaryawan, setDataKaryawan] = useState([]);
    const [absenList, setAbsenList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/v1/perusahaan');
                const jsonData = await response.json();
                setData(jsonData.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const fetchDataKaryawan = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/v1/karyawan');
                const jsonData = await response.json();
                setDataKaryawan(jsonData.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
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

        fetchData();
        fetchDataKaryawan();
        fetchDataAbsen();
    }, []);
    return (
        <div>
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
                        {data.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.nama_perusahaan}</td>
                                <td>{item.alamat_perusahaan}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

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

        </div>
    )
}
export default Home