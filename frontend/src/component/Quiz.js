import { useState } from "react";
import ScoreBoard from "./ScoreBoard";
import star from "../assets/star.svg";

export default function Quiz({
  setUserReady,
  totalQuestions,
  selectedQuestions,
  selectedQuestionsDifficulties,
  selectedQuestionsTypes,
  setQuestionsTypes,
  setQuestionsDifficuly,
  questionsTypes,
  questionsDifficulties,
  iconCat
}) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [totalAnswers, setTotalAnswers] = useState([]);

  const quizLenght = selectedQuestions.length;

  // const [minutes, setMinutes] = useState(0);
  // const [seconds, setSeconds] = useState(0);

  // const timer = () => {
  //   if (!showScore) {
  //     setInterval(() => {
  //       seconds === 60
  //         ? setMinutes(minutes + 1, setSeconds(0))
  //         : setSeconds(seconds + 1);
  //     }, 1000);
  //   }
  // };
  // timer();

  const handleAnswerOptionClick = (answerOption, type, ease) => {
    // console.log(answerOption)
    // console.log(answerOption.isCorrect)
    //console.log(currentQuestion);
    answerOption.type = type;
    answerOption.ease = ease;
    totalAnswers.push(answerOption);
    setTotalAnswers([...totalAnswers]);
    //console.log(totalAnswers)

    //gestion des points
    if (answerOption.isCorrect) {
      setScore(score + 1);
    }
    //gerer la next questison & afficher les scores si quiz fini
    const nextQuestion = currentQuestion + 1;

    if (nextQuestion < quizLenght) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className="quiz-container">
      {showScore ? (
        <ScoreBoard
          // setSeconds={setSeconds}
          // setMinutes={setMinutes}
          // seconds={seconds}
          // minutes={minutes}
          questionsTypes={questionsTypes}
          questionsDifficulties={questionsDifficulties}
          setQuestionsTypes={setQuestionsTypes}
          setQuestionsDifficuly={setQuestionsDifficuly}
          setUserReady={setUserReady}
          selectedQuestionsTypes={selectedQuestionsTypes}
          selectedQuestions={selectedQuestions}
          totalAnswers={totalAnswers}
          score={score}
          iconCat={iconCat}
        />
      ) : (
        <div className="question-section">
          {/* <div className="timer-text">
            {minutes}:{seconds}
          </div> */}
          <div className="question-head">      
            <h1 className="question-type">
            <img className="icon-question-head" src={iconCat(selectedQuestions[currentQuestion].questionType)} alt="icon"/> 
            {"  "}
              {selectedQuestions[currentQuestion].questionType} 
              </h1>
              
             <span className="question-difficulty"> {[...Array(selectedQuestions[currentQuestion].ease)].map((e, i) =>(
                <img className="star-img" key={i} src={star} alt="star img" />
              ))}
              </span>
            
            <span>
              Question {currentQuestion + 1}/{selectedQuestions.length}{" "}
            </span>
          </div>
   
              <div className="question-main">
          <h2 className="question-text">
            {selectedQuestions[currentQuestion].questionText}
          </h2>

                 
          <div className="question-img-container">
            <img className="question-img" src={selectedQuestions[currentQuestion].img} alt="question"/>
          </div>
          </div>


          {/* ??? duo carré cash ????
          <div>
            <button></button>
            <button></button>
            <input type='text'></input>
          </div> */}

          <div className="answer-section">
            {selectedQuestions[currentQuestion].answerOptions.map(
              (answerOption) => (
                <button
                  key={answerOption.answerText}
                  className="answeroption-btn btn"
                  onClick={() =>
                    handleAnswerOptionClick(
                      answerOption,
                      selectedQuestions[currentQuestion].questionType,
                      selectedQuestions[currentQuestion].ease
                    )
                  }
                >
                  {answerOption.answerText}
                </button>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
