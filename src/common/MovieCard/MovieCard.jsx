import './MovieCard.style.css';
import React from 'react';
import Badge from 'react-bootstrap/Badge';
import MovieCertification from '../MovieCertification/MovieCertification';
import { useNavigate } from 'react-router-dom';
import { useMovieGenreQuery } from '../../hooks/useMovieGenre';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullseye } from '@fortawesome/free-solid-svg-icons';
import { faFire } from '@fortawesome/free-solid-svg-icons';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { rating } from '../../constants/rating';
import { formatNumber } from '../../constants/formatNumber';
import { formatDuration } from '../../constants/formatDuration';
import default_poster_path from '../../images/default_poster_path.png';

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
	const vote_average = formatNumber(movie?.vote_average);
	const vote_count = formatNumber(movie?.vote_count);
	const vote_stars = rating(formatNumber(vote_average));
	const popularity = formatNumber(movie?.popularity);
	const poster_url =
		movie?.poster_path != null
			? `https://image.tmdb.org/t/p/w600_and_h900_bestv2${movie?.poster_path}`
			: default_poster_path;

	const getMovieDetails = () => {
		navigate(`/movies/${movie?.id}`);
	};

	return (
		// eslint-disable-next-line
		<div
			className='movie-card'
			onClick={getMovieDetails}
			style={{
				backgroundImage: 'url(' + `${poster_url}` + ')',
			}}>
			<div className='overlay'>
				<div className='movie-card-content'>
					<h1 className='card-movie-title'>{movie?.title}</h1>
					<hr className='title-hr' />
					<div className='card-genre-badges'>
						{showGenre(movie?.genre_ids)?.map((genre, index) => (
							<Badge bg='danger' key={index} className='genre-badge'>
								{genre}
							</Badge>
						))}
					</div>

					<div className='movie-card-detail'>
						{/* <div>
						<MovieCertification movieId={movie.id} nationality={'US'} />
					</div> */}
						{/* is there any better way to render this? */}

						<div className='vote'>
							<div className='thumbs-up-votes'>
								<FontAwesomeIcon icon={faThumbsUp} />
								&nbsp;{vote_count} votes
							</div>
							<div className='stars'>{vote_stars}&nbsp;stars</div>
							<div className='bullseye'>
								<FontAwesomeIcon icon={faBullseye} />
								&nbsp;{vote_average}&nbsp;scored
							</div>
							<div className='popular'>
								<FontAwesomeIcon icon={faFire} />
								&nbsp;Popularity: {popularity}
							</div>
						</div>
					</div>
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
