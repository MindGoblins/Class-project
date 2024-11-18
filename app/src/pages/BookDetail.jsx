import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useParams } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import { FirestoreContext } from "../contexts/FirestoreContext"
import { doc, getDoc} from 'firebase/firestore'

export function BookDetail(props) {
    const [book, setBook] = useState()
    const params = useParams()
    const db = useContext(FirestoreContext)

    const getBookDetail = async () => {
        const ref = doc(db, "book", params.bookId)
        const detail = await getDoc(ref)
        let bookObject = detail.data()
        bookObject.id = detail.id
        setBook(bookObject)
    }

    useEffect( () => {
        getBookDetail()
    }, [book])


    if (book) {
        document.Title = book.Title
        return (
            <Container>
                <Row>
                    <Col md={12}>
                        <h1>{book.Title}</h1>
                    </Col>
                    <Col md={6}>
                        <img className="w-50" src={"/book_covers/" + book.Cover} />
                    </Col>
                    <Col md={6}>
                        <p>{ book.Title } by { book.Author }</p>
                    </Col>
                </Row>
            </Container>
        )
    }
    else {
        return (
            <p>I dont work</p>
        )
    }
}