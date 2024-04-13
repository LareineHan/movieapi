import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

let initialState = {
	discoverParams: null,
	isDiscover: false,
	isLoading: false,
	err: null,
};

console.log('무비디스커버슬라이스 called!', initialState);

export const addDiscoverParams = createAsyncThunk(
	'discover/addDiscoverParams',
	(discoverParams) => {
		console.log('addDiscoverParams called!', discoverParams);
		return discoverParams;
	}
);

export const toggleDiscover = createAsyncThunk(
	'discover/toggleDiscover',
	(bool) => {
		console.log('toggleDiscover called!', bool);
		return bool;
	}
);

const movieDiscoverSlice = createSlice({
	name: 'discover',
	initialState,

	extraReducers: (builder) => {
		builder
			.addCase(addDiscoverParams.pending, (state) => {
				state.isLoading = true;
				console.log('addDiscoverParams.pending called!', state.isLoading);
			})
			.addCase(addDiscoverParams.fulfilled, (state, action) => {
				state.discoverParams = action.payload;
				state.isLoading = false;
				console.log(
					'addDiscoverParams.fulfilled called!',
					state.discoverParams
				);
			})
			.addCase(addDiscoverParams.rejected, (state, action) => {
				state.err = action.error.message;
				state.isLoading = false;
				console.log('addDiscoverParams.rejected called!', state.err);
			});

		builder
			.addCase(toggleDiscover.pending, (state) => {
				state.isLoading = true;
				console.log('toggleDiscover.pending called!', state.isLoading);
			})
			.addCase(toggleDiscover.fulfilled, (state, action) => {
				state.isDiscover = action.payload;
				state.isLoading = false;
				console.log(
					'toggleDiscover.fulfilled called!-> isDiscover?',
					state.isDiscover
				);
			})
			.addCase(toggleDiscover.rejected, (state, action) => {
				state.err = action.error.message;
				state.isLoading = false;
				console.log('toggleDiscover.rejected called!', state.err);
			});
	},
});

export const movieDiscoverActions = movieDiscoverSlice.actions;
export default movieDiscoverSlice.reducer;
