import type {CSSPropertiesWithVars} from "../CSSPropertiesWithVars";
import type {DragData} from "../logic/gameInit";

export default function DraggedTile({
  dragData,
}: {
  dragData: DragData;
}): React.JSX.Element {
  const className =
    "square filled tile" + dragData.draggedTileID + " drag-tile";

  // this places the pointer in the bottom center of the tile
  const left = dragData.pointerPosition.x - dragData.pointerOffset.x / 2;
  const top = dragData.pointerPosition.y - dragData.pointerOffset.y / 1.2;

  return (
    <div
      className={className}
      style={
        {
          position: "absolute",
          top,
          left,
        } as CSSPropertiesWithVars
      }
    />
  );
}
