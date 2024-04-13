import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './MovieRecommendation.style.css';
import MovieSlider from '../../../../common/MovieSlider/MovieSlider';
import PopularMovieSlide from '../../../Home/components/PopularMovieSlide/PopularMovieSlide';

const MovieRecommendation = () => {
	const data = useSelector(
		(state) => state.movieRecommendations?.movieRecommendations
	);

	console.log('RECOMM data received', data);

	useEffect(() => {
		console.log('RECOMM data useEffect? ', data);
	}, [data]);

	return (
		<>
			{data?.results.length === 0 ? (
				<>
					<PopularMovieSlide />
				</>
			) : (
				<>
					{!data ? (
						<h1>Loading Related Movies...</h1>
					) : (
						<MovieSlider title='Movie Recommendation' movies={data?.results} />
					)}
				</>
			)}
		</>
	);
};

export default MovieRecommendation;
