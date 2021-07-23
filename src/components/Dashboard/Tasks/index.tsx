import Task from './Task'
import { ITask } from 'src/lib/interfaces'
import { PlusIcon as PlusIconSolid } from '@heroicons/react/solid'
import { useState } from 'react'
import { CreateTaskForm } from 'src/components/Forms/CreateTaskForm'
import { ObjectId } from 'mongodb'

const Tasks = ({
    tasks,
    addTask,
    updateTask,
    collectionId,
}: {
    tasks: ITask[]
    addTask: any
    updateTask: any
    collectionId?: ObjectId | undefined
}) => {
    const [isCreateFormOpen, setIsCreateFormOpen] = useState(false)

    if (!tasks) tasks = []

    return (
        <>
            <div className="flex items-center">
                <h1 className="font-semibold inline mr-4 text-gray-500 text-sm uppercase">
                    Tasks
                </h1>
                <button
                    type="button"
                    onClick={() => setIsCreateFormOpen(true)}
                    className="inline-flex items-center p-2 rounded-full shadow-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none "
                >
                    <PlusIconSolid className="h-5 w-5" aria-hidden="true" />
                </button>
                {isCreateFormOpen && (
                    <CreateTaskForm
                        addTask={addTask}
                        close={() => setIsCreateFormOpen(false)}
                        collectionId={collectionId}
                    />
                )}
            </div>
            <div className="flex flex-col">
                {tasks.map(task => {
                    if (task.title && task._id && !task.isCompleted)
                        return (
                            <Task
                                key={task._id.toString()}
                                task={task}
                                updateTask={updateTask}
                            />
                        )
                })}
            </div>
        </>
    )
}
export default Tasks
