import React from 'react'
import Nav from './components/Nav/Nav'
import { Route } from 'react-router-dom'
import AddProductPage from './components/AddProductPage/AddProductPage'
import ShowProductPage from './components/ShowProductPage/ShowProductPage'

const App = () => {
	return (
		<>
			<Nav />
			<Route path='/add-product' component={AddProductPage} />
			<Route path='/show-product' component={ShowProductPage} />
		</>
	)
}

export default App
