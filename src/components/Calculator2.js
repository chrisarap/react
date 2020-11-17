import React from 'react';

class Calculator2 extends React.Component{
	constructor(props){
		super(props);
		this.state={
			currentValue:'0',
			formula: ''
		};
		
		this.handleNumbers = this.handleNumbers.bind(this);
		this.handleClear = this.handleClear.bind(this);
		this.handleDecimal = this.handleDecimal.bind(this);
		this.handleResult = this.handleResult.bind(this);
		this.handleSign = this.handleSign.bind(this);
	}

	handleNumbers(e){
		this.setState(state => {
			// si el valor actual es 0 y el valor de entrada es diferente de 0
			// elimina el 0 inicial y agrega el número nuevo que es diferente de 0
			if (state.currentValue == '0' && e.target.value != '0') {
				console.log('condicion uno');
				return {
					currentValue: e.target.value,
					formula: e.target.value
				};
			// elimina el signo al agregar un número
			} else if(['+','-','/','*'].includes(state.currentValue)) {
				console.log('condicion dos')
				return {
					formula: state.formula + e.target.value,
					currentValue: e.target.value
				};
			// si el valor actual es diferente de 0, agrega cualquier número incluyendo el 0
			} else if(state.currentValue != '0') {
				console.log('condicion tres');
				return {
					currentValue: state.currentValue + e.target.value,
					formula: state.formula + e.target.value
				};
			}
		});
	}
		
	handleDecimal(e){
		// si el valor actual no contiene punto, agrégalo
		if(!this.state.currentValue.split('').includes(e.target.value)){
			this.setState(state=>({
				currentValue: state.currentValue + e.target.value,
				formula: state.formula + e.target.value
			}));
		}
	}

	handleSign(e){
		// si la formula contiene un signo de igual, es porque se hizo una operación
		// entonces, agrega el valor nuevo con el resultado
		if(this.state.formula.split('').includes('=')){
			this.setState({
				formula: this.state.currentValue + e.target.value,
				currentValue: e.target.value
			});
		} else {
			this.setState({
				formula: this.state.formula + e.target.value,
				currentValue: e.target.value
			});
		}
		
	}

	handleClear(){
		this.setState({
			currentValue: '0',
			formula: ''
		});
	}

	handleResult(){
		let res = eval(this.state.formula);
		console.log(typeof res, res);

		this.setState({
			formula: this.state.formula + '=' + res,
			currentValue: res
		});
	}

	render(){
		return (
			<div>
				<Screen 
					currentValue={this.state.currentValue} 
					formula={this.state.formula} 
				/>
				<Btns				
					handleNumbers={this.handleNumbers}
					handleClear={this.handleClear}
					handleDecimal={this.handleDecimal}
					handleResult={this.handleResult}
					handleSign={this.handleSign}
				/>
			</div>
		);
	}
}

const Btns = props => {
	return(
		<div>
			<button id='equals'	value='='	onClick={props.handleResult}>=</button>

			<button id='zero'	value='0' 	onClick={props.handleNumbers}>0</button>
			<button id='one' 	value='1' 	onClick={props.handleNumbers}>1</button>
			<button id='two'	value='2' 	onClick={props.handleNumbers}>2</button>
			<button id='three'	value='3' 	onClick={props.handleNumbers}>3</button>
			<button id='four'	value='4' 	onClick={props.handleNumbers}>4</button>
			<button id='five'	value='5' 	onClick={props.handleNumbers}>5</button>
			<button id='six'	value='6' 	onClick={props.handleNumbers}>6</button>
			<button id='seven'	value='7' 	onClick={props.handleNumbers}>7</button>
			<button id='eight'	value='8' 	onClick={props.handleNumbers}>8</button>
			<button id='nine'	value='9' 	onClick={props.handleNumbers}>9</button>
			
			<button id='add'		value='+' 	onClick={props.handleSign}>+</button>
			<button id='subtract'	value='-' 	onClick={props.handleSign}>-</button>
			<button id='multiply'	value='*' 	onClick={props.handleSign}>*</button>
			<button id='divide'		value='/' 	onClick={props.handleSign}>/</button>
			
			<button id='decimal'	value='.' 	onClick={props.handleDecimal}>.</button>
			
			<button id='clear'					onClick={props.handleClear}>ac</button>
		</div>		
	);
}

const Screen = props => {
	return (
		<div>
			<div id='formula'>{props.formula}</div>
			<div id='display'>{props.currentValue}</div>
		</div>
	);
}

export default Calculator2;