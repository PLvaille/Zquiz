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

  const qtySelector = [3,2,1];
  const [selectedQuestionQty, setSelectedQuestionQty] = useState(qtySelector[0]);
  const [questionQty, setQuestionQty] = useState(selectedQuestionQty*selectedQuestionsDifficulties.length*selectedQuestionsTypes.length)

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
      // console.log(array);
    }
    qtyOption();
  };

  const questionSelector = (array) => {
    let selectedQuestions = [];

    array.forEach((q) => {
      if (
        selectedQuestionsTypes.includes(q.questionType) &&
        selectedQuestionsDifficulties.includes(q.ease.toString())
      )
        selectedQuestions.push(q);
    });
    return selectedQuestions;
  };

  const handleReadyClick = () => {
    //index selectionné dans la liste
    let indexQty = document.querySelector(
      ".options-questions-quantity"
    ).selectedIndex;
    //console.log(indexQty)

    //cas ou aucune selection de checkbox
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
      indexQty === 0 &&
      selectedQuestionsTypes.length === defaultTypeLenght &&
      selectedQuestionsDifficulties.length === defaultDifficultyLength
    ) {
      //console.log("FULL QUESTIONNAIRE");
      setAlertMsg(false);
      setSelectedQuestions(questions);
      setUserReady(true);
    }

    //cas ou choix specifiques
    else {
      //console.log("CHOIX SPECIFIQUES");
      setAlertMsg(false);
      let awaitedNumberOfQuestion =
        selectedQuestionsTypes.length * selectedQuestionsDifficulties.length;
      //pour chaque question des questions on push dans un nouvel array
      //si la question fait parti des themes selectionnés et
      //si la difficulté fait parti des difficultés selectionnées

      //cas ou index 0 = toutes les questions sont choisit (3q/diff/type)
      if (indexQty === 0) {
        //passage du nouvel array en selection
        setSelectedQuestions(questionSelector(questions));
        setUserReady(true);
      }

      //cas avec 2 question/diff/type
      else if (indexQty === 1) {
        // console.log("index 1 = 2 questions");
        let questionOfEachDiff = 2;
        let temp = questionSelector(questions);
        let randomizedQ = createRandomArray(
          temp,
          awaitedNumberOfQuestion,
          questionOfEachDiff
        );
        setSelectedQuestions(randomizedQ);
        setUserReady(true);
      }

      //cas avec 1 question/diff/type
      else if (indexQty === 2) {
        let questionOfEachDiff = 1;
        // console.log("index 2 = 1 question");
        let temp = questionSelector(questions);
        let randomizedQ = createRandomArray(
          temp,
          awaitedNumberOfQuestion,
          questionOfEachDiff
        );
        setSelectedQuestions(randomizedQ);
        setUserReady(true);
      }
    }
  };

  const createRandomArray = (
    array,
    awaitedNumberOfQuestion,
    questionOfEachDiff
  ) => {
    //penser à ca aussi
    let randomizedArray = [];
    let counter = 0;
    //on execute  tant qu'on a pas le nombre de question attendu
    while (counter < awaitedNumberOfQuestion) {
      //pour chaque type on push les questions de ce type dans un nouvel array temp
      // eslint-disable-next-line
      selectedQuestionsTypes.forEach((qType) => {
        let temp = [];
        for (let i = 0; i < array.length; i++) {
          if (array[i].questionType === qType) {
            temp.push(array[i]);
          }
        }
        //console.log(temp);
        //pour chaque difficulté de question de ce nouvel array temp
        // on push les question dans un nouvel array temp2
        selectedQuestionsDifficulties.forEach((diff) => {
          let temp2 = [];
          for (let j = 0; j < temp.length; j++) {
            if (temp[j].ease === parseInt(diff)) {
              temp2.push(temp[j]);
            }
          }

          //console.log(temp2)
          //puis tant qu'on a pas le nombre de questions par type
          //on prend une question random de l'array2 et on le push dans le randomizedArray qui sera retourné par la fctn
          let k = 0;
          while (k < questionOfEachDiff) {
            let rdmIndex = getRandomIntInclusive(0, temp2.length - 1);
            if (!randomizedArray.some((e) => e.id === temp2[rdmIndex].id)) {
              randomizedArray.push(temp2[rdmIndex]);
              k++;
              counter++;
            }
          }
        });
      });
    }
    //console.log(randomizedArray);
    return randomizedArray;
  };

  const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const qtyOption = () => {
    //check si diff et qty sinon default.
    //push des values dans array
    let diff = selectedQuestionsDifficulties
      ? selectedQuestionsDifficulties.length
      : defaultDifficultyLength;
    let qty = selectedQuestionsTypes
      ? selectedQuestionsTypes.length
      : defaultTypeLenght;
    if (diff === 0 || qty === 0) {
      setAlertMsg(true);
    }
    else {
      setAlertMsg(false);
      setQuestionQty(selectedQuestionQty*selectedQuestionsDifficulties.length*selectedQuestionsTypes.length)
    }
  };
  const handleQty = (value) => {
    setSelectedQuestionQty(value);
    setQuestionQty(value*selectedQuestionsDifficulties.length*selectedQuestionsTypes.length)
  };

  return (
    <div className="options-container">
      <h1>Options</h1>
      <div className="options-menu">
        <div className="options-categories-list">
          <h2>Thèmes </h2>
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
                <img className="icon-category" src={iconCat(cat)} alt="icon" />{" "}
                {cat}
              </label>
            </div>
          ))}
        </div>

        <div className="options-categories-list">
          <h2>Difficulté</h2>
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
                  <img className="star-img" key={i} src={star} alt="star img" />
                ))}
              </label>
            </div>
          ))}
          <div className="options-categories-list">
            <label htmlFor="options-questions-quantity">
              <h2>Nombre de questions par difficulté :</h2>
            </label>
            <select
              className="options-questions-quantity"
              onChange={(e) => handleQty(e.target.selectedOptions[0].id)}
            >
              {qtySelector.map((qty) => (
                <option
                  key={qty}
                  id={qty}
                  className={"option-" + qtySelector.indexOf(qty)}
                >
                  {qty>1 ? `${qty} questions` : `${qty} question`}
                </option>
              ))}
            </select>
            <div className="options-total">Total : {questionQty} questions</div>
          </div>
        </div>
      </div>

      {alertMsg ? (
        <span className="alert-msg">
          Veuillez choisir au moins un thème et une difficulté.
        </span>
      ) : null}
      <button className="btn btn-ready" onClick={() => handleReadyClick()}>
        Quizzzz !
      </button>
    </div>
  );
}
