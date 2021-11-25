import React, { useEffect } from "react";
import { getPosts } from "../../store/actions/post";
import { useDispatch, useSelector } from "react-redux";
import PostItem from "./PostItem";
import Spinner from "../layout/Spinner";
const Posts = () => {
	const dispatch = useDispatch();
	const { posts, loading } = useSelector((state) => state.post);
	useEffect(() => {
		dispatch(getPosts());
	}, [dispatch]);

	return loading ? (
		<Spinner />
	) : (
		<>
			<h1 className='large text-primary'>Posts</h1>
			<p className='lead'>
				<i className='fas fa-user'></i>Welcome to the community
			</p>
			<div className='posts'>
				{posts.map((post) => (
					<PostItem key={post._id} post={post} />
				))}
			</div>
		</>
	);
};

export default Posts;
