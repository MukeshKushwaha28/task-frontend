import React from "react";
import { useAuth } from "../store/auth";
import { NavLink, Link } from "react-router-dom";
import {Text} from "@chakra-ui/react"

const Header = () => {
  const [auth, setAuth] = useAuth();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    // toast.success("Logout Successfully");
  };
  return (
    <div>
      <nav class="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark" >
        <div class="container-fluid" style={{backgroundColor:"rgb(2, 2, 36,.8)"}}>
          <a class="navbar-brand" href="#">
          
          </a>

          <Text color={"white"} align={"left"}  fontSize={"20px"} fontWeight={"bold"} mt={[5]} mr={[5]}>TaskManager</Text>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >

      
            <span class="navbar-toggler-icon">
            </span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">

            
            <ul class="navbar-nav">
              {/* <li class="nav-item" className="hover">
                <Link class="nav-link active" aria-current="page" to="/drag" style={{fontSize:"1.3rem"}}>
                  Drag
                </Link>
              </li> */}
              
              {!auth?.user ? (
                <>
                  <li className="nav-item" class="hover">
                    <Link to="/register" className="nav-link" style={{fontSize:"1.3rem"}}>
                      Register
                    </Link>
                  </li>
                  <li className="nav-item" class="hover">
                    <NavLink to="/" className="nav-link" style={{fontSize:"1.3rem"}}>
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown ">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      style={{ border: "none" ,fontSize:'1.3rem'}}
                      
                    >
                      {auth?.user?.name}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          to={"/dashboard/home"}
                          className="dropdown-item"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handleLogout}
                          to="/"
                          className="dropdown-item"
                        >
                          Logout
                        </NavLink>
                      </li>

                      <li>
                        <NavLink
                          // onClick={handleLogout}
                          to="/dashboard/drag"
                          className="dropdown-item"
                        >
                          Drag
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}

              
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
