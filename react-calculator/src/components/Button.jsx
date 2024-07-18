import React from "react";
import './Button.css';

const Button = props => {
    return (
    <button 
        onClick={e => props.click && props.click(props.btnlabel)}
        className={`button 
        ${props.operation ? 'operation' : ''}
        ${props.double ? 'double-col' : ''}
        ${props.triple ? 'triple-col' : ''}`}>
            {props.btnlabel}
    </button>
    )
}

export default Button;