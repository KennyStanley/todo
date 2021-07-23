import {
    CalendarIcon,
    ChartBarIcon,
    FolderIcon,
    HomeIcon,
    InboxIcon,
    MenuIcon,
    UsersIcon,
    CogIcon,
    XIcon,
} from '@heroicons/react/outline'
import { useState, useEffect, useCallback } from 'react'
import { useUser } from 'src/contexts/UserProvider'
import { Switch } from '@headlessui/react'
import Image from 'next/image'

const navigation = [
    { name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
    { name: 'Calendar', href: '#', icon: CalendarIcon, current: false },
    { name: 'Settings', href: '#', icon: CogIcon, current: false },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

const Menu = ({ logout, closeMenu }: any) => {
    const [isDarktheme, setIsDarkTheme] = useState(true)
    const [isFullscreen, setIsFullscreen] = useState(false)

    const [user, setUser] = useUser()

    if (!user.pic) user.pic = '/default-user.svg'

    const openFullscreen = () => {
        setIsFullscreen(true)
        const elem: any = document.documentElement
        if (elem.requestFullscreen) {
            elem.requestFullscreen()
        } else if (elem.webkitRequestFullscreen) {
            /* Safari */
            elem.webkitRequestFullscreen()
        } else if (elem.msRequestFullscreen) {
            /* IE11 */
            elem.msRequestFullscreen()
        }
    }

    const closeFullscreen = () => {
        if (document.fullscreenElement) {
            setIsFullscreen(false)
            const docAny: any = document
            if (docAny.exitFullscreen) {
                docAny.exitFullscreen()
            } else if (docAny.webkitExitFullscreen) {
                /* Safari */
                docAny.webkitExitFullscreen()
            } else if (docAny.msExitFullscreen) {
                /* IE11 */
                docAny.msExitFullscreen()
            }
        }
    }
    useEffect(() => {
        if (isFullscreen) {
            openFullscreen()
        } else {
            closeFullscreen()
        }
    }, [isFullscreen])

    useEffect(() => {
        if (isDarktheme) {
            document.documentElement.classList.add('dark')
            localStorage.setItem('theme', 'dark')
        } else {
            document.documentElement.classList.remove('dark')
            localStorage.setItem('theme', 'light')
        }
    }, [isDarktheme])

    useEffect(() => {
        if (
            localStorage.getItem('theme') === 'dark' ||
            (!('theme' in localStorage) &&
                window.matchMedia('(prefers-color-scheme: dark)').matches)
        ) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [])

    return (
        <>
            <div className="h-screen ">
                <div className="-left-full absolute bg-gray-900 flex flex-col h-full md:left-0 md:relative pb-4 pt-12 px-4 w-72 z-10">
                    <header className=" mb-8 px-4 space-y-5">
                        <Image
                            src={user.pic && user.pic}
                            alt="User Pic"
                            width={56}
                            height={56}
                            className="bg-gray-800 h-14 inline-block ring-4 ring-offset-4 ring-offset-gray-900 rounded-full w-14"
                        />
                        <h1 className="font-bold text-3xl w-min">
                            {user.name ? user.name : ''}
                        </h1>
                    </header>
                    <nav className="flex-1 px-2 space-y-2">
                        {navigation.map(item => (
                            <a
                                key={item.name}
                                href={item.href}
                                className={classNames(
                                    item.current
                                        ? 'bg-gray-800 text-gray-200 shadow-xl'
                                        : 'text-gray-400 hover:bg-gray-700 hover:text-white',
                                    'group flex items-center px-2 py-2 text-sm font-medium rounded-xl'
                                )}
                            >
                                <item.icon
                                    className={classNames(
                                        item.current
                                            ? 'text-gray-300'
                                            : 'text-gray-400 group-hover:text-gray-300',
                                        'mr-3 flex-shrink-0 h-6 w-6'
                                    )}
                                    aria-hidden="true"
                                />
                                {item.name}
                            </a>
                        ))}
                    </nav>
                    {/* <button
                        onClick={() => setIsFullscreen(prevState => !prevState)}
                        className="px-3 py-2 rounded-xl shadow-xl bg-blue-700 text-white"
                    >
                        Fullscreen
                    </button> */}

                    <div className="border-2 flex justify-around my-3 px-3 py-2 rounded-xl shadow-xl text-white">
                        <h1>Join the Dark side</h1>
                        <Switch
                            checked={isDarktheme}
                            onChange={setIsDarkTheme}
                            className={classNames(
                                isDarktheme ? 'bg-blue-600' : 'bg-gray-200',
                                'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                            )}
                        >
                            <span className="sr-only">Use setting</span>
                            <span
                                aria-hidden="true"
                                className={classNames(
                                    isDarktheme
                                        ? 'translate-x-5'
                                        : 'translate-x-0',
                                    'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                                )}
                            />
                        </Switch>
                    </div>

                    {/* <button
                        onClick={closeMenu}
                        className="border-2 border-white h-14 m-4 mx-auto rounded-full w-14"
                    >
                        Close
                    </button> */}

                    <button
                        onClick={logout}
                        className="px-3 py-2 rounded-xl shadow-xl bg-red-600 text-white"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </>
    )
}

export default Menu
