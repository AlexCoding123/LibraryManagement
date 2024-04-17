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
        <>
        <h1>Welcome To The Home Page</h1>
        <div>
                {catalogs ?
                    catalogs.map(catalog => (
                        <Link to={`/catalog/${catalog.id}`}>{catalog.name}</Link>
                    ))
                    :
                    <h1>No Catalogs!</h1>
                }

                <button><Link to="/new-catalog">Add Catalog</Link></button>
        </div>
        </>
    );
}

export default HomePage;
