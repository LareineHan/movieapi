import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchUpcomingMovies = () => {
	const data = api.get(`/movie/upcoming`);
	console.log('fetchUpcomingMovies called! ', data);
	return data;
};

export const useUpcomingMoviesQuery = () => {
	console.log('useUpcomingMoviesQuery called! ');
	return useQuery({
		queryKey: ['upcoming-movies'],
		queryFn: fetchUpcomingMovies,
		select: (result) => result?.data,
	});
};
