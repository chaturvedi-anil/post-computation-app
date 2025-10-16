import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  useEffect(() => {
    const auth_token = localStorage.getItem("auth_token");
    if (auth_token) {
      setIsAuth(true);
      const uname = localStorage.getItem("username");
      if (uname) {
        setUsername(uname);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("username");
    setIsAuth(false);
    setUsername("");
  };
  return (
    <nav className="header">
      <div className="left">
        <span>
          <Link to={"/"}>PostComputationApp</Link>
        </span>
      </div>
      <div className="right">
        {isAuth ? (
          <>
            <p>{username}</p>
            <div>
              <button className="button" onClick={handleLogout}>
                logout
              </button>
            </div>
          </>
        ) : (
          <>
            <button className="button">
              <Link to={"/login"}>login</Link>
            </button>
            <button className="button">
              <Link to={"/register"}>register</Link>
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
