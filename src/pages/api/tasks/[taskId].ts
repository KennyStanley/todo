import { NextApiRequest, NextApiResponse } from "next"
import middleware from "src/middlewares/database"
import nextConnect from "next-connect"
import assert from "assert"
import { Db, ObjectId } from "mongodb"
import { ITask } from "src/lib/interfaces"
const handler = nextConnect()

handler.use(middleware)

async function replaceTask(db: Db, task: ITask, userId: string, callback: any) {
    const collection = db.collection('tasks')
    const taskUserId = task.userId?.toString()
    if (taskUserId === userId) {
        try {
            console.log('Replacing')
            console.log(`Task ID: ${task._id}`)
            let newTask = { ...task }
            newTask._id = new ObjectId(task._id)
            newTask.userId = new ObjectId(task.userId)
            callback(await collection.replaceOne({ _id: newTask._id }, newTask))
        } catch (error) {
            callback()
        }
    }
}

handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        assert.notEqual(null, req.body.userId, 'User ID required')
        assert.notEqual(null, req.query.taskId, 'Task ID required')
        assert.notEqual(null, req.body.task), 'Task required'
    } catch (bodyError) {
        res.status(403).json({ error: true, message: bodyError.message })
        return
    }

    const db = req.body.db
    const userId = req.body.userId
    const task = req.body.task

    replaceTask(db, task, userId, async (response: any) => {
        let nModified: number = 0
        if (response && response.result && response.result.nModified) nModified = response.result.nModified
        if (!response) {
            res.status(500).json({ error: true, message: 'Error replacing Task' })
            return
        } else if (nModified === 0) {
            res.status(403).json({ error: true, message: 'New Task invalid' })
            return
        } else {
            res.status(200).json({ error: false, message: 'Task Replaced' })
            return
        }
    })
})

export default handler