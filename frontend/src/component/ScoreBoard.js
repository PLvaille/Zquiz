import { useState } from "react";
import star from "../assets/star.svg";
import ResultChart from "./ResultChart";

export default function ScoreBoard({
  score,
  setSeconds,
  setMinutes,
  seconds,
  minutes,
  selectedQuestions,
  totalAnswers,
  setUserReady,
  setQuestionsTypes,
  setQuestionsDifficuly,
  questionsTypes,
  questionsDifficulties,
  selectedQuestionsTypes,
  iconCat,
}) {

  // console.log("--- qesti ----");
  //  console.log(selectedQuestions);
  // console.log("--- rep ----");
  // console.log(totalAnswers);
  //  console.log(selectedQuestionsTypes)
  // console.log("score");
 // console.log(score);
  // console.log("cal")
  // console.log(Math.floor(score*100/totalAnswers.length));

     // eslint-disable-next-line
  const [results, setResults] = useState([]);
  
  const Datas = () => {
    let datas = [];
    selectedQuestionsTypes.forEach((type) => {
      let acc = 0
      totalAnswers.forEach((ans) => {
        if(ans.isCorrect && ans.type === type){
          acc++
        }
        
      })
      datas.push(acc)    
    })

    results.push(datas);
    //console.log(results)
  }
  Datas();





  const calcHowManyQuestionsOfEachType = (type) => {
    let acc = 0;
    selectedQuestions.forEach((q) => {
      if (q.questionType === type) acc++;
    });
    return acc;
  };

  const calcTypeScore = (type) => {
    let acc = 0;
    totalAnswers.forEach((ans) => {
      if (type === ans.type && ans.isCorrect === true) acc++;
      
    });
    return acc;
  };

    //reset le quiz et les states
    const handleReset = () => {
      setQuestionsTypes(questionsTypes);
      setQuestionsDifficuly(questionsDifficulties);
      setUserReady(false);
      // setMinutes(0);
      // setSeconds(0);
    };

  const calcTotalScore = () => {
    let calcultadScore = Math.floor((score * 100) / totalAnswers.length);

    if (calcultadScore === 100)
      return `${calcultadScore}% de bonnes réponses ! Parfait 🤪 !`;

    if (calcultadScore >= 70)
      return `${calcultadScore}% de bonnes réponses ! Impressionnant 😎 !`;

    if (calcultadScore >= 66)
      return `${calcultadScore}% de bonnes réponses ! Super 😄 !`;

    if (calcultadScore >= 50)
      return `${calcultadScore}% de bonnes réponses. Pas mal 🙂!`;

    if (calcultadScore >= 40)
      return `${calcultadScore}% de bonnes réponses. Vous pouvez mieux faire 🧐 !`;

    if (calcultadScore >= 30)
      return `${calcultadScore}% de bonnes réponses. Il faut réviser 😬 !`;

    if (calcultadScore >= 20)
      return `${calcultadScore}% de bonnes réponses. Beaucoup d'erreurs 😥 !`;
    else return `${calcultadScore}% de bonnes réponses... Aïe 😖 !`;
  };

  return (

    <div className="score-board">
      <div className="score-points-text">
        <h2>
          Vous avez {score} bonnes réponses sur {selectedQuestions.length}
        </h2>
        <h3>{calcTotalScore()}</h3>
        {/* <h4>Vous avez complété le quiz en {minutes}min {seconds}sec</h4>
         */}
      </div>


      <ResultChart 
      selectedQuestionsTypes={selectedQuestionsTypes} 
      results={results}
      length={totalAnswers.length/selectedQuestionsTypes.length}/>
      
      
      <div className="score-details-container">
        <h4>Détails et Correction 👇</h4>
        {selectedQuestionsTypes.map((type) => (
          <details className={"score-details-label  label-" + type} key={type}>
            <summary className="summary score-details-summary">
              {type} : {calcTypeScore(type)}/
              {calcHowManyQuestionsOfEachType(type)}
            </summary>
            {selectedQuestions.map((q, index) => (
              <div key={q.id} className={"details-question-container " + q.id}>
                {type === q.questionType ? (
                  <div key={q.id} className="details-question">
                    <div className="details-question-text">
                      <div className="star-container">
                        {[...Array(q.ease)].map((e, i) => (
                          <img
                            className="star-img"
                            key={i}
                            src={star}
                            alt="star img"
                          />
                        ))}
                      </div>
                      {q.questionText}
                    </div>
                    <div className="details-answer">
                      {totalAnswers[index].isCorrect ? (
                        <div className="correct-answer">
                          {totalAnswers[index].answerText} ✔️
                        </div>
                      ) : (
                        <div className="correction-container">
                          <div className="incorrect-answer">
                            ❌ {totalAnswers[index].answerText}
                          </div>

                          {q.answerOptions.map((a, ind) => (
                            <div key={ind}>
                              {a.isCorrect ? (
                                <div className="true-answer">
                                  Réponse : {a.answerText}
                                </div>
                              ) : null}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ) : null}
              </div>
            ))}
          </details>
        ))}
      </div>
      <button
        className="btn btn-reset"
        id="quiz-reset-btn"
        onClick={() => handleReset()}
      >
        Retour au menu
      </button>
    </div>

    //btn pour reset
  );
}
