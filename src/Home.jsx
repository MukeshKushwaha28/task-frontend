import React from "react";
import Sidebar from "./components/Sidebar";
import Maincontent from "./components/Maincontent";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Header from "./components/Header";
import "./App.css";
const Home = () => {
  return (
    <>
    <Header/>
      <div className="App">
        <Sidebar />
        <Maincontent />
      </div>
    </>
  );
};

export default Home;
