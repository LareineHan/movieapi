import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import './MoviesPage.style.css';
import { useSearchMovieQuery } from '../../hooks/useSearchMovie';
import { Container, Col, Row, Button, Spinner, Alert } from 'react-bootstrap';
import MovieCard from '../../common/MovieCard/MovieCard';
import ReactPaginate from 'react-paginate';

const MoviePage = () => {
	// eslint-disable-next-line
	const [query, setQuery] = useSearchParams();
	const keyword = query.get('q');
	const [page, setPage] = useState(1);
	const navigate = useNavigate();
	const { data, isLoading, isError, error } = useSearchMovieQuery({
		keyword,
		page,
	});

	const handlePageClick = ({ selected }) => {
		setPage(selected + 1);
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};
	const handleAllMoviesClick = () => {
		navigate('/movies');
		setPage(1);
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
				<Col lg={4} xs={12}>
					<div className='filters-container'>
						{keyword ? (
							<>
								<Row>
									<div className='search-results-of'>Searched "{keyword}"</div>
								</Row>
							</>
						) : null}
						<Row>
							{keyword ? (
								<Button
									variant='danger'
									className='all-movie-btn'
									onClick={handleAllMoviesClick}>
									Remove Search
								</Button>
							) : null}
						</Row>
					</div>
				</Col>

				{data?.results.length > 0 ? (
					<Col lg={8} xs={12}>
						<Row className='movie-cards-container-row'>
							{data?.results.map((movie, index) => (
								<Col key={index} lg={4} xs={12}>
									<MovieCard movie={movie} />
								</Col>
							))}
						</Row>

						<ReactPaginate
							nextLabel='>'
							onPageChange={handlePageClick}
							pageRangeDisplayed={3}
							marginPagesDisplayed={2}
							pageCount={data?.total_pages}
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
					</Col>
				) : (
					<Col lg={8} xs={12} className='no-found-box'>
					<h2 className='no-search-results'>No Search Results Found</h2>
					</Col>
				)}
			</Row>
		</Container>
	);
};

export default MoviePage;
