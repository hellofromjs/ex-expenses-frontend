import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import Missing from "./components/Missing"
import Login from "./components/Login"
import Register from "./components/Register"
import Unauthorized from "./components/Unauthorized"
import Home from "./components/Home"
import PersistLogin from "./components/PersistLogin"
import RequireAuth from "./components/RequireAuth"
import ACCOUNT_ROLES from "./config/accountRoles"
import ExpenseCatogories from "./components/ExpenseCatogories"
import Expenses from "./components/Expenses"

function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				{/* public routes */}
				<Route index element={<Login />} />
				<Route path="login" element={<Login />} />
				<Route path="register" element={<Register />} />
				<Route path="unauthorized" element={<Unauthorized />} />

				{/* protected routes */}
				<Route element={<PersistLogin />}>
					<Route element={<RequireAuth allowedRoles={[ACCOUNT_ROLES.User, ACCOUNT_ROLES.Admin]} />}>
						<Route path="home" element={<Home />} />
					</Route>

					<Route element={<RequireAuth allowedRoles={[ACCOUNT_ROLES.Admin]} />}>
						<Route path="expenses/create-category" element={<ExpenseCatogories />} />
					</Route>
					<Route element={<RequireAuth allowedRoles={[ACCOUNT_ROLES.User, ACCOUNT_ROLES.Admin]} />}>
						<Route path="expenses/create" element={<Expenses />} />
					</Route>
				</Route>

				{/* catch all */}
				<Route path="*" element={<Missing />} />
			</Route>
		</Routes>
	)
}

export default App
