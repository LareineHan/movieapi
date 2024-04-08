import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchTopRatedMovies = () => {
	const data = api.get(`/movie/top_rated`);
	console.log('fetchTopRatedMovies called! ', data);
	return data;
};

export const useTopRatedMoviesQuery = () => {
	console.log('useTopRatedMoviesQuery called! ');
	return useQuery({
		queryKey: ['top-rated-movies'],
		queryFn: fetchTopRatedMovies,
		select: (result) => result?.data,
	});
};
