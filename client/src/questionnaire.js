import { useState, useEffect } from "react";

export default function Questionnaire() {
    const [hairType, setHairType] = useState('');
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);

    const handleNextQuestions = (e, hair) => {
        console.log('click', e);
        if(hair) {
            console.log("hairtype", hairType);
            setHairType(hair);
        }

        const nextQuestion = currentQuestion + 1;
        if( nextQuestion < questionnaire.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowScore(true);
        }
    };

    const questionnaire = [
        {
            questionText: "What is the natural curvature of your hair?",
            answerOptions: [
                { answerText: "Straight", hair: true },
                { answerText: "Wavy", hair: true },
                { answerText: "Curly", hair: true },
                { answerText: "Kinky", hair: true },
            ],
        },
        {
            questionText: "What is the length?",
            answerOptions: [
                { answerText: "My hair is short (up to 3 fingers below chin)" },
                {
                    answerText:
                        "My hair is medium (up to 4 fingers below shoulder)",
                },
                {
                    answerText:
                        "My hair is long (from 4 fingers vbelow shoulder)",
                },
            ],
        },
        {
            questionText: "What is the trickness?",
            answerOptions: [
                { answerText: "My hair is thin (they are usually fragile)" },
                {
                    answerText:
                        "My hair is average (not so fragile and malleable)",
                },
                {
                    answerText: "My hair is thick (stiffer and strong hair)",
                },
            ],
        },
        {
            questionText: "What is the oiliness?",
            answerOptions: [
                {
                    answerText:
                        "My hair is normal (soft and shine by nature, healthy looking and easy to comb)",
                },
                {
                    answerText:
                        "My hair is oily (excessive luster, thin, heavy wires without volume)",
                },
                {
                    answerText:
                        "My hair is dry (parched from root to tip, rough, brittle, dull, and dizzy)",
                },
                {
                    answerText:
                        "My hair is mixed (oily root with dry or normal ends, very common in long hair)",
                },
            ],
        },
        {
            questionText:
                "In the last 6 months, did you do something that damaged your hair, such as dye, discoloration, lights, straightening, relations, progressive, etc?",
            answerOptions: [
                { answerText: "Yes, I did one or more procedures" },
                { answerText: "No, I didn't do any of that" },
            ],
        },
        {
            questionText:
                "How many times a week do you use thermal appliances such as hair dryer or flat iron",
            answerOptions: [
                { answerText: "Never or less than once a week" },
                { answerText: "1 or 2 times a week" },
                { answerText: "3 or 4 times a week" },
                { answerText: "5 or more times a week" },
            ],
        },
        {
            questionText:
                "Select all options that apply to the CURRENT state of your hair:",
            answerOptions: [
                {
                    answerText:
                        "Embarrassed when wet, armed, dull or with split ends",
                },
                { answerText: "Frizzy, dry, or scruffy" },
                { answerText: "it is thin (whin few wires)" },
            ],
        },
        {
            questionText:
                "Take a strand of hair from the top of your head, wrap it around your fingers (like a floss) and pull until the hair breaks. What happens?",
            answerOptions: [
                { answerText: "Break by applying just a little force" },
                { answerText: "It looks strong and doesn't break easily" },
            ],
        },
        {
            questionText: `Take another strand of hair and flick it quickly between your fingers, applying pressure, as if stretching a satin ribbon or pulling a thread to find its tip.
                Doing so will cause your hair to curl more than usual (if not, apply more pressure or pull harder).
                Then , stretch the wire a little force for a few seconds and release it.
                If it returns to its original shape, it is elastic, if it remains curled, it is rigid.`,
            answerOptions: [
                {
                    answerText:
                        "Does not return to normal state, remaining coiled",
                },
                { answerText: "Returns to normal after test" },
            ],
        },
        {
            questionText: `Take a glass or bowl of water and put a few strand of your hair over the water without sinking. Do no touch them for 3 minutes.`,
            answerOptions: [
                { answerText: "Most of the hair floats" },
                { answerText: "The hair is + or - in the middle" },
                { answerText: "the hair hits the bottom" },
            ],
        },
    ];

    return (
        <>
            <h1>Questionnaire</h1>
            {showScore ? (
                <div className="score-section">
                    <p>You score {score} </p>
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
                                            answerOptions.answerText
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