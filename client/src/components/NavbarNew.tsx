import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Button } from "./ui/button";

const NavbarNew = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      setIsAuth(true);
      const uname = localStorage.getItem("username");
      if (uname) setUsername(uname);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("username");
    setIsAuth(false);
  };

  return (
    <header className="w-full sticky top-0 z-10 bg-white shadow-md px-6 py-3">
      <div className="max-w-6xl mx-auto flex items-center justify-between flex-wrap">
        {/* Left - Logo / App name */}
        <Link to="/" className="text-2xl font-bold text-royalblue">
          PostComputationApp
        </Link>

        {/* Center - Single link to posts (home) */}
        <nav className="hidden sm:flex justify-center flex-1">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    to="/"
                    className="font-semibold text-xl cursor-pointer text-gray-700 hover:text-indigo-600 transition"
                  >
                    Posts
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* Right - Auth buttons */}
        <div className="flex items-center gap-2">
          {isAuth ? (
            <>
              <span className="hidden sm:inline font-medium capitalize mr-2">
                {username}
              </span>
              <Button
                variant={"destructive"}
                className="cursor-pointer text-white text-md px-3 py-1 rounded-md font-semibold hover:font-bold"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                className=" bg-indigo-600 cursor-pointer text-white text-md px-3 py-1 rounded-md font-semibold hover:bg-indigo-700"
                asChild
              >
                <Link to={"/login"}>Login</Link>
              </Button>
              <Button
                variant={"secondary"}
                className="text-md px-3 py-1 text-indigo-500 rounded-md font-semibold hover:bg-indigo-100"
                asChild
              >
                <Link to={"/register"}>Register</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavbarNew;
