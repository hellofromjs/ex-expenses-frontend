import { useEffect, useState } from "react"
import useAxiosPrivate from "../hooks/useAxiosPrivate"
import { getExpCategories, createExpCategory, deleteExpCategory } from "../api/expensesCategory"
import { Button, Container, Form, Row } from "react-bootstrap"
import ApiError from "../errors/ApiError"

const ExpenseCatogories = () => {

    const axiosPrivate = useAxiosPrivate()

    const [title, setTitle] = useState("")
    const [isCategoryCreated, setIsCategoryCreated] = useState(false)

    const [categories, setCategories] = useState([])

	useEffect(() => {
		async function init() {
			const categoriesRes = await getExpCategories(axiosPrivate)
			setCategories(categoriesRes.data)
		}

		init()
	}, [])

    const handleSubmit = async (e) => {
		e.preventDefault()

		const registerRes = await createExpCategory(axiosPrivate, title)
       
		if (registerRes instanceof ApiError) {
			console.log(registerRes.response.data.message)
		} else {
			setCategories(registerRes)
		}
	}

    const deleteCategory = async (id) => {
        const registerRes = await deleteExpCategory(axiosPrivate, id)
		if (registerRes instanceof ApiError) {
			console.log(registerRes.response.data.message)
		} else {
			setCategories(registerRes)
		}
    }

	return (
        <>
		<Container>
			
                {isCategoryCreated &&
                    <Row>
                        <h1>Category created!</h1>
                    </Row>
                }

				<Row>
					<h1>Create Category</h1>

					{/* {errMsg && <p>{errMsg}</p>} */}

					<Form onSubmit={handleSubmit}>
						<Form.Group className="mb-3">
							<Form.Label>Category Title</Form.Label>
							<Form.Control
								type="text"
								name="name"
								placeholder="Enter title"
								required
								onChange={(e) => setTitle(e.target.value)}
								value={title}
							/>
						</Form.Group>

						<Button className="float-end" variant="primary" type="submit" disabled={title == ""}>
							Create
						</Button>
					</Form>
				</Row>

                <h3>Categories: </h3>
                { categories && categories.map(category => 
                <div key={category._id} className="d-flex justify-content-between">
                    {category.title} 
                    <Button  variant="danger" onClick={() => deleteCategory(category._id)}>
                        Delete
                    </Button>
                
                </div>)}
			
		</Container>

        
        </>
	)
}

export default ExpenseCatogories

