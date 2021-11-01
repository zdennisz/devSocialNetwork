const exppress = require("express");
const router = exppress.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

//@route  POST api/posts
//@desc   Create a post
//@access Private
router.post(
	"/",
	[auth, [check("text", "Text is required").not().isEmpty()]],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		try {
			const user = await User.findById(req.user.id).select("-password");

			const newPost = new Post({
				text: req.body.text,
				name: user.name,
				avatar: user.avatar,
				user: user.id,
			});

			const post = await newPost.save();
			res.json(post);
		} catch (err) {
			console.error(err.message);
			res.status(500).send("Server Error");
		}
	}
);

//@route  Get api/posts
//@desc   Get all post
//@access Private
router.get("/", auth, async (req, res) => {
	try {
		const posts = await Post.find().sort({ date: -1 });
		res.json(posts);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

//@route  Get api/posts/:post_id
//@desc   Get post by id
//@access Private
router.get("/:id", auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);

		if (!post) {
			return res.status(404).json({ msg: "Post not found" });
		}

		res.json(post);
	} catch (err) {
		console.error(err.message);
		if (err.kind === "ObjectId") {
			return res.status(404).json({ msg: "Post not found" });
		}
		res.status(500).send("Server Error");
	}
});

//@route  DELETE api/posts/:post_id
//@desc   Delete post by id
//@access Private
router.delete("/:id", auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);

		if (!post) {
			return res.status(404).json({ msg: "Post not found" });
		}
		// Check user
		if (post.user.toString() !== req.user.id) {
			res.status(401).json({ msg: "User not authorized" });
		}

		await post.remove();

		res.json({ msg: "Post removed" });
	} catch (err) {
		console.error(err.message);
		if (err.kind === "ObjectId") {
			return res.status(404).json({ msg: "Post not found" });
		}
		res.status(500).send("Server Error");
	}
});

//@route  PUT api/posts/like/:id
//@desc   Like a post
//@access Private
router.put("/like/:id", auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);

		// Check if post was liked by the same user
		if (
			post.likes.filter((like) => like.user.toString() === req.user.id).length >
			0
		) {
			return res.status(400).json({ msg: "Post already liked" });
		}
		// Add the like to the start of the array
		post.likes.unshift({ user: req.user.id });

		// Save the post to db
		await post.save();

		// Send the reposne to frontend
		res.json(post.likes);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

//@route  PUT api/posts/unlike/:id
//@desc   Unlike a post
//@access Private
router.put("/unlike/:id", auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);

		// Check if post was liked by the same user
		if (
			post.likes.filter((like) => like.user.toString() === req.user.id)
				.length === 0
		) {
			return res.status(400).json({ msg: "Post has not yet been liked" });
		}

		// Get the index to remove
		const removeIndex = post.likes
			.map((like) => like.user.toString())
			.indexOf(req.user.id);

		// Remove the like
		post.likes.splice(removeIndex, 1);

		// Save the post after changes to db
		await post.save();

		// Send the reposne to frontend
		res.json(post.likes);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});
module.exports = router;
