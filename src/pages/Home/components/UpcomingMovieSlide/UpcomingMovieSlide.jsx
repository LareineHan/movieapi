import React from 'react';
import { useUpcomingMoviesQuery } from '../../../../hooks/useUpcomingMovies';
import Alert from 'react-bootstrap/Alert';
import MovieSlider from '../../../../common/MovieSlider/MovieSlider';
import { responsive } from '../../../../constants/responsive';

const UpcomingMovieSlide = () => {
	const { data, isLoading, isError, error } = useUpcomingMoviesQuery();
	console.log('TopRatedMovie', data);

	if (isLoading) {
		console.log('loading?');
		return <h1>Loading...</h1>;
	}
	if (isError) {
		console.log('error?');
		return <Alert variant='danger'>Error: {error.message}</Alert>;
	}
	return (
		<div>
			<MovieSlider
				title='Upcoming Movies'
				movies={data?.results}
				responsive={responsive}
			/>
		</div>
	);
};

export default UpcomingMovieSlide;
