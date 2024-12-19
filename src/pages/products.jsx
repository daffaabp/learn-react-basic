import React, { useEffect, useRef, useState } from 'react'
import CardProduct from '../components/Fragments/CardProduct'
import Button from '../components/Elements/Buttons';
import Counter from '../components/Fragments/Counter';
import { getProducts } from '../../services/product.services';
import { getUsername } from '../../services/auth.services';

const token = localStorage.getItem("token");

const ProductsPage = () => {
    // Membuat state cart untuk menyimpan data keranjang belanja dengan nilai awal array kosong
    const [cart, setCart] = useState([]);
    // Membuat state totalPrice untuk menyimpan total harga dengan nilai awal 0
    const [totalPrice, setTotalPrice] = useState(0);
    const [products, setProducts] = useState([]);
    const [username, setUsername] = useState("");

    // useEffect yang dijalankan sekali saat komponen dimount
    // Mengambil data cart dari localStorage dan mengubah dari string JSON menjadi array
    // Jika tidak ada data di localStorage, nilai default array kosong
    useEffect(() => {
        setCart(JSON.parse(localStorage.getItem("cart")) || []);
    }, [])

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setUsername(getUsername(token));
        } else {
            window.location.href = "/login";
        }
    }, [])

    useEffect(() => {
        getProducts((data) => {
            setProducts(data)
        });
    }, [])

    // useEffect yang dijalankan setiap kali cart berubah
    useEffect(() => {
        if (products.length > 0 && cart.length > 0) {
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
    }, [cart, products])

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

    // useRef
    const cartRef = useRef(JSON.parse(localStorage.getItem("cart")) || []);

    const handleAddToCartRef = (id) => {
        cartRef.current = [...cartRef.current, { id: 1, qty: 1 }]
        localStorage.setItem("cart", JSON.stringify(cartRef.current));
    }

    const totalPriceRef = useRef(null);

    useEffect(() => {
        if (cart.length > 0) {
            totalPriceRef.current.style.display = "table-row";
        } else {
            totalPriceRef.current.style.display = "none";
        }
    }, [cart])

    return (
        <>
            <div className='flex justify-end h-20 bg-blue-600 text-white items-center px-10'>
                {username}
                <Button classname="ml-5 bg-black" onClick={handleLogout}>Logout</Button>
            </div>
            <div className='flex justify-center py-5'>
                <div className="w-4/6 flex flex-wrap">
                    {products.length > 0 && products.map((product) => (
                        <CardProduct key={product.id}>
                            <CardProduct.Header image={product.image} />
                            <CardProduct.Body title={product.title}>
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
                            {products.length > 0 && cart.map((item) => {
                                const product = products.find(
                                    (product) => product.id === item.id
                                );
                                return (
                                    <tr key={item.id}>
                                        <td>{product.title.substring(0, 10)}...</td>
                                        <td>$ {product.price.toLocaleString('id-ID', { styles: 'currency', currency: 'USD' })}</td>
                                        <td>{item.qty}</td>
                                        <td>$ {(item.qty * product.price).toLocaleString('id-ID', { styles: 'currency', currency: 'USD' })}</td>
                                    </tr>
                                );
                            })}
                            <tr ref={totalPriceRef}>
                                <td colSpan={3}><b>Total Price</b></td>
                                <td>
                                    <b>
                                        $ {totalPrice.toLocaleString('id-ID', { styles: 'currency', currency: 'USD' })}
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