import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';

const TableCart = (props) => {
    const { products } = props;
    const cart = useSelector((state) => state.cart.data);
    const [totalPrice, setTotalPrice] = useState(0);

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

    const totalPriceRef = useRef(null);

    useEffect(() => {
        if (cart.length > 0) {
            totalPriceRef.current.style.display = "table-row";
        } else {
            totalPriceRef.current.style.display = "none";
        }
    }, [cart])

    return (
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
    )
}

export default TableCart
