import {polyfill} from "mobile-drag-drop";

polyfill({
  dragImageCenterOnTouch: true,
});

export default function Board({
  played,
  handleDrop,
}: {
  played: (number | null)[];
  handleDrop: (event, index: number) => void;
}): React.JSX.Element {
  const board = played.map((tileID, index) => {
    const className = tileID != null ? "square filled tile" + tileID : "square";

    return (
      <div
        onDrop={(event) => handleDrop(event, index)}
        key={index}
        className={className}
        onDragEnter={(event) => {
          event.preventDefault();
          event.currentTarget.style["background-color"] = "darkblue";
        }}
        onDragLeave={(event) => {
          event.currentTarget.style["background-color"] = "transparent";
        }}
        onDragOver={(event) => {
          event.preventDefault();
        }}
      />
    );
  });

  return <div id="board">{board}</div>;
}
