import { useParams } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
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
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        post && (
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
        )
      )}
    </>
  );
};

export default Post;
