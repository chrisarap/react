import React from 'react';

const accurateInterval = function (fn, time) {
  var cancel, nextAt, timeout, wrapper;
  
  nextAt = new Date().getTime() + time;
  timeout = null;

  wrapper = () => {
    nextAt += time;
    timeout = setTimeout(wrapper, nextAt - new Date().getTime());
    return fn();
  };
  
  cancel = () => clearTimeout(timeout);

  timeout = setTimeout(wrapper, nextAt - new Date().getTime());
  
  return {cancel: cancel};
};

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
		if (this.state.method) {
		    this.state.method.cancel();
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
				method: accurateInterval(() => {
					this.takeAway();
					this.checkThisOut();
				}, 1000)
			});
		} else {
			this.setState({
				pause: false
			});
			// stop the time
			if (this.state.method) {
		        this.state.method.cancel();
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
						<i className="fa fa-play fa-x" />
            			<i className="fa fa-pause fa-x" />
					</button>
					<div className='col-md-4' id='time-left'>{this.setFormat()}</div>
					<button className="btn btn-danger 	col-md-4" id='reset' 		onClick={this.reset}>reset</button>
				</div>
				
				<div class='row'>
					<div id='break-label'>Break Length</div>

					<button className="btn btn-primary col-md-4" id='break-decrement' value='less' onClick={this.updateBreak}>
						<i className="fa fa-arrow-down fa-x" />
					</button>

					<div className='col-md-4' id='break-length'>{this.state.breakLength}</div>

					<button className="btn btn-primary col-md-4" id='break-increment' value='plus' onClick={this.updateBreak}>
						<i className="fa fa-arrow-up fa-x" />
					</button>

				</div>

				<div class='row'>
					<div id='session-label'>Session Length</div>
					<button className="btn btn-primary col-md-4" id='session-decrement' value='less' onClick={this.updateSession}><i className="fa fa-arrow-down fa-x" /></button>
					<div className='col-md-4' id='session-length'>{this.state.sessionLength}</div>
					<button className="btn btn-primary col-md-4" id='session-increment' value='plus' onClick={this.updateSession}><i className="fa fa-arrow-up fa-x" /></button>
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










/*
class Clock extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			normalTime: 1500,
			method: null,
			start: false,
			breakLength: 5,
			sessionLength: 25,
			timeLabel: "session",
			message: 'Session'
		};
		this.start = this.start.bind(this);
		this.takeAway = this.takeAway.bind(this);
		this.reset = this.reset.bind(this);
		this.breakIncrement = this.breakIncrement.bind(this);
		this.sessionIncrement = this.sessionIncrement.bind(this);
		this.playSound = this.playSound.bind(this);
		this.control = this.control.bind(this);
		this.setFormat = this.setFormat.bind(this);
	}

	start(){
		if (!this.state.start) {
			this.setState({
				method: setInterval(() => {
					this.takeAway();
					this.control();					
				}, 1000),
				start: !this.state.start
			});
		} else {
			clearInterval(this.state.method);
			this.setState({
				start: !this.state.start
			});
		}		
	}

	takeAway(){
		console.log('hey|')
		this.setState({
			normalTime: this.state.normalTime - 1 // one second less
		});
	}

	setFormat(){
		let minutes = Math.floor(this.state.normalTime/60);
		let seconds = this.state.normalTime - minutes * 60;
		seconds = seconds < 10 ? '0' + seconds : seconds;
		minutes = minutes < 10 ? '0' + minutes : minutes;

		return minutes + ':' + seconds;
	}

	control(){
		this.playSound(this.state.normalTime);		

		 if(this.state.normalTime < 0){
			if (this.state.timeLabel == "session") {
				this.setState({
					normalTime: this.state.sessionLength * 60, // by 60 to convert minutes to seconds
					timeLabel: "break",
					message: "session start"
				});
			} else {
				this.setState({
					normalTime: this.state.breakLength * 60, // by 60 to convert minutes to seconds
					timeLabel: "session",
					message: "break start"
				});
			}
		}
	}

	reset(){
		const myA = document.getElementById('beep');
		clearInterval(this.state.method);

		this.setState({
			normalTime: 1500,
			method: null,
			breakLength: 5,
			sessionLength: 25,
			start: clearInterval(this.state.start)
		});

		this.myAudio.pause();
   		this.myAudio.currentTime = 0;
	}


	breakIncrement(e){

		this.setState(state=>{
			if (e.target.value=='up' && state.breakLength < 60) {
				return {
					breakLength: state.breakLength + 1
				}
			} else if ( e.target.value=='down' && state.breakLength > 1){
				return {
					breakLength: state.breakLength - 1	
				}
			}
		});
	}

	sessionIncrement(e){
		this.setState(state=>{
			if (e.target.value=='up' && state.sessionLength < 60) {
				return {
					sessionLength: state.sessionLength + 1,
					normalTime:  state.normalTime + 60
				}
			} else if (e.target.value=='down' && state.sessionLength > 1){
				return {
					sessionLength: state.sessionLength - 1,
					normalTime:  state.normalTime - 60
				}
			}
		});
	}

	playSound(time){
		console.log('timer...')
		if (time === 0) {
			console.log('play my music ' + time)
	      this.myAudio.play();
	    }
	}



	render(){
		return (
			<div>
				<div id='timer-label'>{this.state.message}</div>
				<div id='timer-left'>{this.setFormat()}</div>

				<button  id='start_stop' onClick={this.start}>Start_pause</button>
				<button id='reset' onClick={this.reset}>Reset</button>
				
				<div id='break-label'>Break Length</div>
				<div className="menu">
					<button id='break-increment' onClick={this.breakIncrement} value="up">up</button>
					<div id='break-length'>{this.state.breakLength}</div>
					<button id='break-decrement' onClick={this.breakIncrement} value="down">down</button>					
				</div>

				<div id='session-label'>Session Length</div>
				<div className="menu">					
					<button id='session-increment' onClick={this.sessionIncrement} value="up">up</button>
					<div id='session-length'>{this.state.sessionLength }</div>
					<button id='session-decrement' onClick={this.sessionIncrement} value="down">down</button>
				</div>

				<audio 
					id='beep' 
					preload="auto" 
					src='https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav'
					ref={(audio) => {
			        	this.myAudio = audio;
			        }}
				/>

			</div>
		);
	}
}
*/
export default Clock;