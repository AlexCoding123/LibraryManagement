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
            setCatalogs(JSON.parse(localStorage.getItem('catalogs')));
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
        </div>
        </>
    );
}

export default HomePage;
