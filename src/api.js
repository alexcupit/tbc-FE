import axios from 'axios';

const quizAPI = axios.create({
	baseURL: 'https://tbc-be.onrender.com/api/'
});

export const mongoDbcreateUser = async (body) => {
	console.log(body, 'injecting');
	const createdUser = await axios
		.post('https://tbc-be.onrender.com/api/users', body)
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
		`https://tbc-be.onrender.com/api/leaderboards/${leaderboardName}`
	);
	return leaderboardData.data.leaderboard;
};

export const fetchUser = async (userId) => {
	console.log('fetching');
	const userData = await axios.get(`https://tbc-be.onrender.com/api/users/${userId}`);
	return userData.data.user[0];
};

export const postLeaderBoard = async (body) => {
	const res = await axios.post(`https://tbc-be.onrender.com/api/leaderboards`, body);
};

export const updateUser = async (userId, body) => {
	const res = await axios.patch(`https://tbc-be.onrender.com/api/users/${userId}`, body);
	console.log(res);
};
