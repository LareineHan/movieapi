import React, { useEffect } from 'react';
import { useState } from 'react';
import { useFilterMovieQuery } from '../../../hooks/filters/useFilterMovie';
import { Alert, Spinner, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import MovieCard from '../../../common/MovieCard/MovieCard';
import ReactPaginate from 'react-paginate';

const FilteredMovies = ({ filterCategory, filterValue, page, keyword }) => {
	const [currentPage, setCurrentPage] = useState(1);
	const navigate = useNavigate();
	const {
		data: filteredData,
		isLoading,
		isError,
		error,
	} = useFilterMovieQuery({
		filterCategory,
		filterValue,
		currentPage,
		keyword,
	});
	console.log(
		'filter component received data? ',
		'filteredData',
		filteredData,
		'filterCategory',
		filterCategory,
		'filterValue',
		filterValue
	);

	useEffect(() => {
		setCurrentPage(1);
	}, [filterValue, keyword]);

	useEffect(() => {
		if (filteredData?.results) {
			console.log('filteredData.results', filteredData?.results);
		} else if (!keyword) {
			navigate(`/movies?${filterCategory}=${filterValue}&page=${currentPage}`);
		} else {
			navigate(`/movies?${filterCategory}=${filterValue}&page=${currentPage}`);
		} // eslint-disable-next-line
	}, [currentPage, filterValue, keyword]);

	const handlePageClick = ({ selected }) => {
		setCurrentPage(selected + 1);
	};
	if (isLoading) {
		return (
			<div className='spinner-area'>
				<Spinner
					animation='border'
					variant='danger'
					style={{ width: '5rem', height: '5rem' }}
				/>
			</div>
		);
	}
	if (isError) {
		return <Alert variant='danger'>Error: {error.message}</Alert>;
	}

	return (
		<>
			{filteredData?.results?.map((movie, index) => (
				<Col key={index} lg={4} xs={6}>
					<MovieCard movie={movie} />
				</Col>
			))}
			<ReactPaginate
				lg={12}
				nextLabel='>'
				onPageChange={handlePageClick}
				pageRangeDisplayed={3}
				marginPagesDisplayed={3}
				pageCount={filteredData?.total_pages}
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
				forcePage={currentPage - 1}
			/>
		</>
	);
};

export default FilteredMovies;
