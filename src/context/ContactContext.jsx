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
            
        }
    }
}