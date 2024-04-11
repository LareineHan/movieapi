import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

// 사용하려면 무비아이디와 나라코드를 넣어주면 됨
const fetchMovieCertification = async (movieId) => {
	try {
		console.log('fetchMovieCertification called! for movieId ', movieId);
		const result = await api.get(`/movie/${movieId}/release_dates`);
		return result;
	} catch (error) {
		console.error('Error fetching movie certification:', error);
		throw error;
	}
};
export const useMovieCertificationQuery = ({ movieId, nationality }) => {
	console.log(
		'useMovieCertificationQuery called! movieId:',
		movieId,
		nationality
	);
	return useQuery({
		queryKey: ['movie-certification', movieId, nationality],
		queryFn: () => fetchMovieCertification(movieId),
		select: (result) => {
			const results = result?.data.results;
			if (!results || results.length === 0) {
				return ''; // No results found, return empty string
			}

			// Find the certification for the specified nationality
			const certificationForNationality = results.find(
				(r) => r.iso_3166_1 === nationality
			)?.release_dates[0]?.certification;
			if (certificationForNationality) {
				return certificationForNationality; // Return certification for specified nationality
			}

			const anyCertification = results.find(
				(r) => r.release_dates[0].certification !== ''
			)?.release_dates[0].certification;
			return anyCertification || ''; // Return any certification
		},
	});
};

// production country 와 매치되는 certification을 찾아서 반환
// 없으면, 아무 certification이라도 반환
