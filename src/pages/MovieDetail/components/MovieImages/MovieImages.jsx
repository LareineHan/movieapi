import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Button } from 'react-bootstrap';
import MovieImageBox from './MovieImageBox';
import './MovieImages.style.css';
import UpcomingMovieSlide from '../../../Home/components/UpcomingMovieSlide/UpcomingMovieSlide';

const MovieImages = () => {
	const movieImages = useSelector((state) => state.movieImages.movieImages);
	const posters = movieImages?.posters;
	const backdrops = movieImages?.backdrops;
	const logos = movieImages?.logos;
	const [select, setSelect] = useState('posters');

	console.log('MovieImages movieImages: ', movieImages);
	return (
		<>
			{posters?.length === 0 ? (
				<>
					<UpcomingMovieSlide />
				</>
			) : (
				<>
					<div className='title-choices'>
						<h3
							className={`media-title ${select === 'posters' ? 'active' : ''}`}
							onClick={() => setSelect('posters')}>
							Posters
						</h3>
						<h3
							className={`media-title ${
								select === 'backdrops' ? 'active' : ''
							}`}
							onClick={() => setSelect('backdrops')}>
							Backdrops
						</h3>
						<h3
							className={`media-title ${select === 'logos' ? 'active' : ''}`}
							onClick={() => setSelect('logos')}>
							Logos
						</h3>
					</div>
					<hr />
					{select === 'posters' ? (
						<MovieImageBox data={posters} name={'posters'} />
					) : select === 'backdrops' ? (
						<MovieImageBox data={backdrops} name={'backdrops'} />
					) : select === 'logos' ? (
						<MovieImageBox data={logos} name={'logos'} />
					) : null}
				</>
			)}
		</>
	);
};

export default MovieImages;
