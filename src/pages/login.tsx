import React, { FormEvent, useState } from 'react'
import Image from 'next/image'
import Router from 'next/router'
import cookie from 'js-cookie'
import Logo from '../../public/logo_icon.svg'

const Login = () => {
    const [loginError, setLoginError] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        const res = await fetch('/api/auth', {
            method: 'post',
            body: JSON.stringify({
                email,
                password,
            }),
            credentials: 'same-origin',
        })

        const data = await res.json()
        if (data && data.error) {
            setLoginError(data.message)
        }
        if (data && data.token) {
            //set cookie
            cookie.set('token', data.token, { expires: 2 })
            Router.push('/')
        }
    }

    return (
        <div className="grid place-items-center h-screen bg-gray-900">
            <div className="bg-gray-300 rounded-3xl p-11">
                <form onSubmit={handleSubmit}>
                    <header className="text-5xl font-bold mb-8">Login</header>
                    <section className="flex flex-col w-64 justify-between">
                        <div className="mb-3">
                            {/* <label htmlFor="email" className="block text-lg">
                                Email
                            </label> */}
                            <input
                                name="email"
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="rounded-2xl px-5 py-2 w-full shadow-xl"
                            />
                        </div>
                        <div className="mb-6">
                            {/* <label htmlFor="email" className="block text-lg">
                                Password
                            </label> */}
                            <input
                                name="password"
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="rounded-2xl px-5 py-2 w-full shadow-xl"
                            />
                        </div>
                        <input
                            type="submit"
                            value="Submit"
                            className="bg-blue-600 cursor-pointer px-5 py-2 rounded-2xl text-white text-xl shadow-xl"
                        />
                        <div className="w-full text-center">
                            {loginError && (
                                <p className="text-red-500 text-lg font-bold">
                                    {loginError}
                                </p>
                            )}
                        </div>
                    </section>
                </form>
            </div>
        </div>
    )
}

export default Login
