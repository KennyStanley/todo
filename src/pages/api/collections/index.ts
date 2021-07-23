import { NextApiRequest, NextApiResponse } from "next"
import middleware from "src/middlewares/database"
import nextConnect from "next-connect"
import assert from "assert"
import { Db, MongoError, ObjectId } from "mongodb"
import { ICollection } from "src/lib/interfaces"
const handler = nextConnect()

handler.use(middleware)


function createCollection(db: Db, collection: ICollection, userId: string, callback: any) {
    const dbCollection = db.collection('users')
    collection._id = new ObjectId()
    dbCollection.updateOne({ _id: new ObjectId(userId) }, { $push: { "collections": collection } }, callback)
}

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        assert.notEqual(null, req.body.userId, 'User ID required')
        assert.notEqual(null, req.body.collection), 'Collection required'
    } catch (bodyError) {
        res.status(403).json({ error: true, message: bodyError.message })
        return
    }

    const db = req.body.db
    const userId = req.body.userId
    const collection = req.body.collection
    console.log('Collection Info Recieved! O(∩_∩)O')
    console.log(collection)

    createCollection(db, collection, userId, (error: MongoError, result: any) => {
        if (result) {
            res.status(200).json({ error: false, message: 'Collection Added!' })
            return
        } else {
            res.status(500).json({ error: true, message: 'Error' })
            return
        }
    })
})

handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
    res.status(200).json({ message: 'Hello' })
    return
})

export default handler