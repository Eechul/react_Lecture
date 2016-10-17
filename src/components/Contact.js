import React from 'react';
import ContactInfo from './ContactInfo';
import ContactDetails from './ContactDetails';
import ContactCreate from './ContactCreate';
import update from 'react-addons-update';

export default class Contact extends React.Component {
	constructor(props) {
		// 주의할점 => constructor가 수정되었다면 '새로고침'을 꼭 해주어야 한다.
		super(props);
		this.state = {
			selectedkey: -1,
			keyword: '',
			contactData: [{
				name: 'Abet',
				phone: '010-0000-0001'
			}, {
				name: 'Betty',
				phone: '010-0000-0002'
			}, {
				name: 'Dongchel',
				phone: '010-0000-0003s'
			}]
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);

		this.handleCreate = this.handleCreate.bind(this);
		this.handleRemove = this.handleRemove.bind(this);
		this.handleEdit = this.handleEdit.bind(this);

	}

	// 컴포넌트가 DOM 위에 생기기 전에 발생하는 메소드
	componentWillMount() {
		const contactData = localStorage.contactData;
		if(contactData) {
			this.setState({
				contactData: JSON.parse(contactData)
			});
		}
	}

	// 컴포넌트의 state가 업데이트 될때마다 발생되는 메소드
	componentDidUpdate(prevProps, prevState) {
		if(JSON.stringify(prevState.contactData) != JSON.stringify(this.state.contactData)) {
			localStorage.contactData = JSON.stringify(this.state.contactData);
		}
	}

	handleChange(e) { // e => 이벤트 객체
		this.setState({
			keyword: e.target.value
		});
	}

	handleClick(key) {
		this.setState({
			selectedkey : key
		});
		console.log(key, "yes");
	}

	handleCreate(contact) {
		this.setState({
			contactData: update(
				this.state.contactData,
				{
					$push: [contact]
				}
			)
		});
	}

	handleRemove() {
		if(this.state.selectedkey < 0 ) {
			return ;
		}
		this.setState({
			contactData: update(this.state.contactData,
				{ $splice: [[this.state.selectedkey, 1]] }
			),
			selectedkey: -1
		});
	}

	handleEdit(name, phone) {
		this.setState({
			contactData: update(this.state.contactData,
				{
					[this.state.selectedkey]: {
						name: { $set: name },
						phone: { $set: phone}
					}
				}
			)
		});
	}


	render() {
		const mapToComponents = (data) => {
			data.sort();
			data = data.filter(
				(contact) => {
					return contact.name.toLowerCase()
					.indexOf((this.state.keyword).toLowerCase()) > -1;
				});
			return data.map((contact, i) => {
				return (<ContactInfo
							contact={contact}
							key={i}
							onClick={()=>{this.handleClick(i);}}/>);
			});
		};

		const mapToComponents2 = (data) => {
			data.sort(
				(a,b) => {
					return a.name > b.name;
				});
			data = data.filter(
				(contact) => {
					return contact.name.toLowerCase()
					.indexOf((this.state.keyword).toLowerCase()) > -1;
				});
		};


		return (
			<div>
				<h1> Contacts </h1>
				<input
					name="keyword"
					placeholder="Search"
					value={this.state.keyword}
					onChange={this.handleChange}
				/>
				<div>{mapToComponents(this.state.contactData)}</div>

				<h1>Detail</h1>
				<ContactDetails
					isSelect={this.state.selectedkey != -1}
					contact={this.state.contactData[this.state.selectedkey]}
					onRemove={this.handleRemove}
					onEdit={this.handleEdit}
				/>
					<ContactCreate
						onCreate={this.handleCreate}/>
			</div>
		);
	}
}
