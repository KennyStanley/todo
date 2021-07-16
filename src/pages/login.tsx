import React, { FormEvent, useState } from 'react'
import Router from 'next/router'
import cookie from 'js-cookie'

const Login = () => {
    const [loginError, setLoginError] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleSubmit(e: FormEvent) {
        e.preventDefault()
        fetch('/api/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        })
            .then(r => r.json())
            .then(data => {
                console.log(data)
                if (data && data.error) {
                    setLoginError(data.message)
                }
                if (data && data.token) {
                    //set cookie
                    cookie.set('token', data.token, { expires: 2 })
                    Router.push('/')
                }
            })
    }
    return (
        <div className="grid place-items-center h-screen bg-gray-900">
            <div className="bg-gray-300 rounded-lg p-8">
                <form onSubmit={handleSubmit}>
                    <header className="text-5xl mb-8">Login</header>
                    <section className="flex flex-col w-64 h-64 justify-around">
                        <div>
                            <label htmlFor="email" className="block text-lg">
                                Email
                            </label>
                            <input
                                name="email"
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="rounded p-1 w-full"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-lg">
                                Password
                            </label>
                            <input
                                name="password"
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="rounded p-1 w-full"
                            />
                        </div>
                        <input
                            type="submit"
                            value="Submit"
                            className="bg-blue-600 cursor-pointer px-5 py-2 rounded text-white text-xl"
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
