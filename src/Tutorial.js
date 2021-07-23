import React, { useState } from "react";
import rules from "./rules.js";

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
