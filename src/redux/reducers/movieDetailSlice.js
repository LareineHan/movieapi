import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../utils/api';

let initialState = {
	movieDetail: null,
	isLoading: false,
	err: null,
};

export const fetchMovieDetail = createAsyncThunk(
	'movieDetail/fetchMovieDetail',
	async (movieId, thunkApi) => {
		try {
			const response = await api.get(`/movie/${movieId}`);
			return response.data;
		} catch (error) {
			return thunkApi.rejectWithValue({ error: error.message });
		}
	}
);

const movieDetailSlice = createSlice({
	name: 'movieDetail',
	initialState,

	extraReducers: (builder) => {
		builder // fetchMovieDetail
			.addCase(fetchMovieDetail.pending, (state) => {
				state.isLoading = true;
				console.log('fetchMovieDetail.pending called!', state.isLoading);
			})
			.addCase(fetchMovieDetail.fulfilled, (state, action) => {
				state.movieDetail = action.payload; // action.payload is the response.data
				state.isLoading = false;
				console.log('fetchMovieDetail.fulfilled called!', state.movieDetail);
			})
			.addCase(fetchMovieDetail.rejected, (state, action) => {
				state.err = action.error.message;
				state.isLoading = false;
				console.log('fetchMovieDetail.rejected called!', state.err);
			});
	},
});

export default movieDetailSlice.reducer;
export const movieDetailActions = movieDetailSlice.actions;
