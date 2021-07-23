import React, { FormEvent, useState } from 'react'
import Router from 'next/router'
import cookie from 'js-cookie'

const Signup = () => {
    const [signupError, setSignupError] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        const res = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
            credentials: 'same-origin',
        })
        const data = await res.json()
        if (data && data.error) {
            setSignupError(data.message)
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
                    <header className="text-5xl font-bold mb-8">Sign Up</header>
                    <section className="flex flex-col w-64 justify-between">
                        <div className="mb-3">
                            <input
                                name="name"
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                className="focus:ring-2 outline-none px-5 py-2 ring-blue-600 rounded-2xl shadow-xl w-full"
                            />
                        </div>
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
                                className="focus:ring-2 outline-none px-5 py-2 ring-blue-600 rounded-2xl shadow-xl w-full"
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
                                className="focus:ring-2 outline-none px-5 py-2 ring-blue-600 rounded-2xl shadow-xl w-full"
                            />
                        </div>
                        <input
                            type="submit"
                            value="Submit"
                            className="bg-blue-600 cursor-pointer px-5 py-2 rounded-2xl text-white text-xl shadow-xl"
                        />
                        <div className="w-full text-center">
                            {signupError && (
                                <p className="text-red-500 text-lg font-bold">
                                    {signupError}
                                </p>
                            )}
                        </div>
                    </section>
                </form>
            </div>
        </div>
    )
}

export default Signup
