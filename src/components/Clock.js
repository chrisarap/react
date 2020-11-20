import React from 'react';

class Clock extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			breakLength: 5,
			sessionLength: 25,
			timeLeft: 1500,
			timerState: 'stop',
			message: 'Session',
			pause: false,
			method: ''
		};
		this.setFormat = this.setFormat.bind(this);
		this.reset = this.reset.bind(this);
		this.updateBreak = this.updateBreak.bind(this);
		this.updateSession = this.updateSession.bind(this);
		this.controlTime = this.controlTime.bind(this);
		this.takeAway = this.takeAway.bind(this);
		this.checkThisOut = this.checkThisOut.bind(this);
		this.playSound = this.playSound.bind(this);
	}

	setFormat(){
		console.log('setFormat');
		let minutes = Math.floor(this.state.timeLeft / 60);
		let seconds = this.state.timeLeft - (minutes * 60);

		minutes = minutes < 10 ? '0' + minutes : minutes;
		seconds = seconds < 10 ? '0' + seconds : seconds;

		return minutes + ':' + seconds;
	}

	reset(){
		console.log('reset');
		this.setState(state => ({
			breakLength: 5,
			sessionLength: 25,
			timeLeft: 1500,
			message: 'Session',
			pause: false,
			method: ''
		}));

		// stop the time
		if (this.state.method !== '') {
			clearTimeout(this.state.method);
		}

		this.myAudio.pause();
    	this.myAudio.currentTime = 0;
	}

	updateBreak(e){
		console.log('updbreak');
		if (e.target.value == 'plus' && this.state.breakLength + 1 <= 60) {
			this.setState(state =>({
				breakLength: state.breakLength + 1
			}));
		} else if (e.target.value == 'less' && this.state.breakLength - 1 > 0) {
			this.setState(state =>({
				breakLength: state.breakLength - 1
			}));
		}
	}

	updateSession(e){
		console.log('updsession');
		if (e.target.value == 'plus' && this.state.sessionLength !== 60) {
			this.setState(state =>({
				sessionLength: state.sessionLength + 1,
				timeLeft: state.sessionLength * 60 + 60
			}));
		} else if (e.target.value == 'less' && this.state.sessionLength !== 1) {
			this.setState(state =>({
				sessionLength: state.sessionLength - 1,
				timeLeft: state.sessionLength * 60 - 60
			}));
		}
	}

	controlTime(){
		console.log('controlTime');
		if (!this.state.pause) {
			this.setState({
				pause: true,
				method: setInterval(() => {
					this.takeAway();
					this.checkThisOut();
				}, 1000)
			});
		} else {
			this.setState({
				pause: false
			});
			// stop the time
			if (this.state.method !== '') {
				clearTimeout(this.state.method);
			}
		}
	}

	takeAway() {
		console.log('takeAway');
		this.setState(state => ({
			timeLeft: state.timeLeft - 1
		}));
	}

	checkThisOut(){
		this.playSound(this.state.timeLeft);

		console.log('checkThisOut');
		if (this.state.timeLeft < 0 && this.state.message == 'Session') {
			this.setState(state=>({
				timeLeft: state.breakLength * 60,
				message: 'Break'
			}));
		} else if (this.state.timeLeft < 0 && this.state.message == 'Break') {
			this.setState(state=>({
				timeLeft: state.sessionLength * 60,
				message: 'Session'
			}));
		}
	}

	playSound(myTime) {
	    if (myTime === 0) {
	    	this.myAudio.play();
	    }
	}

	render() {
		return (
			<div>
				<div class='row'>				
					<div id='timer-label'>{this.state.message}</div>
					<button className="btn btn-info		col-md-4" id='start_stop' 	onClick={this.controlTime}>
						start_stop
					</button>
					<div className='col-md-4' id='time-left'>{this.setFormat()}</div>
					<button className="btn btn-danger 	col-md-4" id='reset' 		onClick={this.reset}>reset</button>
				</div>

				<div class='row'>
					<div id='break-label'>Break Length</div>

					<button className="btn btn-primary col-md-4" id='break-decrement' value='less' onClick={this.updateBreak}>
						down
					</button>

					<div className='col-md-4' id='break-length'>{this.state.breakLength}</div>

					<button className="btn btn-primary col-md-4" id='break-increment' value='plus' onClick={this.updateBreak}>
						up
					</button>

				</div>

				<div class='row'>
					<div id='session-label'>Session Length</div>
					<button className="btn btn-primary col-md-4" id='session-decrement' value='less' onClick={this.updateSession}>down</button>
					<div className='col-md-4' id='session-length'>{this.state.sessionLength}</div>
					<button className="btn btn-primary col-md-4" id='session-increment' value='plus' onClick={this.updateSession}>up</button>
				</div>

				<audio
		          id="beep"
		          preload="auto"
		          ref={audio => this.myAudio = audio}
		          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
		        />
			</div>
		);
	}
}

export default Clock;