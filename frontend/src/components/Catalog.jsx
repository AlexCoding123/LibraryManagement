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

    const [customers] = useAtom(customerAtom);

    const handleDelete = (e) => {
        e.preventDefault();
        try{
            const token = localStorage.getItem('token');
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

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
                if(!response.status === 200){
                    throw new Error(`API call failed with status ${response.data}`);
                }
                console.log(response.data.content);
                const updatedCatalogs = response.data.content;
                setCatalogs(updatedCatalogs);
                localStorage.setItem("catalogs", JSON.stringify(updatedCatalogs));

                navigate('/home');
            })
        }catch(e){
            console.error('Error deleting catalog')
        }
    }

    return (
        <div>
            <h1>{catalog.name}</h1>
            <h2>{catalog.category}</h2>
            <h3>{catalog.ISBN}</h3>

            <button onClick={handleDelete}>delete</button>
            <button><Link to={`/edit-catalog/${catalogId}`}>edit</Link></button>
        </div>
    );
}

export default Catalog;
