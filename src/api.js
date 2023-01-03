import axios from 'axios';

export const mongoDbcreateUser = async (body) => {
    console.log(body, "injecting")
	const createdUser = await axios.post('https://wild-blue-rooster-belt.cyclic.app/api/users', body)
    .catch((err) => {
        console.log(err)
    })
    return createdUser.data.user
}