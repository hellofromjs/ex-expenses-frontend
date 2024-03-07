import axios from 'axios'

if (!import.meta.env.VITE_BACKEND_URL) {
	console.error('Missing VITE_BACKEND_URL environment variable')
}

export default axios.create({
	baseURL: import.meta.env.VITE_BACKEND_URL
})

export const axiosPrivate = axios.create({
	baseURL: import.meta.env.VITE_BACKEND_URL,
	headers: { 'Content-Type': 'application/json' },
	withCredentials: true
})