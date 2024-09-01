import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import PrivateRoute from "./components/Routes/Private";
import "./App.css";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/dashboard" element={<PrivateRoute />}>
           <Route path="home" element={<Home />} />
        </Route>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};

export default App;
