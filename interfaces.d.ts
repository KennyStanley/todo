import { ObjectId } from 'mongodb'

export interface IUser {
    _id?: ObjectId
    name: string
    email: string
    password: string
    categories?: ICategory[]
}

export interface ICategory {
    _id?: ObjectId
    title: string
    description?: string
    projects?: IProject[]
    tasks?: ITask[]
}

export interface IProject {
    _id?: ObjectId
    title: string
    description?: string
    categoryId?: ObjectId
    tasks?: ITask[]
}

export interface ITask {
    _id?: ObjectId
    title: string
    description?: string
    isCompleted: boolean
    startDate?: string
    dueDate: string
    isRepeating: boolean
    repeatInterval: string
}