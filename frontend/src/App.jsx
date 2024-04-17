import { useAtomValue} from 'jotai'
import './App.css'
import LoginPage from './components/LoginPage'
import HomePage from './components/HomePage'
import {isLoggedInAtom} from './components/LoginPage';
function App() {
    const isLoggedIn = useAtomValue(isLoggedInAtom);
    return (
            <>
                {isLoggedIn ?
                    <HomePage />
                :
                    <LoginPage />
                }
            </>
        )
}

export default App
