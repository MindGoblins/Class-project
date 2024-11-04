import { useContext, useState, useEffect } from "react"
import { FirestoreContext } from "../contexts/FirestoreContext"
import { Container } from "react-bootstrap"
import Row from "react-bootstrap/Row"
import Col from 'react-bootstrap/Col'
import { collection, getDocs } from "firebase/firestore";
import Card from 'react-bootstrap/Card'
import Button from "react-bootstrap/Button"


export function Home ( props ) {

    const [bookdata, setBookData] = useState([])

    let booksLoaded = false

    const db = useContext( FirestoreContext)

    const getBooks = async () => {
        const booksCollection = collection( db, "book")
        const result = await getDocs( booksCollection )
        let booksArray = []
        result.forEach( (doc) => {
            let bookItem = doc.data()
            bookItem.id = doc.id
            booksArray.push( bookItem )
        })
        setBookData(booksArray)
        console.log (booksArray)
       
    }
    useEffect(() => {
        if (booksLoaded == false)
        getBooks()
        booksLoaded == true
    }, [booksLoaded])


    const Books = bookdata.map( (book) => {
        return(
            <Col md={3}>
                <Card>
                    <Card.Img variant ="top" src={'/book_covers/' + book.Cover}/>
                    <Card.Body>
                        <Card.Title>{ book.Title }</Card.Title>
                    </Card.Body>
                </Card>
            </Col>


        )

    }
    
    )
    return(
        <Container fluid>
            <Row>
                <Col>   
                    <h1>Library System</h1>
                </Col>
            </Row>
            <Row>
                {Books}
            </Row>
        </Container>

    )


    




}