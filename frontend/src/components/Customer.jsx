import { atom, useAtom } from 'jotai';
import { useParams } from 'react-router-dom';
import { customerAtom } from './Customers';
import {catalogAtom} from './HomePage';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export const searchTermAtom = atom('');
export const searchResultsAtom = atom([]);

const Customer = () => {
    const { id } = useParams();
    const customerId = parseInt(id);
    const [customers] = useAtom(customerAtom);
    const [catalogs] = useAtom(catalogAtom);
    const customer = customers.find(c => c.id === customerId);
    const [searchTerm, setSearchTerm] = useAtom(searchTermAtom);
    const [searchResults, setSearchResults] = useAtom(searchResultsAtom);
    const navigate = useNavigate();

    const handleRentCatalog = (catalogId) => {
        const token = localStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        axios.put(`http://localhost:3000/api/rent-catalog/${customerId}/${catalogId}`, {}, config)
            .then(response => {
                console.log('Catalog rented successfully:', response.data);
                // You can update the customerAtom here if needed
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
                // You can update the customerAtom here if needed
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
        <div>
            {customer && (
                <div>
                    <h1>{customer.name}</h1>
                    <h2>Email: {customer.email}</h2>
                    <input
                        type="text"
                        placeholder="Search catalogs..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button onClick={handleSearch}>Search</button>
                    <ul>
                        {searchResults.map(catalog => (
                            <li key={catalog.id}>
                                {catalog.name}
                                <button onClick={() => handleRentCatalog(catalog.id)}>Rent</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Customer;

