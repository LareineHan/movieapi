import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

let initialState = {
	genreId: null,
	genreName: null,
	isFilter: false,
	isLoading: false,
	err: null,
};

console.log('filterReducer.js called!', initialState);

export const addMovieGenreId = createAsyncThunk(
	// 비동기 작업이 아니라면, createSlice의 reducers에 추가해도 된다.
	// 하지만 useSelector로 state를 가져올때, 비동기 작업이 필요하다면, createAsyncThunk를 사용해야한다.
	// 모르겠어서.. 일단 그냥 사용.
	'genre/addMovieGenreId',
	(genreId) => {
		console.log('addMovieGenreId called!', genreId);
		return genreId;
	}
);
export const addMovieGenreName = createAsyncThunk(
	'genre/addMovieGenreName',
	(genreName) => {
		console.log('addMovieGenreName called!', genreName);
		return genreName;
	}
);

export const toggleFilter = createAsyncThunk(
	'genre/toggleFilter',
	(genreId) => {
		if (genreId !== null) {
			console.log('isFilter called! with genreId', genreId);
			return true;
		}
		if (genreId === null) {
			return false;
		}
	}
);

const filterGenreSlice = createSlice({
	name: 'genre',
	initialState,

	extraReducers: (builder) => {
		builder
			.addCase(addMovieGenreId.pending, (state) => {
				state.isLoading = true;
				console.log('addMovieGenreId.pending called!', state.isLoading);
			})
			.addCase(addMovieGenreId.fulfilled, (state, action) => {
				state.genreId = action.payload;
				state.isLoading = false;
				console.log('addMovieGenreId.fulfilled called!', state.genreId);
			})
			.addCase(addMovieGenreId.rejected, (state, action) => {
				state.err = action.error.message;
				state.isLoading = false;
				console.log('addMovieGenreId.rejected called!', state.err);
			});
		builder
			.addCase(addMovieGenreName.pending, (state) => {
				state.isLoading = true;
				console.log('addMovieGenreName.pending called!', state.isLoading);
			})
			.addCase(addMovieGenreName.fulfilled, (state, action) => {
				state.genreName = action.payload;
				state.isLoading = false;
				console.log('addMovieGenreName.fulfilled called!', state.genreName);
			})
			.addCase(addMovieGenreName.rejected, (state, action) => {
				state.err = action.error.message;
				state.isLoading = false;
				console.log('addMovieGenreName.rejected called!', state.err);
			});

		builder
			.addCase(toggleFilter.pending, (state) => {
				state.isLoading = true;
				console.log('toggleFilter.pending called!', state.isLoading);
			})
			.addCase(toggleFilter.fulfilled, (state, action) => {
				state.isFilter = action.payload;
				state.isLoading = false;
				console.log(
					'toggleFilter.fulfilled called!-> isFilter?',
					state.isFilter
				);
			})
			.addCase(toggleFilter.rejected, (state, action) => {
				state.err = action.error.message;
				state.isLoading = false;
				console.log('toggleFilter.rejected called!', state.err);
			});
	},
});

export const filterGenreActions = filterGenreSlice.actions;
export default filterGenreSlice.reducer;
