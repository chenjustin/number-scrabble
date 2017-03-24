import React from 'react';
 
class NewPlayerView extends React.Component {
	constructor(props){
		super(props);
		this.state = {value: ''};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e){
		this.setState({value: e.target.value});
		console.log(this.state);
	}

	handleSubmit(e){
		e.preventDefault();
		if(this.state.value.length > 0){
			this.props.updateName(this.state.value);
		}
	}
  render() {
    return (
      <div className={"view-container"}>
      	<form onSubmit={this.handleSubmit}>
    			<input type="text" value={this.state.value} id={"newUserInput"} onChange={this.handleChange} placeholder={"Enter your name to begin"}/>
      		<input type="submit" value=">" id={"newUserButton"}/>
      	</form>
      </div>
    );
  }
}
export default NewPlayerView;