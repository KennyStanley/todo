import { ITask } from 'src/lib/interfaces'

export const View = ({
    task,
    updateTask,
    setIsOpen,
}: {
    task: ITask
    updateTask: (task: ITask) => void
    setIsOpen: (isOpen: boolean) => void
}) => {
    return (
        <>
            <div className="absolute bg-gray-200 dark:bg-gray-950 dark:bg- h-full left-0 p-8 rounded-3xl top-0 w-full">
                <button onClick={() => setIsOpen(false)}>
                    <svg
                        className="w-6 dark:text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
                <h1 className="dark:text-white font-bold inline ml-0.5 pl-6 text-3xl w-max">
                    {task.title}
                </h1>
                <h1 className="dark:text-gray-400 font-bold ml-0.5 pl-14 text-xl w-max mt-2">
                    {task.description}
                </h1>
                <div
                    className="m-4 w-full h-2 rounded-full inline-block"
                    style={{ backgroundColor: task.color }}
                ></div>
            </div>
        </>
    )
}
