import {useState} from "react";
import {type RuleInfo, rules} from "../logic/rules";
import {type DisplayState} from "./App";
import monkey3 from "../images/button_icons/monkey_3.svg";
import coconuts from "../images/rule_illustrations/coconuts.webp";
import two_ships from "../images/rule_illustrations/two_ships.webp";
import chest from "../images/rule_illustrations/chest.webp";
import route from "../images/rule_illustrations/route.webp";
import route_and_anchor from "../images/rule_illustrations/route_and_anchor.webp";

const ruleImages: Record<string, string> = {
  coconuts: coconuts,
  two_ships: two_ships,
  chest: chest,
  route: route,
  route_and_anchor: route_and_anchor,
};

function PreviousButton({
  currentRule,
  setCurrentRule,
}: {
  currentRule: number;
  setCurrentRule: React.Dispatch<React.SetStateAction<number>>;
}): React.JSX.Element {
  if (currentRule !== 0) {
    const handlePrevious = (): void => {
      const newRule = currentRule - 1;
      setCurrentRule(newRule);
    };

    return (
      <button
        className="navigation-button prev-button"
        onClick={handlePrevious}
      ></button>
    );
  }
  return <button disabled className="navigation-button"></button>;
}

function NextButton({
  currentRule,
  setCurrentRule,
}: {
  currentRule: number;
  setCurrentRule: React.Dispatch<React.SetStateAction<number>>;
}): React.JSX.Element {
  if (currentRule < rules.length) {
    const handleNext = (): void => {
      const newRule = currentRule + 1;
      setCurrentRule(newRule);
    };

    return (
      <button
        className="navigation-button next-button"
        onClick={handleNext}
      ></button>
    );
  }
  return <button disabled className="navigation-button"></button>;
}

function Info(): React.JSX.Element {
  return (
    <div className="tutorial-step">
      <div className="tutorial-text">
        <h1>Monkeys of the Caribbean</h1>
        <div>{`2 Players\n15 Minutes\n\nDesigned by Colin Thom\nBuilt by Sarah Edwards`}</div>
      </div>
      <img src={monkey3} alt="monkey artwork" className="rules-image" />
      <div>
        {`Want more games? Check `}
        <a href="https://skedwards88.github.io/">these</a>
        {` out.`}
      </div>
    </div>
  );
}

function Rule({info}: {info: RuleInfo}): React.JSX.Element {
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
          src={ruleImages[info.image]}
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

export default function Tutorial({
  setDisplay,
}: {
  setDisplay: React.Dispatch<React.SetStateAction<DisplayState>>;
}): React.JSX.Element {
  const [currentRule, setCurrentRule] = useState<number>(0);

  const handleHide = (): void => {
    setCurrentRule(0);
    setDisplay("game");
  };

  return (
    <div id="tutorial">
      <PreviousButton
        currentRule={currentRule}
        setCurrentRule={setCurrentRule}
      />
      {currentRule ? <Rule info={rules[currentRule - 1]} /> : <Info />}
      <button
        className="navigation-button"
        id="exit-button"
        onClick={handleHide}
      ></button>
      <NextButton currentRule={currentRule} setCurrentRule={setCurrentRule} />
    </div>
  );
}
