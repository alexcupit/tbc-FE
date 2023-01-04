import axios from 'axios';

export const mongoDbcreateUser = async (body) => {
    console.log(body, "injecting")
	const createdUser = await axios.post('https://wild-blue-rooster-belt.cyclic.app/api/users', body)
    .catch((err) => {
        console.log(err)
    })
    return createdUser.data.user
}

export const fetchUser = async (userId) => {
    console.log("fetching")
    const userData = await axios.get(`https://wild-blue-rooster-belt.cyclic.app/api/users/${userId}`)
    return userData.data.user[0]
}

export const postLeaderBoard = async (body) => {
    const res = await axios.post(`https://wild-blue-rooster-belt.cyclic.app/api/leaderboards`, body)
}

export const patchUser = async (userId, body) => {
    const res = await axios.patch(`https://wild-blue-rooster-belt.cyclic.app/api/users/${userId}`, body)
    console.log(res)
}