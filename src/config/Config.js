import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../layouts/Home";
const config = () => {
  return (
    <Router>
      <Routes>
        {/* <Route exact path="/" element={<Loading />}></Route> */}
        <Route exact path="/" element={<Home />}></Route>
      </Routes>
    </Router>
  );
};

export default config;
