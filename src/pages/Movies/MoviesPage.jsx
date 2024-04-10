import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import './MoviesPage.style.css';
import { useSearchMovieQuery } from '../../hooks/useSearchMovie';
import { Container, Col, Row, Button, Spinner, Alert } from 'react-bootstrap';
import MovieCard from '../../common/MovieCard/MovieCard';
import ReactPaginate from 'react-paginate';
import FilteredMovies from './components/FilteredMovies';
import GenreFilter from './components/Filters/GenreFilter/GenreFilter';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFilter } from '../../redux/reducers/filterGenreSlice';

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
	const dispatch = useDispatch();
	const [filterCategory, setFilterCategory] = useState(null);
	const filterValue = useSelector((state) => state.genre.genreId);
	const isFilter = useSelector((state) => state.genre.isFilter);
	const genreName = useSelector((state) => state.genre.genreName);
	console.log(genreName, 'genreName');
	useEffect(() => {
		if (isFilter) {
			// 👇 장르필터 버튼 클릭시 (true일때) 아래 로직 실행
			if (!keyword) {
				setPage(1);
				setFilterCategory('with_genres');
			}

			// 👇 필터버튼 안눌렀을때 (false일때) 기본 실행값
			// 또는 필터가 눌렸다가 해제됐을때 (null일때) 기본 실행값
		} else {
			if (!keyword) {
				console.log('MoviePage default without search');
				navigate(`/movies?page=${page}`); //✅ 그런데 페이지가 안바뀜.. 왜지?
			} else {
				console.log('MoviePage with keyword search!', keyword);
				navigate(`/movies?q=${keyword}&page=${page}`); //✅
			}
		} // eslint-disable-next-line
	}, [isFilter, keyword, filterCategory, filterValue, page]);

	const handlePageClick = ({ selected }) => {
		setPage(selected + 1);
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};
	const handleAllMoviesClick = () => {
		dispatch(toggleFilter(null));
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
						{isFilter ? (
							<Row>
								<div className='filter-results-of'>Genre: {genreName}</div>
							</Row>
						) : (
							<Row>
								<div className='filter-results-of'>All Movies</div>
							</Row>
						)}
						{keyword ? (
							<>
								<Row>
									<div className='search-results-of'>Searched: {keyword}</div>
								</Row>
							</>
						) : null}
						<Row>
							<GenreFilter />
						</Row>
						<Row>
							{keyword || isFilter ? (
								<>
									<Button
										className='all-movie-btn'
										onClick={handleAllMoviesClick}>
										All Movies
									</Button>
								</>
							) : null}
						</Row>
					</div>
				</Col>

				<Col lg={8} xs={12}>
					<Row className='movie-cards-container-row'>
						{isFilter ? (
							<FilteredMovies
								filterCategory={filterCategory}
								filterValue={filterValue}
								// keyword={keyword}
							/>
						) : (
							data?.results.map((movie, index) => (
								<Col key={index} lg={4} xs={12}>
									<MovieCard movie={movie} />
								</Col>
							))
						)}
					</Row>
					{!isFilter && (
						<ReactPaginate
							lg={12}
							nextLabel='>'
							onPageChange={handlePageClick}
							pageRangeDisplayed={3}
							marginPagesDisplayed={3}
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
					)}
				</Col>
			</Row>
		</Container>
	);
};

export default MoviePage;
