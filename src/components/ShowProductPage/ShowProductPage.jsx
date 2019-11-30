import React, { useEffect, useState, Suspense, lazy } from 'react'
import firebase from '../../utils/firebase'
import classes from './ShowProductPage.module.css'
const ProductCard = lazy(() => import('./ProductCard/ProductCard'))

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
			<Suspense fallback={<div>Loading...</div>}>
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
			</Suspense>
		</section>
	)
}

export default ShowProductPage
