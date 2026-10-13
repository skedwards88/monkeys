import {useState} from "react";
import {type RuleInfo, rules} from "../logic/rules";
import {type DisplayState} from "./App";
import monkey_3 from "../images/button_icons/monkey_3.svg";
import coconuts from "../images/rule_illustrations/coconuts.webp";
import two_ships from "../images/rule_illustrations/two_ships.webp";
import chest from "../images/rule_illustrations/chest.webp";
import route from "../images/rule_illustrations/route.webp";
import route_and_anchor from "../images/rule_illustrations/route_and_anchor.webp";

const ruleImages: Record<string, string> = {
  monkey_3: monkey_3,
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
  const handlePrevious = (): void => {
    const newRule = currentRule - 1;
    setCurrentRule(newRule);
  };

  return (
    <button
      disabled={currentRule === 0}
      className="navigation-button prev-button"
      onClick={handlePrevious}
    ></button>
  );
}

function NextButton({
  currentRule,
  setCurrentRule,
}: {
  currentRule: number;
  setCurrentRule: React.Dispatch<React.SetStateAction<number>>;
}): React.JSX.Element {
  const handleNext = (): void => {
    const newRule = currentRule + 1;
    setCurrentRule(newRule);
  };

  return (
    <button
      disabled={currentRule >= rules.length - 1}
      className="navigation-button next-button"
      onClick={handleNext}
    ></button>
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
    <div className="App" id="tutorial">
      <PreviousButton
        currentRule={currentRule}
        setCurrentRule={setCurrentRule}
      />
      <Rule info={rules[currentRule]} />
      <button
        className="navigation-button"
        id="exit-button"
        onClick={handleHide}
      ></button>
      <NextButton currentRule={currentRule} setCurrentRule={setCurrentRule} />
    </div>
  );
}
