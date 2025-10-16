import { useAsync } from "../hooks/useAsync";
import { fetchPosts } from "../apis/postsApi";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const getDate = (date: string) => {
  return new Date(date).toLocaleString();
};

const PostsList = () => {
  const { loading, error, data: response } = useAsync(fetchPosts, []);
  const [posts, setPosts] = useState<any>([]);

  useEffect(() => {
    setPosts(response?.data?.posts ?? []);
  }, [response]);
  if (error) return <h1 className="error-msg">{String(error)}</h1>;

  return (
    <>
      {loading ? (
        <h1 className="loading">Posts Loading...</h1>
      ) : (
        posts.map((post) => (
          <div className="post-container" key={post.id}>
            <Link to={`/posts/${post.id}`}>
              <div className="post-head">
                <p className="author-name">{post.author.username}</p>
                <p className="date-time">{getDate(post.createdAt)}</p>
              </div>
              <p className="post-value">{post.value}</p>
              <div className="post-actions">
                <button>View Post</button>
              </div>
            </Link>
          </div>
        ))
      )}
    </>
  );
};

export default PostsList;
