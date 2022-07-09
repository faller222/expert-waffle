import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {create, showRegisterForm} from './userSlice';
import logo from "./logo.png";

export function UserRegister() {

    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');

    const register = () => {
        console.log(password, rePassword)
        if (password === rePassword) {
            dispatch(create({first_name: firstName, last_name: lastName, email, username, password}))
        }
    }


    return (
        <div className=" min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <img
                        className="mx-auto h-12 w-auto"
                        src={logo}
                        alt="Workflow"
                    />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your
                        account</h2>
                </div>
                <form>
                    <div className="shadow overflow-hidden sm:rounded-md">
                        <div className="px-4 py-5 bg-white sm:p-6">
                            <div className="grid grid-cols-6 gap-6">

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="first-name"
                                           className="block text-sm font-medium text-gray-700">First
                                        name</label>
                                    <input type="text" name="first-name" id="first-name"
                                           autoComplete="given-name"
                                           className="mt-1 focus:ring-purple-500 focus:border-purple-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                           value={firstName}
                                           onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="last-name"
                                           className="block text-sm font-medium text-gray-700">Last name</label>
                                    <input type="text" name="last-name" id="last-name"
                                           autoComplete="family-name"
                                           className="mt-1 focus:ring-purple-500 focus:border-purple-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                           value={lastName}
                                           onChange={(e) => setLastName(e.target.value)}
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-5">
                                    <label htmlFor="email-address"
                                           className="block text-sm font-medium text-gray-700">Email
                                        address</label>
                                    <input type="text" name="email-address" id="email-address"
                                           autoComplete="email"
                                           className="mt-1 focus:ring-purple-500 focus:border-purple-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                           value={email}
                                           onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-4">
                                    <label htmlFor="username"
                                           className="block text-sm font-medium text-gray-700">Username</label>
                                    <input type="text" name="username" id="username"
                                           className="mt-1 focus:ring-purple-500 focus:border-purple-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                           value={username}
                                           onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="password"
                                           className="block text-sm font-medium text-gray-700">Password</label>
                                    <input name="password" id="password"
                                           autoComplete="password" type="password"
                                           className="mt-1 focus:ring-purple-500 focus:border-purple-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                           value={password}
                                           onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="re-password"
                                           className="block text-sm font-medium text-gray-700">Re Password</label>
                                    <input name="re-password" id="re-password"
                                           autoComplete="re-password" type="password"
                                           className="mt-1 focus:ring-purple-500 focus:border-purple-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                           value={rePassword}
                                           onChange={(e) => setRePassword(e.target.value)}/>
                                </div>

                            </div>
                        </div>
                        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">

                            <button type="button"
                                    onClick={() => dispatch(showRegisterForm(false))}
                                    className="mr-5 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-400 hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-300">Back
                            </button>

                            <button type="button"
                                    onClick={register}
                                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">Save
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>);
}