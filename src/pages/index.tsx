import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import useSWR from 'swr'
import cookie from 'js-cookie'

const fetcher = (url: string) => fetch(url).then(res => res.json())

const IndexPage = () => {
    const { data: user, revalidate } = useSWR('/api/me', fetcher)

    if (!user) return <h1>Loading...</h1>
    let loggedIn = false
    if (user.email) {
        loggedIn = true
    }
    console.log(user)

    const logout = () => {
        cookie.remove('token')
        revalidate()
    }

    return (
        <>
            <div className="bg-gray-900 font-thin grid h-screen items-center text-white">
                <Head>
                    <link rel="icon" href="/favicon.ico" />
                    <title>Todo App</title>
                    <meta
                        name="viewport"
                        content="initial-scale=1.0, width=device-width"
                    />
                </Head>
                <div className="bg-gray-200 m-2 mx-auto p-11 rounded-3xl shadow-xl text-center">
                    {/* <div className="flex flex-col items-center justify-center"> */}
                    {loggedIn && (
                        // <NewDashboard user={user} revalidate={revalidate} />
                        <>
                            <div className="text-black font-bold text-5xl mb-8">
                                Howdy {user.name ? user.name : 'partner'}!
                            </div>
                            <button
                                onClick={logout}
                                className="w-1/2 px-5 py-2 rounded-2xl shadow-xl bg-red-600 text-xl text-white"
                            >
                                Logout
                            </button>
                        </>
                    )}
                    {!loggedIn && (
                        <>
                            <div className="font-bold mb-8 text-5xl text-black text-center">
                                <h1>Todo App</h1>
                            </div>
                            <Link href="/login">
                                <button className="bg-blue-600 mb-5 px-5 py-2 rounded-2xl shadow-xl text-white text-xl w-full">
                                    Login
                                </button>
                            </Link>
                            <Link href="/signup">
                                <button className="bg-white px-5 py-2 rounded-2xl shadow-xl text-gray-700 text-xl w-full">
                                    Sign Up
                                </button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default IndexPage
