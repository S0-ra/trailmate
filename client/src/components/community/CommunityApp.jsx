import { useEffect, useState } from "react";
import { useUserId } from "../../context/UserContext";
import axios from "axios";
import { toast } from "react-toastify";
/* eslint-disable react/prop-types */

const CommunityHeader = function () {
  return (
    <header className="bg-white">
      <div className="container mx-auto p-4 flex items-center">
        <a href="/" className="text-3xl font-bold text-red-500">
          TrailMate
        </a>

        <div className="flex ml-16 border border-gray-300 rounded-xl overflow-hidden sm:flex">
          <input
            type="text"
            placeholder="Search"
            className="py-2 px-4 w-full outline-none text-sm text-gray-600"
          />
          <i className="fa-solid fa-magnifying-glass p-3 text-gray-500"></i>
        </div>

        <div className="ml-auto flex space-x-5">
          <a href="#">
            <i className="fa-solid fa-user-plus text-gray-600 text-lg"></i>
          </a>
          <a href="#">
            <i className="fa-solid fa-comment-dots text-gray-600 text-lg"></i>
          </a>
          <a href="#">
            <i className="fa-solid fa-bell text-gray-600 text-lg"></i>
          </a>
        </div>
      </div>
    </header>
  );
};

const Sidebar = function ({ name }) {
  return (
    <aside className="w-full sm:w-1/4 bg-white p-4 mb-4 sm:mb-0 sm:mr-4 justify-self-start">
      <a href="/profile">
        <div className="flex border border-gray-200 bg-gray-50 rounded-lg py-2 px-3 md:p-2 items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-red-400 rounded-full"></div>
          <span className="font-semibold">John Doe</span>
        </div>
      </a>
      <nav className="space-y-2 text-sm text-gray-700">
        <a
          href="/community"
          className="flex items-center p-2 rounded-lg hover:bg-gray-100">
          <i className="fa-solid fa-house mr-2"></i>
          <span>Feed</span>
        </a>

        <a
          href="/community/events"
          className="flex items-center p-2 rounded-lg hover:bg-gray-100">
          <i className="fa-solid fa-calendar-days mr-2"></i>
          <span>Event</span>
        </a>

        <a
          href="/"
          className="flex items-center p-2 rounded-lg hover:bg-gray-100">
          <i className="fa-solid fa-store mr-2"></i>
          <span>Marketplace</span>
        </a>
        <a
          href="/communities"
          className="flex items-center p-2 rounded-lg hover:bg-gray-100">
          <i className="fa-solid fa-users-line mr-2"></i>
          <span>Communities</span>
        </a>
      </nav>

      <div className="mt-12">
        <h2 className="text-sm font-semibold mb-5 text-gray-500">
          Pages You Like
        </h2>
        <div className="space-y-4 text-xs font-medium">
          <div className="flex items-center justify-between rounded-lg hover:bg-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-red-400 rounded-full"></div>
              <span className="text-sm">Zam Vlogs</span>
            </div>
            <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full">
              120
            </span>
          </div>

          <div className="flex items-center justify-between rounded-lg hover:bg-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-red-400 rounded-full"></div>
              <span className="text-sm">Sisan Baniya</span>
            </div>
            <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full">
              10
            </span>
          </div>

          <div className="flex items-center justify-between rounded-lg hover:bg-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-red-400 rounded-full"></div>
              <span className="text-sm">Ghumante</span>
            </div>
            <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full">
              18
            </span>
          </div>

          <div className="flex items-center justify-between rounded-lg hover:bg-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-red-400 rounded-full"></div>
              <span className="text-sm">Dhorpatan</span>
            </div>
            <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full">
              21
            </span>
          </div>
        </div>
      </div>
      <h3 className="text-sm font-semibold mb-5 text-gray-500 mt-12">
        Your Pages
      </h3>
      <div className="space-y-3">
        <div className="flex justify-start text-sm space-x-3">
          <div className="w-6 h-6 bg-red-400 rounded-full"></div>
          <span>Zam Vlogs</span>
          <span className="text-xs text-gray-400 pl-6 rounded-full">
            11 min
          </span>
        </div>
        <div className="flex justify-start text-sm space-x-3">
          <div className="w-6 h-6 bg-red-400 rounded-full"></div>
          <span>Sisan Baniya</span>
          <span className="pl-6">
            <i
              className="fa-solid fa-circle fa-xs"
              style={{ color: "#40b800" }}></i>
          </span>
        </div>
        <div className="flex justify-start text-sm space-x-3">
          <div className="w-6 h-6 bg-red-400 rounded-full"></div>
          <span>Ghumante</span>
          <span className="pl-9">
            <i
              className="fa-solid fa-circle fa-xs"
              style={{ color: "#40b800" }}></i>
          </span>
        </div>
        <div className="flex justify-start text-sm space-x-3">
          <div className="w-6 h-6 bg-red-400 rounded-full"></div>
          <span>Dhorpatan</span>
          <span className="pl-9">
            <i
              className="fa-solid fa-circle fa-xs"
              style={{ color: "#40b800" }}></i>
          </span>
        </div>
      </div>
    </aside>
  );
};

