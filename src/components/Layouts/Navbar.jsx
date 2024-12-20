import Button from '../Elements/Buttons'
import { useLogin } from '../../hooks/useLogin';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const username = useLogin();
    const [totalCart, setTotalCart] = useState(0);
    const cart = useSelector((state) => state.cart.data);
    
    // Kode ini menggunakan useEffect untuk menghitung total jumlah item dalam keranjang belanja (cart).
    // Setiap kali cart berubah, fungsi ini akan dijalankan.
    // Di dalam fungsi, kita menggunakan metode reduce untuk menjumlahkan qty (jumlah) dari setiap item dalam cart.
    // Hasil penjumlahan disimpan dalam variabel sum, yang kemudian digunakan untuk memperbarui state totalCart dengan setTotalCart.
    useEffect(() => {
        const sum = cart.reduce((acc, item) => {
            return acc + item.qty;
        }, 0);
        setTotalCart(sum);
    }, [cart])

    // Fungsi untuk handle logout
    const handleLogout = () => {
        // Menghapus data email dan password dari localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("password");
        // Redirect ke halaman login
        window.location.href = "/login";
    }

    return (
        <div className='flex justify-end h-20 bg-blue-600 text-white items-center px-10'>
            {username}
            <Button classname="ml-5 bg-black" onClick={handleLogout}>Logout</Button>
            <div className="fkex items-center bg-gray-800 p-2 rounded-md ml-5">
                {totalCart}
            </div>
        </div>
    )
}

export default Navbar
