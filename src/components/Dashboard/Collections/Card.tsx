import { ICollection, ITask } from 'src/lib/interfaces'
import { useState, useCallback, useEffect } from 'react'
import { View } from './View'
import Tasks from '../Tasks'

const Card = ({
    collection,
    tasks,
    addTask,
    updateTask,
}: {
    collection: ICollection
    tasks: ITask[]
    addTask: (task: ITask) => void
    updateTask: (task: ITask) => void
}) => {
    const [isOpen, setIsOpen] = useState(false)

    const relevantTasks = tasks.filter(
        task => task.collectionId === collection._id
    )

    return (
        <>
            {isOpen ? (
                <View
                    collection={collection}
                    tasks={relevantTasks}
                    addTask={addTask}
                    updateTask={updateTask}
                    setIsOpen={setIsOpen}
                />
            ) : (
                <div
                    onClick={() => setIsOpen(true)}
                    className="bg-white dark:bg-gray-750 inline-block mx-1 my-4 p-4 rounded-2xl shadow-xl w-48 select-none overflow-hidden cursor-pointer"
                >
                    <div className="text-gray-500 dark:text-gray-400 text-sm">
                        {relevantTasks.length} task
                        {relevantTasks.length === 1 ? '' : 's'}
                    </div>
                    <h1 className="font-bold ml-0.5 w-max text-2xl dark:text-white">
                        {collection.title}
                    </h1>
                    <div
                        style={{ backgroundColor: collection.color }}
                        className="h-1 mt-3 rounded-full w-full"
                    ></div>
                </div>
            )}
        </>
    )
}
export default Card
