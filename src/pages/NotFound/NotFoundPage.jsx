import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import './NotFoundPage.style.css';

const NotFoundPage = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const timer = setTimeout(() => {
			navigate('/');
		}, 3000); // Redirect after 3 seconds

		return () => clearTimeout(timer); // Cleanup the timer on unmount
	}, [navigate]);

	return (
		<Container className='not-found'>
			<Row>
				<h1>Oops...!</h1>
				<h1>Page Doesn't Exist!</h1>
				<hr />
				<h1>Redirecting to Home Page</h1>
			</Row>
		</Container>
	);
};

export default NotFoundPage;
