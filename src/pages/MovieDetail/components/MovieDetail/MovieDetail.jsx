import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Col, Row, Container, Badge } from 'react-bootstrap';
import ModalTrigger from '../../../../common/ModalTrigger/ModalTrigger';
import MovieCertification from '../../../../common/MovieCertification/MovieCertification';
import { rating } from '../../../../constants/rating';
import { formatNumber } from '../../../../constants/formatNumber';
import { formatDuration } from '../../../../constants/formatDuration';
import './MovieDetail.style.css';

const MovieDetail = () => {
	const detail = useSelector((state) => state.movieDetail);
	const id = detail?.movieDetail?.id;
	const movieInfo = detail?.movieDetail;
	const genres = movieInfo?.genres?.map((genre) => genre?.name);

	const production_country = movieInfo?.production_countries[0]?.name;
	const country_code =
		movieInfo?.production_countries[0]?.iso_3166_1?.toLowerCase();
	const nationality = movieInfo?.production_countries[0]?.iso_3166_1;
	const spoken_languages = movieInfo?.spoken_languages
		?.map((language) => language?.english_name)
		.join(', ');
	const budget = formatNumber(movieInfo?.budget);
	const popularity = formatNumber(movieInfo?.popularity);
	const vote_average = rating(formatNumber(movieInfo?.vote_average));
	const revenue = formatNumber(movieInfo?.revenue);
	const runtime = formatDuration(movieInfo?.runtime);
	const productions = movieInfo?.production_companies
		.map((company) => company?.name)
		.join(', ');

	return (
		<>
			{movieInfo ? (
				<div className='detail-full-div'>
					<Container
						fluid
						style={{
							backgroundImage:
								'url(' +
								`https://www.themoviedb.org/t/p/original${movieInfo?.backdrop_path}` +
								')',
						}}
						className='detail-backdrop'>
						<Row className='detail-movie-info'>
							<Col sm>
								<h1 className='detail-movie-title'>{movieInfo?.title}</h1>
								<Row>
									<div className='detail-movie-genres'>
										{genres?.map((id) => {
											return (
												<Badge bg='danger' key={id} className='genre-badge'>
													{id}
												</Badge>
											);
										})}
									</div>
								</Row>
								<hr />

								<Row>
									<div className='detail-movie-runtime'>{runtime}</div>
									<div>
										<MovieCertification
											movieId={id}
											nationality={nationality}
										/>
									</div>
								</Row>
								<br />

								<div className='detail-extra-items'>
									<Row>
										<div className='detail-movie-extra rating'>
											Rating&nbsp;| &nbsp;{vote_average}
										</div>
									</Row>
									<Row>
										<div className='detail-movie-extra popularity'>
											Popularity&nbsp;|&nbsp;{popularity}
										</div>
									</Row>
									<Row>
										<div className='detail-movie-extra budget'>
											Budget&nbsp;|&nbsp;{budget} ($)
										</div>
									</Row>
									<Row>
										<div className='detail-movie-extra revenue'>
											Revenue&nbsp;|&nbsp;{revenue} ($)
										</div>
									</Row>
									<Row>
										<div className='detail-movie-extra spoken-languages'>
											Spoken Languages&nbsp;|&nbsp;{spoken_languages}
										</div>
									</Row>
									<Row className='d-flex align-items-center'>
										<div className='detail-movie-extra production-country'>
											Production Country&nbsp;|&nbsp;
											<>
												&nbsp;
												<img
													src={`https://flagcdn.com/16x12/${country_code}.png`}
													alt=''
												/>
												&nbsp;
											</>
											&nbsp;{production_country}
										</div>
									</Row>
									<br />
									<Row>
										<div className='detail-movie-extra productions'>
											Production Companies&nbsp;|&nbsp;{productions}
										</div>
									</Row>
								</div>
							</Col>

							<Col sm className='detail-extra'>
								<Row sm>
									<h3 className='detail-movie-tagline'>
										{movieInfo?.tagline ? `"${movieInfo?.tagline}"` : null}
									</h3>
								</Row>
								{movieInfo?.tagline && <br />}
								<Row sm>
									<p className='detail-movie-overview'>{movieInfo?.overview}</p>
								</Row>
								<br />

								<Row sm>
									<Col>
										<ModalTrigger movieId={id} />
									</Col>
								</Row>
							</Col>
						</Row>
					</Container>
				</div>
			) : null}
		</>
	);
};

export default MovieDetail;
