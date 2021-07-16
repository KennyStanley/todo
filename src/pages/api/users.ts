const MongoClient = require('mongodb').MongoClient
import assert from 'assert'
import bcrypt from 'bcrypt'
import { v4 as uuidV4 } from 'uuid'
import jwt from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'
const jwtSecret = process.env.JWT_SECRET || ''
const saltRounds = 10
const dbName = process.env.DB_NAME || ''
const url = process.env.DB_URL || ''

const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

function findUser(db: { collection: (arg0: string) => any }, email: any, callback: (err: any, user: any) => void) {
    const collection = db.collection('user')
    collection.findOne({ email }, callback)
}

async function createUser(db: { collection: (arg0: string) => any }, email: any, password: string | Buffer, callback: { (creationResult: any): void; (arg0: any): void }) {
    const collection = db.collection('user');
    bcrypt.hash(password, saltRounds, function (err, hash) {
        // Store hash in your password DB.
        collection.insertOne(
            {
                userId: uuidV4(),
                email,
                password: hash,
            },
            function (err: any, userCreated: any) {
                assert.equal(err, null)
                callback(userCreated)
            },
        );
    });
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        // signup
        try {
            assert.notEqual(null, req.body.email, 'Email required');
            assert.notEqual(null, req.body.password, 'Password required');
        } catch (bodyError) {
            res.status(403).json({ error: true, message: bodyError.message });
        }

        // verify email does not exist already
        client.connect(function (err: any) {
            assert.equal(null, err);
            console.log('Connected to MongoDB server =>');
            const db = client.db(dbName);
            const email = req.body.email;
            const password = req.body.password;

            findUser(db, email, async function (err: any, user: any) {
                if (err) {
                    res.status(500).json({ error: true, message: 'Error finding User' });
                    return;
                }
                if (!user) {
                    // proceed to Create
                    await createUser(db, email, password, function (creationResult: { ops: string | any[] }) {
                        if (creationResult.ops != null && creationResult.ops.length === 1) {
                            const user = creationResult.ops[0];
                            const token = jwt.sign(
                                { userId: user.userId, email: user.email },
                                jwtSecret,
                                {
                                    expiresIn: 3000, //50 minutes
                                },
                            );
                            res.status(200).json({ token });
                            return;
                        }
                    });
                } else {
                    // User exists
                    res.status(403).json({ error: true, message: 'Email exists' });
                    return;
                }
            });
        });
    }
};