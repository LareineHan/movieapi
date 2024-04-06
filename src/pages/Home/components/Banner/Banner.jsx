import React from 'react';
import './Banner.style.css';
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies';
import { Alert } from 'react-bootstrap';

const Banner = () => {
	const { data, isLoading, isError, error } = usePopularMoviesQuery();
	console.log('ㅇㅇ', data);
	if (isLoading) return <div>Loading...</div>;
	if (isError) return <Alert variant='danger'>Error: {error.message}</Alert>;

	return (
		<div
			className='banner'
			style={{
				backgroundImage: `url('https://image.tmdb.org/t/p/original${data.results[0].backdrop_path}')`,
			}}>
			<div className='text-white banner-text-area'>
				<h1>{data?.results[0].title}</h1>
				<p>{data?.results[0].overview}</p>
			</div>
		</div>
	);
};

export default Banner;
