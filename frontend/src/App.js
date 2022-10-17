//https://www.youtube.com/watch?v=Lya-qYiDqIA
//https://github.com/chrisblakely01/quiz-app
import { useState } from "react";

import Quiz from "./component/Quiz";
import OptionsMenu from "./component/OptionsMenu";
import questions from "./component/Data";
import Welcome from "./component/Welcome";

import maths from "./assets/mathematiques.svg";
import geo from "./assets/geo.svg";
import science from "./assets/science.svg";
import cultureg from "./assets/cultureg.svg";
import histoire from "./assets/histoire.svg";
import litterature from "./assets/litterature.svg";
import sport from "./assets/sport.svg";
import tech from "./assets/tech.svg"


export default function App() {
  const questionsTypes = questions.reduce(
    (acc, q) =>
      acc.includes(q.questionType) ? acc : acc.concat(q.questionType),
    []
  );

  //transformer int array en string array
  const questionsDifficulties = questions
    .reduce((acc, q) => (acc.includes(q.ease) ? acc : acc.concat(q.ease)), [])
    .map(String);

  const [userReady, setUserReady] = useState(false);
  const [selectedQuestionsTypes, setQuestionsTypes] = useState(questionsTypes);
  const [selectedQuestionsDifficulties, setQuestionsDifficuly] = useState(
    questionsDifficulties
  );
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  const [play, setPlay] = useState(false);


  const iconCat = (cat) => {
    if(cat === "Géographie")
    return geo;
    if(cat === "Technologies")
    return tech;
    if(cat === "Littérature")
    return litterature;
    if(cat === "Mathématiques")
    return maths;
    if(cat === "Sciences")
    return science;
    if(cat === "Sport")
    return sport;
    if(cat === "Histoire")
    return histoire;
    if(cat === "Culture Générale")
    return cultureg;
  }

  return (
    <div className="app">
      {play ? (
        <div className="main-container">
          {userReady ? (
            <Quiz
            iconCat={iconCat}
              questionsTypes={questionsTypes}
              questionsDifficulties={questionsDifficulties}
              setQuestionsTypes={setQuestionsTypes}
              setQuestionsDifficuly={setQuestionsDifficuly}
              setUserReady={setUserReady}
              totalQuestions={questions}
              selectedQuestions={selectedQuestions}
              selectedQuestionsTypes={selectedQuestionsTypes}
              selectedQuestionsDifficulties={selectedQuestionsDifficulties}
            />
          ) : (
            <OptionsMenu
            iconCat={iconCat}
              questionsTypes={questionsTypes}
              questionsDifficulties={questionsDifficulties}
              questions={questions}
              setUserReady={setUserReady}
              selectedQuestionsDifficulties={selectedQuestionsDifficulties}
              selectedQuestionsTypes={selectedQuestionsTypes}
              selectedQuestions={selectedQuestions}
              setSelectedQuestions={setSelectedQuestions}
            />
          )}
        </div>
      ) : 
        <Welcome setPlay={setPlay} />
      }
    </div>
  );
}
