import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const contactService = {
    getAllContacts: ()=> api.get('/users'),

    getContactById: (id) => api.get(`/users/${id}`),

    createContact: (contact) => api.post('/add', contact),

    updateContact: (id, contact) => api.put(`/update/${id}`, contact),

    deleteContact: (id) => api.delete(`/delete/${id}`),
}

export default api;