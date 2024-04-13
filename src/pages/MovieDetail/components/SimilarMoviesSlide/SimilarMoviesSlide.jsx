import React from 'react';
import { useSimilarMoviesQuery } from '../../../../hooks/useSimilarMovies';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import MovieSlider from '../../../../common/MovieSlider/MovieSlider';
import './SimilarMoviesSlide.style.css';
import { responsive } from '../../../../constants/responsive';

const SimilarMoviesSlide = ({ movieId }) => {
	const { data, isLoading, isError, error } = useSimilarMoviesQuery({
		movieId,
	});
	console.log('movieId ? ', movieId);
	console.log('ㅇㅇ', data);

	if (isLoading) {
		return (
			<h1>
				{' '}
				<div className='spinner-area'>
					<Spinner
						animation='border'
						variant='danger'
						style={{ width: '5rem', height: '5rem', margin: 'auto' }}
					/>
				</div>
				;
			</h1>
		);
	}
	if (isError) {
		return <Alert variant='warning'>Error: {error.message}</Alert>;
	}
	return (
		<>
			{data?.results.length === 0 ? null : (
				<MovieSlider
					title='Similar Movies'
					movies={data?.results}
					responsive={responsive}
				/>
			)}
		</>
	);
};

export default SimilarMoviesSlide;
