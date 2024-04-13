import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../utils/api';

let initialState = {
	movieReviews: null,
	isLoading: false,
	err: null,
};

export const fetchMovieReviews = createAsyncThunk(
	'movieReviews/fetchMovieReviews', // action type
	async (movieId, thunkApi) => {
		try {
			const response = await api.get(`/movie/${movieId}/reviews`);
			console.log('fetchMovieReviews called!');
			return response.data;
		} catch (error) {
			return thunkApi.rejectWithValue({ error: error.message });
		}
	}
);

const movieReviewsSlice = createSlice({
	name: 'movieReviews',
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(fetchMovieReviews.pending, (state) => {
				state.isLoading = true;
				console.log('fetchMovieReviews.pending called!', state.isLoading);
			})
			.addCase(fetchMovieReviews.fulfilled, (state, action) => {
				state.movieReviews = action.payload;
				state.isLoading = false;
				console.log('fetchMovieReviews.fulfilled called!', state.movieReviews);
			})
			.addCase(fetchMovieReviews.rejected, (state, action) => {
				state.err = action.error.message;
				state.isLoading = false;
				console.log('fetchMovieReviews.rejected called!', state.err);
			});
	},
});

export default movieReviewsSlice.reducer;
export const movieReviewsActions = movieReviewsSlice.actions;
