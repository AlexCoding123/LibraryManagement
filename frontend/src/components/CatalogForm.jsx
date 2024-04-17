import { atom, useAtom } from 'jotai';
import { catalogAtom } from './HomePage';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const formDataAtom = atom({
    name: '',
    category: '',
    ISBN: ''
});

const CatalogForm = () => {
    const [catalogs, setCatalogs] = useAtom(catalogAtom);
    const [formData, setFormData] = useAtom(formDataAtom);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            axios.post('http://localhost:3000/api/catalogs', formData, config)
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

