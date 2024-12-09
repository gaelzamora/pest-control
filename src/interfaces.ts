export interface Token {
    exp: number
    email: string
    first_name: string
    last_name: string
    is_staff: boolean
    branch?: string
    company?: string
    is_creator: boolean
    is_technique: boolean
    id: number
}

export interface User {
    id: number
    image: string | null
    email: string
    first_name: string
    last_name: string
    company?: string
    branch?: string
    is_creator: boolean
    is_staff: boolean
    managers?: Manager[]
    registers_count: number
}

export interface Manager {
    id: number
    email: string
    image: string | null
    first_name: string
    last_name: string
    branch: string
}

export interface Technician {
    id: number
    email: string
    image: string | null
    first_name: string
    last_name: string
}

export interface Owner {
    id: number
    owner_email: string
    owner_name: string
    owner_image: string | null
    status: string
}

export interface Register {
    id?: number
    pest_name: string
    image: File | null
    created?: string
}