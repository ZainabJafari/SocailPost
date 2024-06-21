import { useContext, useState, useEffect } from "react";
import "./comments.scss";
import { AuthContext } from "../../context/authContext";
import moment from "moment";
import { usePosts } from "../../context/PostsContext";

const Comments = ({ postId }) => {
  const [desc, setDesc] = useState("");
  const { comments, fetchComments, createComment } = usePosts();

  useEffect(() => {
    fetchComments(postId);
  }, [postId, fetchComments]);

  const handleClick = async (e) => {
    e.preventDefault();
    await createComment({ desc, postId });
    setDesc("");
  };

  return (
    <div className="comments">
      <div className="write">
        <input
          type="text"
          placeholder="Write a comment..."
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="comment-input"
        />
        <button onClick={handleClick} className="send-button">Send</button>
      </div>
      {comments
        .filter((comment) => comment.postId === postId)
        .map((comment) => (
          <div className="comment" key={comment.id}>
            <img src={"/upload/" + comment.profilePic} alt="Profile" className="comment-profile-pic"/>
              <span className="comment-name">{comment.name}</span>
            <div className="info">
              <p className="comment-desc">{comment.desc}</p>
            </div>
            <span className="date">{moment(comment.createdAt).fromNow()}</span>
          </div>
        ))}
    </div>
  );
};

export default Comments;
