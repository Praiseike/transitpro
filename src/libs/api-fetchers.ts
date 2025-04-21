import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL as string;
const fetcher = axios.create({
	baseURL: `${BACKEND_URL}`,
	// withCredentials: true,
	// headers: {
	// 	'Access-Control-Allow-Origin': 'localhost:3000',
	// },
});

export { fetcher };
