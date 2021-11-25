import React from "react";
import Moment from "react-moment";
const ProfileEducation = ({
	education: { school, degree, fieldofstudy, current, to, from, description },
}) => {
	return (
		<div>
			<h3 className='text-dark'>{school}</h3>
			<p>
				<Moment format='YYYY/MM/DD'>{from}</Moment> -{" "}
				{!to ? " Now" : <Moment format='YYYY/MM/DD'>{to}</Moment>}
			</p>
			<p>
				<storng>Degree:</storng>
				{degree}
			</p>
			<p>
				<storng>Field of Study:</storng>
				{fieldofstudy}
			</p>
			<p>
				<storng>Description:</storng>
				{description}
			</p>
		</div>
	);
};

export default ProfileEducation;
