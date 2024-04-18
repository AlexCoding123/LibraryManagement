import { atom, useAtom } from 'jotai';
import { useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

const fetchCustomers = () => {
    const token = localStorage.getItem('token');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    return axios.get('http://localhost:3000/api/customers', config)
        .then(response => {
            if (response.status !== 200) {
                throw new Error(`API call failed with status ${response.data}`);
            }
            console.log(response.data.customers);
            return response.data.customers;
        })
        .catch(error => {
            console.log(error);
            return [];
        })
}

export const customerAtom = atom([]);

const Customers = () => {
    const [customers, setCustomers] = useAtom(customerAtom);

    useEffect(() => {
        if (localStorage.getItem('customers')) {
            const localCustomers = JSON.parse(localStorage.getItem('customers'));
            setCustomers(localCustomers);
            // Sync the backend with local storage
            const token = localStorage.getItem('token');
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            axios.post('http://localhost:3000/api/sync-customers', localCustomers, config)
                .then(response => {
                    console.log('Customers synced with backend:', response.data);
                })
                .catch(error => {
                    console.error('Error syncing customers with backend:', error);
                });
        } else {
            fetchCustomers().then(data => {
                setCustomers(data);
                localStorage.setItem('customers', JSON.stringify(data));
            });
        }
    }, []);
    return (
        <>
            <h1 className="text-3xl font-bold mb-4">Customers</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {customers && customers.map(customer => (
                            <tr key={customer.id}>
                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                    <Link to={`/customer/${customer.id}`} className="text-blue-500 hover:text-blue-800">{customer.name}</Link>
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{customer.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {customers && customers.length === 0 && (
                <h1 className="text-xl mt-4">No Customers!</h1>
            )}
            <button className="mt-4">
                <Link to="/new-customer" className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">Add Customer</Link>
            </button>
        </>
    );
}

export default Customers;
