import React from 'react';

export default class ContactDetails extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
				isEdit: false,
				name: '',
				phone: ''
		};
		this.handleToggle = this.handleToggle.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
	}

	handleToggle() {
		// 예외처리라고 할 수 있다.
		// 아무것도 클릭 안했을때, edit버튼을 부를 경우
		if(!this.props.contact.name ) {
			return ;
		}
		if(!this.state.isEdit) {
			this.setState({
				name: this.props.contact.name,
				phone: this.props.contact.phone
			});
		} else {
			this.handleEdit();
		}

		// setState 메소드 비동기임!
		this.setState({
			isEdit: !this.state.isEdit
		});
		// 그래서 처음에 false가 보이는 것
		// 밑에처럼 검증하면 안됨
	}

	handleChange(e) {
		let nextState = {};
		nextState[e.target.name] = e.target.value;
		this.setState(nextState);
	}

	handleEdit() {
			this.props.onEdit(this.state.name, this.state.phone);
	}

	render() {
		const details = (
			<div>
				<p>{this.props.contact.name}</p>
				<p>{this.props.contact.phone}</p>
			</div>);

		const edit = (
			<div>
				<p>
					<input
						type="text"
						name="name"
						placeholder="name"
						value={this.state.name}
						onChange={this.handleChange}
					/>
				</p>
				<p>
					<input
						type="text"
						name="phone"
						placeholder="phone"
						value={this.state.phone}
						onChange={this.handleChange}
					/>
				</p>
			</div>
		);

		const view = this.state.isEdit ? edit : details;

		const black = (<div> not select </div>);


		return (
			<div>
				{this.props.isSelect ? view : black}
				<p>
					<button onClick={this.handleToggle}>
						{this.state.isEdit ? 'OK' : 'Edit'}
					</button>
					<button onClick={this.props.onRemove}>Remove</button>
				</p>
			</div>

		);
	}
}

ContactDetails.propTypes = {
	contact: React.PropTypes.object,
	onRemove: React.PropTypes.func,
	onEdit: React.PropTypes.func
};

ContactDetails.defaultProps = {
		contact : {
			name: '',
			phone: ''
		},

		onRemove : () => { console.error('onRemove not defined');},
		onEdit : () => {console.error('onEdit not defined');}
};
