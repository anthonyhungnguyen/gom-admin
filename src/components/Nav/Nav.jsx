import React from 'react'
import { Link } from 'react-router-dom'
import classes from './Nav.module.css'

const Nav = () => {
	return (
		<header className={classes.header}>
			<section>
				<h1>Admin</h1>
			</section>
			<section>
				<ul className={classes.list}>
					<Link to='/add-product'>
						<li>Thêm Gốm</li>
					</Link>

					<Link to='/show-product'>
						<li>Xem Gốm</li>
					</Link>
				</ul>
			</section>
		</header>
	)
}

export default Nav
