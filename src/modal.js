import React from 'react';
import { createPortal } from 'react-dom';

// Get the element with the id 'modal' from index.html
const modalRoot = document.getElementById( 'modal' );

class Modal extends React.Component {
    constructor(props) {
        super(props);
        // Create a div to render the modal into
        this.element = document.createElement('div');
    }

    componentDidMount() {
        // Append the element into the DOM on mount
        modalRoot.appendChild(this.element);
    }

    componentWillUnmount() {
        // Remove the element from the DOM when on unmount
        modalRoot.removeChild(this.element);
    }

    render() {
        // Use a portal to render the children into the element
        // (Takes any valid React child (JSX, strings, arrays, etc.) and an element in the DOM
        return createPortal(
            this.props.children,
            this.element,
        );
    }
}

export default Modal;
