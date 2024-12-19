import React, { useEffect, useState } from 'react'
import CardProduct from '../components/Fragments/CardProduct'
import Button from '../components/Elements/Buttons';
import Counter from '../components/Fragments/Counter';

const products = [
    {
        id: 1,
        name: "Sepatu Baru",
        price: 1000000,
        image: "/images/shoes-1.jpg",
        description: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam consectetur quidem pariatur enim velit facere ut vitae veritatis, nesciunt exercitationem autem, sapiente illum eos dolorem, placeat quod officia deleniti aut.`
    },
    {
        id: 2,
        name: "Sepatu Lama",
        price: 750000,
        image: "/images/shoes-3.jpg",
        description: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam consectetur quidem pariatur enim velit facere ut vitae veritatis, nesciunt exercitationem autem, sapiente illum eos dolorem, placeat quod officia deleniti aut.`
    },
    {
        id: 3,
        name: "Sepatu Baru",
        price: 1250000,
        image: "/images/shoes-4.jpg",
        description: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam consectetur quidem pariatur enim velit facere ut vitae veritatis, nesciunt exercitationem autem, sapiente illum eos dolorem, placeat quod officia deleniti aut.`
    }
]

const email = localStorage.getItem("email");

const ProductsPage = () => {
    // Membuat state cart untuk menyimpan data keranjang belanja dengan nilai awal array kosong
    const [cart, setCart] = useState([]);
    // Membuat state totalPrice untuk menyimpan total harga dengan nilai awal 0
    const [totalPrice, setTotalPrice] = useState(0);

    // useEffect yang dijalankan sekali saat komponen dimount
    // Mengambil data cart dari localStorage dan mengubah dari string JSON menjadi array
    // Jika tidak ada data di localStorage, nilai default array kosong
    useEffect(() => {
        setCart(JSON.parse(localStorage.getItem("cart")) || []);
    }, [])

    // useEffect yang dijalankan setiap kali cart berubah
    useEffect(() => {
        if (cart.length > 0) {
            // Menghitung total harga dengan reduce
            // acc adalah akumulator, item adalah setiap item di cart
            const sum = cart.reduce((acc, item) => {
                // Mencari data produk berdasarkan id
                const product = products.find((product) => product.id === item.id);
                // Menambahkan harga produk dikali quantity ke akumulator
                return acc + product.price * item.qty;
            }, 0);
            // Set total price dengan hasil perhitungan
            setTotalPrice(sum);
            // Simpan cart ke localStorage dalam bentuk string JSON
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    }, [cart])

    // Fungsi untuk handle logout
    const handleLogout = () => {
        // Menghapus data email dan password dari localStorage
        localStorage.removeItem("email");
        localStorage.removeItem("password");
        // Redirect ke halaman login
        window.location.href = "/login";
    }

    // Fungsi untuk menambahkan produk ke cart
    const handleAddToCart = (id) => {
        // Cek apakah produk sudah ada di cart
        if (cart.find(item => item.id === id)) {
            // Jika ada, update quantity +1
            setCart(
                cart.map(item => item.id === id ? { ...item, qty: item.qty + 1 } : item)
            )
        } else {
            // Jika belum ada, tambahkan produk baru dengan qty 1
            setCart([...cart, { id, qty: 1 }]);
        }
    }

    return (
        <>
            <div className='flex justify-end h-20 bg-blue-600 text-white items-center px-10'>
                {email}
                <Button classname="ml-5 bg-black" onClick={handleLogout}>Logout</Button>
            </div>
            <div className='flex justify-center py-5'>
                <div className="w-4/6 flex flex-wrap">
                    {products.map((product) => (
                        <CardProduct key={product.id}>
                            <CardProduct.Header image={product.image} />
                            <CardProduct.Body title={product.name}>
                                {product.description}
                            </CardProduct.Body>
                            <CardProduct.Footer price={product.price} id={product.id} handleAddToCart={handleAddToCart} />
                        </CardProduct>
                    ))}
                </div>
                <div className="w-2/6">
                    <h1 className='text-3xl font-bold text-blue-600 ml-5'>Cart</h1>
                    <table className='text-left table-auto border-separate border-spacing-x-5'>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((item) => {
                                const product = products.find(
                                    (product) => product.id === item.id
                                );
                                return (
                                    <tr key={item.id}>
                                        <td>{product.name}</td>
                                        <td>Rp {product.price.toLocaleString('id-ID', { styles: 'currency', currency: 'IDR' })}</td>
                                        <td>{item.qty}</td>
                                        <td>Rp {(item.qty * product.price).toLocaleString('id-ID', { styles: 'currency', currency: 'IDR' })}</td>
                                    </tr>
                                );
                            })}
                            <tr>
                                <td colSpan={3}>Total Price</td>
                                <td>
                                    <b>
                                        Rp {totalPrice.toLocaleString('id-ID', { styles: 'currency', currency: 'IDR' })}
                                    </b>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* <div className="mt-5 flex justify-center mb-5">
                <Counter></Counter>
            </div> */}
        </>
    )
}

export default ProductsPage