import React from "react";
import { Routes,Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import CreateProduct from "./Pages/CreateProduct";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <div className="h-screen w-screen  ">
      {<Navbar/>}
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/create" element={<CreateProduct/>}/>
      </Routes>
    </div>
  );
}

export default App;
