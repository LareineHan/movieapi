import React, { useState, useEffect } from 'react';
import './MovieDetailPage.style.css';
import MovieDetail from './components/MovieDetail/MovieDetail';
import ReviewSheet from './components/ReviewSheet/ReviewSheet';
import { Container, Row, Col } from 'react-bootstrap';
import MovieRecommendation from './components/MovieRecommendation/MovieRecommendation';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import MovieImages from './components/MovieImages/MovieImages';
import { fetchMovieImages } from '../../redux/reducers/movieImagesSlice';
import RelatedPeople from './components/RelatedPeople/RelatedPeople';
import { fetchMovieDetail } from '../../redux/reducers/movieDetailSlice';
import { fetchRelatedPeople } from '../../redux/reducers/relatedPeopleSlice';
import { fetchMovieReviews } from '../../redux/reducers/movieReviewsSlice';
import { fetchMovieRecommendations } from '../../redux/reducers/movieRecommendationsSlice';

const MovieDetailPage = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const fetchingProcess = (id) => {
		dispatch(fetchMovieDetail(id));
		dispatch(fetchMovieImages(id));
		dispatch(fetchMovieReviews(id));
		dispatch(fetchMovieRecommendations(id));
		dispatch(fetchRelatedPeople(id));
	};

	useEffect(() => {
		const goFetch = async (id) => {
			try {
				await fetchingProcess(id);
				console.log('MovieDetailPage fetchingProcess: ', id);
			} catch (error) {
				console.log('MovieDetailPage fetchingProcess error: ', error);
			}
		};

		if (id) {
			goFetch(id);
		}

		return () => {
			// Cleanup to prevent unnecessary re-fetching
		}; //eslint-disable-next-line
	}, [id, dispatch]);

	console.log('MovieDetailPage id: ', id);

	return (
		<Container fluid className='movie-detail-coverage'>
			<MovieDetail />
			<MovieImages />
			<RelatedPeople />
			<ReviewSheet />
			<MovieRecommendation />
		</Container>
	);
};

export default MovieDetailPage;
