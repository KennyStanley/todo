import Card from './Card'
import { ICollection, ITask } from 'src/lib/interfaces'
import { PlusIcon } from '@heroicons/react/solid'
import { useState } from 'react'
import { CreateCollectionForm } from 'src/components/Forms/CreateCollectionForm'

export const Collections = ({
    collections,
    tasks,
    addTask,
    updateTask,
    addCollection,
}: {
    collections: ICollection[]
    tasks: ITask[]
    addTask: (task: ITask) => void
    updateTask: (task: ITask) => void
    addCollection: (collection: ICollection) => void
}) => {
    const [isCreateFormOpen, setIsCreateFormOpen] = useState(false)

    if (!collections) collections = []
    if (!tasks) tasks = []

    return (
        <>
            <div className="flex items-center">
                <h1 className="font-semibold mr-4 text-gray-500 text-sm uppercase">
                    Collections
                </h1>
                <button
                    type="button"
                    onClick={() => setIsCreateFormOpen(true)}
                    className="inline-flex items-center p-2 rounded-full shadow-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none "
                >
                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                {isCreateFormOpen && (
                    <CreateCollectionForm
                        addCollection={addCollection}
                        close={() => setIsCreateFormOpen(false)}
                    />
                )}
            </div>
            {collections.map(collection => {
                if (collection.title && collection._id)
                    return (
                        <Card
                            key={collection._id.toString()}
                            collection={collection}
                            tasks={tasks}
                            addTask={addTask}
                            updateTask={updateTask}
                        />
                    )
            })}
        </>
    )
}
