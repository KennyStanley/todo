import { ITask } from 'src/lib/interfaces'
import { useState } from 'react'
import { View } from './View'

const Task = ({ task, updateTask }: { task: ITask; updateTask: any }) => {
    const [isOpen, setIsOpen] = useState(false)

    const completeTask = async () => {
        let updatedTask = { ...task }
        updatedTask.isCompleted = true
        updateTask(updatedTask)
    }

    return (
        <>
            {isOpen ? (
                <View
                    task={task}
                    updateTask={updateTask}
                    setIsOpen={setIsOpen}
                />
            ) : (
                <div
                    onClick={() => setIsOpen(true)}
                    className="flex items-center h-12 bg-white dark:bg-gray-750 mx-1 my-4 p-4 rounded-2xl shadow-xl w-max select-none cursor-pointer"
                >
                    <div
                        onClick={completeTask}
                        style={{ borderColor: task.color }}
                        className="h-6 w-6 border-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
                    ></div>
                    <h1 className="font-medium mx-4 text-lg dark:text-white">
                        {task.title}
                    </h1>
                </div>
            )}
        </>
    )
}

export default Task
