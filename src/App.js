import React from 'react'
import Nav from './components/Nav/Nav.jsx'
import { Route } from 'react-router-dom'
import AddProductPage from './components/AddProductPage/AddProductPage.jsx'
import ShowProductPage from './components/ShowProductPage/ShowProductPage.jsx'

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
