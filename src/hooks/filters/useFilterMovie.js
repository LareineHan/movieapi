import { useQuery } from '@tanstack/react-query';
import api from '../../utils/api';

const fetchFilterMovie = ({
	filterCategory,
	filterValue,
	currentPage,
	keyword,
}) => {
	console.log('fetchFilter:', {
		filterCategory,
		filterValue,
		currentPage,
		keyword,
	}); // Log the arguments
	let url = `/movie/popular?page=${currentPage}`;
	// /search/movie?query=${keyword}
	if (!keyword && filterCategory && filterValue) {
		url = `/discover/movie?${filterCategory}=${filterValue}&page=${currentPage}`;
	}
	if (keyword && filterCategory && filterValue) {
		url = `/search/movie?query=${keyword}&${filterCategory}=${filterValue}&page=${currentPage}`;
	}
	console.log('fetchFilter URL:', url); // Log the constructed URL
	try {
		const response = api.get(url);
		console.log('fetchFilter response:', response); // Log the API response
		return response;
	} catch (error) {
		console.error('fetchFilter error:', error); // Log any errors
		throw error; // Re-throw the error to be handled by the caller
	}
};

export const useFilterMovieQuery = ({
	filterCategory,
	filterValue,
	keyword,
	currentPage,
}) => {
	return useQuery({
		queryKey: [
			'filter-movie',
			{ filterCategory, filterValue, keyword, currentPage },
		],
		queryFn: () => {
			if (filterCategory && filterValue) {
				return fetchFilterMovie({
					filterCategory,
					filterValue,
					keyword,
					currentPage,
				});
			} else {
				return Promise.reject(
					new Error('something went wrong with the filter query!')
				);
			}
		},
		select: (result) => result.data,
		refetchOnWindowFocus: false,
		staleTime: 0,
		gcTime: 1000 * 60 * 60 * 0.1, // mean
	});
};
