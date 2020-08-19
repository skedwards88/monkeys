import React, {useState} from "react";
import Modal from "./modal";

const rules = [
    <div className="tutorialStep">
        <div className="tutorial-text">
            <div>Monkeys of the Caribbean</div>
            <br/>
            <div>2 Players</div>
            <div>15 Minutes</div>
            <br/>
            <div>Game by Colin Thom</div>
            <div>Built by Sarah Edwards</div>
        </div>
    </div>,

    <div className="tutorialStep">
        <div className="tutorial-text">
            <div>
                Flavor setting. Mutiny, monkeys, pirate ships, coconuts, limited space on the sea, control sea routes.
            </div>
        </div>
    </div>,

    <div className="tutorialStep">
        <div className="tutorial-text">
            <div>The game starts with the routes immediately controlled after the mutinies.</div>
            <div>New routes will be build from there</div>
        </div>
    </div>,

    <div className="tutorialStep">
        <div className="tutorial-text">
            <div>Players take turns dragging a tile from the offer to the board</div>
            <div>The tile must extend at least one existing route</div>
        </div>
    </div>,

    <div className="tutorialStep">
        <div className="tutorial-text">
            <div>The player with the most ships on a route controls the route (Show a route with 2 red, 3 blue = blue wins. would be so cool to change color of route to indicate owner)</div>
        </div>
    </div>,

    <div className="tutorialStep">
        <div className="tutorial-text">
            <div>An anchor at the end of a route doubles the ships of that color on the route. (Two anchors of the same color on the route have the same effect as a single anchor) (Show 2 red, 3 blue, and blue anchor = red owns (build from above))</div>
        </div>
    </div>,

    <div className="tutorialStep">
        <div className="tutorial-text">
            <div>The number of coconuts on the route determines the value of the route. (show a single + double = 3)</div>
        </div>
    </div>,

    <div className="tutorialStep">
        <div className="tutorial-text">
            <div>A chest doubles the number of coconuts on the route. (Multiple chests on the route have the same effect as a single chest)</div>
        </div>
    </div>,

    <div className="tutorialStep">
        <div className="tutorial-text">
            <div>The game ends when all tiles have been placed</div>
            <div>The color with the most points wins</div>
        </div>
    </div>,

];

function PreviousButton(props) {
    if(props.currentRule !== 1) {
        return (
            <button onClick={props.handlePrevious}>Previous</button>
        )
    }
    return <button disabled>Previous</button>;
}

function NextButton(props) {
    if(props.currentRule < rules.length) {
        return (
            <button onClick={props.handleNext}>Next</button>
        )
    }
    return <button disabled>Next</button>;
}

function Tutorial(props) {
    const totalSteps = rules.length;
    const [currentRule, setCurrentRule] = useState(1);

    const handlePrevious = () => {
        let newRule =  currentRule - 1;
        setCurrentRule(newRule);
    };

    const handleNext = () => {
        let newRule =  currentRule + 1;
        setCurrentRule(newRule);
    };

    return (
        <Modal>
            <div className="modal">
                <div className="tutorial">
                    <div className="tutorial-navigation">
                        <PreviousButton
                            currentRule={currentRule}
                            handlePrevious={handlePrevious}
                        />
                        <div>{currentRule}/{totalSteps}</div>
                        <NextButton
                            currentRule={currentRule}
                            handleNext={handleNext}
                        />
                        <button onClick={props.handleHide}>Exit</button>
                    </div>
                    {rules[currentRule-1]}
                </div>
            </div>
        </Modal>
    );
}

export default Tutorial;
