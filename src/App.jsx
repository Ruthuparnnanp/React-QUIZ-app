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

  const correctClass = " border-green-700 bg-emerald-100";
  const wrongClass = " border-red-700 bg-rose-100 shake";

  const handleClick = (item,index)=>{
    if(selectedOption !== null)return
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
    currentQuestion < 10 ? setCurrentQuestion(prev => prev+1) : winALert();
    currentQuestion <10 && setNextPage(prev=>prev+1)
  }

  useEffect(()=>{
    setSelectedOption(null);
    setIsCorrect(null);
    setCorrectIndex(null)
  },[nextPage]);

  const winALert = ()=>{
    Swal.fire({
      title:"Quiz Over",
      text:"You have finished the Quiz",
      icon:"success",
      confirmButtonText:'OK'
    })
  }
  

  return (
    <>
      <div className="containerr font-sans bg-slate-100 border-4 mx-auto flex justify-center items-center h-screen w-full">
          <div className="quiz-conatiner bg-white rounded border-red-500 border-2 " style={{width:'500px'}}>
            <div className='p-5 shadow-lg text-slate-400 font-bold text-xl '>React - Tailwind Quiz App</div>
            <div className="body p-10 pb-0">
              <h1 className='font-bold text-2xl mb-7'>{data[currentQuestion]['question']}</h1>
              {
                data[currentQuestion]["options"].map((item,index)=>(
              <p key={index} onClick={()=>handleClick(item,index)} className={`w-full ${correctIndex === index && correctClass } p-3 ps-5 border select-none cursor-pointer rounded font-semibold mb-3 ${selectedOption === index && isCorrect ? correctClass + " correct-answer" : selectedOption === index && wrongClass }`}>{item}</p>
                ))
              }
              <hr className='mt-10'/>
              <div className='flex justify-between mb-2 mt-2'>
                <p className='p-3'><span className='font-bold'>{nextPage}</span> of 10 Questions</p>
                <button onClick={handleNext} className='px-8  bg-blue-500 rounded'>Next</button>
              </div>
            </div>
          </div>
      </div>
    </>
  )
}

export default App
