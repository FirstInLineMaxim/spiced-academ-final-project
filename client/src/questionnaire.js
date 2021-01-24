import axios from "./axios";
import { useState, useEffect } from "react";
const { questionnaire } = require('./survey.json');

export default function Questionnaire() {
    const [hairType, setHairType] = useState();
    const [hairHealth, sethairHealth] = useState();
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
            });
    };

    useEffect(() => {
        console.log("hairType", hairType);
    }, [hairType]); 

    //call function to display the results according to the score

    return (
        <>
            <h1>Questionnaire</h1>
            {showScore ? (
                <div className="score-section">
                    <p>
                        You have a {hairType} and based on your answer, your
                        hair is {hairHealth}.
                    </p>
                    {hairHealth == "healthy" ? (
                        <p>
                            Scenester banjo irony authentic. Messenger bag
                            eiusmod tacos adaptogen before they sold out.
                            Brooklyn small batch gastropub, listicle eu meggings
                            asymmetrical. Aute ex dolore voluptate, labore
                            edison bulb veniam synth migas williamsburg shabby
                            chic biodiesel consectetur dolor. Poutine scenester
                            in reprehenderit selfies. Selvage 8-bit ethical
                            biodiesel crucifix blue bottle air plant art party
                            PBR&B swag pug bespoke enamel pin. Dreamcatcher et
                            elit, next level hoodie venmo woke pour-over
                            normcore. Ugh tempor reprehenderit authentic
                            coloring book. Small batch ut 8-bit put a bird on it
                            chicharrones. Stumptown fam in, velit pok pok
                            sustainable woke paleo exercitation fugiat vice
                            laboris slow-carb hell of. Nulla minim venmo eiusmod
                            enim laborum tilde.
                        </p>
                    ) : hairHealth == "damaged" ? (
                        <p>
                            Cliche forage fixie tbh. Shoreditch bitters
                            portland, yr selfies 8-bit food truck intelligentsia
                            kale chips artisan skateboard mixtape mumblecore.
                            Enamel pin street art hashtag microdosing. Man braid
                            snackwave brooklyn quinoa unicorn prism kitsch
                            thundercats XOXO ugh kickstarter health goth pabst.
                            Prism cold-pressed man bun mustache poutine. Health
                            goth heirloom jean shorts squid meditation tattooed
                            flexitarian gentrify snackwave. Twee occupy
                            authentic, vegan XOXO copper mug mustache pug
                            leggings kitsch. Seitan tattooed hexagon, kinfolk
                            kickstarter austin scenester copper mug marfa
                            bushwick cardigan migas vape selvage. Shabby chic
                            hot chicken adaptogen craft beer polaroid, pabst
                            vexillologist 8-bit kale chips you probably havent
                            heard of them paleo. Craft beer keffiyeh
                            dreamcatcher mixtape raclette air plant coloring
                            book. Aesthetic activated charcoal skateboard
                            ethical hexagon. Activated charcoal PBR&B aesthetic
                            tacos mumblecore. Sartorial cloud bread synth lo-fi
                            craft beer. Waistcoat cliche schlitz, taxidermy palo
                            santo crucifix woke actually bespoke yr aesthetic
                            gastropub.
                        </p>
                    ):
                        (<p>
                            Stumptown authentic hot chicken activated charcoal
                            literally yr polaroid banh mi photo booth lumbersexual
                            direct trade. Craft beer drinking vinegar wolf narwhal
                            activated charcoal lomo, ramps pour-over skateboard
                            pickled art party lyft small batch affogato gastropub.
                            Affogato vaporware schlitz blog, fam vape cardigan
                            tousled helvetica mumblecore. Yuccie af health goth
                            distillery DIY mlkshk hell of coloring book heirloom
                            four dollar toast adaptogen subway tile man bun schlitz
                            snackwave. Coloring book scenester beard 3 wolf moon
                            selvage chicharrones. Messenger bag roof party coloring
                            book air plant, narwhal lumbersexual echo park seitan
                            lo-fi chia poke subway tile. Vinyl health goth kitsch
                            humblebrag cold-pressed 3 wolf moon, paleo wayfarers
                            occupy biodiesel banjo chambray seitan fanny pack kale
                            chips. Normcore microdosing master cleanse, taxidermy
                            raw denim cold-pressed banh mi craft beer. Farm-to-table
                            vegan tumeric disrupt roof party vice gluten-free
                            crucifix retro locavore seitan gentrify try-hard DIY
                            vape. Everyday carry mumblecore prism yuccie venmo
                            street art iPhone microdosing. +1 dreamcatcher before
                            they sold out taxidermy kitsch try-hard biodiesel quinoa
                            chicharrones.
                        </p>
                        )}
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