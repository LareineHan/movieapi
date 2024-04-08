import React from 'react';
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies';
import Alert from 'react-bootstrap/Alert';
import MovieSlider from '../../../../common/MovieSlider/MovieSlider';
import './PopularMovieSlide.style.css';
import { responsive } from '../../../../constants/responsive';

const PopularMovieSlide = () => {
	const { data, isLoading, isError, error } = usePopularMoviesQuery();
	console.log('ㅇㅇ', data);

	if (isLoading) {
		console.log('loading?');
		return <h1>Loading...</h1>;
	}
	if (isError) {
		return <Alert variant='danger'>Error: {error.message}</Alert>;
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
