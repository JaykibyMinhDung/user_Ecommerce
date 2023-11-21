// api/axiosClient.js
import axios from 'axios';
import queryString from 'query-string';
// Set up default config for http requests here
// Please have a look at here `https://github.com/axios/axios#requestconfig` for the full list of configs
const axiosClient = axios.create({
	// baseURL: 'http://localhost:5000',
	baseURL: 'https://ecommerce-5262.onrender.com',
	withCredentials: true, // accept send new data from client 
	// credentials: "include",
	headers: {
		'content-type': 'application/json',
		// 'Cookie': 'value1=Helloworld'
	},
	// xsrfCookieName: 'XSRF-TOKEN',
	paramsSerializer: (params) => queryString.stringify(params),
});
axiosClient.interceptors.request.use(async (config) => {
	const cookie = document.cookie ;
	// Handle token here ...
	const configCookie = decodeURIComponent(cookie).split(';');
	// console.log(configCookie);
	if (cookie?.length > 0) {
		config.headers['Cookie'] = `${cookie}` // set cookie send to server
	}
	config.headers['Authorization'] = `Bearer ${configCookie[0].split('=')[1]}`
	return config;
});
axiosClient.interceptors.response.use(
	(response) => {
		if (response && response.data) {
			return response.data;
		}
		return response;
	},
	(error) => {
		// Handle errors
		throw error;
	}
);
export default axiosClient;
