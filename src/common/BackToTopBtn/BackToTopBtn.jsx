import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp } from '@fortawesome/free-solid-svg-icons';
import './BackToTopBtn.style.css';

const BackToTopButton = () => {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const toggleVisibility = () => {
			if (window.scrollY > 250) {
				// if i want to show the button after scrolling down
				setVisible(true);
			} else {
				setVisible(false);
			}
			console.log('BackToTopButton - toggleVisibility', visible);
		};

		window.addEventListener('scroll', toggleVisibility);

		console.log('BackToTopButton - useEffect', visible);

		return () => {
			window.removeEventListener('scroll', toggleVisibility);
			console.log('BackToTopButton - cleanup', visible);
		};
	}, []);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	console.log('BackToTopButton - render', visible);

	return (
		<Button
			type='button'
			id='btn-back-to-top'
			className={`back-to-top ${
				visible ? 'show' : 'hide'
			} btn-floating btn-danger btn-lg`}
			onClick={scrollToTop}>
			<FontAwesomeIcon icon={faCaretUp} />
		</Button>
	);
};

export default BackToTopButton;
