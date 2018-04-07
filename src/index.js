import React from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';

const Card = (props) => {return(
<div>
<img width ="75" src={props.avatar_url}/>
<div style = {{display : 'inline-block', marginLeft: '10px'}}>
<div className="name">{props.login}</div>
</div>
</div>
);};

let data = [{name:"adityachouhan",company:"ACCorps",git_img:"https://avatars1.githubusercontent.com/u/8532345?v=4"},{name:"sunilkumar",company:"SLCorps",git_img:"https://avatars1.githubusercontent.com/u/8532345?v=4"},];

const Cardlist = (props) => {
	return (
	
	<div>
	
	{props.cards.map(card => <Card {...card}/>)}
	</div>
	);
};

class Form extends React.Component{
	
	constructor(props) {
    super(props);
    this.state = {userName : '',
    };
  }
	handleSubmit = (event) => {
		event.preventDefault();
		//console.log("Event : From Submit",this.state.userName);
		axios.get('https://api.github.com/users/' + this.state.userName).then(resp => {this.props.onSubmit(resp.data)});
	};
	render(){
		return(
		<form onSubmit={this.handleSubmit}>
		<input 
		//ref ={(input) => this.userNameInput = input}
		value={this.state.userName}
		onChange={(event) =>this.setState({userName : event.target.value})}
		type="text" placeholder="input id" required/>
		<button type ="submit">Submit</button>
		</form>);
	}
}
class App extends React.Component{
	state = {
		cards : []
	};
	
	addNewCard = (cardInfo) => {
		this.setState(prevState =>({cards : prevState.cards.concat(cardInfo)}));
		console.log(cardInfo);
	};
	render(){
		return(
		<div>
		<Form onSubmit={this.addNewCard} />
		<Cardlist cards={this.state.cards} /></div>);
	}
}


ReactDom.render(
  <App />,
  document.getElementById('root')
);
