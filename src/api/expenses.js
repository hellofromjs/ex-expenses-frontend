import { formatErrorResponse } from "../utils/utils"
import axios from "./axios"

async function getExpenses(axiosPrivate) {
	try {
		const response = await axiosPrivate.get('/expenses/',
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

async function createExpense(axiosPrivate, kind, amount, time, expense_category) {
	try {
		const response = await axiosPrivate.post('/expenses/',
			{ kind, amount, time, expense_category },
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

async function deleteExpense(axiosPrivate, id) {
	try {
		const response = await axiosPrivate.delete('/expenses/' + id,
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
	getExpenses,
	createExpense,
	deleteExpense,
}