import React from 'react';

class Calculator extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            formula: "",
            currentValue: "0",
            aux: "",

            numbers: "",
            result:"",
            
        };
        this.handleNumbers = this.handleNumbers.bind(this);
        this.handleSign = this.handleSign.bind(this);
        this.reset = this.reset.bind(this);
        this.maths = this.maths.bind(this);
        this.decimal = this.decimal.bind(this);
        
    }

     handleNumbers(e){

        // start over again without ac
        if (this.state.result != "") {
            console.log("primera condicion");
            this.setState({                
                formula: e.target.value,
                currentValue: e.target.value,
                numbers: "",
                result: ""
            });
        }

        // first number != 0
        if(e.target.value != 0 && !this.state.formula && this.state.result == ""){
            console.log("segunda condicion");
            this.setState({
                formula: this.state.formula + e.target.value,
                numbers: this.state.numbers + e.target.value
            });
            this.setState(state=> ({
                currentValue: state.numbers
            }));
        }

        //normal flow
        if(this.state.formula && this.state.result == ""){
            console.log("tercera condicion");
            this.setState({
                formula: this.state.formula + e.target.value,
                numbers: this.state.numbers + e.target.value
            });
            this.setState(state=> ({
                currentValue: state.numbers
            }));
        }


    }

    // control signs
    handleSign(e){
        const signs = ["+", "*", "/", "-"];
        const lastValue = this.state.formula[this.state.formula.length - 1];
        const lastValue2 = this.state.formula[this.state.formula.length - 2];
        
        if(!signs.includes(lastValue)){
            this.setState({
                formula: this.state.formula + e.target.value,
                currentValue: e.target.value
            });
        }

        if (signs.includes(lastValue)) {
            this.setState({
                formula: this.state.formula + e.target.value,
                currentValue: e.target.value
            });   
        }


        // first value != sign and include a sign after number
        if(lastValue && !signs.includes(lastValue) && this.state.result == "" || e.target.value=='-'){
            this.setState({
                formula: this.state.formula + e.target.value,
                currentValue: e.target.value,
                numbers: "",
                flag: false
            });
        } 
/*
        // change the last sign
        if (signs.includes(lastValue) && lastValue != e.target.value && this.state.result == "" || e.target.value=='-') {
            this.setState({
                currentValue: e.target.value,
                formula: this.state.formula.slice(0, -1) + e.target.value,
                flag: false
            });
        } 
*/
        // add result to formula
        if (this.state.result != "") {
            this.setState({
                formula: this.state.result + e.target.value,
                currentValue: e.target.value
            });
            this.setState({
                result: "",
                numbers: "",
                flag: false
            });
        }
    }
        
    // just reset the values
    reset(){
        this.setState({
            formula: "",
            currentValue: "0",
            numbers: "",
            result: ""
        });
    }


    decimal(e){
        if(!this.state.currentValue.split('').includes('.')){
            this.setState({
                currentValue: this.state.currentValue + e.target.value,
                formula: this.state.formula + e.target.value,
                numbers: this.state.numbers + e.target.value
            });
        }
    }

    maths(e){
        let str = this.state.formula
        let signs = str.match(/\W+/g)[0].split('');
        let lastSing = signs[signs.length - 1];
        let numbers = str.match(/\d+/g);
        let expresion = numbers[0] + lastSing + numbers[1]

        if(signs.length > 2){
            this.setState({
                currentValue: eval(expresion).toString(),
                formula: this.state.formula + "=" + (Math.round(eval(expresion) * 10000) / 10000).toString()
            });
        } else {
            this.setState({
                currentValue: eval(str).toString(),
                formula: this.state.formula + "=" + (Math.round(eval(str) * 10000) / 10000).toString()
            });
        }
    }

    op(arr){
        console.log(arr + " recibido");

        switch(arr[2]){
            case "*":
                return arr[0] * arr[1];
            case "/":
                return arr[0] / arr[1];
            case "+":
                return Number(arr[0]) + Number(arr[1]);
            case "-":
                return Number(arr[0]) - Number(arr[1]);
        }
    }

    render(){
        return (
            <div class="container">
                <div>
                    <div className="well">{this.state.formula}</div>
                    <div id='display' className="well">{this.state.currentValue}</div>
                    <div>
                        <button id='clear' className="btn btn-danger x2width" value="ac" onClick={this.reset}>ac</button>
                        <button id='multiply' className="btn btn-info" value="*" onClick={this.handleSign}>*</button>
                        <button id='divide' className="btn btn-info" value="/" onClick={this.handleSign}>/</button>
                    </div>
                    <div>
                        <button id='seven' className="btn btn-primary" value={7} onClick={this.handleNumbers}>7</button>
                        <button id='eight' className="btn btn-primary" value={8} onClick={this.handleNumbers}>8</button>
                        <button id='nine' className="btn btn-primary" value={9} onClick={this.handleNumbers}>9</button>
                        <button id='subtract' className="btn btn-info" value="-" onClick={this.handleSign}>-</button>
                    </div>
                    <div>
                        <button id='four' className="btn btn-primary" value={4} onClick={this.handleNumbers}>4</button>
                        <button id='five' className="btn btn-primary" value={5} onClick={this.handleNumbers}>5</button>
                        <button id='six' className="btn btn-primary" value={6} onClick={this.handleNumbers}>6</button>
                        <button id='add' className="btn btn-info" value="+" onClick={this.handleSign}>+</button>
                    </div>

                    <div className="box">
                        <div>
                            <div>
                                <button id='one' className="btn btn-primary" value={1} onClick={this.handleNumbers}>1</button>
                                <button id='two' className="btn btn-primary" value={2} onClick={this.handleNumbers}>2</button>
                                <button id='three' className="btn btn-primary" value={3} onClick={this.handleNumbers}>3</button>
                            </div>
                            <div>
                                <button id='zero' className="btn btn-primary x2width" value={0} onClick={this.handleNumbers}>0</button>
                                <button id='decimal' className="btn btn-info" value="." onClick={this.decimal}>.</button>
                            </div>
                        </div>
                        <div>
                            <button id='equals' className="btn btn-danger x2height" value="=" onClick={this.maths}>=</button>
                        </div>
                    </div>
                </div>
            </div>
        ); 
    }

}


export default Calculator;