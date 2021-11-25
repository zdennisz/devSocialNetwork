import React, { useEffect } from "react";
import { getPosts } from "../../store/actions/post";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../layout/Spinner";
const Posts = () => {
	const dispatch = useDispatch();
	const { posts, loading } = useSelector((state) => state.post);
	useEffect(() => {
		dispatch(getPosts());
	}, [dispatch]);

	return <div></div>;
};

export default Posts;
