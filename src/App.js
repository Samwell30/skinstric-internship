import React from "react";
import Landing from "./components/Landing";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css"

function App() {

  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          {/* <Route path="/test" element={<Landing />}></Route>
      <Route path="/demographics" element={<Landing />}></Route> */}
        </Routes>
      </div>
    </BrowserRouter>
  )
}
export default App;
