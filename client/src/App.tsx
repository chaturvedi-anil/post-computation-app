import { Routes, Route } from "react-router-dom";
import PostsList from "./components/PostsList";
import Post from "./components/Post";
import NavbarNew from "./components/NavbarNew";

const App = () => {
  return (
    <>
      <NavbarNew />

      <div className="mx-42">
        <Routes>
          <Route path="/" element={<PostsList />} />
          <Route path="/posts/:id" element={<Post />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
