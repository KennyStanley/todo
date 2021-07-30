import { useState, useEffect, useCallback, FormEvent, Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { ITask } from 'src/lib/interfaces'
import { ColorPicker, useColor } from 'react-color-palette'
import 'react-color-palette/lib/css/styles.css'
import classNames from 'src/lib/classNames'
import { ObjectId } from 'mongodb'

export const CreateTaskForm = ({
    addTask,
    close,
    collectionId,
}: {
    addTask: (newTask: ITask) => Promise<void>
    close: () => void
    collectionId?: ObjectId | undefined
}) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [color, setColor] = useColor('hex', '#121212')

    const handleAddTask = useCallback(
        (e: FormEvent) => {
            e.preventDefault()
            addTask({
                title,
                description,
                collectionId,
                color: color.hex,
                isCompleted: false,
                isRepeating: false,
            })
            close()
        },
        [title, description, color, addTask, close]
    )

    return (
        <>
            <div className="overflow-hidden absolute bg-gray-200 dark:bg-gray-950 dark:text-white h-full left-0 p-8 rounded-3xl top-0 w-full">
                <button onClick={close}>
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
                <h1 className="font-bold inline ml-0.5 pl-6 text-3xl w-max">
                    Create a task
                </h1>
                <div className="grid place-items-center gap-10 w-full h-full">
                    <form onSubmit={handleAddTask} className="text-center w-80">
                        <div className="mb-10">
                            <div className="mt-1 border-b border-gray-300 focus-within:border-blue-600">
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    className="text-4xl outline-none leading-normal bg-transparent block border-0 border-b border-transparent focus:ring-0 w-full"
                                    placeholder="Enter new task"
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="mb-6">
                            <div className="mt-1 border-b border-gray-300 focus-within:border-blue-600">
                                <input
                                    type="text"
                                    name="description"
                                    id="description"
                                    className="text-xl outline-none bg-transparent block border-0 border-b border-transparent focus:ring-0 w-full"
                                    placeholder="Description (optional)"
                                    value={description}
                                    onChange={e =>
                                        setDescription(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <div className="flex justify-around">
                            <Popover className="relative">
                                {({ open }) => (
                                    <>
                                        <Popover.Button
                                            className={classNames(
                                                open
                                                    ? 'text-gray-900'
                                                    : 'text-gray-500',
                                                'group bg-white rounded-full inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                                            )}
                                        >
                                            <span
                                                style={{
                                                    backgroundColor: color.hex,
                                                }}
                                                className="w-10 h-10 m-2 rounded-full"
                                            ></span>
                                        </Popover.Button>

                                        <Transition
                                            show={open}
                                            as={Fragment}
                                            enter="transition ease-out duration-200"
                                            enterFrom="opacity-0 translate-y-1"
                                            enterTo="opacity-100 translate-y-0"
                                            leave="transition ease-in duration-150"
                                            leaveFrom="opacity-100 translate-y-0"
                                            leaveTo="opacity-0 translate-y-1"
                                        >
                                            <Popover.Panel
                                                static
                                                className="absolute left-1/2 transform z-10"
                                                style={{
                                                    transform:
                                                        'translate(-23%, -115%)',
                                                }}
                                            >
                                                <div className="overflow-hidden">
                                                    <div className="px-5 py-6 relative sm:gap-8">
                                                        <ColorPicker
                                                            width={300}
                                                            height={200}
                                                            color={color}
                                                            onChange={setColor}
                                                            hideHSV
                                                            hideHEX
                                                            hideRGB
                                                        />
                                                    </div>
                                                </div>
                                            </Popover.Panel>
                                        </Transition>
                                    </>
                                )}
                            </Popover>

                            <button
                                type="submit"
                                className="text-xl bg-blue-600 rounded-full px-8 py-2 hover:bg-blue-700"
                            >
                                Add
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
