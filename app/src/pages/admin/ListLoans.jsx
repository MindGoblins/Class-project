import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

import { AuthContext } from '../../contexts/AuthContext'
import { FirestoreContext } from '../../contexts/FirestoreContext'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, getDocs, updateDoc, doc, serverTimestamp } from 'firebase/firestore'



export function ListLoans(props){
    const[ loans, setLoans] = useState([])

    let loaded = false

    const auth = useContext( AuthContext )
    const db = useContext( FirestoreContext )
    const navigate = useNavigate()

    useEffect(()=> {
        if (props.mode == false){
            navigate('/signin')
        }
    }, [props.mode])

    const getLoans = async () => {
        const loansRef = collection(db, "loans" )
        const snapshot = await getDocs(loansRef)
        let loans = []
        snapshot.forEach( ( loan ) => {
            let item = loan.data()
            item.id = loan.id
            loans.push( item )
        })
        setLoans(loans)
    }
    
    const returnBook = async ( bookId, loanId ) => {
        const ref = doc(db, "book", bookId)
        const update = await updateDoc(ref, {onload: false})
        const loanRef = doc ( db, "loans", loanId)
        const updateLoan =  await updateDoc(loanRef, {returned: serverTimestamp()})
    }

    useEffect( () => {
        if (!loaded) {
            getLoans()
        }
    }, [loaded])

    const BookLoans = loans.map( (loan, key) => {
        return (
            <Row className="my-3" key={key}>
                <Col>{ loan.bookTitle }</Col>
                <Col>{ loan.bookId }</Col>
                <Col>{ loan.userId }</Col>
                <Col>
                    <Button 
                        type="button" 
                        variant="primary" 
                        onClick={ () => returnBook( loan.bookId, loan.id ) } 
                        disabled={ (loan.returned) ? true : false }
                    >
                        Returned
                    </Button>
                </Col>
            </Row>
        )

    })

    return (
        <Container>
            <h1> Loaned books </h1>
            { BookLoans }

        </Container>
    )


}