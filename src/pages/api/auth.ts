import { NextApiRequest, NextApiResponse } from "next";
import middleware from "middlewares/database"
import nextConnect from "next-connect";
import { Db } from "mongodb";
import assert from 'assert'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const jwtSecret = process.env.JWT_SECRET || ''
const handler = nextConnect()

handler.use(middleware)

const findUser = (db: Db, email: string, callback: any) => {
    const collection = db.collection('users')
    collection.findOne({ email }, callback)
}

const authUser = (password: string, hash: string, callback: any) => {
    bcrypt.compare(password, hash, callback)
}

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
    console.log('Handling Post')
    // login
    try {
        assert.notEqual(null, req.body.email, 'Email required');
        assert.notEqual(null, req.body.password, 'Password required');
    } catch (bodyError) {
        res.status(403).json({ error: true, message: bodyError.message });
    }

    const db = req.body.db
    const email = req.body.email
    const password = req.body.password

    findUser(db, email, (err: any, user: { userId: string; email: string; password: string }) => {
        if (err) {
            res.status(500).json({ error: true, message: 'Error finding User' })
            return
        }
        if (!user) {
            res.status(404).json({ error: true, message: 'User not found' })
            return
        } else {
            authUser(password, user.password, (err: any, match: boolean) => {
                if (err) {
                    res.status(500).json({ error: true, message: 'Auth Failed' });
                }
                if (match) {
                    const token = jwt.sign(
                        { userId: user.userId, email: user.email },
                        jwtSecret,
                        {
                            expiresIn: 3000, //50 minutes
                        },
                    );
                    res.status(200).json({ token })
                    return
                } else {
                    res.status(401).json({ error: true, message: 'Auth Failed' })
                    return
                }
            })
        }
    })
})

export default handler