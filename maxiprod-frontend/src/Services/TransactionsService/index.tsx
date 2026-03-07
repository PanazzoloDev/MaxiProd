import type { responseType } from '../../Commons/types'
import { Delete, Get, Post, Put } from '../BaseAPI'

const Create = async (controls: object): Promise<responseType | Error> => {
    return await Post(`/transaction`, controls)
}

const Update = async (id: number, controls: object): Promise<responseType | Error> => {
    return await Put(`/transaction/${id}`, controls)
}

const Remove = async (id: number): Promise<object> => {
    return await Delete(`/transaction/${id}`).then(response => response)
}

const Read = async (id: number): Promise<object> => {
    return await Get(`/transaction/${id}`).then(response => response)
}


export {
    Create, Read, Remove, Update
}
