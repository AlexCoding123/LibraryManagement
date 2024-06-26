import { useAtomValue} from 'jotai'
import './App.css'
import LoginPage from './components/LoginPage'
import HomePage from './components/HomePage'
import Catalog from './components/Catalog'
import CatalogForm from './components/CatalogForm'
import UpdateCatalogForm from './components/UpdateCatalogForm'
import Customers from './components/Customers'
import Customer from './components/Customer'
import CustomerForm from './components/CustomerForm'
import Navbar from './components/Navbar';
import {isLoggedInAtom} from './components/LoginPage';
import { Route, Routes} from 'react-router-dom';

function App() {
    const isLoggedIn = useAtomValue(isLoggedInAtom);
    return (
        <div className="flex flex-col h-screen">
            {isLoggedIn ? <Navbar /> : null}
            <div className={isLoggedIn ? "mt-40 flex-grow" : "flex-grow"}>
                <Routes>
                    <Route path='/' element={<LoginPage />} />
                    <Route path='/home' element={<HomePage />} />
                    <Route path='/catalog/:id' element={<Catalog />} />
                    <Route path='/new-catalog' element={<CatalogForm />} />
                    <Route path='/edit-catalog/:id' element={<UpdateCatalogForm />} />
                    <Route path='/customers' element={<Customers />} />
                    <Route path='/customer/:id' element={<Customer />} />
                    <Route path='/new-customer' element={<CustomerForm />} />
                </Routes>
            </div>
        </div>
    )
}

export default App;
