import { useState, useCallback, useEffect } from 'react'
import { useUser } from 'src/contexts/UserProvider'
import { fetcherWithUserId } from 'src/lib/fetchers'
import { ICollection, ITask } from 'src/lib/interfaces'
import useSWR from 'swr'
import { Collections } from './Collections'
import { CreateTaskForm } from '../Forms/CreateTaskForm'
import Tasks from './Tasks'
import { ObjectId } from 'mongodb'

const Dashboard = ({ logout, closeMenu, revalidateUser }: any) => {
    const [user, setUser] = useUser()
    const [uncategorizedTasks, setUncategorizedTasks] = useState<any>()

    const { data: tasks, revalidate: revalidateTasks } = useSWR(
        ['/api/tasks', user._id],
        fetcherWithUserId
    )

    useEffect(() => {
        if (tasks) {
            const uncategorizedTasks = tasks.filter(
                (task: ITask) => task.collectionId == null
            )
            setUncategorizedTasks(uncategorizedTasks)
        }
    }, [tasks, setUncategorizedTasks])

    const addTask = useCallback(
        async (newTask: ITask) => {
            const userId = user._id

            const res = await fetch('/api/tasks/', {
                method: 'POST',
                body: JSON.stringify({ userId, task: newTask }),
            })
            const data = await res.json()
            if (data && data.error) {
                console.log(data.message)
            }
            if (data) {
                revalidateTasks()
                console.log(data)
            }
        },
        [user, revalidateTasks]
    )

    const updateTask = useCallback(
        async (updatedTask: ITask) => {
            const userId = user._id
            const res = await fetch(`/api/tasks/${updatedTask._id}`, {
                method: 'PUT',
                body: JSON.stringify({ userId, task: updatedTask }),
            })
            const data = await res.json()
            if (data && data.error) {
                console.log(data.message)
            }
            if (data) {
                revalidateTasks()
                console.log(data)
            }
        },
        [user, revalidateTasks]
    )

    const addCollection = useCallback(
        async (newCollection: ICollection) => {
            const userId = user._id

            const res = await fetch('/api/collections/', {
                method: 'POST',
                body: JSON.stringify({ userId, collection: newCollection }),
            })
            const data = await res.json()
            if (data && data.error) {
                console.log(data.message)
            }
            if (data) {
                setTimeout(() => {
                    revalidateUser()
                }, 500)

                console.log(data)
            }
        },
        [user, revalidateUser]
    )

    // const closeCreateForm = () => {
    //     setIsCreateFormOpen(false)
    // }

    return (
        <>
            <div className="bg-gray-200 dark:bg-gray-950 h-screen overflow-y-scroll p-8 rounded-3xl text-black relative">
                <ul className="dark:divide-gray-800 divide-gray-200 divide-y">
                    <li className="py-4">
                        {user.collections && (
                            <Collections
                                collections={user.collections}
                                tasks={tasks}
                                addTask={addTask}
                                updateTask={updateTask}
                                addCollection={addCollection}
                            />
                        )}
                    </li>
                    <li className="py-4">
                        {uncategorizedTasks && (
                            <Tasks
                                tasks={uncategorizedTasks}
                                addTask={addTask}
                                updateTask={updateTask}
                            />
                        )}
                    </li>
                </ul>
                {/* <button
                    onClick={() => setIsCreateFormOpen(true)}
                    className="absolute bg-blue-600 bottom-6 flex h-14 items-center justify-center right-6 rounded-full text-white w-14"
                >
                    <svg
                        className="w-12 h-12"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
                {isCreateFormOpen && (
                    <CreateTaskForm addTask={addTask} close={closeCreateForm} />
                )} */}
            </div>
        </>
    )
}

export default Dashboard
