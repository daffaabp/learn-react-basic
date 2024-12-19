import React from 'react'
import CardProduct from '../components/Fragments/CardProduct'

const products = [
    {
        id: 1,
        name: "Sepatu Baru",
        price: "Rp. 1.000.000",
        image: "/images/shoes-1.jpg",
        description: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam consectetur quidem pariatur enim velit facere ut vitae veritatis, nesciunt exercitationem autem, sapiente illum eos dolorem, placeat quod officia deleniti aut.`
    },
    {
        id: 2,
        name: "Sepatu Lama",
        price: "Rp. 750.000",
        image: "/images/shoes-3.jpg",
        description: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam consectetur quidem pariatur enim velit facere ut vitae veritatis, nesciunt exercitationem autem, sapiente illum eos dolorem, placeat quod officia deleniti aut.`
    },
    {
        id: 3,
        name: "Sepatu Baru",
        price: "Rp. 1.250.000",
        image: "/images/shoes-4.jpg",
        description: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam consectetur quidem pariatur enim velit facere ut vitae veritatis, nesciunt exercitationem autem, sapiente illum eos dolorem, placeat quod officia deleniti aut.`
    }
]

const ProductsPage = () => {
    return (
        <div className='flex justify-center py-5'>
            {products.map((product) => (
                <CardProduct>
                    <CardProduct.Header image={product.image} />
                    <CardProduct.Body title={product.name}>
                        {product.description}
                    </CardProduct.Body>
                    <CardProduct.Footer price={product.price} />
                </CardProduct>
            ))}
        </div>
    )
}

export default ProductsPage