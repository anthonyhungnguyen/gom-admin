import React, { useEffect, useState } from 'react'
import firebase from '../../utils/firebase'
import classes from './ShowProductPage.module.css'
import ProductCard from './ProductCard/ProductCard.jsx'

const ShowProductPage = () => {
	const [products, setProducts] = useState([])
	useEffect(() => {
		fetchAllProducts()
	}, [])
	const fetchAllProducts = async () => {
		const db = firebase.firestore()
		const data = await db.collection('goms').get()
		const products = data.docs.map(doc => ({
			...doc.data(),
			id: doc.id
		}))
		setProducts(products)
	}
	return (
		<section className={classes.ShowProductPage}>
			{products.map(product => (
				<ProductCard
					des={product.description}
					pri={product.price}
					filen={product.imageName}
					id={product.id}
					key={product.id}
					className={ProductCard}
					fetchAllProducts={fetchAllProducts}
				/>
			))}
		</section>
	)
}

export default ShowProductPage
