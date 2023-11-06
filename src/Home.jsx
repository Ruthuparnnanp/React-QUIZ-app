import { useState } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";

function Home({ setSelectedOption, selectedOption }) {
  const correctClass = " border-green-700 bg-emerald-100 text-green-900";

  const navigate = useNavigate();

  return (
    <>
      <div className="containerr font-sans bg-slate-100 border-4 mx-auto flex justify-center items-center h-screen w-full">
        <div
          className="quiz-conatiner bg-white rounded border-slate-950 border-4 "
          style={{ width: "500px" }}
        >
          <div className="p-5 shadow-lg text-slate-400 font-bold text-xl ">
            React - Tailwind Quiz App
          </div>
          <div className="body p-10">
            <h1 className="font-bold text-2xl mb-7">
              In which category do you want to play the quiz ?
            </h1>
            <p
              onClick={() => setSelectedOption("React")}
              className={` w-full  p-3 ps-5 border select-none cursor-pointer rounded font-semibold mb-3 text-lg ${
                selectedOption === "React" && correctClass + " correct-answer"
              }`}
            >
              React
            </p>
            <p
              onClick={() => setSelectedOption("Node")}
              className={` w-full  p-3 ps-5 border select-none cursor-pointer rounded font-semibold mb-3 text-lg ${
                selectedOption === "Node" && correctClass + " correct-answer"
              }`}
            >
              Node
            </p>
            <p
              onClick={() => setSelectedOption("Angular")}
              className={` w-full  p-3 ps-5 border select-none cursor-pointer rounded font-semibold mb-3 text-lg ${
                selectedOption === "Angular" && correctClass + " correct-answer"
              }`}
            >
              Angular
            </p>
            <hr className="text-green-700 mt-10" />
            <div className="flex w-full justify-end">
              {selectedOption && (
                <button
                  onClick={() => navigate("/quiz")}
                  className={`px-5 mt-6  py-3 hover:scale-95 font-semibold bg-neutral-950 text-white rounded `}
                >
                  Start {selectedOption} Quiz
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
