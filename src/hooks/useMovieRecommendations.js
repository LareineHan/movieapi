import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchMovieRecommendations = (movieId) => {
	const data = api.get(`/movie/${movieId}/recommendations`);
	console.log(
		'fetchMovieRecommendations called! for movieId ',
		movieId,
		'data? ',
		data
	);
	return data;
};

export const useMovieRecommendationsQuery = (movieId) => {
	console.log('useMovieRecommendationsQuery called! ');
	return useQuery({
		queryKey: ['movie-recommendations'],
		queryFn: (movieId) => {
			fetchMovieRecommendations(movieId);
		},
		select: (result) => result?.data,
	});
};
