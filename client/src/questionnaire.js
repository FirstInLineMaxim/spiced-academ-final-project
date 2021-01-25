import axios from "./axios";
import { useState, useEffect } from "react";
const { questionnaire } = require('./helpers/survey.json');

export default function Questionnaire() {
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
            answer == "Kinky"
        ) {
            setHairType(answer);
        } 
        
        if (points) {
            setScore(score + points);
        }

        if( nextQuestion < questionnaire.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            if(score < 4) {
                sethairHealth('healthy');
            } else if (score < 8) {
                sethairHealth("damaged");
            } else  {
                sethairHealth("very damaged");
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
        axios
            .get("/questionnaire-results/" + hairHealth)
            .then(({ data }) => {
                console.log("data", data[0]);
                sethairHealthExplanation(data[0].explanation);
            })
            .catch((error) => {
                console.log("error", error);
            });
    }, [hairHealth]); 

    return (
        <>
            <h1>Questionnaire</h1>
            {showScore ? (
                <div className="score-section">
                    <p>
                        You have a {hairType} and based on your answer, your
                        hair is {hairHealth}.
                    </p>
                    <p>{hairHealthExplanation}</p>
                    <p onClick={handleSave}>
                        Click here to save your questionnaire and go to the
                        profile page
                    </p>
                </div>
            ) : (
                <>
                    <div className="questions-section">
                        <h1>
                            Question {currentQuestion + 1}/
                            {questionnaire.length}:{" "}
                            {questionnaire[currentQuestion].questionText}
                        </h1>
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
        </>
    );
}