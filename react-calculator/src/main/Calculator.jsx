import React, { Component } from "react";
import "./Calculator.css";
import Button from "../components/Button";
import Display from "../components/Display";

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}

export default class Calculator extends Component {

    state = { ...initialState }

    constructor(props) {
        super(props);

        this.clearDisplay = this.clearDisplay.bind(this);
        this.setOperation = this.setOperation.bind(this);
        this.addDigit = this.addDigit.bind(this);
        this.setPorcentage = this.setPorcentage.bind(this);
    }

    clearDisplay() {
        this.setState({ ...initialState });
    }

    setOperation(operation) {
        if (this.state.current === 0) {
            this.setState({ operation, current: 1, clearDisplay: true });
        } else {
            const equals = operation === '=';
            const currentOperation = this.state.operation;
            const values = [...this.state.values];
            try{
                values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`);
                if (NaN(values[0]) || !isFinite(values[0])) {
                    this.clearDisplay();
                    return;
                }
            } catch(e) {
                values[0] = this.state.values[0];
            }
            values[1] = 0;

            this.setState({
                displayValue: values[0],
                operation: equals ? null : operation,
                current: equals ? 0 : 1,
                clearDisplay: !equals,
                values
            
            })
        }
    }

    setPorcentage() {
        const porcentage = this.state.values[0] * 0.01;
        this.setState({ displayValue: porcentage });
    }

    addDigit(digit) {
        // avoid to have more than one dot in the display
        if (digit ==='.' && this.state.displayValue.includes('.')) {
            return
        }
        // clear the display if the value is 0 or clearDisplay is true
        const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay;
        // if clearDisplay is true, the current value is empty, otherwise it is the current value
        const currentValue = clearDisplay ? '' : this.state.displayValue;
        // the new value is the current value plus the digit
        const displayValue = currentValue + digit;
        // update the displayValue and clearDisplay
        this.setState({ displayValue, clearDisplay: false });
        // if the digit is different from dot
        if (digit !== '.') {
            // get the current value
            const i = this.state.current;
            // convert the displayValue to float
            const newValue = parseFloat(displayValue);
            // copy the values array
            const values = [...this.state.values];
            // update the value in the array
            values[i] = newValue;
            // update the values array
            this.setState({ values });
            console.log(values);
        }
    }

    render() {
        return (
            <div className="calculator">
                <Display value={this.state.displayValue} />
                <Button btnlabel="AC" click={this.clearDisplay} double/>
                <Button btnlabel="%" click={this.setPorcentage} />
                <Button btnlabel="/" click={this.setOperation} operation/>
                <Button btnlabel="7" click={this.addDigit} />
                <Button btnlabel="8" click={this.addDigit} />
                <Button btnlabel="9" click={this.addDigit} />
                <Button btnlabel="*" click={this.setOperation} operation/>
                <Button btnlabel="4" click={this.addDigit} />
                <Button btnlabel="5" click={this.addDigit} />
                <Button btnlabel="6" click={this.addDigit} />
                <Button btnlabel="-" click={this.setOperation} operation/>
                <Button btnlabel="1" click={this.addDigit} />
                <Button btnlabel="2" click={this.addDigit} />
                <Button btnlabel="3" click={this.addDigit} />
                <Button btnlabel="+" click={this.setOperation} operation/>
                <Button btnlabel="0" click={this.addDigit} double/>
                <Button btnlabel="." click={this.addDigit} />
                <Button btnlabel="=" click={this.setOperation} operation />
            </div>
        )
    }
}
