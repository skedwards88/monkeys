import type {DragData, Position} from "../logic/gameInit";

export default function DraggedTile({
  dragData,
}: {
  dragData: DragData;
}): React.JSX.Element {
  const className =
    "square filled tile" + dragData.draggedTileID + " drag-tile";

  const ghostCoordinates = getGhostCoordinates(
    dragData.pointerPosition,
    dragData.tileDimension,
  );

  return (
    <div
      className={className}
      style={{
        position: "absolute",
        top: ghostCoordinates.y,
        left: ghostCoordinates.x,
      }}
    />
  );
}

// this places the pointer in the bottom center of the tile
export function getGhostCoordinates(
  pointer: Position,
  tileDimension: Position,
): Position {
  return {
    x: pointer.x - tileDimension.x / 2,
    y: pointer.y - tileDimension.y / 1.2,
  };
}
