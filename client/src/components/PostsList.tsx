import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAsync } from "../hooks/useAsync";
import { fetchPosts } from "../apis/postsApi";
import { Button } from "./ui/button";

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
          <Card className="my-5">
            <CardHeader>
              <CardTitle>{post.author.username}</CardTitle>
              {/* <CardDescription>Card Description</CardDescription> */}
              <CardAction>{getDate(post.createdAt)}</CardAction>
            </CardHeader>
            <CardContent>
              <p>{post.value}</p>
            </CardContent>
            <CardFooter>
              <Button
                className=" bg-indigo-600 cursor-pointer text-white text-md px-3 py-1 rounded-md font-semibold hover:bg-indigo-700"
                asChild
              >
                <Link to={"/post"}>Start Conversation</Link>
              </Button>
              <Button variant={"outline"} size={"icon"}></Button>
            </CardFooter>
          </Card>
        ))
      )}
    </>
  );
};

export default PostsList;
