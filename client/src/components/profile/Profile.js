import React, { useEffect } from "react";
import { getProfileById } from "../../store/actions/profile";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../layout/Spinner";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileGithub from "./ProfileGithub";
import ProfileEducation from "./ProfileEducation";
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
					<div className='profile-grid my-1'>
						<ProfileTop profile={profile} />
						<ProfileAbout profile={profile} />
						<div className='profile-exp bg-white p-2'>
							<h2 className='text-primary'>Experience</h2>
							{profile.experience.length > 0 ? (
								<>
									{profile.experience.map((experience) => (
										<ProfileExperience
											key={experience._id}
											experience={experience}
										/>
									))}
								</>
							) : (
								<h4>No experience ceredentials</h4>
							)}
						</div>
						<div className='profile-edu bg-white p-2'>
							<h2 className='text-primary'>Education</h2>
							{profile.education.length > 0 ? (
								<>
									{profile.education.map((education) => (
										<ProfileEducation
											key={education._id}
											education={education}
										/>
									))}
								</>
							) : (
								<h4>No education ceredentials</h4>
							)}
						</div>
						{profile.githubusername && (
							<ProfileGithub username={profile.githubusername} />
						)}
					</div>
				</>
			)}
		</>
	);
};

export default Profile;
