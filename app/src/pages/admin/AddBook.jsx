import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";
import { FirestoreContext } from "../../contexts/FirestoreContext";
import { collection, addDoc } from "firebase/firestore";
import { useContext, useState, useEffect } from "react";



export function AddBook( props ) {
    const [ show, setShow ]  = useState( false )
    const [ message, setMessage ]  = useState( '' )
    
    let alertType = 'success'

    const db = useContext( FirestoreContext )
    const navigate = useNavigate()

    useEffect(()=> {
        if (props.mode == false){
            
        }
    }, [props.mode])
    const createBook = async (event) => {
        event.preventDefault()
        const fd = new FormData(event.target)

        const book = {
            Title: fd.get('Title'),
            Author: fd.get('Author'),
            Publisher: fd.get('Publisher'),
            Cover: fd.get('Cover'),
            Catagory: fd.get('Catagory'),
            Language: fd.get('Language'),

        }
        const ref = collection( db, "book" )
        const docRef = await addDoc ( ref, book )
        if( docRef.id ){
            console.log("success :)")
            alertType = "success"
            setMessage("adding books was Successful")
            event.target.reset()
            setShow( true )

        }
        else{
            console.log("fail :(")
            alterType = "danger"
            setMessage('Adding book Failed')
            setShow( true )
        }
        setTimeout( () => {setShow(false)}, 4000 )
    }

    return (
        <Container>
            <Row>
                <Col md={{ span: 4, offset: 4}}>
                    <Form id="add-book-form" onSubmit={ (evt) => createBook(evt) }>
                        <h1 className="mt-4">Add a Book</h1>
                        <Form.Group>
                            <Form.Label> Book Title </Form.Label>
                            <Form.Control type="text" name="Title" placeholder="Book Title" required></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label> Book Author </Form.Label>
                            <Form.Control type="text" name="Author" placeholder="Book Auther" required></Form.Control>
                        </Form.Group> 
                        <Form.Group>
                            <Form.Label> Book Publisher </Form.Label>
                            <Form.Control type="text" name="Publisher" placeholder="Book Publisher" required></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label> Cover Image </Form.Label>
                            <Form.Control type="text" name="Cover" placeholder="Cover Image" required></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label> Book Catagory </Form.Label>
                            <Form.Select name="Catagory" required>
                                <option value="Fiction"> Fiction </option>
                                <option value="Non-Fiction"> Non-Fiction </option>
                                <option value="Thriller"> Thriller </option>
                                <option value="Classic"> Classic </option>
                                <option> N/A </option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label> Language </Form.Label>
                            <Form.Select name="Language" required>
                                <option value="English"> English </option>
                                <option value="French"> French </option>
                                <option value="Chinese"> Chinese </option>
                                <option value="Japenese"> Japenese </option>
                            </Form.Select>
                        </Form.Group>
                        <Button type="Submit" variant="primary" className="mt-4 w-100"> Add Book </Button>
                    </Form>
                    <Alert variant={alertType} show={ show } className="my-4">
                    { message }
                    </Alert>                
                </Col>
            </Row>
        </Container>


    )




}