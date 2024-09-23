import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import  Col from 'react-bootstrap/Col'
import { FormGroup } from 'react-bootstrap';
export function Signup ( props ) {
    return (
    <>
        <Container>
            <Row>
                <Col md={{ span:4, offset: 1.5 }}>
                    <Form className='mt-4'>
                        <h2 color='Red'>Sign Up Now!</h2>
                        <Form.Group>
                            <Form.Label className='mt-2'>Email</Form.Label>
                            <Form.Control type="email" placeholder='you@domain.com'/>
                        
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className='mt-2'>Password</Form.Label>
                            <Form.Control type="password" placeholder="minimum of 6 charators"/>
                        </Form.Group>
                        <Button type='submit' variant="info" className='my-3 mx-auto d-block w-100'>Signup</Button>
                    </Form>
                </Col>
            </Row>
        </Container>

    </>


    )







}