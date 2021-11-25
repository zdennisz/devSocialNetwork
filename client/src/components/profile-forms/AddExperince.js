import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addExperience } from "../../store/actions/profile";

const AddExperince = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const [formData, setFormData] = useState({
		company: "",
		title: "",
		location: "",
		from: "",
		to: "",
		current: false,
		description: "",
	});

	const [toDateDisabled, setToDateDisabled] = useState(false);

	const { company, title, location, from, to, current, description } = formData;

	const onChangeHandler = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const currentJobHandler = (e) => {
		setFormData({
			...formData,
			current: !current,
		});
		setToDateDisabled((state) => !state);
	};

	const onSubmitHandler = (e) => {
		e.preventDefault();
		dispatch(addExperience(formData, history));
	};
	return (
		<>
			<h1 className='large text-primary'>Add An Experience</h1>
			<p className='lead'>
				<i className='fas fa-code-branch'></i> Add any developer/programming
				positions that you have had in the past
			</p>
			<small>* = required field</small>
			<form className='form' onSubmit={onSubmitHandler}>
				<div className='form-group'>
					<input
						type='text'
						placeholder='* Job Title'
						name='title'
						required
						value={title}
						onChange={onChangeHandler}
					/>
				</div>
				<div className='form-group'>
					<input
						type='text'
						placeholder='* Company'
						name='company'
						required
						value={company}
						onChange={onChangeHandler}
					/>
				</div>
				<div className='form-group'>
					<input
						type='text'
						placeholder='Location'
						name='location'
						value={location}
						onChange={onChangeHandler}
					/>
				</div>
				<div className='form-group'>
					<h4>From Date</h4>
					<input
						type='date'
						name='from'
						value={from}
						onChange={onChangeHandler}
					/>
				</div>
				<div className='form-group'>
					<p>
						<input
							type='checkbox'
							name='current'
							value={current}
							checked={current}
							onChange={currentJobHandler}
						/>{" "}
						Current Job
					</p>
				</div>
				<div className='form-group'>
					<h4>To Date</h4>
					<input
						type='date'
						name='to'
						value={to}
						onChange={onChangeHandler}
						disabled={toDateDisabled ? "disabled" : ""}
					/>
				</div>
				<div className='form-group'>
					<textarea
						name='description'
						cols='30'
						rows='5'
						placeholder='Job Description'
						value={description}
						onChange={onChangeHandler}
					></textarea>
				</div>
				<input type='submit' className='btn btn-primary my-1' />
				<Link className='btn btn-light my-1' to='/dashboard'>
					Go Back
				</Link>
			</form>
		</>
	);
};

export default AddExperince;
