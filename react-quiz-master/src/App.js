import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import Home from "./components/Home";
 import Start from './components/Start';
  // import Profile from "./pages/Profile";
 import Contactus from "./pages/Contact";
import Question from './components/Question';
import End from './components/End';
import Modal from './components/Modal';
import quizData from './data/quiz.json';
// import Footer from './components/Footer';
// import Header from './components/Header';
// import Main from './components/Main';
// import Subject from './components/Subject';
let interval;

const App = () => {
  const [step, setStep] = useState(1);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    if(step === 3) {
      clearInterval(interval);
    }
  }, [step]);

  const quizStartHandler = () => {
    setStep(2);
    interval = setInterval(() => {
      setTime(prevTime => prevTime + 1);
    }, 1000);
  }

  const resetClickHandler = () => {
    setActiveQuestion(0);
    setAnswers([]);
    setStep(2);
    setTime(0);
    interval = setInterval(() => {
      setTime(prevTime => prevTime + 1);
    }, 1000);
  }

  return (

    <div className="App">
      {/* <div className="Header"><Header/></div> */}
      <div className='left section'>
        <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        {/* <Route path="/Profile" component={Profile}></Route> */}
        <Route path="/Contact" component={Contactus}></Route>
       </Switch>
       </BrowserRouter>
      </div>
      {step === 1 && <Start onQuizStart={quizStartHandler} />}
      {/* {step === 1 && <Subject onQuizStart={quizStartHandler}/>} */}
      {step === 2 && <Question 
        data={quizData.data[activeQuestion]}
        onAnswerUpdate={setAnswers}
        numberOfQuestions={quizData.data.length}
        activeQuestion={activeQuestion}
        onSetActiveQuestion={setActiveQuestion}
        onSetStep={setStep}
      />}
      {step === 3 && <End 
        results={answers}
        data={quizData.data}
        onReset={resetClickHandler}
        onAnswersCheck={() => setShowModal(true)}
        time={time}
      />}

      {showModal && <Modal 
        onClose={() => setShowModal(false)}
        results={answers}
        data={quizData.data}
      />}
    
      {/* <Footer/> */}
    </div>
  );
}

export default App
