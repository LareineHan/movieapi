import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchSearchMovie = ({ keyword, page }) => {
	return keyword
		? api.get(`/search/movie?query=${keyword}&page=${page}`)
		: api.get(`/movie/popular?page=${page}`);
};

export const useSearchMovieQuery = ({ keyword, page }) => {
	return useQuery({
		queryKey: ['search-movie', { keyword, page }], // keyword는 queryKey에서 사용한다. 왜냐ㅎ면 keyword가 변경될 때마다 새로운 데이터를 가져와야 하기 때문이다.
		queryFn: () => fetchSearchMovie({ keyword, page }),
		select: (result) => result.data,
	});
};
