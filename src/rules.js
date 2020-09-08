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
            <img src={require('./images/monkey_3.png')} alt="monkey pirate" className="icon"/>
        </div>
    </div>,

    <div className="tutorialStep">
        <div className="tutorial-text">
            <div>A crew of monkeys--with you as the captain--overthrew the pirates. </div>
            <br/>
            <div>But it is not gold you want. Nay, coconuts are the bounty you seek! </div>
            <br/>
            <div>Alas! There be limited space on the sea. Gain control of the sea routes to get the most coconuts.</div>
            <img src={require('./images/coconuts.png')} alt="coconuts" className="icon"/>
        </div>
    </div>,

    <div className="tutorialStep">
        <div className="tutorial-text">
            <div>Two competing monkey crews vie for the most coconuts.</div>
            <div>Each player will control a color.</div>
            <img src={require('./images/two_ships.png')} alt="ships" className="icon"/>
        </div>
    </div>,


    <div className="tutorialStep">
        <div className="tutorial-text">
            <div>The board starts with the routes that existed immediately after the mutinies.</div>
            <div>New routes will be built from there.</div>
            <div>TODO show starting stack.</div>
        </div>
    </div>,

    <div className="tutorialStep">
        <div className="tutorial-text">
            <div>Players take turns dragging a tile from the offer to the board.</div>
            <div>At least one sea route (black line) on the new tile must connect to an existing sea route.</div>
            <div>Tiles may be staggered vertically.</div>
            <div>TODO show a tile being dragged from side to board. Maybe just make static, or just have cycle through 1,2,3 tiles played.</div>
        </div>
    </div>,

    <div className="tutorialStep">
        <div className="tutorial-text">
            <div>The player with the most ships on a route receives points for the route.</div>
            <div>If players tie, neither player receives points for the route.</div>
            <div>As players vie for control, the score will change.</div>
            <div>TODO Show a route with 2 red, 3 blue = blue wins.</div>
        </div>
    </div>,

    <div className="tutorialStep">
        <div className="tutorial-text">
            <div>An anchor at the end of a route doubles the ships of that color on the route. Two anchors of the same color on the route have the same effect as a single anchor.</div>
            <div>TODO Show 2 red, 3 blue, and blue anchor = red owns (build from above)</div>
        </div>
    </div>,

    <div className="tutorialStep">
        <div className="tutorial-text">
            <div>The number of coconuts on the route determines the value of the route.</div>
            <div>TODO show a single + double = 3</div>
        </div>
    </div>,

    <div className="tutorialStep">
        <div className="tutorial-text">
            <div>A chest doubles the number of coconuts on the route. Multiple chests on the route have the same effect as a single chest.</div>
            <div>TODO show a single + double + chest = 6</div>
        </div>
    </div>,

    <div className="tutorialStep">
        <div className="tutorial-text">
            <div>The game ends once all tiles have been placed.</div>
            <div>The player with the most points wins!</div>
        </div>
    </div>,

];

function PreviousButton(props) {
    if(props.currentRule !== 1) {
        return (
            <button className="navigation-button" onClick={props.handlePrevious}>&lt;</button>
        )
    }
    return <button disabled className="navigation-button">&lt;</button>;
}

// TODO how to consolidate Prev active/disabled?

function NextButton(props) {
    if(props.currentRule < rules.length) {
        return (
            <button className="navigation-button" onClick={props.handleNext}>&gt;</button>
        )
    }
    return <button disabled className="navigation-button">&gt;</button>;
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
                    {/*<div className="tutorial-navigation">*/}
                        <PreviousButton
                            currentRule={currentRule}
                            handlePrevious={handlePrevious}
                        />
                    {/*</div>*/}
                    {rules[currentRule-1]}

                    {/*<div className="tutorial-navigation">*/}
                        <button className="exit-button" onClick={props.handleHide}>&#10005;</button>
                        <NextButton
                            currentRule={currentRule}
                            handleNext={handleNext}
                        />
                    {/*</div>*/}
                </div>
            </div>
        </Modal>
    );
}

export default Tutorial;
