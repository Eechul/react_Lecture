import React from 'react';

export default class ContactCreate extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			phone: "",
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	handleChange(e) {
		let nextState = {};
		nextState[e.target.name] = e.target.value;
		this.setState(nextState);
	}

	handleClick() {
		const contact = {
			name: this.state.name,
			phone: this.state.phone
		};

		this.props.onCreate(contact);

		this.setState({
			name: "",
			phone: ""
		});
	}

	render() {
		return (
			<div>
					<h2> Create Contact </h2>
					<p>
						<input
							type="text"
							name="name"
							placeholder="name"
							value={this.state.name}
							onChange={this.handleChange}
							/>
						<input
							type="text"
							name="phone"
							placeholder="phone"
							value={this.state.phone}
							onChange={this.handleChange}
							/>
						</p>
						<button onClick={this.handleClick}>Create</button>
			</div>
		);
	}
}

// 타입 정하는 습관을 들이면 좋다.
ContactCreate.propTypes = {
		onCreate : React.PropTypes.func
};

// 꼭 해줘야지만 다른 컴포넌트에서 메소드나 state를 받을 수 있다.
ContactCreate.defaultProps = {
		onCreate: ()=> {console.error('onCreate not defined'); }
};
