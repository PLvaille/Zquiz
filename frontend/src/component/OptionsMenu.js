import { useState } from "react";
import star from "../assets/star.svg";

export default function OptionsMenu({
  questions,
  setUserReady,
  selectedQuestionsDifficulties,
  selectedQuestionsTypes,
  setSelectedQuestions,
  questionsTypes,
  questionsDifficulties,
  iconCat,
}) {
  const [alertMsg, setAlertMsg] = useState(false);

  const defaultTypeLenght = questionsTypes.length;
  const defaultDifficultyLength = questionsDifficulties.length;

  const handleCheckBox = (e, array) => {
    //si l'option est (re)checké - check par défaut
    if (e.target.checked) {
      //push la value de la checkbox dans l'array
      array.push(e.target.value);
      //si l'option est décheck
      //console.log(array);
    } else {
      //trouver l'index du target dans l'array dynamique
      let index = array.indexOf(e.target.value);
      //et supprimer la value
      array.splice(index, 1);
      //console.log(array);
    }
  };

  const handleReadyClick = () => {
    // console.log("---- default ---- ");
    // console.log(defaultTypeLenght);
    // console.log(defaultDifficultyLength);
    // console.log("----------------  ");
    // console.log(selectedQuestionsTypes);
    // console.log(selectedQuestionsDifficulties);


    //cas ou aucune selection
    //////////
    if (
      selectedQuestionsTypes.length === 0 ||
      selectedQuestionsDifficulties.length === 0
    ) {
      //console.log("VIDE ");
      setAlertMsg(true);
      setSelectedQuestions(questions);
    }
    //cas ou tout selectionné
    else if (
      selectedQuestionsTypes.length === defaultTypeLenght &&
      selectedQuestionsDifficulties.length === defaultDifficultyLength
    ) {
      //console.log("FULL QUESTIONNAIRE");
      setAlertMsg(false);
      setSelectedQuestions(questions);
      setUserReady(true);
    }

    //cas ou choix
    else {
      //console.log("CHOIX SPECIFIQUES");
      setAlertMsg(false);
      let array = [];
      //pour chaque question des question on push dans un nouvel array
      //si la question fait parti des themes selectionnés et
      //si la difficulté fait parti des difficultés selectionnées

      questions.forEach((q) => {
        if (
          selectedQuestionsTypes.includes(q.questionType) &&
          selectedQuestionsDifficulties.includes(q.ease.toString())
        )
          array.push(q);
      });

      //passage du nouvel array en selection
      setSelectedQuestions(array);

      setUserReady(true);
    }
  };


  return (
    <div className="questions-options-container">
      <h1>Options du Quiz</h1>
      <div className="questions-options-menu">
        <div className="questions-categories-list">
          <h2>Thèmes des questions</h2>
          {questionsTypes.map((cat) => (
            <div key={cat} className="checkbox-option">
              <input
                type="checkbox"
                id={cat}
                value={cat}
                name={cat}
                className="checkbox"
                defaultChecked
                onChange={(e) => handleCheckBox(e, selectedQuestionsTypes)}
              />
              <label className={"label label-" + cat} htmlFor={cat}>
               <img className="icon-category" src={iconCat(cat)} alt="icon"/> {cat}
              </label>
            </div>
          ))}
        </div>

        <div className="questions-categories-list">
          <h2>Difficulté des questions</h2>
          {questionsDifficulties.map((diff) => (
            <div key={diff} className="checkbox-option">
              <input
                // eslint-disable-next-line
                className="checkbox"
                type="checkbox"
                id={"lvl" + diff}
                value={diff}
                name={"lvl" + diff}
                defaultChecked
                onChange={(e) =>
                  handleCheckBox(e, selectedQuestionsDifficulties)
                }
              />
              <label
                className={"lvl" + diff + "-label label"}
                htmlFor={"lvl" + diff}
              >
                 {[...Array(parseInt(diff))].map((e, i) => (
                          <img
                            className="star-img"
                            key={i}
                            src={star}
                            alt="star img"
                          />
                        ))}
              </label>
            </div>
          ))}
        </div>
      </div>
      {alertMsg ? (
        <span className="alert-msg">
          Veuillez choisir au moins un thème et une difficulté.
        </span>
      ) : null}
      <button className="btn btn-ready" onClick={() => handleReadyClick()}>
        Commencer
      </button>
    </div>
  );
}
