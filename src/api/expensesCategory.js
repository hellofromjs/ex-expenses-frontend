import { formatErrorResponse } from "../utils/utils"
import axios from "./axios"

async function getExpCategories(axiosPrivate) {
	try {
		const response = await axiosPrivate.get('/expense-caregories/',
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

async function createExpCategory(axiosPrivate, title) {
	try {
		const response = await axiosPrivate.post('/expense-caregories/',
			{ title },
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

async function deleteExpCategory(axiosPrivate, id) {
	try {
		const response = await axiosPrivate.delete('/expense-caregories/' + id,
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



export {
	getExpCategories,
	createExpCategory,
	deleteExpCategory,
}