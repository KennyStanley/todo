import { NextApiRequest, NextApiResponse } from "next"
import middleware from "src/middlewares/database"
import nextConnect from "next-connect"
import assert from "assert"
import { Db, ObjectId } from "mongodb"
import { ITask } from "src/lib/interfaces"
const handler = nextConnect()

handler.use(middleware)

function findTask(db: Db, email: string, callback: any) {
    const collection = db.collection('users')
    collection.findOne({ email }, callback)
}

function findTasks(db: Db, id: string, callback: any) {
    const collection = db.collection('tasks')
    const userId = new ObjectId(id)
    collection.find({ userId }, callback)
}

function createTask(db: Db, task: ITask, userId: string, callback: any) {
    const collection = db.collection('tasks')
    const collectionId = (task.collectionId ? task.collectionId : null)
    collection.insertOne(
        {
            title: task.title,
            description: task.description,
            color: task.color,
            isCompleted: false,
            startDate: task.startDate,
            dueDate: task.dueDate,
            isRepeating: task.isRepeating || false,
            interval: task.interval,
            userId: new ObjectId(userId),
            collectionId
        },
        function (err: any, taskCreated: any) {
            assert.equal(err, null)
            callback(taskCreated)
        },
    )
}

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        assert.notEqual(null, req.query.userId, 'User ID required')
    } catch (bodyError) {
        res.status(403).json({ error: true, message: bodyError.message })
        return
    }

    const db = req.body.db
    let { userId } = req.query
    if (Array.isArray(userId)) {
        userId = userId[0]
    }
    findTasks(db, userId, async (err: any, cursor: any) => {
        if (err) {
            res.status(500).json({ error: true, message: 'Error finding Tasks' })
            return
        }
        if (cursor) {
            const tasks = await cursor.toArray()
            res.status(200).json(tasks)
        }
    })
})

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        assert.notEqual(null, req.body.userId, 'User ID required')
        assert.notEqual(null, req.body.task), 'Task required'
    } catch (bodyError) {
        res.status(403).json({ error: true, message: bodyError.message })
        return
    }

    const db = req.body.db
    const userId = req.body.userId
    const task = req.body.task
    console.log('Task Info Recieved! O(∩_∩)O')
    console.log(task)

    createTask(db, task, userId, (creationResult: { ops: string | any[] }) => {
        if (creationResult.ops != null && creationResult.ops.length === 1) {
            const task = creationResult.ops[0];

            res.status(200).json({ task })
            return
        } else {
            res.status(500).json({ error: true, message: 'Error' })
            return
        }
    })

    // verify email does not exist already
    // findUser(db, email, async (err: any, user: any) => {
    //     if (err) {
    //         res.status(500).json({ error: true, message: 'Error finding User' })
    //         return
    //     }
    //     if (!user) {
    //         // proceed to Create
    //         await createUser(db, name, email, password, (creationResult: { ops: string | any[] }) => {
    //             if (creationResult.ops != null && creationResult.ops.length === 1) {
    //                 const user = creationResult.ops[0];
    //                 const token = jwt.sign(
    //                     { userId: user._id, email: user.email },
    //                     jwtSecret,
    //                     {
    //                         expiresIn: 3000, //50 minutes
    //                     },
    //                 )
    //                 res.status(200).json({ token })
    //                 return
    //             }
    //         })
    //     } else {
    //         // User exists
    //         res.status(403).json({ error: true, message: 'Email exists' })
    //         return
    //     }
    // })

})

handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
    res.status(200).json({ message: 'Hello' })
})

export default handler