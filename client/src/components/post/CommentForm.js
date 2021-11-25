import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addComment } from "../../store/actions/post";
const CommentForm = ({ postId }) => {
	const dispatch = useDispatch();
	const [text, setText] = useState("");
	const textChangeHandler = (e) => {
		setText(e.target.value);
	};
	const onSubmitHandler = (e) => {
		e.preventDefault();
		dispatch(addComment(postId, { text }));
		setText("");
	};
	return (
		<div className='post-form'>
			<div className='bg-primary p'>
				<h3>Say Something...</h3>
			</div>
			<form className='form my-1' onSubmit={onSubmitHandler}>
				<textarea
					name='text'
					cols='30'
					rows='5'
					placeholder='Create a post'
					required
					onChange={textChangeHandler}
					value={text}
				></textarea>
				<input type='submit' className='btn btn-dark my-1' value='Submit' />
			</form>
		</div>
	);
};

export default CommentForm;
