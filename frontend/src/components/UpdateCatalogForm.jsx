import { atom, useAtom } from 'jotai';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import {catalogAtom} from './HomePage'
import {useEffect} from 'react'
const formDataAtom = atom({
    name: '',
    category: '',
    ISBN: ''
});

const CatalogForm = () => {
    const [catalogs, setCatalogs] = useAtom(catalogAtom);
    const [formData, setFormData] = useAtom(formDataAtom);
    const navigate = useNavigate();

    const {id} = useParams();
    const catalogId = parseInt(id);

    const handleSubmit = (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            axios.put(`http://localhost:3000/api/catalogs?id=${catalogId}`, formData, config)
            .then(response => {
                    const updatedCatalogs = response.data.content;
                    console.log(updatedCatalogs);
                    setCatalogs(updatedCatalogs);
                    localStorage.setItem("catalogs", JSON.stringify(updatedCatalogs));

                navigate('/home');
            })
            .catch(error => {
                console.error(error);
            })
        } catch (error) {
            console.error('Error adding catalog:', error);
        }
    }

    useEffect(() => {
        const catalog = catalogs.find(cat => cat.id === catalogId);
        const name = catalog.name;
        const category = catalog.category;
        const isbn = catalog.ISBN;

        setFormData({
            name: name,
            category: category,
            ISBN: isbn
        });
    }, [])

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" name="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            </label>
            <label>
                Category:
                <input type="text" name="category" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} />
            </label>
            <label>
                ISBN:
                <input type="text" name="ISBN" value={formData.ISBN} onChange={(e) => setFormData({ ...formData, ISBN: e.target.value })} />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
}

export default CatalogForm;

