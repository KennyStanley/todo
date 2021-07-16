import { useState } from 'react'
import LogoutButton from '../LogoutButton'
import { v4 as uuidV4 } from 'uuid'
import cx from 'classnames'

type Task = {
    id: string
    title: string
    done: boolean
}

export default function Dashboard({ data, revalidate }: any) {
    const [newTask, setNewTask] = useState('')
    const [tasks, setTasks] = useState<Task[]>([])

    const handleAddTask = () => {
        if (!newTask) return
        setTasks([
            {
                id: uuidV4(),
                title: newTask,
                done: false,
            },
            ...tasks,
        ])
        setNewTask('')
    }

    const handleToggle = (id: string) => {
        const _tasks = tasks.map(task => {
            if (task.id === id) {
                return {
                    ...task,
                    done: !task.done,
                }
            }
            return task
        })

        setTasks(_tasks)
    }

    return (
        <div>
            <div className="flex items-center gap-10">
                <p className="flex-1 text-xl">Welcome {data.email}!</p>
                <LogoutButton revalidate={revalidate} />
            </div>
            <h1 className="mt-10 mb-5 text-3xl">Todo List</h1>

            <label htmlFor="newTask" className="block text-lg">
                New Task
            </label>
            <div className="flex">
                <input
                    name="newTask"
                    type="test"
                    value={newTask}
                    onChange={e => setNewTask(e.target.value)}
                    onKeyUp={e => {
                        if (e.key === 'Enter') handleAddTask()
                    }}
                    className="rounded-l-xl p-1 w-full"
                />
                <button
                    onClick={handleAddTask}
                    className="rounded-r-xl bg-blue-600 text-white text-lg px-4 py-1"
                >
                    Add
                </button>
            </div>

            <ul className="mt-6">
                {tasks
                    .filter(({ done }) => !done)
                    .map(({ id, title, done }) => (
                        <li
                            key={id}
                            onClick={() => handleToggle(id)}
                            className={cx(
                                'my-2 px-6 py-1 rounded-xl text-white text-xl cursor-pointer',
                                {
                                    'bg-red-900  line-through': done,
                                    'bg-blue-900 ': !done,
                                }
                            )}
                        >
                            {title}
                        </li>
                    ))}
            </ul>
            <ul className="">
                {tasks
                    .filter(({ done }) => done)
                    .map(({ id, title, done }) => (
                        <li
                            key={id}
                            onClick={() => handleToggle(id)}
                            className={cx(
                                'bg-blue-900 my-2 px-6 py-1 rounded-xl text-white text-xl cursor-pointer',
                                {
                                    'bg-opacity-50': done,
                                }
                            )}
                        >
                            {title}
                        </li>
                    ))}
            </ul>
        </div>
    )
}
