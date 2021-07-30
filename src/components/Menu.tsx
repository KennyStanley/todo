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
import { Transition } from '@headlessui/react'
import Image from 'next/image'

const navigation = [
    { name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
    { name: 'Calendar', href: '#', icon: CalendarIcon, current: false },
    { name: 'Settings', href: '#', icon: CogIcon, current: false },
]

const Menu = ({ logout, closeMenu }: any) => {
    const [isDarktheme, setIsDarkTheme] = useState(true)
    const [isOpen, setIsOpen] = useState(true)
    // const [isFullscreen, setIsFullscreen] = useState(false)

    const [user, setUser] = useUser()

    if (!user.pic) user.pic = '/default-user.svg'

    // const openFullscreen = () => {
    //     setIsFullscreen(true)
    //     const elem: any = document.documentElement
    //     if (elem.requestFullscreen) {
    //         elem.requestFullscreen()
    //     } else if (elem.webkitRequestFullscreen) {
    //         /* Safari */
    //         elem.webkitRequestFullscreen()
    //     } else if (elem.msRequestFullscreen) {
    //         /* IE11 */
    //         elem.msRequestFullscreen()
    //     }
    // }

    // const closeFullscreen = () => {
    //     if (document.fullscreenElement) {
    //         setIsFullscreen(false)
    //         const docAny: any = document
    //         if (docAny.exitFullscreen) {
    //             docAny.exitFullscreen()
    //         } else if (docAny.webkitExitFullscreen) {
    //             /* Safari */
    //             docAny.webkitExitFullscreen()
    //         } else if (docAny.msExitFullscreen) {
    //             /* IE11 */
    //             docAny.msExitFullscreen()
    //         }
    //     }
    // }
    // useEffect(() => {
    //     if (isFullscreen) {
    //         openFullscreen()
    //     } else {
    //         closeFullscreen()
    //     }
    // }, [isFullscreen])

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
            <Transition
                id="menu"
                show={isOpen}
                unmount={false}
                static
                // className={classNames(
                //     isOpen ? 'left-0' : '-left-1/2',
                //     'h-screen absolute md:left-0 md:relative z-10 transition-transform ease-in-out duration-200'
                // )}
                className="absolute md:relative"
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                // afterEnter={() => {
                //     const menu = document.getElementById('menu')
                //     if (menu) {
                //         menu.style.display = 'block'
                //         menu.hidden = false
                //         menu.classList.add('transform', '-translate-x-full')
                //     }}
                // }
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
                afterLeave={() => {
                    const menu = document.getElementById('menu')
                    if (menu) {
                        menu.style.display = 'block'
                        menu.hidden = false
                        menu.classList.add('transform', '-translate-x-full')
                    }
                }}
            >
                <div style={{ height: window.innerHeight }}>
                    <div className="bg-gray-900 flex flex-col h-full pb-4 pt-12 px-4 w-72">
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
                                    className={`
                                    ${
                                        item.current
                                            ? 'bg-gray-800 text-gray-200 shadow-xl'
                                            : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                                    }
                                    group flex items-center px-2 py-2 text-sm font-medium rounded-xl`}
                                >
                                    <item.icon
                                        className={`${item.current}
                                            ? 'text-gray-300'
                                            : 'text-gray-400 group-hover:text-gray-300'}
                                        mr-3 flex-shrink-0 h-6 w-6`}
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
                                className={`${
                                    isDarktheme ? 'bg-blue-600' : 'bg-gray-200'
                                }
                                relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                            >
                                <span className="sr-only">Use setting</span>
                                <span
                                    aria-hidden="true"
                                    className={`${
                                        isDarktheme
                                            ? 'translate-x-5'
                                            : 'translate-x-0'
                                    }
                                    pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
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
                    <button
                        onClick={() => setIsOpen(prevState => !prevState)}
                        className="md:hidden -right-20 absolute bg-blue-600 bottom-6 flex items-center justify-center p-2 rounded-full shadow-xl text-white"
                    >
                        <svg
                            className="w-10 h-10"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </div>
            </Transition>
        </>
    )
}

export default Menu
