import axios from 'axios';
import type { PageLoad } from './$types';

export const load = (async () => {
	const response = await axios.get('https://wild-blue-rooster-belt.cyclic.app/api/questions/today');

	return response.data;
}) satisfies PageLoad;
