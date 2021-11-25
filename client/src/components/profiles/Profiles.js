import React, { useEffect } from "react";
import Spinner from "../layout/Spinner";
import { useSelector, useDispatch } from "react-redux";
import ProfileItem from "./ProfileItem";
import { getProfiles } from "../../store/actions/profile";
const Profiles = () => {
	const dispatch = useDispatch();
	const { profiles, loading } = useSelector((state) => state.profile);

	useEffect(() => {
		dispatch(getProfiles());
	}, [dispatch]);

	return (
		<>
			{loading ? (
				<Spinner />
			) : (
				<>
					<h1 className='large text-primary'>Developers</h1>
					<p className='lead'>
						<i className='fab fa-connectdevelop'></i> Browse and connect with
						awesome developers
					</p>
					<div className='profiles'>
						{profiles.length > 0 ? (
							profiles.map((profile) => (
								<ProfileItem key={profile._id} profile={profile} />
							))
						) : (
							<h4> No profiles found...</h4>
						)}
					</div>
				</>
			)}
		</>
	);
};

export default Profiles;
