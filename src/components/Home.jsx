import { Link, useNavigate } from "react-router-dom"
import useLogout from "../hooks/useLogout"
import { Container } from "react-bootstrap"
import { useEffect, useState } from "react"
import useAuth from "../hooks/useAuth"
import { getUserEvents } from "../api/user"
import { getExpenses } from "../api/expenses"
import useAxiosPrivate from "../hooks/useAxiosPrivate"



const Home = () => {
	const navigate = useNavigate()
	const logout = useLogout()
	const { auth } = useAuth()

	const [daysData, setDaysData] = useState({})

	const axiosPrivate = useAxiosPrivate()

	const signOut = async () => {
		await logout()
		navigate("/linkpage")
	}



	const [expenses, setExpenses] = useState([])

	useEffect(() => {
		async function init() {
			// const categoriesRes = await getExpCategories(axiosPrivate)
			// setCategories(categoriesRes.data)

			const expensesRes = await getExpenses(axiosPrivate)
			setExpenses(expensesRes.data)

			const expData = {}

			expensesRes.data.forEach(expense => {

				// let time = new Date(expense.time)// .toISOString().split('T')[0]
				// const month = time.toString('en', { month: 'short' });
				let time = new Date(expense.time).toLocaleString('en-us',{month:'short', year:'numeric'})

				if (!(time in expData)) {
					expData[time] = {
						in: 0,
						out: 0,
					}
				}

				if (expense.kind == 1)
				{   // money lost
					expData[time].out += expense.amount
				} else if (expense.kind == 0)
				{  // money gain
					expData[time].in += expense.amount
				}
				
			})

			setDaysData(expData)
		}

		init()
	}, [])

	const printData = () =>
	{
		const days = []
		
		for (const [key, value] of Object.entries(daysData)) {
			
			let income = value.in - value.out
			days.push(<div key={key}>At <strong>{key}</strong> you gained <strong>{value.in}$</strong> and spent <strong>{value.out}$</strong>. Total for the month: <strong>{income}$</strong></div>)
		}

		return days
	}


	return (
		<Container>
			<h1>Home</h1>
			<p>Amount of records: {expenses.length > 0 ? expenses.length : 'None so far'}</p>
			{printData()}
		</Container>
	)
}

export default Home
