import React, { useState } from "react";
import { rules } from "./rules";

function PreviousButton({ currentRule, setCurrentRule }) {
  if (currentRule !== 0) {
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

function Info() {
  return (
    <div className="tutorial-step">
      <div className="tutorial-text">
        <h1>Monkeys of the Caribbean</h1>
        <div>{`2 Players\n15 Minutes\n\nDesigned by Colin Thom\nBuilt by Sarah Edwards`}</div>
      </div>
      <img
        src={require(`./images/monkey_3.svg`)}
        alt="monkey artwork"
        className="rules-image"
      />
      <div className="tutorial-text">Version 2.2.3</div>
      <div>
        {`Want more games? Check `}
        <a href="https://skedwards88.github.io/portfolio/">these</a>
        {`out.`}
      </div>
    </div>
  );
}

function Rule({ info }) {
  return (
    <div className="tutorial-step">
      <div className="tutorial-text">{info.text}</div>
      {info.animation ? (
        <div className="rules-animation">
          <div className={`image ${info.animation}`} />
        </div>
      ) : (
        <></>
      )}
      {info.image ? (
        <img
          src={require(`./images/${info.image}.png`)}
          alt={info.alt}
          className="rules-image"
        />
      ) : (
        <></>
      )}
      {info.caption ? <div className="caption">{info.caption}</div> : <></>}
    </div>
  );
}

export default function Tutorial({ showRules, setShowRules }) {
  const [currentRule, setCurrentRule] = useState(0);

  if (showRules) {
    const handleHide = () => {
      setCurrentRule(0);
      setShowRules(false);
    };
    console.log(currentRule);
    console.log(typeof currentRule);
    return (
      <div className="modal">
        <div id="tutorial">
          <PreviousButton
            currentRule={currentRule}
            setCurrentRule={setCurrentRule}
          />
          {currentRule ? <Rule info={rules[currentRule - 1]} /> : <Info />}
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
