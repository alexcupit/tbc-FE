import axios from 'axios';
import type { PageLoad } from './$types';

export const load = (async () => {
	const response = await axios.get('https://tbc-be.onrender.com/api/questions/today');

	return response.data;
}) satisfies PageLoad;
