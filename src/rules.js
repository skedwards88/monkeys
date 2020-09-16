import React, {useState} from "react";
import Modal from "./modal";

const rules = [

    <div className="tutorial-step">
        <div className="tutorial-text">
            <h1>Monkeys of the Caribbean</h1>
            <br/>
            <br/>
            2 Players
            <br/>
            15 Minutes
            <br/>
            <br/>
            Game by Colin Thom
            <br/>
            Built by Sarah Edwards
        </div>
        <img src={require('./images/monkey_3.png')} alt="monkey pirate" className="icon"/>
    </div>,

    <div className="tutorial-step">
        <div className="tutorial-text">
            A crew of monkeys&mdash;with you as the captain&mdash;overthrew their pirate overlords.
            But it is not gold you want. Nay, coconuts are the bounty you seek.
            Alas! There be limited space on the sea. Compete for control of sea routes to get the most coconuts.
        </div>
        <img src={require('./images/coconuts.png')} alt="coconuts" className="icon"/>
    </div>,


    <div className="tutorial-step">
        <div className="tutorial-text">
            Two competing monkey pirate fleets vie for the most coconuts.
            <br/>
            Each player will control a fleet.
        </div>
        <img src={require('./images/two_ships.png')} alt="ships" className="icon"/>
    </div>,

    <div className="tutorial-step">
        <div className="tutorial-text">
            The board starts with the sea routes (black lines) that existed immediately after the mutinies.
            New routes will be built from these initial routes.
        </div>
        <img src={require('./images/board_0.png')} alt="coconuts" className="icon"/>
    </div>,

    <div className="tutorial-step">
        <div className="tutorial-text">
            Players take turns dragging a tile from the offer to the board.
            At least one sea route on the new tile must connect to an existing sea route.
        </div>
        <div className="illustration">
            <div className="image turns"/>
        </div>
    </div>,

    <div className="tutorial-step">
        <div className="tutorial-text">
            The number of coconuts on the route determines the value of the route.
            <br/>
        </div>
        <div className="illustration">
            <div className="image coconuts"/>
            <div className="caption">1 single and 2 double coconuts for 3 total coconuts</div>
        </div>

    </div>,

    <div className="tutorial-step">
        <div className="tutorial-text">
            A chest doubles the number of coconuts on the route.
            <br/>
            Multiple chests on the route have the same effect as a single chest.
        </div>
        <div className="illustration">
            <div className="image chest"/>
            <div className="caption">The chest makes these 3 coconuts count as 6 coconuts</div>
        </div>
    </div>,


    <div className="tutorial-step">
        <div className="tutorial-text">
            The player with the most ships on a route owns the coconuts on that route.
            If players tie, neither player owns the coconuts for the route.
            As players vie for control, the score will change.
        </div>
        <div className="illustration">
            <div className="image route"/>
            <div className="caption">2 red ships and 3 blue ships means blue controls all of the coconuts on this route</div>
        </div>

    </div>,

    <div className="tutorial-step">
        <div className="tutorial-text">
            An anchor at the end of a route doubles the ships of that color on the route. Two anchors of the same color on the route have the same effect as a single anchor.
        </div>
        <div className="illustration">
            <div className="image anchor"/>
            <div className="caption">The red anchor makes the 2 red ships count as 4 ships, so red owns all of the coconuts on this route.</div>
        </div>
    </div>,

    <div className="tutorial-step">
        <div className="tutorial-text">
            The game ends once all tiles have been placed.
            <br/>
            The player that owns the most coconuts at the end of the game wins!
        </div>
        <img src={require('./images/coconuts.png')} alt="coconuts" className="icon"/>
    </div>,
];

function PreviousButton(props) {
    if(props.currentRule !== 1) {
        return (
            <button className="navigation-button prev-button" onClick={props.handlePrevious}>&lt;</button>
        )
    }
    return <button disabled className="navigation-button prev-button">&lt;</button>;
}

// TODO how to consolidate Prev active/disabled?

function NextButton(props) {
    if(props.currentRule < rules.length) {
        return (
            <button className="navigation-button next-button" onClick={props.handleNext}>&gt;</button>
        )
    }
    return <button disabled className="navigation-button next-button">&gt;</button>;
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
