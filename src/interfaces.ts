export interface Token {
    exp: number
    email: string
    first_name: string
    last_name: string
    is_staff: boolean
    branch?: string
    is_creator: boolean
    id: number
}

export interface User {
    id: number
    image: File | null
    email: string
    first_name: string
    last_name: string
    is_creator: boolean
    is_staff: boolean
    managers?: Manager[]
}

export interface Manager {
    id: number
    email: string
    first_name: string
    last_name: string
    branch: string
}

export interface Register {
    id?: number
    pest_name: string
    image: File | null
    created?: string
}