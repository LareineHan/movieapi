import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../utils/api';

let initialState = {
	previewVideo: null,
	isLoading: false,
	err: null,
};

export const fetchPreviewVideo = createAsyncThunk(
	'previewVideo/fetchPreviewVideo', // action type
	async (movieId, thunkApi) => {
		try {
			const response = await api.get(`/movie/${movieId}/videos`);
			console.log('fetchPreviewVideo called!');
			return response.data;
		} catch (error) {
			return thunkApi.rejectWithValue({ error: error.message });
		}
	}
);

const previewVideoSlice = createSlice({
	name: 'previewVideo',
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(fetchPreviewVideo.pending, (state) => {
				state.isLoading = true;
				console.log('fetchPreviewVideo.pending called!', state.isLoading);
			})
			.addCase(fetchPreviewVideo.fulfilled, (state, action) => {
				state.previewVideo = action.payload;
				state.isLoading = false;
				console.log('fetchPreviewVideo.fulfilled called!', state.previewVideo);
			})
			.addCase(fetchPreviewVideo.rejected, (state, action) => {
				state.err = action.error.message;
				state.isLoading = false;
				console.log('fetchPreviewVideo.rejected called!', state.err);
			});
	},
});

export default previewVideoSlice.reducer;
export const movieReviewsActions = previewVideoSlice.actions;
