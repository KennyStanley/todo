import Head from 'next/head'
import fetch from 'isomorphic-unfetch'
import useSWR from 'swr'
import Link from 'next/link'
import Dashboard from '../components/Dashboard'

function Home() {
    const { data, revalidate } = useSWR('/api/me', async function (args: any) {
        const res = await fetch(args)
        return res.json()
    })
    if (!data) return <h1>Loading...</h1>
    let loggedIn = false
    if (data.email) {
        loggedIn = true
    }
    return (
        <div className="grid place-items-center h-screen bg-gray-900">
            <div className="bg-gray-300 rounded-lg p-8">
                <Head>
                    <title>Todo App</title>
                    <meta
                        name="viewport"
                        content="initial-scale=1.0, width=device-width"
                    />
                </Head>

                <div className="flex flex-col items-center justify-center">
                    {loggedIn && (
                        <Dashboard data={data} revalidate={revalidate} />
                    )}
                    {!loggedIn && (
                        <>
                            <div className="mb-8 text-4xl text-center">
                                <h1>Todo App</h1>
                            </div>
                            <Link href="/login">
                                <button className="bg-blue-600 px-5 py-2 mb-5 rounded text-white text-xl w-full">
                                    Login
                                </button>
                            </Link>
                            <Link href="/signup">
                                <button className="bg-green-600 px-5 py-2 rounded text-white text-xl w-full">
                                    Sign Up
                                </button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Home
