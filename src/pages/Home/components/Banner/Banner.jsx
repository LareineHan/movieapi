import React from 'react';
import './Banner.style.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { useMovieGenreQuery } from '../../../../hooks/useMovieGenre';
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies';
import {
	Col,
	Row,
	Container,
	Badge,
	Alert,
	Spinner,
	Button,
} from 'react-bootstrap';

const Banner = () => {
	const { data, isLoading, isError, error } = usePopularMoviesQuery();
	console.log('ㅇㅇ', data);
	const navigate = useNavigate();
	const bannerMovie = data?.results[0];
	const genreData = useMovieGenreQuery().data;
	const getDetail = () => {
		navigate(`/movies/${bannerMovie.id}`);
	};
	const genreName_array = () => {
		let array = [];
		if (data && genreData) {
			for (let i = 0; i < data?.results[0].genre_ids.length; i++) {
				for (let j = 0; j < genreData.length; j++) {
					if (data.results[0].genre_ids[i] === genreData[j].id) {
						array.push(genreData[j].name);
					}
				}
			}
			console.log('Array', array);
			return array;
			// return array.join(', ');
		}
	};
	const genreNames = genreName_array();
	if (isLoading) {
		<div className='spinner-area'>
			<Spinner
				animation='border'
				variant='danger'
				style={{ width: '5rem', height: '5rem', margin: 'auto' }}
			/>
		</div>;
	}
	if (isError) {
		<Alert variant='danger'>Error: {error.message}</Alert>;
	}
	return (
		<div className='banner-full-div'>
			<Container
				fluid
				style={{
					backgroundImage:
						'url(' +
						`https://www.themoviedb.org/t/p/original${bannerMovie?.backdrop_path}` +
						')',
				}}
				className='banner-backdrop'>
				<Row className='banner-movie-info'>
					<Col sm>
						<h1 className='banner-movie-title'>{bannerMovie?.title}</h1>
						<hr />
						<Row sm>
							<p className='banner-movie-overview'>{bannerMovie?.overview}</p>
						</Row>
						<Row sm>
							<div className='banner-movie-genres'>
								{genreNames?.map((id) => {
									return (
										<Badge bg='danger' key={id} className='genre-badge'>
											{id}
										</Badge>
									);
								})}
							</div>
						</Row>

						<br />
					</Col>

					<Col sm className='banner-extra'>
						<Row>
							<div className='detail-trigger'>
								<Button variant='danger' onClick={() => getDetail()}>
									See Detail &nbsp;
									<FontAwesomeIcon icon={faPlay} />
								</Button>
							</div>
						</Row>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default Banner;
