import React, { useState } from "react";

const rules = [
  <div className="tutorial-step">
    <div className="tutorial-text">
      <h1>Monkeys of the Caribbean</h1>
      <br />
      <br />
      2 Players
      <br />
      15 Minutes
      <br />
      <br />
      Game by Colin Thom
      <br />
      Built by Sarah Edwards
    </div>
    <div className="illustration">
      <div className="image monkey" />
    </div>
    <div className="tutorial-text">Version 2.1.0</div>
  </div>,

  <div className="tutorial-step">
    <div className="tutorial-text">
      A crew of monkeys&mdash;with you as the captain&mdash;overthrew their
      pirate overlords. But it is not gold you want. Nay, coconuts are the
      bounty you seek.
      <br />
      <br />
      Alas! There be limited space on the sea. Compete for control of sea routes
      to get the most coconuts.
    </div>
    <img
      src={require("./images/coconuts.png")}
      alt="coconuts"
      className="icon"
    />
  </div>,

  <div className="tutorial-step">
    <div className="tutorial-text">
      Two competing monkey pirate fleets vie for the most coconuts.
      <br />
      Each player will control a fleet.
    </div>
    <img src={require("./images/two_ships.png")} alt="ships" className="icon" />
  </div>,

  <div className="tutorial-step">
    <div className="tutorial-text">
      The board starts with the sea routes (black lines) that existed
      immediately after the mutinies. New routes will be built from these
      initial routes.
    </div>
    <div className="illustration">
      <div className="image starting" />
    </div>
  </div>,

  <div className="tutorial-step">
    <div className="tutorial-text">
      Players take turns dragging a tile from the offer to the board. At least
      one sea route on the new tile must connect to an existing sea route.
    </div>
    <div className="illustration">
      <div className="image turns" />
    </div>
  </div>,

  <div className="tutorial-step">
    <div className="tutorial-text">
      The number of coconuts on the route determines the value of the route.
      <br />
    </div>
    <div className="illustration">
      <div className="image coconuts" />
      <div className="caption">
        1 single and 2 double coconuts for 3 total coconuts
      </div>
    </div>
  </div>,

  <div className="tutorial-step">
    <div className="tutorial-text">
      A chest doubles the number of coconuts on the route.
      <br />
      Multiple chests on the route have the same effect as a single chest.
    </div>
    <div className="illustration">
      <div className="image chest" />
      <div className="caption">
        The chest makes these 3 coconuts count as 6 coconuts
      </div>
    </div>
  </div>,

  <div className="tutorial-step">
    <div className="tutorial-text">
      The player with the most ships on a route owns the coconuts on that route.
      If players tie, neither player owns the coconuts for the route. As players
      vie for control, the score will change.
    </div>
    <div className="illustration">
      <div className="image route" />
      <div className="caption">
        2 red ships and 3 blue ships means blue controls all of the coconuts on
        this route
      </div>
    </div>
  </div>,

  <div className="tutorial-step">
    <div className="tutorial-text">
      An anchor at the end of a route doubles the ships of that color on the
      route. Two anchors of the same color on the route have the same effect as
      a single anchor.
    </div>
    <div className="illustration">
      <div className="image anchor" />
      <div className="caption">
        The red anchor makes the 2 red ships count as 4 ships, so red owns all
        of the coconuts on this route.
      </div>
    </div>
  </div>,

  <div className="tutorial-step">
    <div className="tutorial-text">
      The game ends once all tiles have been placed.
      <br />
      The player that owns the most coconuts at the end of the game wins!
    </div>
    <img
      src={require("./images/coconuts.png")}
      alt="coconuts"
      className="icon"
    />
  </div>,
];

function PreviousButton({ currentRule, setCurrentRule }) {
  if (currentRule !== 1) {
    const handlePrevious = () => {
      let newRule = currentRule - 1;
      setCurrentRule(newRule);
    };

    return (
      <button
        className="navigation-button prev-button"
        onClick={handlePrevious}
      >
        &lt;
      </button>
    );
  }
  return (
    <button disabled className="navigation-button prev-button">
      &lt;
    </button>
  );
}

function NextButton({ currentRule, setCurrentRule }) {
  if (currentRule < rules.length) {
    const handleNext = () => {
      let newRule = currentRule + 1;
      setCurrentRule(newRule);
    };

    return (
      <button className="navigation-button next-button" onClick={handleNext}>
        &gt;
      </button>
    );
  }
  return (
    <button disabled className="navigation-button next-button">
      &gt;
    </button>
  );
}

export default function Tutorial({ showRules, setShowRules }) {
  const [currentRule, setCurrentRule] = useState(1);

  if (showRules) {
    const handleHide = () => {
      setCurrentRule(1);
      setShowRules(false);
    };

    return (
      <div className="modal">
        <div id="tutorial">
          <PreviousButton
            currentRule={currentRule}
            setCurrentRule={setCurrentRule}
          />
          {rules[currentRule - 1]}
          <button id="exit-button" onClick={handleHide}>
            &#10005;
          </button>
          <NextButton
            currentRule={currentRule}
            setCurrentRule={setCurrentRule}
          />
        </div>
      </div>
    );
  } else {
    const handleShow = () => {
      setShowRules(true);
    };

    return <button id="rules-button" onClick={handleShow}></button>;
  }
}
