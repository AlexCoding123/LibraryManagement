import {useAtom} from 'jotai';
import {useParams} from 'react-router-dom';
import {catalogAtom} from './HomePage'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom';
import {customerAtom} from './Customers'

const Catalog = () => {
    const {id} = useParams();
    const catalogId = parseInt(id);
    const [catalogs, setCatalogs] = useAtom(catalogAtom);
    const catalog = catalogs.find(cat => cat.id === catalogId);
    const navigate = useNavigate();
    const customers = JSON.parse(localStorage.getItem('customers')) || [];

    const handleDelete = (e) => {
        e.preventDefault();
        try{
            const token = localStorage.getItem('token');
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            console.log(customers);

            const isCatalogRented = customers.some(customer => {
                return customer.rented.includes(catalogId);
            });


            if (isCatalogRented) {
                window.alert('Cannot delete a catalog that is rented by a customer.');
                return;
            }

            const url = `http://localhost:3000/api/catalogs?id=${catalog.id}`;
            axios.delete(url, config)
            .then(response => {

                if(response.status !== 200){
                    throw new Error(`API call failed with status ${response.data}`);
                }

                const updatedCatalogs = response.data.content;
                setCatalogs(updatedCatalogs);
                localStorage.setItem("catalogs", JSON.stringify(updatedCatalogs));

                navigate('/home');
            })
            .catch(error => {
                console.error('Error:', error);
                window.alert('Cannot delete, persmission denied');
            });
        }catch(e){
            console.error('Error deleting catalog', e)
        }
    }

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden flex">
            <div className="w-3/4 pr-10">
                <h1 className="text-xl font-bold">{catalog.name}</h1>
                <h2 className="text-lg font-medium text-gray-600">{catalog.category}</h2>
                {catalog.category === 'Book' && (
                    <p className="text-sm text-gray-500">ISBN: {catalog.ISBN}</p>
                )}
            </div>
            <div className="w-1/4 pl-10 flex justify-end items-center space-x-4">
                <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
                <button onClick={() => navigate(`/edit-catalog/${catalogId}`)} className="bg-blue-500 text-white px-4 py-2 rounded">Edit</button>
            </div>
        </div>
    );
}

export default Catalog;
