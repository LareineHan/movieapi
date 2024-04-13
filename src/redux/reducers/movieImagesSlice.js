import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../utils/api';

let initialState = {
	movieImages: [],
	isLoading: false,
	err: null,
};

export const fetchMovieImages = createAsyncThunk(
	'movieImages/fetchMovieImages', // action type
	async (movieId, thunkApi) => {
		try {
			const response = await api.get(`/movie/${movieId}/images`);
			console.log('fetchMovieImages called!');
			return response.data;
		} catch (error) {
			return thunkApi.rejectWithValue({ error: error.message });
		}
	}
);

const movieImagesSlice = createSlice({
	name: 'movieImages',
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(fetchMovieImages.pending, (state) => {
				state.isLoading = true;
				console.log('fetchMovieImages.pending called!', state.isLoading);
			})
			.addCase(fetchMovieImages.fulfilled, (state, action) => {
				state.movieImages = action.payload;
				state.isLoading = false;
				console.log('fetchMovieImages.fulfilled called!', state.movieImages);
			})
			.addCase(fetchMovieImages.rejected, (state, action) => {
				state.err = action.error.message;
				state.isLoading = false;
				console.log('fetchMovieImages.rejected called!', state.err);
			});
	},
});

export default movieImagesSlice.reducer;
export const movieReviewsActions = movieImagesSlice.actions;
