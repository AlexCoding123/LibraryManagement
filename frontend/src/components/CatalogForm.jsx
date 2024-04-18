import { atom, useAtom } from 'jotai';
import { catalogAtom } from './HomePage';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const formDataAtom = atom({
    name: '',
    category: 'Book',
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
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
            <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700">Name:</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="form-input mt-1 block w-full" />
            </div>
            <div className="mb-4">
                <label htmlFor="category" className="block text-gray-700">Category:</label>
                <select id="category" name="category" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="form-select mt-1 block w-full">
                    <option value="Book">Book</option>
                    <option value="Article">Article</option>
                    <option value="Paper">Paper</option>
                </select>
            </div>
            {formData.category === 'Book' && (
                <div className="mb-4">
                    <label htmlFor="ISBN" className="block text-gray-700">ISBN:</label>
                    <input type="text" id="ISBN" name="ISBN" value={formData.ISBN} onChange={(e) => setFormData({ ...formData, ISBN: e.target.value })} className="form-input mt-1 block w-full" />
                </div>
            )}
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Submit</button>
        </form>
    );
}

export default CatalogForm;

