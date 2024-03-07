import { useEffect, useState } from "react"
import useAxiosPrivate from "../hooks/useAxiosPrivate"
import { getExpCategories, createExpCategory, deleteExpCategory } from "../api/expensesCategory"
import { createExpense, getExpenses, deleteExpense } from "../api/expenses"

import { Button, Container, Form, Row, Table } from "react-bootstrap"
import ApiError from "../errors/ApiError"

const Expenses = () => {

    const axiosPrivate = useAxiosPrivate()

    const [kind, setKind] = useState("0")
	const [amount, setAmount] = useState(0)
	const [time, setTime] = useState("")
	const [expense_category, setExpense_category] = useState()


	const [isSumbitDisabled, setIsSumbitDisabled] = useState(false)

    const [isCategoryCreated, setIsCategoryCreated] = useState(false)


    const [categories, setCategories] = useState([])
	const [expenses, setExpenses] = useState([])

	useEffect(() => {
		async function init() {
			const categoriesRes = await getExpCategories(axiosPrivate)
			setCategories(categoriesRes.data)

			setExpense_category(categoriesRes.data[0]._id)

			const expensesRes = await getExpenses(axiosPrivate)
			setExpenses(expensesRes.data)
		}

		init()
	}, [])

	useEffect(() => {
		if (!kind || amount == 0 || !time || !expense_category)
		{
			setIsSumbitDisabled(true)
		} else {
			setIsSumbitDisabled(false)
		}
	}, [kind, amount, time, expense_category])


	const getCategoryName = (id) => {
		for (const category of categories) {
			if (category._id == id) {
				return category.title
			}
		}
	}

    const handleSubmit = async (e) => {
		e.preventDefault()

		const registerRes = await createExpense(axiosPrivate, kind, amount, time, expense_category)
		if (registerRes instanceof ApiError) {
			console.log(registerRes.response.data.message)
		} else {
			setExpenses(registerRes)
		}
	}

    const deleteThisExpense = async (id) => {
        const registerRes = await deleteExpense(axiosPrivate, id)

		if (registerRes instanceof ApiError) {
		} else {
			setExpenses(registerRes)
		}
    }

	return (
        <>
		<Container>
			
                {isCategoryCreated &&
                    <Row>
                        <h1>Expense created!</h1>
                    </Row>
                }

				<Row>
					<h1>Create Expense</h1>

					{/* {errMsg && <p>{errMsg}</p>} */}

					<Form onSubmit={handleSubmit}>
					<Form.Group controlId="formBasicSelect">
							<Form.Label>Select expense category</Form.Label>
							<Form.Control
								as="select"
								value={expense_category}
								onChange={e => {
									setExpense_category(e.target.value);
								}}
							>
								{categories && categories.map(category => {
									return <option key={category._id} value={category._id}>{category.title}</option>
								})}
							
							</Form.Control>
						</Form.Group>
						
						<Form.Group controlId="formBasicSelect">
							<Form.Label>Select expense kind</Form.Label>
							<Form.Control
								as="select"
								value={kind}
								onChange={e => {
									setKind(e.target.value);
								}}
							>
							<option value="0">Income</option>
							<option value="1">Expense</option>
							</Form.Control>
						</Form.Group>


						<Form.Group className="mb-3">
							<Form.Label>Amount</Form.Label>
							<Form.Control
								type="number"
								name="amount"
								placeholder="Enter amount"
								required
								onChange={(e) => setAmount(e.target.value)}
								value={amount}
							/>
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label>Date</Form.Label>
							<Form.Control
								type="date"
								name="time"
								placeholder="Enter date"
								required
								onChange={(e) => setTime(e.target.value)}
								value={time}
							/>
						</Form.Group>

						<Button className="float-end" variant="primary" type="submit" disabled={isSumbitDisabled}>
							Create
						</Button>
					</Form>
				</Row>

                <h3>My Expenses: </h3>


				<Table striped bordered hover>
      <thead>
        <tr>
          <th>Expense kind</th>
		  <th>Category</th>
          <th>Amount</th>
          <th>Date</th>
		  <th>Action</th>
        </tr>
      </thead>
      <tbody>
	  { expenses && expenses.map(expense => 
			<tr key={expense._id} className="justify-content-between">
				<td>{expense.kind == 1 ? 'Expense' : 'Income'}</td>
				<td>{getCategoryName(expense.expense_category)}</td>
				<td>{expense.amount}</td>
				<td>{new Date(expense.time).toISOString().split('T')[0]}</td>
				<td> 
					<Button  variant="danger" onClick={() => deleteThisExpense(expense._id)}>Delete</Button>
				</td>
			</tr>
		)}
      </tbody>
    </Table>



					
				

               
			
		</Container>

        
        </>
	)
}

export default Expenses

