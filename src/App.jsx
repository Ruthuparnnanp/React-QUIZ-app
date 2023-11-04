import { useEffect, useState } from 'react'
import './App.css';
import data from "./data/data";
import Swal from 'sweetalert2';

function App() {
  const [currentQuestion,setCurrentQuestion]=useState(1);
  const [score,setScore] = useState(0);
  const [isCorrect,setIsCorrect] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const[correctIndex,setCorrectIndex] = useState(null)
  const [nextPage,setNextPage] = useState(1);
  const [isDisabled,setIsDisabled] = useState(true);
  const [over,setOver] = useState(false);

  const correctClass = " border-green-700 bg-emerald-100 text-green-900";
  const wrongClass = " border-red-700 bg-rose-100 shake text-red-600";

  const handleClick = (item,index)=>{
    setIsDisabled(false);
    if(selectedOption !== null)return //for not to select multiple options
    setSelectedOption(index);
    if(item === data[currentQuestion]["answer"]){
      setScore(prev=> prev + 1);
       setIsCorrect(true)
  }else{
    setIsCorrect(false)
    let index = data[currentQuestion]['options'].findIndex(item=>item === data[currentQuestion]["answer"])
    setCorrectIndex(index)
  }
  }

  const handleNext = ()=>{
    setIsDisabled(true)
    currentQuestion < 10 ? setCurrentQuestion(prev => prev+1) : winALert();
    currentQuestion <10 && setNextPage(prev=>prev+1);
    currentQuestion === 10 && setOver(true);
  }

  const handleReset = ()=>{
    setScore(0);
    setCurrentQuestion(1)
    setNextPage(1)
    setOver(false)
    setIsCorrect(null)
    setIsDisabled(true)
    setSelectedOption(null)
    setCorrectIndex(null)
  }

  useEffect(()=>{
    setSelectedOption(null);
    setIsCorrect(null);
    setCorrectIndex(null)
  },[nextPage]);

  const winALert = ()=>{
    Swal.fire({
      timer:700,
      showConfirmButton:false,
      willOpen:()=>{
        Swal.showLoading();
      }
    })
  }
  

  return (
    <>
      <div className="containerr font-sans bg-slate-100 border-4 mx-auto flex justify-center items-center h-screen w-full">
          <div className="quiz-conatiner bg-white rounded border-red-500 border-2 " style={{width:'500px'}}>
            <div className='p-5 shadow-lg text-slate-400 font-bold text-xl '>React - Tailwind Quiz App</div>
           {
             over ? 
             (<div className="bodyy p-10">
               <h1 className='font-bold text-2xl mb-7'>You have completed the Quiz 🥳</h1>
               <p className='font-semibold text-2xl mb-7'>You answered {score} out of 10 questions correctly 🎉</p>
               <p className={` w-full  p-3 ps-5 border select-none cursor-pointer rounded font-semibold mb-3 text-lg ${correctClass}`}>Correct Answers : <b className='number'>{score}</b></p>
               <p className={` w-full  p-3 ps-5 border select-none cursor-pointer rounded font-semibold mb-3 text-lg ${wrongClass}`}>  Wrong  Answers : <b className='number'>{10-score}</b></p>
                <div className='flex w-full justify-end'>
                  <hr className='text-green-700'/>
               <button onClick={handleReset} className={`px-5 mt-3  py-3 hover:scale-95 font-semibold bg-neutral-950 text-white rounded `}>Start Over</button>
                </div>
             </div>):(
               <div className="body p-5 sm:p-10 pb-0">
               <h1 className='font-bold text-2xl mb-7'>{data[currentQuestion]['question']}</h1>
               {
                 data[currentQuestion]["options"].map((item,index)=>(
               <p key={index} onClick={()=>handleClick(item,index)} className={`w-full ${correctIndex === index && correctClass } p-3 ps-5 border select-none cursor-pointer rounded font-semibold mb-3 ${selectedOption === index && isCorrect ? correctClass + " correct-answer" : selectedOption === index && wrongClass }`}>{item}</p>
                 ))
               }
               <hr className='mt-10'/>
               <div className='flex justify-between mb-2 mt-2'>
                 <p className='p-3'><span className='font-bold  number'>{nextPage}</span> of <span className='number'>10</span> Questions</p>
                 <button disabled={isDisabled} onClick={handleNext} className={`px-8 hover:scale-95 font-semibold bg-neutral-950 text-white rounded ${isDisabled && "bg-neutral-300 cursor-not-allowed"}`}>Next</button>
               </div>
             </div>
             )
           }
          </div>
      </div>
    </>
  )
}

export default App
