import React from 'react';
import createClass from 'create-react-class';
import PropTypes from 'prop-types';
import Select from 'react-select';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

const FLAVOURS = [
	{ label: 'Chocolate', value: 'chocolate' },
	{ label: 'Vanilla', value: 'vanilla' },
	{ label: 'Strawberry', value: 'strawberry' },
	{ label: 'Caramel', value: 'caramel' },
	{ label: 'Cookies and Cream', value: 'cookiescream' },
	{ label: 'Peppermint', value: 'peppermint' },
];


const MultiSelectSortableField = createClass({
	displayName: 'MultiSelectSortableField',
	propTypes: {
		label: PropTypes.string,
	},
	getInitialState () {
		return {
			disabled: false,
			crazy: false,
			stayOpen: false,
			value: [],
		};
	},
	handleSelectChange (value) {
		console.log('You\'ve selected:', value);
		this.setState({ value });
	},
	toggleCheckbox (e) {
		this.setState({
			[e.target.name]: e.target.checked,
		});
	},
	render () {
		const { disabled, stayOpen, value } = this.state;
		return (
			<div className="section">
				<h3 className="section-heading">{this.props.label}</h3>

        <SortableComponent />

				<Select
					closeOnSelect={!stayOpen}
					disabled={disabled}
					multi
					onChange={this.handleSelectChange}
					options={FLAVOURS}
					placeholder="Select your favourite(s)"
					simpleValue
					value={value}
				/>

				<div className="checkbox-list">
					<label className="checkbox">
						<input type="checkbox" className="checkbox-control" name="disabled" checked={disabled} onChange={this.toggleCheckbox} />
						<span className="checkbox-label">Disable the control</span>
					</label>
					<label className="checkbox">
						<input type="checkbox" className="checkbox-control" name="stayOpen" checked={stayOpen} onChange={this.toggleCheckbox}/>
						<span className="checkbox-label">Stay open when an Option is selected</span>
					</label>
				</div>
			</div>
		);
	}
});

module.exports = MultiSelectSortableField;

const SortableItem = SortableElement(({value}) => <li>{value}</li>);

const SortableList = SortableContainer(({items}) => {
  return (
    <ul>
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} />
      ))}
    </ul>
  );
});

class SortableComponent extends React.Component {
  constructor(){
    super();
    this.state = {
      items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'],
    };
  }
  onSortEnd({oldIndex, newIndex}){
    this.setState({
      items: arrayMove(this.state.items, oldIndex, newIndex),
    });
  };
  render() {
    return <SortableList items={this.state.items} onSortEnd={this.onSortEnd} />;
  }
}