import React, { useEffect, useState } from 'react'
import CardProduct from '../components/Fragments/CardProduct'
import { getProducts } from '../../services/product.services';
import { useLogin } from '../hooks/useLogin';
import TableCart from '../components/Fragments/TableCart';
import Navbar from '../components/Layouts/Navbar';

const token = localStorage.getItem("token");

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    useLogin();
    const [cart, setCart] = useState([]);

    // useEffect yang dijalankan sekali saat komponen dimount
    // Mengambil data cart dari localStorage dan mengubah dari string JSON menjadi array
    // Jika tidak ada data di localStorage, nilai default array kosong
    useEffect(() => {
        setCart(JSON.parse(localStorage.getItem("cart")) || []);
    }, [])

    useEffect(() => {
        getProducts((data) => {
            setProducts(data)
        });
    }, [])

    return (
        <>
            <Navbar />
            <div className='flex justify-center py-5'>
                <div className="w-4/6 flex flex-wrap">
                    {products.length > 0 && products.map((product) => (
                        <CardProduct key={product.id}>
                            <CardProduct.Header image={product.image} id={product.id} />
                            <CardProduct.Body title={product.title}>
                                {product.description}
                            </CardProduct.Body>
                            <CardProduct.Footer price={product.price} id={product.id} />
                        </CardProduct>
                    ))}
                </div>
                <div className="w-2/6">
                    <h1 className='text-3xl font-bold text-blue-600 ml-5'>Cart</h1>
                    <TableCart products={products} />
                </div>
            </div>

            {/* <div className="mt-5 flex justify-center mb-5">
                <Counter></Counter>
            </div> */}
        </>
    )
}

export default ProductsPage