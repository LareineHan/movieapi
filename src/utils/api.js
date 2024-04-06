import axios from 'axios';
const API_KEY = process.env.REACT_APP_API_KEY;
const api = axios.create({
	baseURL: 'https://api.themoviedb.org/3',
	headers: {
		Accept: 'application/json',
		Authorization: `Bearer ${API_KEY}`,
	},
});

axios.interceptors.request.use(
	function (config) {
		console.log(config, 'axios interceptors request');
		return config;
	},
	function (error) {
		console.log(error, 'axios interceptors request');
		return Promise.reject(error);
	}
);

// Add a response interceptor
axios.interceptors.response.use(
	function (response) {
		console.log(response, 'axios interceptors response');
		return response;
	},
	function (error) {
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// Do something with response error
		return Promise.reject(error);
	}
);

export default api;
