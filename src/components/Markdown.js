import React from 'react';

class Markdown extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			input: text,
			editMax: false,
			viewMax: false
		};
		// connect buttons
		this.handleChange =  this.handleChange.bind(this);
		this.handleEditMax = this.handleEditMax.bind(this);
		this.handleViewMax = this.handleViewMax.bind(this);
	}	

	// get the event and edit the state
	handleChange(e){
		this.setState({
			input: e.target.value
		});
	}

	handleEditMax(){
		this.setState(state => {
			return state.editMax 
			? {editMax: false} 
			: {editMax: true};
		});
	}

	handleViewMax(){
		this.setState(state => {
			return state.viewMax 
			? {viewMax: false} 
			: {viewMax: true};
		});	
	}

	render(){
		const classes = this.state.editMax 
		? ["editMax", "viewMax"] 
		: ["editMin", "viewMin"];

		return (
			<div>
				{/* editor */}
				<div className={classes[0]}>
					<button >maximixar</button>
					<Editor myProp={this.handleEditMax} input={this.state.input} onChange={this.handleChange} />
				</div>

				{/* viewer */}
				<div className={classes[1]}>				
					<Viewer input={this.state.input} />
				</div>
			</div>
		);
	}
}

const Editor = props => {
	return (
		<div>
			<Toolbar onClick={props.myProp} name="Editor"/>
			<textarea value={props.input} onChange={props.onChange} />
		</div>
	);
}

const Viewer = props => {
	return (
		<div>
			<Toolbar name="Viewer"/>
			<textarea value={props.input} disabled />
		</div>
	);
}

const Toolbar = props => {
	return (
		<div className="Toolbar">
			<button onClick={props.onClick}>logo</button>
			<p>{props.name}</p>
			<button>cruz</button>
		</div>
	);
}

const text = 
`this is a **message**
and this is the second 
this is a **message**
and this is the second 
line
this is a **message**
and this is the second 
linethis is a **message**
and this is the second 
linethis is a **message**
and this is the second 
linethis is a **message**
and this is the second 
linethis is a **message**
and this is the second 
line`;

export default Markdown;