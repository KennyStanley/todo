import { NextApiRequest, NextApiResponse } from "next";
import middleware from "src/middlewares/database"
import nextConnect from "next-connect";
import { Db } from "mongodb";
import assert from 'assert'
const handler = nextConnect()

handler.use(middleware)

function findCategory(db: Db, callback: any) {

}

async function createCategory(db: Db, callback: any) {
    const collection = db.collection('categories');

}



export default handler