import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import './MoviesPage.style.css';
import { useSearchMovieQuery } from '../../hooks/useSearchMovie';
import { Container, Col, Row, Button, Spinner, Alert } from 'react-bootstrap';
import MovieCard from '../../common/MovieCard/MovieCard';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';
import { useMovieDiscover } from '../../hooks/useMovieDiscover';
import FilterBox from './components/FilterBox';

const MoviesPage = () => {
	const [query, setQuery] = useSearchParams();
	const keyword = query.get('q');
	console.log('키워드', keyword);

	const [page, setPage] = useState(1);
	const navigate = useNavigate();

	const isDiscover = useSelector((state) => state.discover.isDiscover);
	const discoverParams = useSelector((state) => state.discover.discoverParams);
	const { data, isLoading, isError, error } = useSearchMovieQuery({
		keyword,
		page,
	});
	const { data: discoverData } = useMovieDiscover({ discoverParams, page });
	const [useBasicData, setUseBasicData] = useState(true);

	console.log(
		'여기무비페이지 키워드랑 데이타',
		keyword,
		data,
		'그리고 isDiscover? ',
		isDiscover,
		'무비디스커버파람스',
		discoverParams
	);

	useEffect(() => {
		if (isDiscover) {
			navigate(
				`/movies?discover=${discoverParams.sort_by}&${discoverParams.with_genres}&${discoverParams.year}&page=${page}`
			);
			if (!keyword) {
				// setPage(1);
				setUseBasicData(false);
			}
			console.log('유이 디스커버 1- 이즈디스커버 상태 업데이트', isDiscover);
		} else {
			if (!keyword) {
				setUseBasicData(true);
				navigate(`/movies?page=${page}`);
			} else {
				console.log('유이 디스커버 3- 이즈디스커버 상태 업데이트', isDiscover);
				navigate(`/movies?q=${keyword}&page=${page}`);
			}
		} // eslint-disable-next-line
	}, [discoverParams, isDiscover, keyword, page]);

	const handlePageClick = ({ selected }) => {
		setPage(selected + 1);
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	if (isLoading) {
		return (
			<div className='spinner-area'>
				<Spinner
					animation='border'
					variant='danger'
					style={{ width: '5rem', height: '5rem', margin: 'auto' }}
				/>
			</div>
		);
	}
	if (isError) {
		return (
			<Alert variant='danger' className='alert-area'>
				Error: {error.message}
			</Alert>
		);
	}
	return (
		<Container>
			<Row className='movie-row-container'>
				<>
					{keyword ? (
						<>
							<h4 className='keyword-show'>
								Searched : &nbsp;<span>{keyword}</span>
								<Button
									variant='link'
									style={{ fontSize: '14px', color: 'red' }}
									onClick={() => setQuery('q')}
									className='remove-keyword-btn'>
									Remove Keyword
								</Button>
							</h4>
						</>
					) : null}
				</>

				<Col
					lg={4}
					xs={12}
					className='filter-container'
					style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
					<FilterBox keyword={keyword} page={page} />
				</Col>
				<Col lg={8} xs={12} className='movies-grid'>
					{data?.results.length === 0 && (
						<Container className='no-found-box'>
							<h1 className='no-search-results'>no search result has found</h1>
						</Container>
					)}
					<Row className='movie-cards-container-row'>
						{useBasicData
							? data?.results.map((movie, index) => (
									<Col key={index} lg={4} xs={6}>
										<MovieCard movie={movie} />
									</Col>
							  ))
							: discoverData?.results.map((movie, index) => (
									<Col key={index} lg={4} xs={6}>
										<MovieCard movie={movie} />
									</Col>
							  ))}
					</Row>
					{((useBasicData && data?.results.length > 0) ||
						(!useBasicData && discoverData?.results.length > 0)) && (
						<ReactPaginate
							lg={12}
							nextLabel='>'
							onPageChange={handlePageClick}
							pageRangeDisplayed={3}
							marginPagesDisplayed={3}
							pageCount={
								useBasicData ? data?.total_pages : discoverData?.total_pages
							}
							previousLabel='<'
							pageClassName='page-item'
							pageLinkClassName='page-link'
							previousClassName='page-item'
							previousLinkClassName='page-link'
							nextClassName='page-item'
							nextLinkClassName='page-link'
							breakLabel='...'
							breakClassName='page-item'
							breakLinkClassName='page-link'
							containerClassName='pagination'
							activeClassName='active'
							renderOnZeroPageCount={null}
							forcePage={page - 1}
						/>
					)}
				</Col>
			</Row>
		</Container>
	);
};

export default MoviesPage;
