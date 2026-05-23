import React, { useState } from 'react';
import { Container, Row, Col, Badge, Spinner} from 'react-bootstrap';
import ContactForm from '../components/ContactForm';
import ContactList from '../components/ContactList';
import { useContact } from '../context/ContactContext';

const Homepage = () => {
    const { loading, contacts } = useContact();
    const { contactToEdit, setContactToEdit} = useState(null);

    const handleEdit = (contact) => {
        setContactToEdit(contact);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleEditComplete = () =>{
        setContactToEdit(null);
    };

    if(loading){
        return (
            <Container className='text-center mt-5'>
                <Spinner animation = "border" variant='primary'/>
                <p className='mt-2'>Loading contacts...</p>
            </Container>
        );
    }

    return(
         <Container fluid className='py-4'>
            <Row>
                <Col lg={4} md={12}>
                    <ContactForm
                        contactToEdit={contactToEdit}
                        onEditComplete={handleEditComplete}    
                    />
                </Col>
                <Col lg={8} md={12}>
                    <div className='d-flex justify-content-between align-items-center mb-3'>
                        <h4>Contact List</h4>
                        <Badge bg='primary'>Total: {contacts.length}</Badge>
                    </div>
                    <ContactList onEdit={handleEdit}/>
                </Col>
            </Row>
         </Container>
    );
}

export default Homepage;