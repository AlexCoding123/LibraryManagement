import axios from 'axios';
import {atom, useAtom, useSetAtom} from 'jotai';
import { useNavigate } from 'react-router-dom';

const usernameAtom = atom('');
const passwordAtom = atom('');
export const isLoggedInAtom = atom(false);
const LoginPage = () => {
    const [username, setUsername] = useAtom(usernameAtom);
    const [password, setPassword] = useAtom(passwordAtom);
    const  setIsLoggedIn = useSetAtom(isLoggedInAtom);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        axios.post('http://localhost:3000/users/login', {
            username: username,
            password: password
        })
        .then(response => {
            if(!response.status === 200){
                throw new Error(`API call failed with status ${response.data}`);
            }
            localStorage.setItem('token', response.data.token);
            setIsLoggedIn(true);
            navigate('/home');
        })
        .catch(error => {
            console.log(error);
        })
    }

    return (
        <section class="bg-login-dark dark:bg-gray-900">
            <div class="flex flex-col items-center justify-center px-6 py-8
                mx-auto md:h-screen lg:py-0">
                <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0
                    sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 class="text-xl font-bold leading-tight tracking-tight
                            text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                        <form class="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label for="username"
                                    class="block mb-2 text-sm font-medium
                                    text-gray-900 dark:text-white">Username</label>
                                <input type="text"
                                    name="username"
                                    id="username"
                                    class="bg-gray-50 border border-gray-300
                                    text-gray-900 sm:text-sm rounded-lg
                                    focus:ring-primary-600 focus:border-primary-600
                                    block w-full p-2.5 dark:bg-gray-700
                                    dark:border-gray-600 dark:placeholder-gray-400
                                    dark:text-white dark:focus:ring-blue-500
                                    dark:focus:border-blue-500"
                                    required=""
                                    onChange={(e) => {setUsername(e.target.value)}}
                                />
                            </div>
                            <div>
                                <label for="password"
                                    class="block mb-2 text-sm font-medium
                                    text-gray-900 dark:text-white">Password</label>
                                <input type="password"
                                    name="password"
                                    id="password"
                                    class="bg-gray-50 border border-gray-300
                                    text-gray-900 sm:text-sm rounded-lg
                                    focus:ring-primary-600 focus:border-primary-600
                                    block w-full p-2.5 dark:bg-gray-700
                                    dark:border-gray-600 dark:placeholder-gray-400
                                    dark:text-white dark:focus:ring-blue-500
                                    dark:focus:border-blue-500"
                                    required=""
                                    onChange={(e) => {setPassword(e.target.value)}}
                                />
                            </div>
                            <button type="submit"
                                class="w-full text-white bg-primary-600
                                hover:bg-primary-700 focus:ring-4 focus:outline-none
                                focus:ring-primary-300 font-medium rounded-lg
                                text-sm px-5 py-2.5 text-center dark:bg-primary-600
                                dark:hover:bg-primary-700
                                dark:focus:ring-primary-800">Sign in</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default LoginPage;
