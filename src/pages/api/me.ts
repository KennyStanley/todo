import jwt from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from "next-connect"
import middleware from 'src/middlewares/database'
import { Db } from 'mongodb'
const handler = nextConnect()
const jwtSecret = process.env.JWT_SECRET || ''

handler.use(middleware)

function findUser(db: Db, email: string, callback: any) {
    const collection = db.collection('users')
    collection.findOne({ email }, callback)
}

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
    if (!('token' in req.cookies)) {
        res.status(401).json({ message: 'Unable to auth' })
        return
    }
    let decoded
    const token = req.cookies.token;
    if (token) {
        try {
            decoded = jwt.verify(token, jwtSecret)
        } catch (e) {
            console.error(e)
        }
    }

    const db = req.body.db

    if (decoded) {
        // console.log(decoded)
        const parsed = JSON.parse(JSON.stringify(decoded))

        if (parsed.email != null) {
            const email = parsed.email
            try {
                findUser(db, email, async (err: any, user: any) => {
                    if (err) {
                        res.status(500).json({ error: true, message: 'Error finding User' })
                        return
                    }
                    if (!user) {
                        res.status(404).json({ error: true, message: 'User not found' })
                        return

                    } else {
                        // User exists
                        if (user.password) user.password = null
                        res.status(200).json(user)
                        return
                    }
                })
            } catch (error) {
                res.status(500).json({ error: true, message: 'Error finding User' })


                return
            }
        }

    } else {
        res.status(401).json({ message: 'Unable to auth' })
        return
    }
})

export default handler