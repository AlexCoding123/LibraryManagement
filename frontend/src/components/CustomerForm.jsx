import React from 'react';
import axios from 'axios';
import { atom, useAtom } from 'jotai';
import {useNavigate} from 'react-router-dom';
import {customerAtom} from './Customers';

export const newCustomerFormAtom = atom({
    name: '',
    email: ''
});

const CustomerForm = () => {
    const [customerForm, setCustomerForm] = useAtom(newCustomerFormAtom);
    const [customers, setCustomers] = useAtom(customerAtom);
    const navigate = useNavigate();

    const handleCreateCustomer = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        axios.post('http://localhost:3000/api/customers', {
            name: customerForm.name,
            email: customerForm.email,
            rented: []
        }, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(response => {
                console.log('Customer created successfully:', response.data);
                const updatedCustomers = response.data.customers;
                console.log(updatedCustomers);
                setCustomers(updatedCustomers);
                localStorage.setItem('customers', JSON.stringify(updatedCustomers));

                navigate('/customers');
            })
            .catch(error => {
                console.error('Error creating customer:', error);
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomerForm({ ...customerForm, [name]: value });
    };

    return (
        <form onSubmit={handleCreateCustomer}>
            <label htmlFor="name">Name:</label>
            <input
                type="text"
                id="name"
                value={customerForm.name}
                onChange={handleChange}
                name="name"
                required
            />
            <label htmlFor="email">Email:</label>
            <input
                type="email"
                id="email"
                value={customerForm.email}
                onChange={handleChange}
                name="email"
                required
            />
            <button type="submit">Create Customer</button>
        </form>
    );
};

export default CustomerForm;

