import { NextApiRequest, NextApiResponse } from "next";
import middleware from "src/middlewares/database"
import nextConnect from "next-connect";
import { Db } from "mongodb";
import assert from 'assert'
import bcrypt from 'bcrypt'
const saltRounds = 10
import { v4 as uuidV4 } from 'uuid'
import jwt from 'jsonwebtoken'
const jwtSecret = process.env.JWT_SECRET || ''
const handler = nextConnect()

handler.use(middleware)

function findUser(db: Db, email: string, callback: any) {
    const collection = db.collection('users')
    collection.findOne({ email }, callback)
}

function createUser(db: Db, name: string, email: any, password: string | Buffer, callback: any) {
    const collection = db.collection('users');
    bcrypt.hash(password, saltRounds, function (err, hash) {
        // Store hash in your password DB.
        collection.insertOne(
            {
                name,
                email,
                password: hash,
            },
            function (err: any, userCreated: any) {
                assert.equal(err, null)
                callback(userCreated)
            },
        )
    })
}

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
    // signup
    try {
        assert.notEqual(null, req.body.name, 'Name required')
        assert.notEqual(null, req.body.email, 'Email required')
        assert.notEqual(null, req.body.password, 'Password required')
    } catch (bodyError) {
        res.status(403).json({ error: true, message: bodyError.message })
    }

    const db = req.body.db
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password

    // verify email does not exist already
    findUser(db, email, async (err: any, user: any) => {
        if (err) {
            res.status(500).json({ error: true, message: 'Error finding User' })
            return
        }
        if (!user) {
            // proceed to Create
            createUser(db, name, email, password, (creationResult: { ops: string | any[] }) => {
                if (creationResult.ops != null && creationResult.ops.length === 1) {
                    const user = creationResult.ops[0];
                    const token = jwt.sign(
                        { userId: user._id, email: user.email },
                        jwtSecret,
                        {
                            expiresIn: 3000, //50 minutes
                        },
                    )
                    res.status(200).json({ token })
                    return
                }
            })
        } else {
            // User exists
            res.status(403).json({ error: true, message: 'Email exists' })
            return
        }
    })
})



export default handler