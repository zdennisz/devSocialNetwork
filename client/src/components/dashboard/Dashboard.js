import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentProfile } from "../../store/actions/profile";

const Dashboard = (props) => {
	const dispatch = useDispatch();
	const profile = useSelector((state) => state.profile);
	const auth = useSelector((state) => state.auth);

	useEffect(() => {
		dispatch(getCurrentProfile());
	}, [dispatch]);

	return <div>Dashboard</div>;
};

export default Dashboard;
