import { useState, useEffect } from "react"
import useAuth from "../hooks/useAuth"
import { useNavigate, useLocation } from "react-router-dom"
import { login } from "../api/user"
import ApiError from "../errors/ApiError"
import { Button, Container, Form, Row } from "react-bootstrap"

const Login = () => {
	const { setAuth, persist, setPersist } = useAuth()

	const navigate = useNavigate()
	const location = useLocation()
	const from = location.state?.from?.pathname || "/"

	const [user, setUser] = useState("a@a.com")
	const [pwd, setPwd] = useState("123456")
	const [errMsg, setErrMsg] = useState("")

	const handleSubmit = async (e) => {
		e.preventDefault()

		const loginRes = await login(user, pwd)

		if (loginRes instanceof ApiError) {
			setErrMsg(loginRes.response.data.message)
		} else {
			setAuth({
				username: loginRes.username,
				roles: loginRes.roles,
				accessToken: loginRes.accessToken,
				id: loginRes.id,
			})
			setUser("")
			setPwd("")
			setPersist(true)

			if (from == '/') {
				navigate('/home')
			} else {
				navigate(from, { replace: true })
			}
			
		}
	}

	useEffect(() => {
		localStorage.setItem("persist", persist)
	}, [persist])

	return (
		<Container>
			<Row>
				<h1>Sign In</h1>

				{errMsg && <p>{errMsg}</p>}
				<Form onSubmit={handleSubmit}>
					<Form.Group className="mb-3">
						<Form.Label>Email</Form.Label>
						<Form.Control
							type="text"
							name="email"
							placeholder="Enter email"
							required
							onChange={(e) => setUser(e.target.value)}
							value={user}
						/>
					</Form.Group>

					<Form.Group className="mb-3">
						<Form.Label>Password</Form.Label>
						<Form.Control
							type="password"
							name="password"
							placeholder="Enter password"
							required
							onChange={(e) => setPwd(e.target.value)}
							value={pwd}
						/>
					</Form.Group>

					{/* <Form.Group className="mb-3">
						<Form.Check
							type="checkbox"
							label="Trust This Device"
							onChange={() => setPersist((prev) => !prev)}
							checked={persist}
						/>
					</Form.Group> */}

					<Button className="float-end" variant="primary" type="submit">
						Sign In
					</Button>
				</Form>
			</Row>
		</Container>
	)
}

export default Login
