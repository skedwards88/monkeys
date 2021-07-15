import React from 'react'
import { polyfill } from "mobile-drag-drop";

polyfill({
    dragImageCenterOnTouch: true
});

export default function Board({ played, handleDrop }) {

    const board = played.map((tile, index) => {
        const className = tile ? "square filled tile" + tile : "square";

        return (
            <div
                onDrop={(e) => handleDrop(e, index)}
                key={index}
                className={className + " droptarget"}
                onDragEnter={(event) => {
                    event.preventDefault();
                    event.target.style["background-color"] = "darkblue"
                }}
                onDragLeave={(event) => {
                    event.target.style["background-color"] = "transparent"
                }}
                onDragOver={(event) => {
                    event.preventDefault();
                }}
            />
        );
    }
    );

    return (
        <div className="board">
            {board}
        </div>
    );
}