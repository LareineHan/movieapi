import { configureStore } from '@reduxjs/toolkit';
import filterGenreSlice from './reducers/filterGenreSlice';
import movieDetailSlice from './reducers/movieDetailSlice';
const store = configureStore({
	reducer: {
		genre: filterGenreSlice,
		movieDetail: movieDetailSlice,
	},
});
export default store;
