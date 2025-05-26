import React from "react";
import Landing from "./components/Landing";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css"
import ConsumerData from "./pages/ConsumerData";
import UserImage from "./pages/UserImage";
import DemographicsInfo from "./pages/Demographics";
import Header from "./components/Header";

function App() {

  return (
    <BrowserRouter>
    <Header/>
      <div className="app">
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/consumerData" element={<ConsumerData />}></Route>
          <Route path="/userImage" element={<UserImage />}></Route>
          <Route path="/demographics" element={<DemographicsInfo />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}
export default App;
