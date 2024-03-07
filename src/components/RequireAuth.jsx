import { useLocation, Navigate, Outlet } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import { hasAllowedRole } from "../utils/utils"

const RequireAuth = ({ allowedRoles }) => {
	const { auth } = useAuth()
	const location = useLocation()

	if (hasAllowedRole(auth.roles, allowedRoles)) {
		return <Outlet />
	} else if (auth?.accessToken) {
		return <Navigate to="/unauthorized" state={{ from: location }} replace />
	} else {
		return <Navigate to="/login" state={{ from: location }} replace />
	}
}

export default RequireAuth
