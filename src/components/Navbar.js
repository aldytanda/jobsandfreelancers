import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
	return (
		<div className="navbar">
			<h1>Jobs and Freelancers</h1>
			<nav>
				<ul>
				<li className="nav-item">
					<NavLink to="/jobs" activeClassName="active-route">Jobs</NavLink>
				</li>
				<li className="nav-item">
					<NavLink to="/freelancers" activeClassName="active-route">Freelancers</NavLink>
				</li>
				</ul>
			</nav>
		</div>
	)
}

export default Navbar;