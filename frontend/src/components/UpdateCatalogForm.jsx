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

            const { name, category, ISBN } = formData;
            const requestBody = { name, category, ISBN };
            console.log(requestBody);
            axios.put(`http://localhost:3000/api/catalogs?id=${catalogId}`, requestBody, config)
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

    const handleCategoryChange = (e) => {
        const newCategory = e.target.value;
        // Reset ISBN value if the new category is not 'Book'
        const newISBN = newCategory !== 'Book' ? '' : formData.ISBN;
        setFormData({ ...formData, category: newCategory, ISBN: newISBN });
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
            <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    pattern="[A-Za-z\s]+"
                    title="Only letters and spaces are allowed"
                    maxLength={100}
                    required                    className="form-input mt-1 block w-full" />
            </div>
            <div className="mb-4">
                <label htmlFor="category" className="block text-gray-700">Category:</label>
                <select id="category" name="category" value={formData.category} onChange={handleCategoryChange} className="form-select mt-1 block w-full">
                    <option value="Book">Book</option>
                    <option value="Article">Article</option>
                    <option value="Paper">Paper</option>
                </select>
            </div>
            {formData.category === 'Book' && (
                <div className="mb-4">
                    <label htmlFor="ISBN" className="block text-gray-700">ISBN:</label>
                    <input
                        type="text"
                        id="ISBN"
                        name="ISBN"
                        value={formData.ISBN}
                        onChange={(e) => setFormData({ ...formData, ISBN: e.target.value })}
                        pattern="[0-9]+"
                        title="Only numbers are allowed"
                        maxLength={13}
                        className="form-input mt-1 block w-full" />
                </div>
            )}
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Submit</button>
        </form>
    );
}

export default CatalogForm;

