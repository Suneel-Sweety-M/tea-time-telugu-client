import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  addGalleryReaction,
  addNewsComment,
  addNewsReaction,
  addNewsReplyComment,
  deleteNewsComment,
  dislikeNewsComment,
  getNewsComments,
  likeNewsComment,
} from "../../helper/apis";
import { addReaction, setReduxReactions } from "../../redux/userSlice";
import moment from "moment";

const NewsComments = ({ news, commentsCount, setCommentsCount }) => {
  // const [showReplyBox, setShowReplyBox] = useState(false);
  const { id } = useParams();
  const { user } = useSelector((state) => state.teatimetelugu);
  const reactionsArray = useSelector((state) => state.teatimetelugu.reactions);
  const [directComments, setdirectComments] = useState([]);
  const [comment, setComment] = useState("");
  const [deleteCommentId, setdeleteCommentId] = useState("");
  const [isDeletingId, setIsDeletingId] = useState(null);
  const [replyInputs, setReplyInputs] = useState({});
  // const [seePassword, setSeePassword] = useState(false);
  // const [isSubmitting, setIsSubmitting] = useState(false);
  const [joinPopup, setJoinPopup] = useState(false);
  // const [isUserJoin, setIsUserJoin] = useState(true);
  // const [data, setData] = useState({
  //   email: "",
  //   password: "",
  // });
  const dispatch = useDispatch();

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setData({
  //     ...data,
  //     [name]: value,
  //   });
  // };

  // const onSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);
  //   try {
  //     const res = await loginUser(data);

  //     if (res?.status === "fail") {
  //       toast.error(res?.message || "Error");
  //     } else if (res?.status === "success") {
  //       toast.success(res?.message || "Success");
  //       const newData = {
  //         user: res?.user,
  //       };

  //       dispatch(login(newData));
  //       setJoinPopup(false);
  //       setData({
  //         email: "",
  //         password: "",
  //       });
  //     } else {
  //       toast.info(res?.message || "Info");
  //     }
  //     setIsSubmitting(false);
  //   } catch (error) {
  //     console.log(error);
  //     setIsSubmitting(false);
  //   }
  // };

  const fetchComments = useCallback(async () => {
    try {
      const res = await getNewsComments(id);
      if (res?.status !== "success") {
        toast.error(res?.message);
      } else {
        const comments = res?.comments;
        setCommentsCount(comments?.length);

        const directCommentsList = comments.filter(
          (comment) => !comment.parentComment
        );
        setdirectComments(directCommentsList);
      }
    } catch (error) {
      console.log(error);
    }
  }, [id, setCommentsCount]);

  const toggleReply = (commentId) => {
    setReplyInputs((prev) => ({
      ...prev,
      [commentId]: {
        ...prev[commentId],
        showReplies: !prev[commentId]?.showReplies,
        replyText: "",
      },
    }));
  };

  const handleAddReaction = async (type) => {
    try {
      if (!user) {
        setJoinPopup(true);
        return;
      }
      const res = await addNewsReaction(news?._id, { userId: user?._id, type });
      if (res?.status === "success") {
        // await getNews();
        dispatch(addReaction({ userId: user._id, type, _id: res.reactionId }));
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      console.error("Error adding reaction:", error);
    }
  };

  const handleAddGalleryReaction = async (type) => {
    try {
      if (!user) {
        setJoinPopup(true);
        return;
      }
      const res = await addGalleryReaction(news?._id, {
        userId: user?._id,
        type,
      });
      if (res?.status === "success") {
        // await getNews();
        dispatch(addReaction({ userId: user._id, type, _id: res.reactionId }));
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      console.error("Error adding reaction:", error);
    }
  };

  const reactionsList = useMemo(
    () =>
      [
        {
          type: "Happy",
          emoji:
            "https://res.cloudinary.com/demmiusik/image/upload/v1727518078/happy-emoji_inhxsm.png",
        },
        {
          type: "Normal",
          emoji:
            "https://res.cloudinary.com/demmiusik/image/upload/v1727518078/normal-emoji_gzom13.png",
        },
        {
          type: "Amused",
          emoji:
            "https://res.cloudinary.com/demmiusik/image/upload/v1727518078/amused-emoji_urhf7o.png",
        },
        {
          type: "Funny",
          emoji:
            "https://res.cloudinary.com/demmiusik/image/upload/v1727518078/funny-emoji_pxilxx.png",
        },
        {
          type: "Angry",
          emoji:
            "https://res.cloudinary.com/demmiusik/image/upload/v1727518078/angry-emoji_fowci4.png",
        },
        {
          type: "Sad",
          emoji:
            "https://res.cloudinary.com/demmiusik/image/upload/v1727518078/sad-emoji_lrx7hc.png",
        },
      ].map((reaction) => ({
        ...reaction,
        count: reactionsArray.filter((r) => r.type === reaction.type).length,
        percentage:
          reactionsArray.length > 0
            ? Math.round(
                (reactionsArray.filter((r) => r.type === reaction.type).length /
                  reactionsArray.length) *
                  100
              )
            : 0,
        reacted: reactionsArray.some(
          (r) => r.userId === user?._id && r.type === reaction.type
        ),
      })),
    [reactionsArray, user?._id]
  );

  const handleAddComment = async () => {
    try {
      const res = await addNewsComment(id, { comment, language: "en" });
      if (res?.status === "success") {
        setComment("");
        fetchComments();
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddReplyComment = async (parentCommentId) => {
    const replyText = replyInputs[parentCommentId]?.replyText || "";
    try {
      const res = await addNewsReplyComment(id, {
        parentCommentId,
        comment: replyText,
        language: "en",
      });
      if (res?.status === "success") {
        fetchComments();
        setReplyInputs((prev) => ({
          ...prev,
          [parentCommentId]: { ...prev[parentCommentId], replyText: "" },
        }));
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    setIsDeletingId(commentId);
    try {
      const res = await deleteNewsComment(commentId);
      if (res?.status !== "success") {
        toast.error(res?.message);
      } else {
        fetchComments();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeletingId(null);
    }
  };

  const handleLikeComment = async (commentId) => {
    try {
      if (!user) {
        setJoinPopup(true);
        return;
      }
      const res = await likeNewsComment(commentId);
      if (res?.status !== "success") {
        toast.error(res?.message);
      } else {
        fetchComments();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDislikeComment = async (commentId) => {
    try {
      if (!user) {
        setJoinPopup(true);
        return;
      }
      const res = await dislikeNewsComment(commentId);
      if (res?.status !== "success") {
        toast.error(res?.message);
      } else {
        fetchComments();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  useEffect(() => {
    if (news?.reactions) {
      dispatch(setReduxReactions(news.reactions));
    }
  }, [dispatch, news?.reactions]);

  return (
    <>
      <div className="news-comments-container">
        <div className="news-reactions-section">
          <div className="news-reactions-title">
            <h3>What is your reaction?</h3>
            <span>{reactionsArray?.length} votes</span>
          </div>
          <div className="all-reactions">
            {reactionsList.map((reaction) => (
              <div
                className="reaction-box"
                onClick={() => {
                  if (news?.galleryPics) {
                    handleAddGalleryReaction(reaction.type);
                  } else {
                    handleAddReaction(reaction.type);
                  }
                }}
                key={reaction.type}
              >
                <div className="reaction-emoji">
                  <img src={reaction.emoji} alt={`${reaction.type} emoji`} />
                </div>
                <span
                  className="reaction-title"
                  style={{
                    color: reaction.reacted ? "orange" : "inherit",
                  }}
                >
                  {reaction.type}
                </span>
                <span
                  className="reaction-percentage"
                  style={{
                    color: reaction?.reacted ? "orange" : "inherit",
                  }}
                >
                  <b className="rp">{reaction.percentage}</b>%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="comments-section">
          <div className="comments-header">
            <h3>Comments ({commentsCount})</h3>
            <button className="notification-btn">
              <i className="fas fa-bell"></i>
            </button>
          </div>

          <div className="comment-form">
            <textarea
              placeholder="Write a comment..."
              rows="3"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <div className="form-actions">
              {user ? (
                <button className="send-btn" onClick={handleAddComment}>
                  Send
                </button>
              ) : (
                <button className="send-btn" onClick={() => setJoinPopup(true)}>
                  Login
                </button>
              )}
            </div>
          </div>

          <div className="comments-list">
            {directComments.map((comment) => (
              <div className="comment">
                <div className="comment-avatar">
                  <img
                    src={
                      comment?.postedBy?.profileUrl ||
                      "https://res.cloudinary.com/demmiusik/image/upload/v1729620426/post-default-pic_jbf1gl.png"
                    }
                    alt="user"
                  />
                </div>

                <div className="comment-body">
                  <div className="comment-header">
                    <div className="comment-meta">
                      <span className="comment-author">
                        {comment?.postedBy?.fullName}
                      </span>
                      <span className="comment-time">
                        {moment(comment?.createdAt).fromNow()}
                      </span>
                    </div>

                    <div className="comment-actions">
                      {comment?.postedBy?._id === user?._id && (
                        <button
                          className="options-btn"
                          onClick={() => {
                            if (deleteCommentId !== comment?._id) {
                              setdeleteCommentId(comment?._id);
                            } else {
                              setdeleteCommentId("");
                            }
                          }}
                        >
                          <i className="fas fa-ellipsis-v"></i>
                        </button>
                      )}

                      {deleteCommentId === comment?._id &&
                        comment?.postedBy?._id === user?._id && (
                          <div className="options-menu">
                            {isDeletingId !== comment?._id ? (
                              <button
                                className="delete-btn"
                                onClick={() =>
                                  handleDeleteComment(comment?._id)
                                }
                              >
                                <i className="fas fa-trash"></i> Delete
                              </button>
                            ) : (
                              <button className="delete-btn">
                                Deleting...
                              </button>
                            )}
                          </div>
                        )}
                    </div>
                  </div>

                  <div className="comment-content">{comment?.comment}</div>

                  <div className="comment-footer">
                    <button
                      className={`reaction-btn ${
                        user?._id && comment?.likes?.includes(user?._id)
                          ? "comment-liked"
                          : ""
                      }`}
                      onClick={() => handleLikeComment(comment?._id)}
                    >
                      <i className="fas fa-thumbs-up"></i>{" "}
                      {comment?.likes?.length > 0 && comment?.likes?.length}
                    </button>
                    <button
                      className={`reaction-btn ${
                        user?._id && comment?.dislikes?.includes(user?._id)
                          ? "comment-liked"
                          : ""
                      }`}
                      onClick={() => handleDislikeComment(comment?._id)}
                    >
                      <i className="fas fa-thumbs-down"></i>{" "}
                      {comment?.dislikes?.length > 0 &&
                        comment?.dislikes?.length}
                    </button>
                    <button
                      className="reply-btn"
                      onClick={() => toggleReply(comment?._id)}
                    >
                      Reply{" "}
                      {comment?.replies?.length > 0 &&
                        `(${comment?.replies?.length})`}
                    </button>
                  </div>

                  {replyInputs[comment?._id]?.showReplies && (
                    <div className="replies-list">
                      <div className="comment-form">
                        <textarea
                          placeholder="Write a reply..."
                          rows="3"
                          value={replyInputs[comment?._id]?.replyText || ""}
                          onChange={(e) =>
                            setReplyInputs((prev) => ({
                              ...prev,
                              [comment?._id]: {
                                ...prev[comment?._id],
                                replyText: e.target.value,
                              },
                            }))
                          }
                        ></textarea>
                        <div className="form-actions">
                          {user ? (
                            <button
                              className="send-btn"
                              onClick={() =>
                                handleAddReplyComment(comment?._id)
                              }
                            >
                              Send
                            </button>
                          ) : (
                            <button
                              className="send-btn"
                              onClick={() => setJoinPopup(true)}
                            >
                              Login
                            </button>
                          )}
                        </div>
                      </div>
                      {comment.replies.map((reply) => (
                        <div className="comment">
                          <div className="comment-avatar">
                            <img
                              src={
                                reply?.postedBy?.profileUrl ||
                                "https://res.cloudinary.com/demmiusik/image/upload/v1729620426/post-default-pic_jbf1gl.png"
                              }
                              alt="user"
                            />
                          </div>

                          <div className="comment-body">
                            <div className="comment-header">
                              <div className="comment-meta">
                                <span className="comment-author">
                                  {reply?.postedBy?.fullName}
                                </span>
                                <span className="comment-time">
                                  {moment(reply?.createdAt).fromNow()}
                                </span>
                              </div>

                              <div className="comment-actions">
                                {reply?.postedBy?._id === user?._id && (
                                  <button
                                    className="options-btn"
                                    onClick={() => {
                                      if (deleteCommentId !== reply?._id) {
                                        setdeleteCommentId(reply?._id);
                                      } else {
                                        setdeleteCommentId("");
                                      }
                                    }}
                                  >
                                    <i className="fas fa-ellipsis-v"></i>
                                  </button>
                                )}

                                {deleteCommentId === reply?._id &&
                                  reply?.postedBy?._id === user?._id && (
                                    <div className="options-menu">
                                      {isDeletingId !== reply?._id ? (
                                        <button
                                          className="delete-btn"
                                          onClick={() =>
                                            handleDeleteComment(reply?._id)
                                          }
                                        >
                                          <i className="fas fa-trash"></i>{" "}
                                          Delete
                                        </button>
                                      ) : (
                                        <button className="delete-btn">
                                          Deleting...
                                        </button>
                                      )}
                                    </div>
                                  )}
                              </div>
                            </div>

                            <div className="comment-content">
                              {reply?.comment}
                            </div>

                            <div className="comment-footer">
                              <button
                                className={`reaction-btn ${
                                  user?._id && reply?.likes?.includes(user?._id)
                                    ? "comment-liked"
                                    : ""
                                }`}
                                onClick={() => handleLikeComment(reply?._id)}
                              >
                                <i className="fas fa-thumbs-up"></i>{" "}
                                {reply?.likes?.length > 0 &&
                                  reply?.likes?.length}
                              </button>
                              <button
                                className={`reaction-btn ${
                                  user?._id &&
                                  reply?.dislikes?.includes(user?._id)
                                    ? "comment-liked"
                                    : ""
                                }`}
                                onClick={() => handleDislikeComment(reply?._id)}
                              >
                                <i className="fas fa-thumbs-down"></i>{" "}
                                {reply?.dislikes?.length > 0 &&
                                  reply?.dislikes?.length}
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {joinPopup && (
        <div className="popup-container">
          <div className="join-popup">
            <i className="fa fa-xmark" onClick={() => setJoinPopup(false)}></i>
            <h1>Login</h1>
            <a
              href={`${process.env.REACT_APP_API_URL}/auth/join-with-google?client=${process.env.REACT_APP_CLIENT_URL}`}
              className="continue-with-google cursor-pointer"
            >
              <img
                src="https://th.bing.com/th/id/R.0fa3fe04edf6c0202970f2088edea9e7?rik=joOK76LOMJlBPw&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fgoogle-logo-png-open-2000.png&ehk=0PJJlqaIxYmJ9eOIp9mYVPA4KwkGo5Zob552JPltDMw%3d&risl=&pid=ImgRaw&r=0"
                alt="google-logo"
              />
              <h4>Continue With Google</h4>
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default NewsComments;
