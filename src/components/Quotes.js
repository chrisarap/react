import React from 'react';

const colors = [
	'green',
	'blue',
	'grey',
	'red',
	'darkgreen',
	'brown',
	'black',
	'orange',
	'lighglue',
	'darkred',
	'#16a085',
	'#27ae60',
	'#2c3e50',
	'#f39c12',
	'#e74c3c',
	'#9b59b6',
	'#FB6964',
	'#342224',
	'#472E32',
	'#BDBB99',
	'#77B1A9',
	'#73A857'
];

class Quotes extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			randomNumber: Math.floor(Math.random() * 10),
			randomColor: 0
		}
		this.handleClick = this.handleClick.bind(this);
		this.handleColor = this.handleColor.bind(this);
	}

	handleClick(){
		this.setState({
			randomNumber: Math.floor(Math.random() * 10)
		});
		this.handleColor();
	}

	handleColor(){
		this.setState({
			randomColor: Math.floor(Math.random() * colors.length)
		})
	}

	render(){

		const quotes = [
			["Spread love everywhere you go. Let no one ever come to you without leaving happier.", "Mother Teresa"],
			["When you reach the end of your rope, tie a knot in it and hang on.", "Franklin D. Roosevelt"],
			["Always remember that you are absolutely unique. Just like everyone else." , "Margaret Mead"],
			["Don't judge each day by the harvest you reap but by the seeds that you plant.", "Robert Louis Stevenson"],
			["The future belongs to those who believe in the beauty of their dreams.", "Eleanor Roosevelt"],
			["Tell me and I forget. Teach me and I remember. Involve me and I learn.", "Benjamin Franklin"],
			["The best and most beautiful things in the world cannot be seen or even touched - they must be felt with the heart.", "Helen Keller"],
			["It is during our darkest moments that we must focus to see the light.", "Aristotle"],
			["Whoever is happy will make others happy too.", "Anne Frank"],
			["Do not go where the path may lead, go instead where there is no path and leave a trail.", "Ralph Waldo Emerson"]
		];

		let quote = quotes[this.state.randomNumber][0];
		let person = quotes[this.state.randomNumber][1];
		return (
			<div style={{
				'background': colors[this.state.randomColor],
				'width': '100vw',
				'height': '100vh',
				'padding-top': '100px',
				'display': 'flex',
				'flex-direction': 'column',
				'justify-content': 'center',
				'align-items': 'center'
			}}>
				<div id='quote-box'>
					<div className="box">
						<h1 style={{'color': colors[this.state.randomColor]}} id='text'><span>"</span>{quote}</h1>
						<p style={{'color': colors[this.state.randomColor]}} id='author'>-{person}</p>
						<div className="buttons">
								<div className="media">
									<a style={{'background': colors[this.state.randomColor]}} id='tweet-quote' href="twitter.com/intent/tweet" target="_blank">tweet</a>
									<a style={{'background': colors[this.state.randomColor]}} href="#" target="_blank">youtube</a>
								</div>
							<button style={{'background': colors[this.state.randomColor]}} id='new-quote' onClick={this.handleClick}>New quote</button>
						</div>
					</div>
					<p className="autor">by Chris</p>
					<script src="https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js"></script>
				</div>
			</div>

		);
	}
}

export default Quotes;