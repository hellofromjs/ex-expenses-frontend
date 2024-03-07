import ApiError from "../errors/ApiError"

export function formatErrorResponse(error) {
	if (error.response) {
		// The request was made and the server responded with a status code
		// that falls out of the range of 2xx
		return new ApiError(error)
	} else if (error.request) {
		// The request was made but no response was received
		// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
		// http.ClientRequest in node.js
		console.error(error.request)
	} else {
		// Something happened in setting up the request that triggered an Error
		console.error('Error', error.message)
	}
}

export function hasAllowedRole(currentRoles, allowedRoles) {
	if (currentRoles) {
		return currentRoles.find((role) => allowedRoles?.includes(role))
	}

}