import db from "../config/db.mjs";

export const createPost = async (req, res) => {
  try {
    const { userid, content } = req.body;

    if (!content) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    const result = await db.one(
      `INSERT INTO Post (userid, content,dateposted) VALUES ($1, $2,CURRENT_TIMESTAMP) RETURNING *`,
      [userid, content]
    );

    res
      .status(201)
      .json({ message: "Post created successfully", post: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating post" });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await db.any("SELECT * FROM Post ORDER BY dateposted DESC");
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching posts" });
  }
};

export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await db.one("SELECT * FROM Post WHERE postid = $1", [id]);
    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "Post not found" });
  }
};

export const updatePostById = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ error: "Content is required" });
    }

    const updatedPost = await db.one(
      `UPDATE Posts SET content = $1 WHERE postid = $2 RETURNING *`,
      [content, id]
    );

    res
      .status(200)
      .json({ message: "Post updated successfully", post: updatedPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating post" });
  }
};

export const deletePostById = async (req, res) => {
  try {
    const { id } = req.params;

    await db.none("DELETE FROM Post WHERE postid = $1", [id]);

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting post" });
  }
};
