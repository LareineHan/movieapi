import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { useMovieGenreQuery } from '../../../../../hooks/useMovieGenre';
import './GenreFilter.style.css';
import { useDispatch, useSelector } from 'react-redux';
import { addMovieGenreId } from '../../../../../redux/reducers/filterGenreSlice';
import { addMovieGenreName } from '../../../../../redux/reducers/filterGenreSlice';
import { toggleFilter } from '../../../../../redux/reducers/filterGenreSlice';

// 필터만들기
// 필터종류 선택 : 여기는 장르 (GenreFilter.jsx) ✅
// 장르 목록을 가져오는 쿼리 필요 : useMovieGenreQuery (여기 필터에서만 사용하면 됨) ✅
// 장르 아이디나 네임을 선택하여 쿼리 스토어에 전달 Action으로 : addMovieGenreId (전역) ✅
// 필터를 토글하는 함수 필요 Action으로 : toggleFilter (전역으로 사용하도록 스토어에 전달) ✅
// 스토어에 저장한 필터밸류를 사용하여 필터링 : useSelector로 스토어에서 필터밸류를 가져와서 사용 (MoviesPage.jsx)
// 필터링된 결과를 보여주는 컴포넌트 필요 : FilteredMovies.jsx ✅
// MoviesPage.jsx에 필요한 컴포턴트 및 함수들 : GenreFilter(이거), FilteredMovies(UI), addMovieGenreId(리덕스 슬라이스), toggleFilter(리덕스 슬라이스)✅
// 리덕스슬라이스 : filterGenreSlice.js✅
// 다른 필터를 만들때 재사용 가능한 컴포넌트 : FilteredMovies.jsx✅
// 필터링된 결과를 보여주는 컴포넌트 : FilteredMovies.jsx✅

const GenreFilter = () => {
	const { data } = useMovieGenreQuery();
	const dispatch = useDispatch();
	const [defaultState, setDefaultState] = useState('>');
	const isFilter = useSelector((state) => state.genre.isFilter);
	console.log(data);
	const handleChange = async (event) => {
		const genreId = await event.target.value;
		const genreName = await data.find((genre) => genre.id === parseInt(genreId))
			.name;
		if (genreId === 'Filter by Genre') {
			dispatch(addMovieGenreId(null));
			dispatch(toggleFilter(null));
			setDefaultState('Filter by Genre');
			return; // Ignore the "Filter by Genre" option
		}
		console.log('genreId? on handleChange', genreId);
		console.log('isFilter is?:', isFilter);
		dispatch(addMovieGenreId(genreId));
		dispatch(addMovieGenreName(genreName));
		dispatch(toggleFilter(genreId));
	};
	useEffect(() => {
		if (isFilter === false) {
			console.log('isFilter is?:', isFilter);
			setDefaultState('Filter by Genre'); // Reset default state when isFilter becomes null
		}
	}, [isFilter]);

	return (
		<>
			<Form.Select
				className='filter-select'
				onChange={handleChange}
				value={defaultState}>
				<option disabled>{defaultState}</option>
				{data?.map((genre, index) => (
					<option key={index} as='form' value={genre.id}>
						{genre.name}
					</option>
				))}
			</Form.Select>
		</>
	);
};

export default GenreFilter;
