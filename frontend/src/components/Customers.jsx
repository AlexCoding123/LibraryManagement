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
            <h1>Welcome To The Home Page</h1>
            <div>
                {customers ?
                    customers.map(customer => (
                        <Link to={`/customer/${customer.id}`}>{customer.name}</Link>
                    ))
                    :
                    <h1>No Customers!</h1>
                }

                <button><Link to="/new-customer">Add Customer</Link></button>
            </div>
        </>
    );
}

export default Customers;
