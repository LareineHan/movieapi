import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../utils/api';

let initialState = {
	relatedPeople: null,
	isLoading: false,
	err: null,
};

export const fetchRelatedPeople = createAsyncThunk(
	'relatedPeople/fetchRelatedPeople',
	async (movieId, thunkApi) => {
		try {
			const response = await api.get(`/movie/${movieId}/credits`);
			console.log('API Response:', response.data);
			return response.data;
		} catch (error) {
			return thunkApi.rejectWithValue({ error: error.message });
		}
	}
);

const relatedPeopleSlice = createSlice({
	name: 'relatedPeople',
	initialState,

	extraReducers: (builder) => {
		builder // fetchRelatedPeople
			.addCase(fetchRelatedPeople.pending, (state) => {
				state.isLoading = true;
				console.log('fetchRelatedPeople.pending called!', state.isLoading);
			})
			.addCase(fetchRelatedPeople.fulfilled, (state, action) => {
				state.relatedPeople = action.payload;
				state.isLoading = false;
				console.log(
					'fetchRelatedPeople.fulfilled called!',
					state.relatedPeople
				);
			})
			.addCase(fetchRelatedPeople.rejected, (state, action) => {
				state.err = action.error.message;
				state.isLoading = false;
				console.log('fetchRelatedPeople.rejected called!', state.err);
			});
	},
});

export default relatedPeopleSlice.reducer;
export const relatedPeopleActions = relatedPeopleSlice.actions;
