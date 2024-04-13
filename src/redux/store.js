import { configureStore } from '@reduxjs/toolkit';
import filterGenreSlice from './reducers/filterGenreSlice';
import movieDetailSlice from './reducers/movieDetailSlice';
import movieDiscoverSlice from './reducers/movieDiscoverSlice';
import relatedPeopleSlice from './reducers/relatedPeopleSlice';
import movieReviewsSlice from './reducers/movieReviewsSlice';
import movieRecommendationsSlice from './reducers/movieRecommendationsSlice';
import previewVideoSlice from './reducers/previewVideoSlice';
import movieImagesSlice from './reducers/movieImagesSlice';

const store = configureStore({
	reducer: {
		genre: filterGenreSlice,
		movieDetail: movieDetailSlice,
		discover: movieDiscoverSlice,
		relatedPeople: relatedPeopleSlice,
		movieReviews: movieReviewsSlice,
		movieRecommendations: movieRecommendationsSlice,
		previewVideo: previewVideoSlice,
		movieImages: movieImagesSlice,
	},
});
export default store;
