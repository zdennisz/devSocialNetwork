import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

export const PrivateRouting = ({ component: Component, ...props }) => {
	const { isAuthenticated, loading } = useSelector((state) => state.auth);
	return (
		<Route
			{...props}
			render={(props) =>
				!isAuthenticated && !loading ? (
					<Redirect to='/login' />
				) : (
					<Component {...props} />
				)
			}
		/>
	);
};
