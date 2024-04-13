import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchMoviesSimilar = async (id) => {
	return await api.get(`/movie/${id}/similar`);
};

export const useSimilarMoviesQuery = (movieId) => {
	console.log('useSimilarMoviesQuery called! ', movieId);
	const id = movieId.movieId;
	return useQuery({
		queryKey: ['movies-similar', id],
		queryFn: async () => {
			try {
				const result = await fetchMoviesSimilar(id);
				return result.data;
			} catch (error) {
				console.error('Error fetching similar movies:', error);
				throw error; // rethrow the error to be caught by react-query
			}
		},
	});
};
