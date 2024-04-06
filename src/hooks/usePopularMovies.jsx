import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchPopularMovies = async () => {
	const results = await api.get('/movie/popular');
	return results;
};

export const usePopularMoviesQuery = () => {
	return useQuery({
		queryKey: ['movie-popular'],
		queryFn: fetchPopularMovies,
		select: (data) => data.data,
	});
};
