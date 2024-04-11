import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faEmptyStar } from '@fortawesome/free-regular-svg-icons';
import { faStarHalfStroke } from '@fortawesome/free-regular-svg-icons';
import { faStarHalf } from '@fortawesome/free-regular-svg-icons';

export const rating = (rating) => {
	if (rating === 10) {
		return (
			<>
				<FontAwesomeIcon icon={faStar} />
				<FontAwesomeIcon icon={faStar} />
				<FontAwesomeIcon icon={faStar} />
				<FontAwesomeIcon icon={faStar} />
				<FontAwesomeIcon icon={faStar} />
			</>
		);
	} else if (rating >= 9) {
		return (
			<>
				<FontAwesomeIcon icon={faStar} />
				<FontAwesomeIcon icon={faStar} />
				<FontAwesomeIcon icon={faStar} />
				<FontAwesomeIcon icon={faStar} />
				<FontAwesomeIcon icon={faStarHalfStroke} />
			</>
		);
	} else if (rating >= 8) {
		return (
			<>
				<FontAwesomeIcon icon={faStar} />
				<FontAwesomeIcon icon={faStar} />
				<FontAwesomeIcon icon={faStar} />
				<FontAwesomeIcon icon={faStar} />
				<FontAwesomeIcon icon={faEmptyStar} />
			</>
		);
	} else if (rating >= 7) {
		return (
			<>
				<FontAwesomeIcon icon={faStar} />
				<FontAwesomeIcon icon={faStar} />
				<FontAwesomeIcon icon={faStar} />
				<FontAwesomeIcon icon={faStarHalfStroke} />
				<FontAwesomeIcon icon={faEmptyStar} />
			</>
		);
	} else if (rating >= 6) {
		return (
			<>
				<FontAwesomeIcon icon={faStar} />
				<FontAwesomeIcon icon={faStar} />
				<FontAwesomeIcon icon={faStar} />
				<FontAwesomeIcon icon={faEmptyStar} />
				<FontAwesomeIcon icon={faEmptyStar} />
			</>
		);
	} else if (rating >= 5) {
		return (
			<>
				<FontAwesomeIcon icon={faStar} />
				<FontAwesomeIcon icon={faStar} />
				<FontAwesomeIcon icon={faStarHalfStroke} />
				<FontAwesomeIcon icon={faEmptyStar} />
				<FontAwesomeIcon icon={faEmptyStar} />
			</>
		);
	} else if (rating >= 4) {
		return (
			<>
				<FontAwesomeIcon icon={faStar} />
				<FontAwesomeIcon icon={faStar} />
				<FontAwesomeIcon icon={faEmptyStar} />
				<FontAwesomeIcon icon={faEmptyStar} />
				<FontAwesomeIcon icon={faEmptyStar} />
			</>
		);
	} else if (rating >= 3) {
		return (
			<>
				<FontAwesomeIcon icon={faStar} />
				<FontAwesomeIcon icon={faStarHalfStroke} />
				<FontAwesomeIcon icon={faEmptyStar} />
				<FontAwesomeIcon icon={faEmptyStar} />
				<FontAwesomeIcon icon={faEmptyStar} />
			</>
		);
	} else if (rating >= 2) {
		return (
			<>
				<FontAwesomeIcon icon={faStar} />
				<FontAwesomeIcon icon={faEmptyStar} />
				<FontAwesomeIcon icon={faEmptyStar} />
				<FontAwesomeIcon icon={faEmptyStar} />
				<FontAwesomeIcon icon={faEmptyStar} />
			</>
		);
	} else if (rating >= 1) {
		return (
			<>
				<FontAwesomeIcon icon={faStarHalfStroke} />
				<FontAwesomeIcon icon={faEmptyStar} />
				<FontAwesomeIcon icon={faEmptyStar} />
				<FontAwesomeIcon icon={faEmptyStar} />
				<FontAwesomeIcon icon={faEmptyStar} />
			</>
		);
	} else {
		return (
			<>
				<FontAwesomeIcon icon={faEmptyStar} />
			</>
		);
	}
};
