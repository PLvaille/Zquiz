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

  const [qtySelector, setQtySelector] = useState([
    defaultTypeLenght * defaultDifficultyLength * 3,
    defaultTypeLenght * defaultDifficultyLength * 2,
    defaultTypeLenght * defaultDifficultyLength,
  ]);
  const [questionQty, setQuestionQty] = useState(qtySelector[0]);

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
    // console.log("---- default ---- ");
    // console.log(defaultTypeLenght);
    // console.log(defaultDifficultyLength);
    // console.log("----------------  ");
    // console.log(selectedQuestionsTypes);
    // console.log(selectedQuestionsDifficulties);
    //console.log("quantité de questions : " + questionQty);
    //console.log("index choisi " + indexQty);

    //index selectionné dans la liste
    let indexQty = document.querySelector(
      ".options-questions-quantity"
    ).selectedIndex;

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
        console.log("index 1 = 2 questions");
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
        console.log("index 2 = 1 question");
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
    console.log(randomizedArray);
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
    // console.log("diff")
    // console.log(diff);
    // console.log("qty")
    // console.log(qty);
    // console.log("---- default ---- ");
    // console.log(defaultTypeLenght);
    // console.log(defaultDifficultyLength);
    // console.log("----------------  ");
    // console.log(selectedQuestionsTypes.length);
    //  console.log("selected diff")
    //  console.log(selectedQuestionsDifficulties);
    //  console.log(selectedQuestionsDifficulties.length);
    // console.log(questionsTypes);
    // console.log("------- array --------");
    // console.log(array);;
    let values = [];
    //si pas de selection : alert
    if (diff === 0 || qty === 0) {
      setAlertMsg(true);
    }
    //sinon : push les choix de qty
    else {
      setAlertMsg(false);
      // i = 3 car il y a au minimum 3 questions / difficultés et par types
      for (let i = 3; i > 0; i--) {
        values.push(qty * diff * i);
      }
    }
    //console.log(values);
    setQtySelector(values);
    setQuestionQty(values[0]);
  };

  const handleQty = (value) => {
    setQuestionQty(value);
  };

  return (
    <div className="options-container">
      <h1>Options du Quiz</h1>
      <div className="options-menu">
        <div className="options-categories-list">
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
                <img className="icon-category" src={iconCat(cat)} alt="icon" />{" "}
                {cat}
              </label>
            </div>
          ))}
        </div>

        <div className="options-categories-list">
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
                  <img className="star-img" key={i} src={star} alt="star img" />
                ))}
              </label>
            </div>
          ))}
          <div className="options-categories-list">
              <h2>
                <label htmlFor="options-questions-quantity">
                  Nombre de question :
                </label>
              </h2>
              <select
                value={questionQty}
                className="options-questions-quantity"
                onChange={(e) => handleQty(e.target.value)}
              >
                {qtySelector.map((qty) => (
                  <option key={qty} id={"option-" + qtySelector.indexOf(qty)}>
                    {qty} questions, {qty/selectedQuestionsDifficulties.length/selectedQuestionsTypes.length} par niveau
                  </option>
                ))}
              </select>
          </div>
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
