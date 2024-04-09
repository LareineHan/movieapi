import React from 'react';
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import MovieSlider from '../../../../common/MovieSlider/MovieSlider';
import './PopularMovieSlide.style.css';
import { responsive } from '../../../../constants/responsive';

const PopularMovieSlide = () => {
	const { data, isLoading, isError, error } = usePopularMoviesQuery();
	console.log('ㅇㅇ', data);

	if (isLoading) {
		console.log('loading?');
		return (
			<div className='spinner-area'>
				<Spinner
					animation='border'
					variant='danger'
					style={{ width: '5rem', height: '5rem', margin: 'auto' }}
				/>
			</div>
		);
	}
	if (isError) {
		return (
			<Alert variant='danger' className='alert-area'>
				Error: {error.message}
			</Alert>
		);
	}
	return (
		<div>
			<MovieSlider
				title='Popular Movies'
				movies={data.results}
				responsive={responsive}
			/>
		</div>
	);
};

export default PopularMovieSlide;
