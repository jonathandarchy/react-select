import React from 'react';
import Select, {Value} from 'react-select';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

const FLAVOURS = [
	{ label: 'Chocolate', value: 'chocolate' },
	{ label: 'Vanilla', value: 'vanilla' },
	{ label: 'Strawberry', value: 'strawberry' },
	{ label: 'Caramel', value: 'caramel' },
	{ label: 'Cookies and Cream', value: 'cookiescream' },
	{ label: 'Peppermint', value: 'peppermint' },
];

const SortableValue = SortableElement(Value);
const SortableSelect = SortableContainer(Select);

class MultiSelectSortableField extends React.Component{
	constructor(){
		super();
		this.state = {value: ['chocolate', 'vanilla', 'caramel']};}
	handleSelectChange(value){
		this.setState({ value });}
  onSortEnd({oldIndex, newIndex}){
    this.setState({
      value: arrayMove(this.state.value, oldIndex, newIndex),
    });
  };
	render(){
		const {value} = this.state;
		return (
			<div className="section">
				<h3 className="section-heading">{this.props.label}</h3>
				<SortableSelect
					multi
					onChange={(value) => this.handleSelectChange(value)}
					options={FLAVOURS}
					placeholder="Select your favourite(s)"
					value={value}
					valueComponent={SortableValue}
					onSortEnd={(sortState) => this.onSortEnd(sortState)}

          axis={'x'}
          lockAxis={'x'}
          lockToContainerEdges
				/>
			</div>
		);
	}
}
MultiSelectSortableField.displayName = 'MultiSelectSortableField';

module.exports = MultiSelectSortableField;