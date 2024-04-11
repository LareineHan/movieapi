import React from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import './MovieDetailPage.style.css';
const MovieDetailPage = () => {
	const { id } = useParams();
	return (
		<div className='movie-detail-page'>
			<h2>Detail for your requested movie ({id}) is coming soon!</h2>
			<h2>Diligently working on it.... 🤓</h2>
		</div>
	);
};

export default MovieDetailPage;
