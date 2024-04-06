import React from 'react';
import Banner from './components/Banner/Banner';
import PopularMovieSlide from './components/PopularMovieSlide/PopularMovieSlide';
import TopRatedMovieSlide from './components/TopRatedMovieSlide/TopRatedMovieSlide';
import UpcomingMovieSlide from './components/UpcomingMovieSlide/UpcomingMovieSlide';

const Homepage = () => {
	return (
		<div>
			Home page
			<Banner />
			<PopularMovieSlide />
			<TopRatedMovieSlide />
			<UpcomingMovieSlide />
		</div>
	);
};

export default Homepage;
