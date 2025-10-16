import { useParams } from "react-router-dom";
import { useEffect, useMemo } from "react";

import { useAsyncFn } from "../hooks/useAsync";
import { fetchPost } from "../apis/postsApi";

const getDate = (date: string) => {
  return new Date(date).toLocaleString();
};

const Post = () => {
  const { id } = useParams<{ id: string }>();
  const {
    loading,
    error,
    data: post,
    execute,
  } = useAsyncFn(() => fetchPost(id!), [id]);

  useEffect(() => {
    execute();
  }, [execute]);

  const operationsByParentId = useMemo(() => {
    if (post?.operations == null) return [];

    const group = [];

    post.operations.map((operation) => {
      // group[operation.parentId] = [];

      // group[operation.parentId].push(operation);
      console.log("operation : ", operation);
    });

    return group;
  }, [post]);

  // console.log(operationsByParentId);

  if (error) return <h1 className="error-msg">{String(error)}</h1>;

  return (
    <div className="post-details-container">
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        post && (
          <div className="post-details">
            <div className="post-head">
              <p className="author-name">{post.author.username}</p>
              <p className="date-time">{getDate(post.createdAt)}</p>
            </div>
            <p className="post-value">{post.value}</p>
            <div className="post-actions">
              <button>View Post</button>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Post;
