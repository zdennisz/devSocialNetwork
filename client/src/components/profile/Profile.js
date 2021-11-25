import React, { useEffect } from "react";
import { getProfileById } from "../../store/actions/profile";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
const Profile = ({ match }) => {
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);
	const { profile, loading } = useSelector((state) => state.profile);

	useEffect(() => {
		dispatch(getProfileById(match.params.id));
	}, [dispatch, match.params.id]);

	return (
		<>
			{profile === null || loading ? (
				<Spinner />
			) : (
				<>
					<Link to='/profiles' className='btn btn-light'>
						Back to Profiles
					</Link>
					{auth.isAuthenticated &&
						auth.loading === false &&
						auth.user._id === profile.user._id && (
							<Link to='/edit-profile' className='btn btn-dark'>
								Edit Profile
							</Link>
						)}
				</>
			)}
		</>
	);
};

export default Profile;
