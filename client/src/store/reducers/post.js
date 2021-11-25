import { GET_POSTS, POST_ERROR, UPDATE_LIKES } from "../actions/types";

const initialState = {
	posts: [],
	post: null,
	loading: true,
	error: {},
};

const postReducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case UPDATE_LIKES:
			return {
				...state,
				posts: state.posts.map((post) =>
					post._id === payload.postId ? { ...post, likes: payload.likes } : post
				),
				loading: false,
			};
		case GET_POSTS:
			return {
				...state,
				posts: payload,
				loading: false,
			};
		case POST_ERROR:
			return {
				...state,
				error: payload,
				loading: false,
			};
		default:
			return state;
	}
};

export default postReducer;
