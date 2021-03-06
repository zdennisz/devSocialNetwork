import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addEducation } from "../../store/actions/profile";

const AddEducation = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const [formData, setFormData] = useState({
		school: "",
		degree: "",
		fieldofstudy: "",
		from: "",
		to: "",
		current: false,
		description: "",
	});

	const [toDateDisabled, setToDateDisabled] = useState(false);

	const { school, degree, fieldofstudy, from, to, current, description } =
		formData;

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
		dispatch(addEducation(formData, history));
	};
	return (
		<>
			<h1 className='large text-primary'>Add Your Education</h1>
			<p className='lead'>
				<i className='fas fa-code-branch'></i> Add any school or bootcamp that
				you have attended
			</p>
			<small>* = required field</small>
			<form className='form' onSubmit={onSubmitHandler}>
				<div className='form-group'>
					<input
						type='text'
						placeholder='* School or Bootcamp'
						name='school'
						required
						value={school}
						onChange={onChangeHandler}
					/>
				</div>
				<div className='form-group'>
					<input
						type='text'
						placeholder='* Degreee or Certificate'
						name='degree'
						required
						value={degree}
						onChange={onChangeHandler}
					/>
				</div>
				<div className='form-group'>
					<input
						type='text'
						placeholder='Field of Study'
						name='fieldofstudy'
						value={fieldofstudy}
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
						Current School
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
						placeholder='Program Description'
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

export default AddEducation;
