import React from 'react';

class Clock extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			normalTime: 1500,
			method: null,
			start: false,
			breakLength: 300,
			sessionLength: 1500,
			timeLabel: "session"


		};
		this.start = this.start.bind(this);
		this.takeAway = this.takeAway.bind(this);
		this.resetnormalTime = this.resetnormalTime.bind(this);
		this.breakIncrement = this.breakIncrement.bind(this);
		this.sessionIncrement = this.sessionIncrement.bind(this);
		this.playSound = this.playSound.bind(this);
		this.control = this.control.bind(this);
		this.pause = this.pause.bind(this);
	}

	start(){
		this.setState({
			method: setInterval(() => {
				this.takeAway();
				this.control();
				
			}, 1000),
			start: !this.state.start
		});
	}


	takeAway(){
		this.setState({
			normalTime: this.state.normalTime - 1
		});
	}

	control(){
		if(this.state.normalTime == 0){
			this.playSound();
		} else if(this.state.normalTime == -1){
			if (this.state.timeLabel == "session") {
				this.setState({
					normalTime: this.state.sessionLength,
					timeLabel: "break"
				});
			} else {
				this.setState({
					normalTime: this.state.breakLength,
					timeLabel: "session"
				});
			}
		}
	}


	resetnormalTime(){
		this.setState({
			normalTime: 1500,
			method: null,
			breakLength: 300,
			sessionLength: 1500,
			start: clearInterval(this.state.start)
		});
		  clearInterval(this.state.method);
	}


	breakIncrement(e){
		if(e.target.value == "up"){
			this.setState({
				breakLength: this.state.breakLength + 60
			});
		} else {
			this.setState({
				breakLength: this.state.breakLength - 60
			});
		}		
	}

	sessionIncrement(e){
		if(e.target.value == "up"){
			this.setState({
				sessionLength: this.state.sessionLength + 60,
				normalTime:  this.state.sessionLength + 60
			});
		} else {
			this.setState({
				sessionLength: this.state.sessionLength - 60,
				normalTime:  this.state.sessionLength - 60
			});
		}		
	}

	playSound(){
		const myA = new Audio('https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3');
		myA.play();
	}

	pause(){
		clearInterval(this.state.method);
		this.setState({
			start: !this.state.start
		});
	}

	render(){
		return (
			<div>
				<h1>{Math.floor(this.state.normalTime/60)} : {this.state.normalTime%60}</h1>
				{!this.state.start && <button onClick={this.start}>Start</button>}
				{this.state.start && <button disabled>Start</button>}
				<button onClick={this.resetnormalTime}>Reset</button>
				
				<p>Break Length</p>				
				<div className="menu">
					<button onClick={this.breakIncrement} value="up">up</button>
					<p>{this.state.breakLength/60}</p>
					<button onClick={this.breakIncrement} value="down">down</button>					
				</div>

				<p>Session Length</p>
				<div className="menu">					
					{!this.state.start && <button onClick={this.sessionIncrement} value="up">up</button>}
					{this.state.start && <button disabled>up</button>}
					<p>{this.state.sessionLength / 60}</p>
					{!this.state.start && <button onClick={this.sessionIncrement} value="dowm">down</button>}
					{this.state.start && <button disabled>down</button>}
				</div>

				<button onClick={this.pause}>pause</button>
			</div>
		);
	}
}

export default Clock;