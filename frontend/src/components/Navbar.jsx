import { Link, useNavigate } from 'react-router-dom';
import {isLoggedInAtom} from './LoginPage';
import {useAtom} from 'jotai'

const Navbar = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);
    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/');
    };

    return (
        <nav className="bg-white border-gray-200 fixed top-0 left-0 w-full z-10">
            <div className="max-w-screen-xl flex justify-between items-center mx-auto p-4">
                <Link to="/home" className="text-2xl font-semibold text-gray-900">Your Logo</Link>
                <div className="md:hidden">
                    <button
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                        aria-expanded="false"
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" viewBox="0 0 17 14" xmlns="http://www.w3.org/2000/svg">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                        </svg>
                    </button>
                </div>
                <div className="hidden md:flex md:w-auto" id="navbar-default">
                    <ul className="flex flex-col md:flex-row space-y-4 md:space-x-8 md:space-y-0">
                        <li>
                            <Link to="/home" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" aria-current="page">Home</Link>
                        </li>
                        <li>
                            <Link to="/customers" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Customers</Link>
                        </li>
                        <li>
                            <button onClick={handleLogout} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Logout</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;

