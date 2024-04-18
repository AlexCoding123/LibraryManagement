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
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Create Customer</h2>
            <form onSubmit={handleCreateCustomer}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={customerForm.name}
                        onChange={handleChange}
                        name="name"
                        required
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={customerForm.email}
                        onChange={handleChange}
                        name="email"
                        required
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                </div>
                <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Create Customer</button>
            </form>
        </div>
    );
};

export default CustomerForm;

