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
			power: false,
			change: false
			
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
		this.setState(state => ({
			change: !state.change
		}));
	}


	render(){
		const powerUp = this.state.power ? "powerUp" : "powerOff";
		const changeUp = this.state.change ? "powerUp" : "powerOff";

		return (
			<div>
				
				{this.state.power && <Btns myProp={this.state.change}/>}
				{!this.state.power && <BtnOff />}


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

const BtnOff = () => {
	return (
		<div>
			<h1>Happy Hacking</h1>

			<button>q</button>
			<button>w</button>
			<button>e</button>

			<button>a</button>
			<button>s</button>
			<button>d</button>

			<button>z</button>
			<button>x</button>
			<button>c</button>

			<input type="range" />
		</div>
	);
};

class Btns extends React.Component{
	constructor(props){
		super(props);
		this.state={
			keyCode: 0,
			name: ""
		};
		this.playSound = this.playSound.bind(this);
		this.playSoundClick = this.playSoundClick.bind(this);
	    this.handleKeyPress = this.handleKeyPress.bind(this);
	    			    this.vol = this.vol.bind(this);
	    			    this.rep = this.rep.bind(this);

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
		
		if (position != -1) {
			const myA = new Audio(myArr[position].url);
			myA.play();
			this.setState({
				name: theName
			});
		}
	}	

	playSoundClick(e){
		let myArr = !this.props.myProp ? bankOne : bankTwo;
		
		this.setState({
			name: myArr[e.target.value].id
		});

		const myA = new Audio(myArr[e.target.value].url);
		myA.play();
	}

	rep(){
		const verga = document.getElementById("audioTest");
		verga.play();
	}
	vol(e){
		let myVolume = document.getElementById("audioTest");
		myVolume.volume = e.target.value / 100; 
	}
	render(){
		return (
			<div>
				<h1>{this.state.name}</h1>

				<input type="range" onChange={this.vol} />
				
				<button value={0} onClick={this.playSoundClick}>q</button>
				<button value={1} onClick={this.playSoundClick}>w</button>
				<button value={2} onClick={this.playSoundClick}>e</button>

				<button value={3} onClick={this.playSoundClick}>a</button>
				<button value={4} onClick={this.playSoundClick}>s</button>
				<button value={5} onClick={this.playSoundClick}>d</button>

				<button value={6} onClick={this.playSoundClick}>z</button>
				<button value={7} onClick={this.playSoundClick}>x</button>
				<button value={8} onClick={this.playSoundClick}>c</button>
				<button onClick={this.rep}><audio src='https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3' id="audioTest" />extrs</button>
				

			</div>	
		);
	}
}

export default Sound;