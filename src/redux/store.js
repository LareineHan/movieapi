import { configureStore } from '@reduxjs/toolkit';
import filterGenreSlice from './reducers/filterGenreSlice';

const store = configureStore({
	reducer: {
		genre: filterGenreSlice,
	},
});
export default store;