const PostInput = function ({ userid }) {
  const [postInput, setPostInput] = useState("");

  const submitPost = async function () {
    if (!postInput.trim()) {
      setPostInput("");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/post", {
        userid,
        content: postInput,
      });
      console.log("Post successful", response.data);
      toast.success(`Post Uploaded`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
      });
      setPostInput("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white p-4 mb-6 relative flex items-center gap-2">
      <div className="w-12 h-12 rounded-full bg-red-400"></div>
      <div className="flex items-center w-full bg-gray-100 rounded-full">
        <input
          type="text"
          placeholder="What's on your mind?"
          id="post-input"
          className="w-full bg-transparent p-3 text-gray-700 placeholder-gray-500 focus:outline-none"
          value={postInput}
          onChange={(e) => setPostInput(e.target.value)}
        />
        <button
          className="bg-red-400 text-white px-4 py-1 rounded-full hover:bg-red-500 focus:ring-2 focus:ring-red-300 focus:outline-none ml-2 mr-2"
          onClick={submitPost}>
          Post
        </button>
      </div>
    </div>
  );
};

const Comment = function ({ userid, content }) {
  const [name, setName] = useState(null);

  useEffect(() => {
    if (userid) {
      axios
        .get(`http://localhost:8000/api/users/name/${userid}`)
        .then((response) => {
          setName(response.data.name);
        })
        .catch((err) => {
          console.log("Error occurred", err);
        });
    }
  }, [userid]);

  return (
    <div className="flex items-start space-x-2 mt-2">
      <div className="w-8 h-8 bg-red-400 rounded-full flex-shrink-0"></div>
      <div className="bg-gray-100 rounded-lg p-2 flex-grow">
        <h4 className="font-semibold text-sm">{name}</h4>
        <p className="text-sm text-gray-700">{content}</p>
      </div>
    </div>
  );
};

