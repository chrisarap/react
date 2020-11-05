import React from 'react';

class Markdown extends React.Component {
	constructor(props){
		super(props);	
		this.state = {
			input: text,

			editMax: false,
			editHide: false,

			viewMax: false,
			viewHide: false
			

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

	// editor
	handleEditMax(){
		this.setState(state => {
			return !state.editMax 
			? {
				editMax: true,
				editHide: false,
				viewMax: false,
				viewHide: true
			} 
			: {
				editMax: false,
				editHide: false,
				viewMax: false,
				viewHide: false
			};
		});
	}

	// viewer
	handleViewMax(){
		this.setState(state => {
			return !state.viewMax 
			? {
				editMax: false,
				editHide: true,
				viewMax: true,
				viewHide: false
			} 
			: {
				editMax: false,
				editHide: false,
				viewMax: false,
				viewHide: false
			};
		});
	}

	render(){
		const classes = this.state.editMax ? ["editMax", "viewHide"] 
		: this.state.viewMax ? ["editHide", "viewMax"]
		: ["editMin", "viewMin"];

		const textClass = (this.state.editMax || this.state.viewMax) ? "maxText" : "minText";
		return (
			<div className="Markdown">
				{/* editor */}
				<div className={classes[0]}>
					<Editor myClass={textClass} myProp={this.handleEditMax} input={this.state.input} onChange={this.handleChange} />
				</div>

				{/* viewer */}
				<div className={classes[1]}>				
					<Viewer myClass={textClass} myProp={this.handleViewMax} input={this.state.input} />
				</div>
			</div>
		);
	}
}

const Editor = props => {
	return (
		<div className="editor">
			<Toolbar onClick={props.myProp} name="Editor"/>
				<textarea className={props.myClass} value={props.input} onChange={props.onChange} />
		</div>
	);
}

const Viewer = props => {
	return (
		<div>
			<Toolbar onClick={props.myProp} name="Viewer"/>
			<textarea className={props.myClass} value={props.input} disabled />
		</div>
	);
}

const Toolbar = props => {
	return (
		<div className="Toolbar">
			<div className="startToolbar">			
				<i class="fas fa-fire">{props.name}</i>				
			</div>
			<i class="fas fa-square" onClick={props.onClick}></i>
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