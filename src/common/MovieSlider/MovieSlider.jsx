import React from 'react';
import './MovieSlider.style.css';
import Carousel from 'react-multi-carousel';
import Container from 'react-bootstrap/Container';
import 'react-multi-carousel/lib/styles.css';
import MovieCard from '../MovieCard/MovieCard';
import { responsive } from '../../constants/responsive';

const MovieSlider = ({ title, movies }) => {
	return (
		<div>
			<h3 className='title'>{title}</h3>
			<hr />
			<Carousel
				infinite={true}
				centerMode
				itemClass='movie-slider p1'
				containerClass='carousel-container'
				responsive={responsive}
				keyBoardControl={true}
				emulateTouch={true}
				removeArrowOnDeviceType={['tablet', 'mobile']}
				slidesToSlide={1}>
				{movies?.map((movie, index) => (
					<MovieCard key={index} movie={movie} />
				))}
			</Carousel>
		</div>
	);
};

export default MovieSlider;
