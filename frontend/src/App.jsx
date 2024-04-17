import { useAtomValue} from 'jotai'
import './App.css'
import LoginPage from './components/LoginPage'
import HomePage from './components/HomePage'
import Catalog from './components/Catalog'
import CatalogForm from './components/CatalogForm'
import UpdateCatalogForm from './components/UpdateCatalogForm'
import {isLoggedInAtom} from './components/LoginPage';
import { Route, Routes} from 'react-router-dom';

function App() {
    const isLoggedIn = useAtomValue(isLoggedInAtom);
    return (
            <>
                    <Routes>
                        <Route path='/' element={<LoginPage />} />
                        <Route path='/home' element={<HomePage />} />
                        <Route path='/catalog/:id' element={<Catalog />} />
                        <Route path='/new-catalog' element={<CatalogForm />} />
                        <Route path='/edit-catalog/:id' element={<UpdateCatalogForm />} />
                    </Routes>
            </>
        )
}

export default App
