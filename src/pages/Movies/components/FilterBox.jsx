import React, { useState, useEffect } from 'react';
import { Container, Col, Row, Button } from 'react-bootstrap';
import FilterSelect from './Filters/FilterSelect';
import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import { useMovieGenreQuery } from '../../../hooks/useMovieGenre';
import {
	addDiscoverParams,
	toggleDiscover,
} from '../../../redux/reducers/movieDiscoverSlice';
import './FilterBox.style.css';
const FilterBox = ({ keyword, page }) => {
	const dispatch = useDispatch();
	const [discoverParams, setDiscoverParams] = useState({
		sort_by: '',
		with_genres: '',
		year: '',
	});

	const { data: genres } = useMovieGenreQuery();
	// const isDiscover = useSelector((state) => state.discover.isDiscover);

	useEffect(() => {
		if (
			(discoverParams.sort_by ||
				discoverParams.with_genres ||
				discoverParams.year) !== ''
		) {
			dispatch(addDiscoverParams(discoverParams));
			dispatch(toggleDiscover(true));
		} else {
			dispatch(toggleDiscover(false));
		} // eslint-disable-next-line
	}, [discoverParams]);

	const handleSortSelect = (value) => {
		setDiscoverParams({ ...discoverParams, sort_by: value });
	};

	const handleGenreSelect = (value) => {
		setDiscoverParams({ ...discoverParams, with_genres: value });
	};

	const handleYearSelect = (value) => {
		setDiscoverParams({ ...discoverParams, year: value });
	};

	const resetFilters = () => {
		dispatch(toggleDiscover(false));
		dispatch(
			addDiscoverParams({
				sort_by: '',
				with_genres: '',
				year: '',
			})
		);
		setDiscoverParams({
			sort_by: '',
			with_genres: '',
			year: '',
		});
	};
	return (
		<Container>
			<Row>
				<Col className='filter-box'>
					<Row className='filter-sort-by'>
						<div className='filter-results-of'>
							<FilterSelect
								label='Sort By'
								options={[
									{ id: 'popularity.desc', name: 'Popularity Descending' },
									{ id: 'popularity.asc', name: 'Popularity Ascending' },
									{ id: 'revenue.desc', name: 'Revenue Descending' },
									{ id: 'revenue.asc', name: 'Revenue Ascending' },
									{
										id: 'primary_release_date.desc',
										name: 'Release Date Descending',
									},
									{
										id: 'primary_release_date.asc',
										name: 'Release Date Ascending',
									},
									{ id: 'vote_average.desc', name: 'Rating Descending' },
									{ id: 'vote_average.asc', name: 'Rating Ascending' },
									{ id: 'vote_count.desc', name: 'Vote Count Descending' },
									{ id: 'vote_count.asc', name: 'Vote Count Ascending' },
									{ id: 'title.asc', name: 'Title Ascending' },
									{ id: 'title.desc', name: 'Title Descending' },
									{
										id: 'original_title.asc',
										name: 'Original Title Ascending',
									},
									{
										id: 'original_title.desc',
										name: 'Original Title Descending',
									},
								]}
								selectedValue={discoverParams.sort_by}
								onSelect={handleSortSelect}
							/>
						</div>
					</Row>
					<Row className='filter-genre-name'>
						<div className='filter-results-of'>
							<FilterSelect
								label='Genre'
								options={genres?.map((genre) => ({
									id: genre.id.toString(),
									name: genre.name,
								}))}
								selectedValue={discoverParams.with_genres}
								onSelect={handleGenreSelect}
							/>
						</div>
					</Row>
					<Row className='filter-year'>
						<div className='filter-results-of'>
							<FilterSelect
								label='Year'
								options={[]}
								selectedValue={discoverParams.year}
								onSelect={handleYearSelect}
							/>
						</div>
					</Row>

					<Row className='remove-btn-row'>
						<div>
							<Button
								variant='danger'
								style={{
									width: '100%',
									margin: '10px 0',
									padding: '10px 0',
									borderRadius: '0',
									border: '1px solid white',
									fontWeight: 'bold',
								}}
								onClick={resetFilters}
								className='remove-filter-btn'>
								Remove Filter
							</Button>
						</div>
					</Row>
				</Col>
			</Row>
		</Container>
	);
};

export default FilterBox;
