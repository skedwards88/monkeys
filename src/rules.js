import React, {useState} from "react";
import Modal from "./modal";

const rules = [

    <div className="tutorial-step">
        <div className="tutorial-text">
            Monkeys of the Caribbean
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
            A crew of monkeys--with you as the captain--overthrew the pirates.
            <br/>
            But it is not gold you want. Nay, coconuts are the bounty you seek!
            <br/>
            Alas! There be limited space on the sea. Gain control of the sea routes to get the most coconuts.
        </div>
        <img src={require('./images/coconuts.png')} alt="coconuts" className="icon"/>
    </div>,


    <div className="tutorial-step">
        <div className="tutorial-text">
            Two competing monkey crews vie for the most coconuts.
            <br/>
            Each player will control a color.
        </div>
        <img src={require('./images/two_ships.png')} alt="ships" className="icon"/>
    </div>,

    <div className="tutorial-step">
        <div className="tutorial-text">
            The board starts with the routes that existed immediately after the mutinies.
            <br/>
            New routes will be built from there.
            <br/>
            TODO show starting stack.
        </div>
        <img src={require('./images/coconuts.png')} alt="coconuts" className="icon"/>
    </div>,

    <div className="tutorial-step">
        <div className="tutorial-text">
            Players take turns dragging a tile from the offer to the board.
            <br/>
            At least one sea route (black line) on the new tile must connect to an existing sea route.
            <br/>
            Tiles may be staggered vertically.
            TODO show a tile being dragged from side to board. Maybe just make static, or just have cycle through 1,2,3 tiles played.
        </div>
        <img src={require('./images/coconuts.png')} alt="coconuts" className="icon"/>
    </div>,

    <div className="tutorial-step">
        <div className="tutorial-text">
            The player with the most ships on a route receives points for the route.
            <br/>
            If players tie, neither player receives points for the route.
            <br/>
            As players vie for control, the score will change.
            TODO Show a route with 2 red, 3 blue = blue wins.
        </div>
        <img src={require('./images/coconuts.png')} alt="coconuts" className="icon"/>
    </div>,

    <div className="tutorial-step">
        <div className="tutorial-text">
            An anchor at the end of a route doubles the ships of that color on the route. Two anchors of the same color on the route have the same effect as a single anchor.
            <br/>
            TODO Show 2 red, 3 blue, and blue anchor = red owns (build from above)
        </div>
        <img src={require('./images/coconuts.png')} alt="coconuts" className="icon"/>
    </div>,

    <div className="tutorial-step">
        <div className="tutorial-text">
            The number of coconuts on the route determines the value of the route.
            <br/>
            TODO show a single + double = 3
        </div>
        <img src={require('./images/coconuts.png')} alt="coconuts" className="icon"/>
    </div>,


    <div className="tutorial-step">
        <div className="tutorial-text">
            A chest doubles the number of coconuts on the route. Multiple chests on the route have the same effect as a single chest.
            <br/>
            TODO show a single + double + chest = 6
        </div>
        <img src={require('./images/coconuts.png')} alt="coconuts" className="icon"/>
    </div>,

    <div className="tutorial-step">
        <div className="tutorial-text">
            The game ends once all tiles have been placed.
            <br/>
            The player with the most points wins!
        </div>
        <img src={require('./images/coconuts.png')} alt="coconuts" className="icon"/>
    </div>,
// todo change points to coconuts
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
