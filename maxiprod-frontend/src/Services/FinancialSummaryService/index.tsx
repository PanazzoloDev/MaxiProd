import type { responseType } from '../../Commons/types'
import { Delete, Get, Post, Put } from '../BaseAPI'

const Create = async (controls: object): Promise<responseType | Error> => {
    return await Post(`/people`, controls)
}

const Update = async (id: number, controls: object): Promise<responseType | Error> => {
    return await Put(`/people/${id}`, controls)
}

const Remove = async (id: number): Promise<object> => {
    return await Delete(`/people/${id}`).then(response => response)
}

const Read = async (id: number): Promise<object> => {
    return await Get(`/people/${id}`).then(response => response)
}


export {
    Create, Read, Remove, Update
}
