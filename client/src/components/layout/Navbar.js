import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/actions/auth";

const Navbar = () => {
	const dispatch = useDispatch();
	const { isAuthenticated, loading } = useSelector((state) => state.auth);

	const logoutHandler = () => {
		dispatch(logout());
	};
	const AuthLinks = () => {
		return (
			<ul>
				<li>
					<Link to='/dashboard'>
						<i className='fas fa-user' />
						<span className='hide-sm'> Dashboard</span>
					</Link>
				</li>
				<li>
					<a onClick={logoutHandler} href='#!'>
						<i className='fas fa-sign-out-alt' />
						<span className='hide-sm'> Logout</span>
					</a>
				</li>
			</ul>
		);
	};

	const GuestLinks = () => {
		return (
			<ul>
				<li>
					<a href='#!'>Developers</a>
				</li>
				<li>
					<Link to='/register'>Register</Link>
				</li>
				<li>
					<Link to='/login'>Login</Link>
				</li>
			</ul>
		);
	};
	return (
		<nav className='navbar bg-dark'>
			<h1>
				<Link to='/'>
					<i className='fas fa-code'></i> DevSocialNetwork
				</Link>
			</h1>
			{!loading && <>{isAuthenticated ? <AuthLinks /> : <GuestLinks />}</>}
		</nav>
	);
};

export default Navbar;
