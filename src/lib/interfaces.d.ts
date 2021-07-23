import { ObjectId } from 'mongodb'

export interface ICollection {
    _id?: ObjectId
    title: string
    description?: string
    color?: string
}

export interface IUser {
    _id?: ObjectId
    name: string
    email: string
    password: string
    color?: string
    collections?: ICollection[]
}

export interface ITask {
    _id?: ObjectId
    title: string
    description?: string
    color?: string
    isCompleted: boolean
    startDate?: string
    dueDate?: string
    isRepeating: boolean
    interval?: string
    userId?: ObjectId
    collectionId?: ObjectId
}
