import { useState } from "react"
import { Link } from "react-router-dom"
import { register } from "../api/user"
import ApiError from "../errors/ApiError"
import { Button, Container, Form, Row } from "react-bootstrap"

const Register = () => {
	const [email, setEmail] = useState("")
	const [name, setName] = useState("")
	const [password, setPassword] = useState("")
	const [passwordRepeat, setPasswordRepeat] = useState("")

	const [errMsg, setErrMsg] = useState("")
	const [success, setSuccess] = useState(false)

	const handleSubmit = async (e) => {
		e.preventDefault()

		const registerRes = await register(email, name, password, passwordRepeat)

		if (registerRes instanceof ApiError) {
			setErrMsg(registerRes.response.data.message)
		} else {
			setSuccess(true)
			setName("")
			setPassword("")
			setPasswordRepeat("")
		}
	}

	return (
		<Container>
			{success ? (
				<Row>
					<h1>Success!</h1>
					<p>
						<Link to="/login">Sign In</Link>
					</p>
				</Row>
			) : (
				<Row>
					<h1>Register</h1>

					{errMsg && <p>{errMsg}</p>}

					<Form onSubmit={handleSubmit}>
						<Form.Group className="mb-3">
							<Form.Label>Email</Form.Label>
							<Form.Control
								type="text"
								name="email"
								placeholder="Enter email"
								required
								onChange={(e) => setEmail(e.target.value)}
								value={email}
							/>
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label>Name</Form.Label>
							<Form.Control
								type="text"
								name="name"
								placeholder="Enter name"
								required
								onChange={(e) => setName(e.target.value)}
								value={name}
							/>
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="password"
								name="password"
								placeholder="Enter password"
								required
								onChange={(e) => setPassword(e.target.value)}
								value={password}
							/>
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label>Repeat Password</Form.Label>
							<Form.Control
								type="password"
								name="password_re"
								placeholder="Repeat password"
								required
								onChange={(e) => setPasswordRepeat(e.target.value)}
								value={passwordRepeat}
							/>
						</Form.Group>

						<Button className="float-end" variant="primary" type="submit">
							Sign Up
						</Button>
					</Form>
				</Row>
			)}
		</Container>
	)
}

export default Register
