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
		if (this.state.currentValue == '0' && e.target.value != '0') {
			this.setState({
				currentValue: e.target.value,
				formula: e.target.value
			});
		} else if (['+','-','/','*'].includes(this.state.currentValue)) {
			this.setState(state=>({
				formula: state.formula + e.target.value,
				currentValue: e.target.value
			}));
		} else if(this.state.currentValue != '0') {
			this.setState({
				currentValue: this.state.currentValue + e.target.value,
				formula: this.state.formula + e.target.value
			});
		}
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
		let signs = this.state.formula.match(/[\W]+/);
		let signsSize = signs[0].split('');
		let numbers = this.state.formula.match(/\d+/g);

		// si el grupo de signos es mayor a 1
		if (signsSize.length > 1) {
			// si el ultimo signo es negastivo y el penultimo no
			if (signsSize[signsSize.length - 1] == '-') {
				let newNum = '-' + numbers[1]
				console.log('el ultimo signo es negativo');
				console.log(newNum);
				console.log(signsSize[signsSize.length - 2] + "  &&& " + signsSize[signsSize.length - 1])
				let res = eval(newNum + signsSize[signsSize.length - 2] + numbers[0]);
				console.log(res);
				this.setState({
					formula: this.state.formula + '=' + res,
					currentValue: res
				});
			// si el ultimo signo es diferente de negativo
			} else {
				console.log(eval(numbers[0] + signsSize[signsSize.length - 1] + numbers[1]));
				console.log("this is the last sign " + signsSize[signsSize.length - 1]);
				
				let res = eval(numbers[0] + signsSize[signsSize.length - 1] + numbers[1]);
				this.setState({
					formula: this.state.formula + '=' + res,
					currentValue: res
				});
			}
			// cualquier otra operacion
		} else {
			let res = eval(this.state.formula);
			this.setState({
				formula: this.state.formula + '=' + res,
				currentValue: res
			});	
		}		
	}

	render(){
		return (
			<div className="container">
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
			</div>
		);
	}
}

const Btns = props => {
	return(
		<div>
			<div>
				<button className="btn btn-danger x2width" id='clear' value='ac'					onClick={props.handleClear}>ac</button>
				<button className="btn btn-info" id='multiply'	value='*' 	onClick={props.handleSign}>*</button>
				<button className="btn btn-info" id='divide'		value='/' 	onClick={props.handleSign}>/</button>        
			</div>
			      
			<div>
				<button className="btn btn-primary" id='seven'	value='7' 	onClick={props.handleNumbers}>7</button>
				<button className="btn btn-primary" id='eight'	value='8' 	onClick={props.handleNumbers}>8</button>
				<button className="btn btn-primary" id='nine'	value='9' 	onClick={props.handleNumbers}>9</button>
				<button className="btn btn-info" id='subtract'	value='-' 	onClick={props.handleSign}>-</button>
			</div>
			      
			<div>
				<button className="btn btn-primary" id='four'	value='4' 	onClick={props.handleNumbers}>4</button>
				<button className="btn btn-primary" id='five'	value='5' 	onClick={props.handleNumbers}>5</button>
				<button className="btn btn-primary" id='six'	value='6' 	onClick={props.handleNumbers}>6</button>
				<button className="btn btn-info" id='add'		value='+' 	onClick={props.handleSign}>+</button>
			</div>

			<div className="box">
				<div>
					<div>
						<button className="btn btn-primary" id='one' 	value='1' 	onClick={props.handleNumbers}>1</button>
						<button className="btn btn-primary" id='two'	value='2' 	onClick={props.handleNumbers}>2</button>
						<button className="btn btn-primary" id='three'	value='3' 	onClick={props.handleNumbers}>3</button>
					</div>
					<div>
						<button className="btn btn-primary x2width" id='zero'	value='0' 	onClick={props.handleNumbers}>0</button>
						<button className="btn btn-info" id='decimal'	value='.' 	onClick={props.handleDecimal}>.</button>        
					</div>
				</div>
				<div>
					<button className="btn btn-danger x2height" id='equals'	value='='	onClick={props.handleResult}>=</button>
				</div>
			</div>
		</div>		
	);
}

const Screen = props => {
	return (
		<div>
			<div className='well' id='formula'>{props.formula}</div>
			<div className='well' id='display'>{props.currentValue}</div>
		</div>
	);
}

export default Calculator2;