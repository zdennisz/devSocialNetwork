import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentProfile } from "../../store/actions/profile";
import DashboardActions from "./DashboardActions";
import Experience from "./Experience";
import Education from "./Education";
import Spinner from "../layout/Spinner";
import { deleteAccount } from "../../store/actions/profile";

const Dashboard = (props) => {
	const dispatch = useDispatch();
	const { profile, loading } = useSelector((state) => state.profile);
	const { user } = useSelector((state) => state.auth);

	const deleteAccountHandler = () => {
		dispatch(deleteAccount());
	};

	useEffect(() => {
		dispatch(getCurrentProfile());
	}, [dispatch]);

	return loading && profile === null ? (
		<Spinner />
	) : (
		<>
			<h1 className='large text-primary'>Dashboard</h1>
			<p className='lead'>
				<i className='fas fa-user'> Welcome {user && user.name}</i>
			</p>
			{profile !== null ? (
				<>
					<DashboardActions />
					<Experience experience={profile.experience} />
					<Education education={profile.education} />
					<div className='my-2'>
						<button className='btn btn-danger' onClick={deleteAccountHandler}>
							<i className='fas fa-user-minus'></i>Delete My Account
						</button>
					</div>
				</>
			) : (
				<>
					<p>You have not yet setup a profile,please add some info</p>
					<Link to='/create-profile' className='btn btn-primary my-1'>
						Create Profile
					</Link>
				</>
			)}
		</>
	);
};

export default Dashboard;
