import React from 'react';

class Parent extends React.Component {
	render(){
		return (
			<Form />
		);
	}
}

class Form extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			input: "",
			submit: ""
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleChange(e){
		this.setState({
			input: e.target.value
		});
	}
	handleSubmit(e){
		e.preventDefault();
		this.setState({
			submit: this.state.input,
			input: ""
		});
	}	

	render(){
		return(
			<div>
				<form onSubmit={this.handleSubmit}>
					<input onChange={this.handleChange} value={this.state.input}/>
					<input value="click me!" type="submit"/>
				</form>
				<h1>{this.state.submit}</h1>
			</div>
		);
	}}
class Input extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			mensaje: ""
		};
		this.handle=this.handle.bind(this);
	}

	handle(e){
		this.setState({
			mensaje: e.target.value
		});
	}

	render (){
		return (
			<div>
				<input value={this.state.mensaje} onChange={this.handle} />
				<h1>{this.state.mensaje}</h1>
			</div>
		);
	}}
class Contador extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			count: 0
		};
		this.up = this.up.bind(this);
		this.down = this.down.bind(this);
		this.reset = this.reset.bind(this);

	}

	up(){
		this.setState(state => ({
			count: state.count + 1
		}));
	}

	down(){
		this.setState(state => ({
			count: state.count - 1
		}));
	}

	reset(){
		this.setState({
			count: 0
		});
	}

	render(){
		return (
			<div>
				<h1>the count is: {this.state.count}</h1>
				<button onClick={this.up}>up</button>
				<button onClick={this.down}>down</button>
				<button onClick={this.reset}>reset</button>
			</div>
		);
	}}
class YouCanSeeMee extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			visibility: false
		};
		this.action = this.action.bind(this);
	}

	action(){
		this.setState(state => {
			return state.visibility 
			? {visibility: false} 
			: {visibility: true};
		});
		
	}

	render(){
		if (this.state.visibility) {
			return (
				<div>
					<button onClick={this.action}>Click me!</button>
					<h1>You can see me</h1>
				</div>
			);
		} else {
			return (
				<div>
					<button onClick={this.action}>Click me!</button>
				</div>
			);
		}
	}}

export default Parent;