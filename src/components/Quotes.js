import React from 'react';

class Quotes extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			randomNumber: Math.floor(Math.random() * 10)
		}
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(){
		this.setState({
			randomNumber: Math.floor(Math.random() * 10)
		});
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
			<div>
				<div className="box">
					<h1><span>"</span>{quote}</h1>
					<p>-{person}</p>
					<div className="buttons">
							<div className="media">
								<a href="#" target="_blank">facebook</a>
								<a href="#" target="_blank">youtube</a>
							</div>
						<button onClick={this.handleClick}>New quote</button>
					</div>
				</div>
				<p className="autor">by Chris</p>
				<script src="https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js"></script>
			</div>

		);
	}
}

export default Quotes;