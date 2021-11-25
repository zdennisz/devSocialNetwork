import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../layout/Spinner";
import PostItem from "../posts/PostItem";
import { Link } from "react-router-dom";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import { getPost } from "../../store/actions/post";
const Post = ({ match }) => {
	const dispatch = useDispatch();
	const { post, loading } = useSelector((state) => state.post);
	useEffect(() => {
		dispatch(getPost(match.params.id));
	}, [dispatch, match.params.id]);
	return loading || post === null ? (
		<Spinner />
	) : (
		<>
			<Link to='/posts' className='btn'>
				Back to Posts
			</Link>
			<PostItem post={post} showActions={false} />
			<CommentForm postId={post._id} />
			<div className='comments'>
				{post.comments.map((comment) => (
					<CommentItem key={comment._id} comment={comment} postId={post._id} />
				))}
			</div>
		</>
	);
};

export default Post;
