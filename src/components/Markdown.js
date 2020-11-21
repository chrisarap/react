import React from 'react';

let marked = require('marked');

marked.setOptions({
  breaks: true
});

class Markdown extends React.Component {
	constructor(props){
		super(props);	
		this.state = {
			markdown: text,
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
			markdown: e.target.value
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
					<Editor myClass={textClass} myProp={this.handleEditMax} markdown={this.state.markdown} onChange={this.handleChange} />
				</div>

				{/* viewer */}
				<div className={classes[1]}>
					<Viewer markdown={this.state.markdown} myClass={textClass} myProp={this.handleViewMax} markdown={this.state.markdown} />
				</div>
			</div>
		);
	}
}

const Editor = props => {
	return (
		<div className="editor">
			<Toolbar onClick={props.myProp} name="Editor"/>
				<textarea id='editor' className={props.myClass} value={props.markdown} onChange={props.onChange} />
		</div>
	);
}

const Viewer = props => {
  return (
  	<div>
		<Toolbar onClick={props.myProp} name="Editor"/>
	    <div
	      dangerouslySetInnerHTML={{
	        __html: marked(props.markdown)
	      }}
	      id='preview'
	    />
	</div>
  );
};

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
`# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:
  
Heres some code, \`<inline style>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`
  
You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

The coolest part is probably the toolbar, so go ahead and check that out. There are libraries out there that embed pre-coded toolbards like [SimpleMDE](https://simplemde.com/), but I decided to try to undertake the challenge myself, so this is definitely not perfect (some scrolling issues), but for the most part it works.

There's also [links](https://www.freecodecamp.com/no-stack-dub-sack), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | ------------- 
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With differnt indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. The tool bar keeps adding 1s.
1. But the list goes on...
- Even if you use dashes or asterisks.
* And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)

Well, that's it! Thanks for visiting my project. The code is in desperate need of a refactor, so maybe I will improve later and add additional functionality like syntax highlighting and fix some of the bugs. For this first round, I was just exploring these techniques and focusing on getting things working. 

Feel free to play around and leave some comments if you have any thoughts!
`


export default Markdown;