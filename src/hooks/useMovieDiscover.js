import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchMovieDiscover = async ({ discoverParams, page }) => {
	let queryString = `/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}`;

	if (discoverParams.sort_by) {
		queryString += `&sort_by=${discoverParams.sort_by}`;
	}

	if (discoverParams.with_genres) {
		queryString += `&with_genres=${discoverParams.with_genres}`;
	}

	if (discoverParams.year) {
		queryString += `&year=${discoverParams.year}`;
	}
	if (
		!discoverParams.sort_by &&
		!discoverParams.with_genres &&
		!discoverParams.year
	) {
		queryString = `/movie/popular?page=${page}`;
	}

	const results = await api.get(queryString);
	console.log('fetchMovieDiscover', results);
	return results;
};

export const useMovieDiscover = ({ discoverParams, page }) => {
	return useQuery({
		queryKey: ['movie-discover', { discoverParams, page }],
		queryFn: () => fetchMovieDiscover({ discoverParams, page }),
		select: (data) => data.data,
	});
};
