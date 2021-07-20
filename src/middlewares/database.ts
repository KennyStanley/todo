import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

const { MONGODB_URI, DB_NAME } = process.env

if (!MONGODB_URI) {
    throw new Error(
        'Please define the MONGODB_URI environment variable inside .env.local'
    )
}
if (!DB_NAME) {
    throw new Error(
        'Please define the DB_NAME environment variable inside .env.local'
    )
}

const client = new MongoClient(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
async function database(req: NextApiRequest, res: NextApiResponse, next: any) {
    if (!client.isConnected()) await client.connect();
    if (!req.body) req.body = '{}'
    const prevBody = JSON.parse(req.body)
    req.body = {
        ...prevBody,
        dbClient: client,
        db: client.db(DB_NAME)
    }
    return next();
}
const middleware = nextConnect();
middleware.use(database);
export default middleware;