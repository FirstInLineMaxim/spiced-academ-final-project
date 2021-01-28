import { useState } from "react";

export default function Recomendations ({explanation, hair_health}) {
    const [showOthers, setShowOthers] = useState(false);

    const seeMore = () => {
        setShowOthers({
            showOthers: !showOthers,
        });
    };

    return (
        <div className="recom-container">
            <h1>Hair Care for {hair_health}</h1>
            <p>{explanation}</p>
            {showOthers && (
                <div className="recomendations">
                    <div className="card blue">
                        <h3>Main actives for hair moisture</h3>
                        <ul>
                            <li>
                                D-Panthenol: Provides long-lasting hydration,
                                softness and shine;
                            </li>
                            <li>
                                Olive Butter: Deep moisturizes hair in the long
                                term;;
                            </li>
                            <li>
                                Extra Virgin Coconut Oil: Rich in Vitamins E and
                                Fatty Acid;
                            </li>
                            <li>
                                Aloe Vera: Moisturizes, regenerates and helps
                                combat hair loss. Natural antioxidant;
                            </li>
                            <li>
                                Functional amino acids: Regenerate the hair
                                fiber and provide softness, softness and
                                strength;
                            </li>
                        </ul>
                    </div>
                    <div className="card yellow">
                        <h3>Main actives for hair nutrition</h3>
                        <ul>
                            <li>
                                Masks for nutrition: Creams composed by oils and
                                butters that will replace the oiliness of the
                                threads during the bath, with fast action that
                                can vary between two and five minutes;
                            </li>
                            <li>
                                Dampening with vegetable oil: Treatment in which
                                the hair is bathed with vegetable oils before
                                being washed. In it, the product is left to act
                                for 30 minutes and then the washing procedure is
                                followed normally;
                            </li>
                            <li>
                                Night wetting: Treatment indicated for very dry
                                hair. The nocturnal humectating is done with
                                vegetable oils or capillary mayonnaise, which
                                are applied on “dirty” hair and act on the hair
                                during sleep, being washed only the next day;
                            </li>
                        </ul>
                    </div>
                    <div className="card green">
                        <h3>Main actives for hair reconstruction</h3>
                        <ul>
                            <li>
                                Collagen: Retains water and uniforms cuticles,
                                in addition to moisturizing, maintaining the
                                shape of curls and preventing breakage;
                            </li>
                            <li>
                                Creatine: Repairs damage and makes up the
                                keratin chain of hair;
                            </li>
                            <li>
                                Arginine: Reconstructs hair from the outside in;
                            </li>
                            <li>
                                Cysteine: It acts on the reconstruction and
                                strengthening of the threads, aligning uniformly
                                the cuticles.
                            </li>
                        </ul>
                    </div>
                </div>
            )}
            {!showOthers && (
                <div className="recomendations">
                    {hair_health == "Moisture" ? (
                        <div className="card blue">
                            <h3>Main actives for hair moisture</h3>
                            <ul>
                                <li>
                                    D-Panthenol: Provides long-lasting
                                    hydration, softness and shine;
                                </li>
                                <li>
                                    Olive Butter: Deep moisturizes hair in the
                                    long term;;
                                </li>
                                <li>
                                    Extra Virgin Coconut Oil: Rich in Vitamins E
                                    and Fatty Acid;
                                </li>
                                <li>
                                    Aloe Vera: Moisturizes, regenerates and
                                    helps combat hair loss. Natural antioxidant;
                                </li>
                                <li>
                                    Functional amino acids: Regenerate the hair
                                    fiber and provide softness, softness and
                                    strength;
                                </li>
                            </ul>
                            <span className="more" onClick={seeMore}>
                                See more!
                            </span>
                        </div>
                    ) : hair_health == "Nutrition" ? (
                        <div className="card yellow">
                            <h3>Main actives for hair nutrition</h3>
                            <ul>
                                <li>
                                    Masks for nutrition: Creams composed by oils
                                    and butters that will replace the oiliness
                                    of the threads during the bath, with fast
                                    action that can vary between two and five
                                    minutes;
                                </li>
                                <li>
                                    Dampening with vegetable oil: Treatment in
                                    which the hair is bathed with vegetable oils
                                    before being washed. In it, the product is
                                    left to act for 30 minutes and then the
                                    washing procedure is followed normally;
                                </li>
                                <li>
                                    Night wetting: Treatment indicated for very
                                    dry hair. The nocturnal humectating is done
                                    with vegetable oils or capillary mayonnaise,
                                    which are applied on “dirty” hair and act on
                                    the hair during sleep, being washed only the
                                    next day;
                                </li>
                            </ul>
                            <span className="more" onClick={seeMore}>
                                See more!
                            </span>
                        </div>
                    ) : (
                        <div className="card green">
                            <h3>Main actives for hair reconstruction</h3>
                            <ul>
                                <li>
                                    Collagen: Retains water and uniforms
                                    cuticles, in addition to moisturizing,
                                    maintaining the shape of curls and
                                    preventing breakage;
                                </li>
                                <li>
                                    Creatine: Repairs damage and makes up the
                                    keratin chain of hair;
                                </li>
                                <li>
                                    Arginine: Reconstructs hair from the outside
                                    in;
                                </li>
                                <li>
                                    Cysteine: It acts on the reconstruction and
                                    strengthening of the threads, aligning
                                    uniformly the cuticles.
                                </li>
                            </ul>
                            <span className="more" onClick={seeMore}>
                                See more!
                            </span>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}