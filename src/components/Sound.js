import React from 'react';

const bankOne = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
];

const bankTwo = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Chord-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Chord-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Chord-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Shaker',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: 'Punchy-Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Side-Stick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Snare',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
  }
];

class Sound extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			power: true,
			change: false,
			arrSound: bankOne			
		};
		this.power = this.power.bind(this);
		this.change = this.change.bind(this);
	}

	power(){
		this.setState(state => ({
			power: !state.power
		}));
	}

	change(){
		this.setState(state => 
			state.change
			? {
				change: false,
				arrSound: bankOne				
			}
			: {
				change: true,
				arrSound: bankTwo
			}
		);
	}

	render(){
		const powerUp = this.state.power ? "powerUp" : "powerOff";
		const changeUp = this.state.change ? "powerUp" : "powerOff";

		return (
			<div id='drum-machine'>
				
				<Btns 
					myProp={this.state.change} 
					powerState={this.state.power}
					soundState={this.state.arrSound}
				/>

				<div className="light">
					<button onClick={this.power}>power</button>
					<div className = {powerUp}></div>
				</div>

				<div className="light">
					<button onClick={this.change}>change sound</button>
					<div className = {changeUp}></div>
				</div>
			</div>
		);
	}
}

class Btns extends React.Component{
	constructor(props){
		super(props);
		this.state={
			keyCode: 0,
			name: bankOne[0].id,
			volState: 1
		};
		this.playSound = this.playSound.bind(this);
		this.playSoundClick = this.playSoundClick.bind(this);
	    this.handleKeyPress = this.handleKeyPress.bind(this);
		this.vol = this.vol.bind(this);
  }
	componentDidMount() {
		document.addEventListener('keydown', this.handleKeyPress);
	}
	componentWillUnmount() {
		document.removeEventListener('keydown', this.handleKeyPress);
	}
	
	handleKeyPress(e) {
		this.setState({
			keyCode: e.keyCode
		});
		this.playSound();
	}    
	
	playSound(){		
		let myArr = !this.props.myProp ? bankOne : bankTwo;
		const position = myArr.map(i=>i.keyCode).indexOf(this.state.keyCode);
		const theName = myArr.map(i=>i.id)[position];
		const theName2 = myArr;
		
		if (position !== -1) {
			const soundControl = document.getElementById(theName2[position].keyTrigger);
			soundControl.volume = this.state.volState;
			soundControl.play();

			this.setState({
				name: theName
			});
		}
	}	

	playSoundClick(e){
		let myArr = !this.props.myProp ? bankOne : bankTwo;
		let theName = myArr.filter(d=>d.keyTrigger === e.target.value);
		this.setState({
			name: theName[0].id
		});
		
		const soundControl = document.getElementById(e.target.value);
		soundControl.volume = this.state.volState;
		soundControl.play();
	}
	vol(e){
		this.setState({
			volState: e.target.value / 100
		});
	}
	render(){
		let myArr = !this.props.myProp ? bankOne : bankTwo;
		let test;

		if (this.props.powerState) {
			test = myArr.map((d, i) => {
				return (
					<button 
						className='drum-pad'
						id={myArr[i].id}
						value={myArr[i].keyTrigger}
						onClick={this.playSoundClick}
					>
						<audio 
							src={myArr[i].url} 
							className= 'clip'
							id={myArr[i].keyTrigger} 
						/>					
						{myArr[i].keyTrigger}
					</button>	
				);
			});
		} else {
			test = myArr.map((d, i) => {
				return (
					<button 
						className='drum-pad'
						id={myArr[i].id}
						value={myArr[i].keyTrigger}
					>
						<audio 
							src={myArr[i].url} 
							className= 'clip'
							id={myArr[i].keyTrigger} 
						/>					
						{myArr[i].keyTrigger}
					</button>	
				);
			});
		}

		return (
			<div>
				<h1 id='display'>{this.state.name}</h1>
				<input type="range" onChange={this.vol} />				
				{test}
			</div>
		);
	}
}

export default Sound;