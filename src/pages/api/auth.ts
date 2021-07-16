const { MongoClient } = require('mongodb');
import assert from 'assert';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
const jwtSecret = process.env.JWT_SECRET || ''
const saltRounds = 10;
const dbName = process.env.DB_NAME || ''
const url = process.env.DB_URL || ''

const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

function findUser(db: { collection: (arg0: string) => any; }, email: string, callback: (err: any, user: any) => void) {
    const collection = db.collection('user');
    collection.findOne({ email }, callback);
}

function authUser(db: { collection: (arg0: string) => any; }, email: string, password: string, hash: any, callback: (err: any, match: any) => void) {
    const collection = db.collection('user');
    bcrypt.compare(password, hash, callback);
}

export default (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        //login
        try {
            assert.notEqual(null, req.body.email, 'Email required');
            assert.notEqual(null, req.body.password, 'Password required');
        } catch (bodyError) {
            res.status(403).send(bodyError.message);
        }

        client.connect(function (err: any) {
            assert.equal(null, err);
            console.log('Connected to MongoDB server =>');
            const db = client.db(dbName);
            const email = req.body.email;
            const password = req.body.password;

            findUser(db, email, function (err: any, user: { password: string; userId: string; email: string; }) {
                if (err) {
                    res.status(500).json({ error: true, message: 'Error finding User' });
                    return;
                }
                if (!user) {
                    res.status(404).json({ error: true, message: 'User not found' });
                    return;
                } else {
                    authUser(db, email, password, user.password, function (err: any, match: any) {
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
                            res.status(200).json({ token });
                            return;
                        } else {
                            res.status(401).json({ error: true, message: 'Auth Failed' });
                            return;
                        }
                    });
                }
            });
        });
    } else {
        // Handle any other HTTP method
        res.statusCode = 401;
        res.end();
    }
};