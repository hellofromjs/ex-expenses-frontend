import { formatErrorResponse } from "../utils/utils"
import axios from "./axios"

async function login(email, password) {
	try {
		const response = await axios.post('/api/v1/login',
			JSON.stringify({ email, password }),
			{
				headers: { "Content-Type": "application/json" },
				withCredentials: true,
			}
		)
		return response.data
	} catch (error) {
		return formatErrorResponse(error)
	}
}

async function register(email, username, password, passwordRepeat) {
	try {
		const response = await axios.post('/api/v1/register',
			JSON.stringify({ email, username, password, passwordRepeat }),
			{
				headers: { 'Content-Type': 'application/json' },
				withCredentials: true,
			}
		)
		return response.data
	} catch (error) {
		return formatErrorResponse(error)
	}
}

async function logout(axiosPrivate) {
	try {
		const response = await axiosPrivate.get('/api/v1/logout',
			{
				headers: { 'Content-Type': 'application/json' },
				withCredentials: true,
			}
		)
		return response.data
	} catch (error) {
		return formatErrorResponse(error)
	}
}

async function getUserEvents(id) {
	try {
		const response = await axios.get(`/users/${id}/events`,
			{
				headers: { 'Content-Type': 'application/json' },
			}
		)
		return response.data
	} catch (error) {
		return formatErrorResponse(error)
	}
}

export {
	login,
	register,
	logout,
	getUserEvents,
}