const Post = function ({ postid, userid, content }) {
  const [liked, setLiked] = useState(false);
  const [name, setName] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { userId } = useUserId();

  const toggleLike = function () {
    setLiked(!liked);
  };

  useEffect(() => {
    if (userid) {
      axios
        .get(`http://localhost:8000/api/users/name/${userid}`)
        .then((response) => {
          setName(response.data.name);
        })
        .catch((err) => {
          console.log("Error occurred", err);
        });
    }
  }, [userid]);

  // Fetch comments immediately when post loads
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/comment/post/${postid}`
        );
        setComments(response.data);
      } catch (error) {
        console.log("Error fetching comments:", error);
        toast.error("Failed to fetch comments", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
        });
      }
    };

    fetchComments();
  }, [postid]);

  const submitComment = async () => {
    if (!newComment.trim()) return;

    try {
      await axios.post(
        "http://localhost:8000/api/comment",
        {
          postid,
          content: newComment,
          userid: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Fetch updated comments after posting
      const response = await axios.get(
        `http://localhost:8000/api/comment/post/${postid}`
      );
      setComments(response.data);
      setNewComment("");

      toast.success("Comment added successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
      });
    } catch (error) {
      console.log("Error posting comment:", error);
      toast.error(error.response?.data?.error || "Failed to add comment", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-red-400 rounded-full"></div>
        <div>
          <h3 className="font-bold text-sm">{name}</h3>
        </div>
      </div>
      <p className="text-sm text-gray-700 mt-3">{content}</p>

      <div className="flex justify-between items-center mt-3 text-gray-500 text-sm">
        <div className="flex gap-4">
          <button
            className={`flex items-center gap-1 ${
              liked ? "text-red-400" : "text-gray-500"
            } hover:text-red-400`}
            onClick={toggleLike}>
            <i className="fa-solid fa-heart"></i>
          </button>

          <div className="flex items-center gap-1">
            <i className="fa-solid fa-comment"></i>
            <span>{comments.length}</span>
          </div>
        </div>
      </div>

      {/* Comments Section - Always visible */}
      <div className="mt-4 border-t pt-4">
        {/* Comments List */}
        <div className="space-y-4">
          {comments.length === 0 ? (
            <p className="text-center text-gray-500 py-2">No comments yet</p>
          ) : (
            <div className="space-y-4">
              {comments.map((comment) => (
                <Comment
                  key={comment.commentid}
                  userid={comment.userid}
                  content={comment.content}
                />
              ))}
            </div>
          )}
        </div>
        {/* Comment Input */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-red-400 rounded-full flex-shrink-0"></div>
          <div className="flex-grow flex items-center bg-gray-100 rounded-full mt-4">
            <input
              type="text"
              placeholder="Write a comment..."
              className="flex-grow bg-transparent p-2 text-sm text-gray-700 placeholder-gray-500 focus:outline-none"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  submitComment();
                }
              }}
            />
            <button
              className="bg-red-400 text-white px-4 py-1 rounded-full hover:bg-red-500 focus:ring-2 focus:ring-red-300 focus:outline-none mr-2 text-sm"
              onClick={submitComment}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CommunityApp = function () {
  const { userId } = useUserId();
  const [name, setName] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:8000/api/users/name/${userId}`)
        .then((response) => {
          setName(response.data.name);
        })
        .catch((err) => {
          console.log("Error occurred", err);
        });
    }
  }, [userId]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/post")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.log("Error occurred", err);
      });
  });

  return (
    <>
      <CommunityHeader />
      <div className="container mx-auto p-0 sm:flex">
        <Sidebar name={name} />
        <div className="bg-gray-100 min-h-screen py-8 px-4 w-3/5">
          <PostInput userid={userId} />
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow-md p-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-400 rounded-full"></div>
                  <div>
                    <h3 className="font-bold text-sm">Mountain Wanderer</h3>
                    <p className="text-xs text-gray-500">1 hour ago</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mt-3">
                  Reaching new heights and embracing the beauty of the Himalayas
                  on the ABC Trek! 🏔️ #AnnapurnaBaseCamp #AdventureAwaits🌄
                </p>
                <div className="mt-3">
                  <img
                    src="../../../src/assets/abc.jpg"
                    alt="Trekking Image"
                    className="rounded-lg w-full"
                  />
                </div>
                <div className="flex justify-between items-center mt-3 text-gray-500 text-sm">
                  <div className="flex gap-2">
                    <button className="flex items-center gap-1 hover:text-red-400">
                      <i className="fa-solid fa-heart"></i> 235
                    </button>
                    <button className="flex items-center gap-1 hover:text-red-400">
                      <i className="fa-solid fa-comment"></i> 34
                    </button>
                  </div>
                  <p>Tags: #Annapurna #NepalTrekking</p>
                </div>
              </div>
              {posts.length > 0 ? (
                posts.map((post) => (
                  <Post
                    key={post.postid}
                    postid={post.postid}
                    userid={post.userid}
                    content={post.content}
                  />
                ))
              ) : (
                <div className="text-center text-gray-500">&nbsp;</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommunityApp;
