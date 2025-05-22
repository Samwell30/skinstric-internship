import React from "react";
import Landing from "./components/Landing";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css"
import ConsumerData from "./pages/ConsumerData";
import UserImage from "./pages/UserImage";

function App() {

  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/consumerData" element={<ConsumerData />}></Route>
          <Route path="/userImage" element={<UserImage />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}
export default App;
