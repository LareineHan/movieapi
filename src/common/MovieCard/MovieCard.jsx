import './MovieCard.style.css';
import React from 'react';
import Badge from 'react-bootstrap/Badge';
import { useNavigate } from 'react-router-dom';
import { useMovieGenreQuery } from '../../hooks/useMovieGenre';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckToSlot } from '@fortawesome/free-solid-svg-icons';
import { faFire } from '@fortawesome/free-solid-svg-icons';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
const MovieCard = ({ movie, index }) => {
	const genreData = useMovieGenreQuery().data;
	const navigate = useNavigate();
	const showGenre = (genreIdList) => {
		if (!genreData) return [];
		const genreNameList = genreIdList?.map((id) => {
			const genreObj = genreData.find((genre) => genre.id === id);
			return genreObj?.name;
		});
		return genreNameList;
	};
	////////////// my Original code /////////
	// const genreName_array = () => {
	//     let array = [];
	//     if (movie && genreData) {
	//         for (let i = 0; i < movie.genre_ids.length; i++) {
	//             for (let j = 0; j < genreData.length; j++) {
	//                 if (movie.genre_ids[i] === genreData[j].id) {
	//                     array.push(genreData[j].name);
	//                 }
	//             }
	//         }
	//         return array;
	//     }
	// }
	// const genreNames = genreName_array();

	const getMovieDetails = () => {
		console.log(movie.id, 'is clicked and navigated to movie detail');
		navigate(`/movies/${movie.id}`);
	};
	return (
		// eslint-disable-next-line
		<div
			className='movie-card'
			onClick={getMovieDetails}
			style={{
				backgroundImage:
					'url(' +
					`https://image.tmdb.org/t/p/w600_and_h900_bestv2${movie.poster_path}` +
					')',
			}}>
			<div className='overlay'>
				<h1 className='card-movie-title'>{movie.title}</h1>
				<hr className='title-hr' />

				{showGenre(movie.genre_ids)?.map((genre, index) => (
					<Badge bg='danger' key={index} className='genre-badge'>
						{genre}
					</Badge>
				))}
				{/* ////////original code//////// */}
				{/* {genreNames?.map((id) => {
                    return <Badge bg="danger" key={id} className='genre-badge'>{id}</Badge>
                })} */}

				<div className='detail'>
					<div className='vote'>
						{' '}
						<FontAwesomeIcon icon={faCheckToSlot} /> {movie.vote_average}
					</div>
					<div className='popular'>
						{' '}
						<FontAwesomeIcon icon={faFire} /> {movie.popularity}
					</div>
					<div className='adult'>{movie.adult ? 'NC-17' : 'PG'}</div>
				</div>
				<div className='user-reactions'>
					<div className='play-btn'>
						<FontAwesomeIcon icon={faCirclePlay} />
					</div>
					<div className='add-btn'>
						<FontAwesomeIcon icon={faPlus} />
					</div>
					<div className='like-btn'>
						<FontAwesomeIcon icon={faThumbsUp} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default MovieCard;
