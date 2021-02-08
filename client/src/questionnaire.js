import axios from "./axios";
import { useState, useEffect } from "react";
import Progressbar from "./Progressbar";

const { questionnaire } = require("./helpers/survey.json");

export default function Questionnaire(props) {
    const [hairType, setHairType] = useState();
    const [hairHealth, sethairHealth] = useState();
    const [hairHealthExplanation, sethairHealthExplanation] = useState();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);

    const handleNextQuestions = (answer, points) => {
        const nextQuestion = currentQuestion + 1;
        if (
            answer == "Straight" ||
            answer == "Wavy" ||
            answer == "Curly" ||
            answer == "Coily"
        ) {
            setHairType(answer);
        }

        if (points) {
            setScore(score + points);
        }

        if (nextQuestion < questionnaire.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            if (score < 4) {
                sethairHealth("Moisture");
            } else if (score < 8) {
                sethairHealth("Nutrition");
            } else {
                sethairHealth("Reconstruction");
            }
            setShowScore(true);
        }
    };
    const handleSave = () => {
        axios
            .post("/questionnaire", {
                hairType: hairType,
                hairHealth: hairHealth,
            })
            .then(() => {
                console.log("post request made");
                location.replace("/");
                localStorage.clear();
            })
            .catch((error) => {
                console.log("error", error);
            });
    };

    useEffect(() => {
        console.log("hairType", hairType);
        console.log("hairHealth", hairHealth);
        if (hairHealth != "undefined") {
            axios
                .get("/questionnaire-results/" + hairHealth)
                .then(({ data }) => {
                    console.log("todo", data[0].todo);
                    props.setTodo(data[0].todo);
                    sethairHealthExplanation(data[0].explanation);
                })
                .catch((error) => {
                    console.log("error", error);
                });
        } else {
            return;
        }
    }, [hairType, hairHealth]);

    return (
        <div className="survey-page">
            <div className="aside-image">
                {!showScore && <img src="../survey.svg" />}
                {showScore && <img src="../survey2.svg" />}
            </div>
            <div className="survey-container">
                <h1>Survey</h1>
                {!showScore && (
                    <p>
                        Cold and dry winter weather, chemical treatments, and
                        sunshine, oh my! So many things can cause damage to your
                        hair without you even knowing it. Take this survey to
                        find out the health of your hair and get tips on how to
                        nurse it back to a shiny, soft state.
                    </p>
                )}
                {showScore ? (
                    <div className="score-section">
                        <p>
                            You have <span>{hairType}</span> hair and based on
                            your answers, your hair needs{" "}
                            <span>{hairHealth}</span>.
                        </p>
                        <p>{hairHealthExplanation}</p>
                        <p onClick={handleSave}>
                            <span className="save-survey">Click here </span>to
                            create your hair care routine
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="questions-section">
                            <Progressbar
                                value={currentQuestion + 1}
                                minValue={0}
                                maxValue={questionnaire.length}
                            />
                            <p>
                                {questionnaire[currentQuestion].questionText}
                            </p>
                        </div>
                        <div className="answer-section">
                            {questionnaire[currentQuestion].answerOptions.map(
                                (answerOptions, idx) => (
                                    <button
                                        onClick={() =>
                                            handleNextQuestions(
                                                answerOptions.answerText,
                                                answerOptions.points
                                            )
                                        }
                                        key={idx}
                                    >
                                        {answerOptions.answerText}
                                    </button>
                                )
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
