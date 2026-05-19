import React, { createContext, useContext, useState, useEffect, use } from 'react';
import { contactService } from '../services/api';

const ContactContext = createContext();

export const useContact = () => {
    const context = useContext(ContactContext);
    if(!context){
        throw new Error('useContact must be used within ContactProvider');

    }
    return context;
}

export const ContactProvider = ({ children }) => {
    const [contacts, setContacts] = useState ([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchContacts = async () =>{
        try{
            setLoading(true);
            const response = await contactService.getAllContacts();
            setContacts(response.data);
            setError(null);
        }catch (err){
            setError('Failed to fetch contacts');
            console.error(err);
        }finally{
            setLoading(false);
        }
    }

    const addContact = async () => {
        try{
            const response = await contactService.createContact(contact);
            setContacts([...contacts, response.data]);
            return { success : true };
        }catch(err){
            console.log(err);
            return { success: false, error: 'Failed to add contact'};
        }

    };

    const updateContact = async (id, updatedContact) =>{
        try {
        const response = await contactService.updateContact(id, updateContact);
        setContacts(contacts.map(contact => 
            contacts.id === id ? response.data : contact));
            return { success: true };
    } catch(err){
        console.error(err);
        return { success: false, error: 'Failed to update contact'};
    }

        
};
    const deleteContact = async (id) =>{
        try{
            await contactService.deleteContact(id);
            setContacts(contacts.filter(contact => contact.id !== id));
            return { success : true};
        }catch(err){
            console.log(err);
            return { success: false, error: 'Failed to delete contact'};
        }
    };

    const getContactId = async (id) =>{
        try{
            const response = await contactService.getContactById(id);
            return response.data
        }catch(err){
            console.error(err);
            return null;
        }
    }

    useEffect(() =>{
        fetchContacts();
    }, []);

    const value = {
        contacts,
        loading,
        error,
        addContact,
        updateContact,
        deleteContact,
        getContactId,
        fetchContacts,
    };

    return(
        <ContactContext.Provider value = { value }>
            {children}
        </ContactContext.Provider>
    );
}