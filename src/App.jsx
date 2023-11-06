import "./App.css";
// import { useEffect, useState } from "react";
// import data from "./data/data";
// import Swal from "sweetalert2";
import { Route, Routes } from "react-router-dom";
import Index from "./Index";
import Home from "./Home";
import { useState } from "react";
function App() {
  const [quizOption, setQuizOption] = useState("");
 

  return (
    <>
      <Routes>
        <Route path="/" element ={ <Home selectedOption={quizOption} setSelectedOption={setQuizOption} />}  />
        <Route path="/quiz" element={ <Index option={quizOption} setQuizOption={setQuizOption} />} />
      </Routes>
    </>
  );
}

export default App;
