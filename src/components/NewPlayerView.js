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
		this.props.updateName(this.state.value);
	}
  render() {
    return (
      <div>
      	<form onSubmit={this.handleSubmit}>
      		<label>
      			Name:
      			<input type="text" value={this.state.value} onChange={this.handleChange} />
      		</label>
      		<input type="submit" value="Submit"/>
      	</form>
      </div>
    );
  }
}
export default NewPlayerView;