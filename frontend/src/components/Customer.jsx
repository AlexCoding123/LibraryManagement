import { atom, useAtom } from 'jotai';
import { useParams } from 'react-router-dom';
import { customerAtom } from './Customers';
import {catalogAtom} from './HomePage';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {useEffect} from 'react';
export const searchTermAtom = atom('');
export const searchResultsAtom = atom([]);
export const rentedCatalogsAtom = atom([]);

const Customer = () => {
    const { id } = useParams();
    const customerId = parseInt(id);
    const [customers, setCustomers] = useAtom(customerAtom);
    const [catalogs] = useAtom(catalogAtom);
    const customer = customers.find(c => c.id === customerId);
    const [searchTerm, setSearchTerm] = useAtom(searchTermAtom);
    const [searchResults, setSearchResults] = useAtom(searchResultsAtom);
    const [rentedCatalogs, setRentedCatalogs] = useAtom(rentedCatalogsAtom);

    const navigate = useNavigate();

    const updateRentedCatalogs = (customerId, rented) => {
        setRentedCatalogs(rented);
        const updatedCustomers = customers.map(customer => {
            if (customer.id === customerId) {
                return { ...customer, rented };
            }
            return customer;
        });
        localStorage.setItem('customers', JSON.stringify(updatedCustomers));
    };
    useEffect(() => {
        setSearchTerm('');
        setSearchResults([]);
        const customersFromLocalStorage = JSON.parse(localStorage.getItem('customers')) || [];
        const currentCustomer = customersFromLocalStorage.find(c => c.id === customerId);
        if (currentCustomer) {
            setRentedCatalogs(currentCustomer.rented || []);
        }
    }, [customerId]);

    const handleRentCatalog = (catalogId) => {
        const token = localStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        axios.put(`http://localhost:3000/api/rent-catalog/${customerId}/${catalogId}`, {}, config)
            .then(response => {
                console.log('Catalog rented successfully:', response.data);
                updateRentedCatalogs(customerId, response.data.customer.rented);
                const updatedCustomers = customers.map(customer => {
                    if (customer.id === customerId) {
                        return { ...customer, rented: response.data.customer.rented };
                    }
                    return customer;

                });
                console.log(updatedCustomers);
                setCustomers(updatedCustomers);
            })
            .catch(error => {
                console.error('Error renting catalog:', error);
            });
    };

    const handleReturnCatalog = (catalogId) => {
        const token = localStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        axios.put(`http://localhost:3000/api/return-catalog/${customerId}/${catalogId}`, {}, config)
            .then(response => {
                console.log('Catalog returned successfully:', response.data);
                updateRentedCatalogs(customerId, response.data.customer.rented);
                const updatedCustomers = customers.map(customer => {
                    if (customer.id === customerId) {
                        return { ...customer, rented: response.data.customer.rented };
                    }
                    return customer;
                });
                console.log(updatedCustomers);
                setCustomers(updatedCustomers);
            })
            .catch(error => {
                console.error('Error returning catalog:', error);
            });
    };

    const handleSearch = () => {
        const results = catalogs.filter(catalog => {
            return (
                catalog.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    (catalog.ISBN && catalog.ISBN.toString().includes(searchTerm)) || // Check if ISBN exists
                    catalog.category.toLowerCase().includes(searchTerm.toLowerCase())
            );
        });
        setSearchResults(results);
    };

    return (
        <div className="container mx-auto">
            {customer && (
                <div>
                    <h1 className="text-2xl font-bold">{customer.name}</h1>
                    <h2>Email: {customer.email}</h2>
                    <input
                        type="text"
                        placeholder="Search catalogs..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full border border-gray-300 rounded px-2 py-1 mt-4"
                    />
                    <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-1 rounded mt-2">Search</button>
                    <ul className="mt-4">
                        {searchResults.map(catalog => (
                            <li key={catalog.id} className="flex justify-between items-center border-b border-gray-300 py-2">
                                <span>{catalog.name}</span>
                                <button onClick={() => handleRentCatalog(catalog.id)} className="bg-green-500 text-white px-2 py-1 rounded">Rent</button>
                            </li>
                        ))}
                    </ul>
                    <h2 className="text-lg font-bold mt-4">Rented Catalogs</h2>
                    {rentedCatalogs.length === 0 ? (
                        <p>No rented catalogs for this customer</p>
                    ) : (
                        <ul className="mt-2">
                            {rentedCatalogs.map(catalogId => {
                                const catalog = catalogs.find(cat => cat.id === catalogId);
                                return (
                                    <li key={catalogId} className="flex justify-between items-center border-b border-gray-300 py-2">
                                        <span>{catalog.name}</span>
                                        <button onClick={() => handleReturnCatalog(catalogId)} className="bg-red-500 text-white px-2 py-1 rounded">Return</button>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
}

export default Customer;

