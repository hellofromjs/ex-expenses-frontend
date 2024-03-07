export default class ApiError extends Error {
	constructor(response) {
		super(response.message)
		this.response = response.response
	}
}