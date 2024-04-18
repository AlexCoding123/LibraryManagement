import {atom, useAtom} from 'jotai';
import {useEffect} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

const fetchCatalogs = () => {
    const token = localStorage.getItem('token');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    return axios.get('http://localhost:3000/api/catalogs', config)
    .then(response => {
            if(response.status !== 200){
                throw new Error(`API call failed with status ${response.data}`);
            }
            return response.data.content;
    })
    .catch(error => {
        console.log(error);
        return [];
    })
}

export const catalogAtom = atom([]);

const HomePage = () => {
    const [catalogs, setCatalogs] = useAtom(catalogAtom);

    useEffect(() => {
        if(localStorage.getItem('catalogs')){
            const localCatalogs = JSON.parse(localStorage.getItem('catalogs'));
            setCatalogs(localCatalogs);
            // Sync the backend with local storage
            const token = localStorage.getItem('token');
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            axios.post('http://localhost:3000/api/sync-catalogs', localCatalogs, config)
                .then(response => {
                    console.log('Catalogs synced with backend:', response.data);
                })
                .catch(error => {
                    console.error('Error syncing catalogs with backend:', error);
                });
        }else{
            fetchCatalogs().then(data => {
                setCatalogs(data);
                localStorage.setItem('catalogs',JSON.stringify(data));
            });
        }
    },[])
    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-4">Welcome To The Home Page</h1>
            <div className="overflow-auto max-h-96">
                <table className="table-auto w-full">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Category</th>
                            <th className="px-4 py-2">ISBN</th>
                        </tr>
                    </thead>
                    <tbody>
                        {catalogs.map(catalog => (
                            <tr key={catalog.id} className="bg-white hover:bg-gray-100">
                                <td className="border px-4 py-2">
                                    <Link to={`/catalog/${catalog.id}`} className="text-blue-600 hover:underline">{catalog.name}</Link>
                                </td>
                                <td className="border px-4 py-2">{catalog.category}</td>
                                <td className="border px-4 py-2">{catalog.ISBN}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-4">
                <button><Link to="/new-catalog" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add Catalog</Link></button>
            </div>
        </div>
    );
}

export default HomePage;
