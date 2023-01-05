import axios from 'axios';

const quizAPI = axios.create({
	baseURL: 'https://wild-blue-rooster-belt.cyclic.app/api/'
});

export const mongoDbcreateUser = async (body) => {
	console.log(body, 'injecting');
	const createdUser = await axios
		.post('https://wild-blue-rooster-belt.cyclic.app/api/users', body)
		.catch((err) => {
			console.log(err);
		});
	return createdUser.data.user;
};

export const patchUser = (userId, bodyChanges) => {
	return quizAPI.patch(`/users/${userId}`, bodyChanges).then((res) => res.data.updatedUser);
};

export const patchLeaderBoard = (leaderBoardName, user) => {
	return quizAPI.patch(`/leaderboards/${leaderBoardName}`, user).then((res) => {});
};

export const getUser = (userId) => {
	return quizAPI.get(`/users/${userId}`).then((res) => res.data.user[0]);
};

export const fetchLeaderboard = async (leaderboardName) => {
	const leaderboardData = await axios.get(
		`https://wild-blue-rooster-belt.cyclic.app/api/leaderboards/${leaderboardName}`
	);
	return leaderboardData.data.leaderboard;
};

export const fetchUser = async (userId) => {
	console.log('fetching');
	const userData = await axios.get(`https://wild-blue-rooster-belt.cyclic.app/api/users/${userId}`);
	return userData.data.user[0];
};

export const postLeaderBoard = async (body) => {
	const res = await axios.post(`https://wild-blue-rooster-belt.cyclic.app/api/leaderboards`, body);
};

export const updateUser = async (userId, body) => {
	const res = await axios.patch(
		`https://wild-blue-rooster-belt.cyclic.app/api/users/${userId}`,
		body
	);
	console.log(res);
};
