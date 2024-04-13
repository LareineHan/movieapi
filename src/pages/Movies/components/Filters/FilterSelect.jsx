import React from 'react';
import { Form } from 'react-bootstrap';

// const FilterSelect = ({ label, options, selectedValue, onSelect }) => {
// 	console.log(options, label);
// 	return (
// 		<Form.Group>
// 			<Form.Label>{label}</Form.Label>
// 			<Form.Control
// 				as='select'
// 				value={selectedValue}
// 				onChange={(e) => onSelect(e.target.value)}>
// 				<option value=''>Select {label}</option>
// 				{options?.map((option) => (
// 					<option key={option.id} value={option.id}>
// 						{option.name}
// 					</option>
// 				))}
// 			</Form.Control>
// 		</Form.Group>
// 	);
// };

const MIN = 1900;
const MAX = 2024;

const FilterSelect = ({ label, options, selectedValue, onSelect }) => {
	return (
		<Form.Group>
			<Form.Label>{label}</Form.Label>
			<Form.Control
				as='select'
				value={selectedValue}
				onChange={(e) => onSelect(e.target.value)}>
				<option value=''>
					{label === 'Year' ? 'Filter by Year' : `Select ${label}`}
				</option>
				{label === 'Year' &&
					[...Array(MAX - MIN + 1)].map((_, index) => (
						<option key={index} value={MAX - index}>
							{MAX - index}
						</option>
					))}
				{options?.map((option) => (
					<option key={option.id} value={option.id}>
						{option.name}
					</option>
				))}
			</Form.Control>
		</Form.Group>
	);
};

export default FilterSelect;
