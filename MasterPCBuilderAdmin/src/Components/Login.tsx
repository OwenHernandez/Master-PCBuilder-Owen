import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../img/logo_transparent.png'
import axios from 'axios'
import { Globals } from '../Type/Globals';
type Props = {}

const Login = (props: Props) => {

    async function login(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const form = event.currentTarget
        const nickname = form.nickname.value
        const password = form.password.value

        try {
            console.log(Globals.IP_HTTP + '/api/v1/login');

            const response = await axios.post(Globals.IP_HTTP + '/api/v1/login', {
                nick: nickname,
                password: password
            }, {
                headers: {
                    'Access-Control-Allow-Origin': '*', // Añade la cabecera CORS
                }
            })
            console.log(response)
        } catch (error) {
            console.error(error)
        }

    }
    return (
        <section className="bg-gray-50 dark:bg-gradient-to-b from-gray-900 via-gray-600 to-gray-400  h-100">
            <div className="flex flex-col items-center justify-center px-6 py-8  md:h-screen ">
                <a href="#" className="flex items-center mb-2 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img src={logo} alt="logo" className="w-20 h-20" />
                    MasterPCBuilder
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-700 dark:border-gray-900">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Login
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={login}>
                            <div>
                                <label htmlFor="nickname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your nickname</label>
                                <input type="nickname" name="nickname" id="nickname" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="nickname" required={true} />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required={true} />
                            </div>
                            <div>
                                <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login