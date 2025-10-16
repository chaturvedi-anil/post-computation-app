import { Routes, Route } from "react-router-dom";
import PostsList from "./components/PostsList";
import Navbar from "./components/Navbar";
import Post from "./components/Post";
import "./App.scss";

const App = () => {
  return (
    <div className="container">
      <Navbar />

      <div className="content">
        <Routes>
          <Route path="/" element={<PostsList />} />
          <Route path="/posts/:id" element={<Post />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
