import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../utils/api';

let initialState = {
	movieRecommendations: null,
	isLoading: false,
	err: null,
};

export const fetchMovieRecommendations = createAsyncThunk(
	'movieRecommendations/fetchMovieRecommendations', // action type
	async (movieId, thunkApi) => {
		try {
			const response = await api.get(`/movie/${movieId}/recommendations`);
			console.log(
				movieId,
				'<-id and fetchMovieRecommendations called!',
				response.data
			);
			return response.data;
		} catch (error) {
			return thunkApi.rejectWithValue({ error: error.message });
		}
	}
);

const movieRecommendationsSlice = createSlice({
	name: 'movieRecommendations',
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(fetchMovieRecommendations.pending, (state) => {
				state.isLoading = true;
				console.log(
					'fetchMovieRecommendations.pending called!',
					state.isLoading
				);
			})
			.addCase(fetchMovieRecommendations.fulfilled, (state, action) => {
				state.movieRecommendations = action.payload;
				state.isLoading = false;
				console.log(
					'fetchMovieRecommendations.fulfilled called!',
					state.movieRecommendations
				);
			})
			.addCase(fetchMovieRecommendations.rejected, (state, action) => {
				state.err = action.error.message;
				state.isLoading = false;
				console.log('fetchMovieRecommendations.rejected called!', state.err);
			});
	},
});

export default movieRecommendationsSlice.reducer;
export const movieRecommendationsActions = movieRecommendationsSlice.actions;
