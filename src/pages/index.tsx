import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import useSWR from 'swr'
import cookie from 'js-cookie'
import { UserProvider } from 'src/contexts/UserProvider'
import Menu from 'src/components/Menu'
import Dashboard from 'src/components/Dashboard'
import { useState } from 'react'
import { fetcher } from 'src/lib/fetchers'

const IndexPage = () => {
    const [menuOpen, setMenuOpen] = useState(false)

    const { data: user, revalidate: revalidateUser } = useSWR(
        '/api/me',
        fetcher
    )

    if (!user) return <h1>Loading...</h1>
    let loggedIn = false
    if (user.email) {
        loggedIn = true
    }

    const logout = () => {
        cookie.remove('token')
        revalidateUser()
    }

    return (
        <>
            <div className="text-white">
                <Head>
                    <link rel="icon" href="/favicon.ico" />
                    <title>Todo App</title>
                    <meta
                        name="viewport"
                        content="initial-scale=1.0, width=device-width"
                    />
                </Head>

                {/* <div className="flex flex-col items-center justify-center"> */}
                {loggedIn ? (
                    <>
                        <UserProvider me={user}>
                            <div className="flex w-full h-full bg-gray-900">
                                <div id="menuContainer" className="z-40">
                                    <Menu
                                        logout={logout}
                                        closeMenu={() => setMenuOpen(false)}
                                    />
                                </div>
                                <div
                                    id="mainContentContainer"
                                    className="overflow-hidden relative rounded-2xl w-full"
                                >
                                    <Dashboard
                                        logout={logout}
                                        revalidateUser={revalidateUser}
                                        openMenu={() => setMenuOpen(true)}
                                    />
                                </div>
                            </div>
                        </UserProvider>
                    </>
                ) : (
                    <>
                        <div className="bg-gray-900 w-screen h-screen overflow-hidden grid items-center">
                            <div className="bg-gray-200 grid items-center  m-2 mx-auto p-11 rounded-3xl shadow-xl text-center">
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
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default IndexPage
