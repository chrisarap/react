import React from 'react';

class Calculator extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            input: "",
            shortMessage: "",
            numbers: "",
            res:"",
            aux: "",
            flag: true


        };
        this.handleNumbers = this.handleNumbers.bind(this);
        this.handleSign = this.handleSign.bind(this);
        this.reset = this.reset.bind(this);
        this.maths = this.maths.bind(this);
        
    }

    // control full message
    handleNumbers(e){

        // start over again without ac
        if (this.state.res != "") {
            console.log("el valor de res es " + this.state.res);
            this.setState({                
                input: e.target.value,
                shortMessage: e.target.value,
                numbers: "",
                res: ""
            });
        }

        // first number != 0
        if(e.target.value != 0 && !this.state.input && this.state.res == ""){
            this.setState({
                input: this.state.input + e.target.value,
                numbers: this.state.numbers + e.target.value
            });
            this.setState(state=> ({
                shortMessage: state.numbers
            }));
        }

        //normal flow
        if(this.state.input && this.state.res == ""){
            this.setState({
                input: this.state.input + e.target.value,
                numbers: this.state.numbers + e.target.value
            });
            this.setState(state=> ({
                shortMessage: state.numbers
            }));
        }


    }

    // control signs
    handleSign(e){
        const arrSigns = ["+","-", "*", "/"];
        const lastValue = this.state.input[this.state.input.length - 1];
        
        // first value != sign and include a sign after number
        if(lastValue && !arrSigns.includes(lastValue) && this.state.res == ""){
            this.setState({
                input: this.state.input + e.target.value,
                shortMessage: e.target.value,
                numbers: "",
                flag: false
            });
        } 

        // change the last sign
        if (arrSigns.includes(lastValue) && lastValue != e.target.value && this.state.res == "") {
            this.setState({
                shortMessage: e.target.value,
                input: this.state.input.slice(0, -1) + e.target.value,
                flag: false
            });
        } 

        // add result to input
        if (this.state.res != "") {
            this.setState({
                input: this.state.res + e.target.value,
                shortMessage: e.target.value
            });
            this.setState({
                res: "",
                numbers: "",
                flag: false
            });
        }
    }
        
    // just reset the values
    reset(){
        this.setState({
            input: "",
            shortMessage: "",
            numbers: "",
            res: "",
            flag: true
        });
    }


    maths(e){

        if (!this.state.flag) {
            let str = this.state.input;
            let rgx = /[\d.?\d]+[*\/][\d.?\d]+/;
            let rgx2 = /[\d.?\d]+[+-][\d.?\d]+/;
            
            while(str.split("").includes("*") || str.split("").includes("/")){
                str = str.replace(rgx, g => {
                    if(g.split("").includes("*")){
                        return this.op(g.split("*").concat("*"));
                    }
                    if(g.split("").includes("/")){
                        return this.op(g.split("/").concat("/"));
                    }
                });
            }

            console.log(str + typeof str);
            while(str.split("").includes("+") || str.split("").includes("-")){
                console.log("asdsdasdasdssd");
                str = str.replace(rgx2, g => {
                    if(g.split("").includes("+")){
                        return this.op(g.split("+").concat("+"));
                    }
                    if(g.split("").includes("-")){
                        return this.op(g.split("-").concat("-"));
                    }
                });
            }

            this.setState({
                shortMessage: str,
                input: this.state.input + "=" + str,
                res: str,
                flag: true
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
                <p className="well">{this.state.input}</p>
                {this.state.shortMessage=="" ? <h1 className="well">0</h1> : <h1 className="well">{this.state.shortMessage}</h1>}
                <div>
                    <button className="btn btn-danger x2width" value="ac" onClick={this.reset}>ac</button>
                    <button className="btn btn-info" value="*" onClick={this.handleSign}>*</button>
                    <button className="btn btn-info" value="/" onClick={this.handleSign}>/</button>
                </div>
                <div>
                    <button className="btn btn-primary" value={7} onClick={this.handleNumbers}>7</button>
                    <button className="btn btn-primary" value={8} onClick={this.handleNumbers}>8</button>
                    <button className="btn btn-primary" value={9} onClick={this.handleNumbers}>9</button>
                    <button className="btn btn-info" value="-" onClick={this.handleSign}>-</button>
                </div>
                <div>
                    <button className="btn btn-primary" value={4} onClick={this.handleNumbers}>4</button>
                    <button className="btn btn-primary" value={5} onClick={this.handleNumbers}>5</button>
                    <button className="btn btn-primary" value={6} onClick={this.handleNumbers}>6</button>
                    <button className="btn btn-info" value="+" onClick={this.handleSign}>+</button>
                </div>

                <div className="box">
                    <div>
                        <div>
                            <button className="btn btn-primary" value={1} onClick={this.handleNumbers}>1</button>
                            <button className="btn btn-primary" value={2} onClick={this.handleNumbers}>2</button>
                            <button className="btn btn-primary" value={3} onClick={this.handleNumbers}>3</button>
                        </div>
                        <div>
                            <button className="btn btn-primary x2width" value={0} onClick={this.handleNumbers}>0</button>
                            <button className="btn btn-info" value="." >.</button>
                        </div>
                    </div>
                    <div>
                        <button className="btn btn-danger x2height" value="=" onClick={this.maths}>=</button>
                    </div>
                </div>
            </div>
            </div>
        ); 
    }

}


export default Calculator;