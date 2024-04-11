import React from 'react';
import './MovieCertification.style.css';
import { useMovieCertificationQuery } from '../../hooks/useMovieCertification';

const MovieCertification = ({ movieId, nationality }) => {
	const { data, isLoading, isError, error } = useMovieCertificationQuery({
		movieId,
		nationality,
	});

	if (isLoading) {
		return <div>Loading...</div>;
	}
	if (isError) {
		return <div>Error: {error.message}</div>;
	}
	console.log('MovieCertification data id: ', movieId, 'data', data);
	return (
		<>
			<p className='film-rating'>
				Film Rating &nbsp; <span className='film-rating-data'>{data}</span>
			</p>
		</>
	);
};

export default MovieCertification;
