import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { useParams } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import { FirestoreContext } from "../contexts/FirestoreContext"
import { doc, getDoc, updateDoc, addDoc, serverTimestamp, collection} from 'firebase/firestore'
import { AuthContext } from '../contexts/AuthContext'

export function BookDetail(props) {
    const [book, setBook] = useState()
    const [signedIn, setSignedIn ] = useState( false )
    const [borrowed, setBorrowed] = useState( false )
    const params = useParams()
    const db = useContext(FirestoreContext)

    const auth = useContext( AuthContext )

    useEffect( () => {

        if( auth ){
            console.log("signed in")
            setSignedIn( true )
        }
        else{
            console.log("intuder!!!!")
            setSignedIn( false )
        }
    }, [auth])

    const getBookDetail = async () => {
        const ref = doc(db, "book", params.bookId)
        const detail = await getDoc(ref)
        let bookObject = detail.data()
        bookObject.id = detail.id
        if (bookObject.onloan){
            setBorrowed(true)
        }
        setBook(bookObject)
    }
    //book borrow function
    const borrowBook = async () => {
        const ref = doc( db, "book", book.id )
        const update = await updateDoc( ref, {onloan: true})
        //let tempbook = book
        //tempbook.onloan = true
        //setBook( tempbook )
        setBorrowed( true )
        //console.log( auth.uid, new Date().getTime() )
        const loanRecord = await addDoc(collection(db, 'loans'),
        {
            bookId: book.id,
            bookTitle: book.Title,
            userId: auth.uid,
            time: serverTimestamp()

        }
    )
    console.log( loanRecord.id )
}

    const BorrowButton = ( props ) => {
        if (signedIn){
        return(
            <Button type="button" variant='primary'onClick={ () => borrowBook() } disabled={(borrowed) ? true:false }> 
            { (borrowed) ? 'This book is borrowed':'Borrow book!'} 
            </Button>
        )
    }
    else{
        
    }
    }

    useEffect( () => {
        if(!book){
            getBookDetail()
        }
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
                    <BorrowButton/>
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