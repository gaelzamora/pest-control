import {axi} from '../api/useAxios'
import { useAuthStore } from '../store/auth'

export const loginRequest = async (email: string, password: string) => {
    try {
        const response = await axi.post("/api/users/login/", {email, password})
        return response
    } catch (err) {
        console.log(err)
    }

} 

export const createManager = async (email: string, first_name: string, last_name: string, branch: string, password: string, token: string) => {
    await axi.post("/api/users/create-manager/", {email, first_name, last_name, branch, password}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const getManagers = async () => {
    const token = useAuthStore.getState().access

    const response = await axi.get("/api/users/get-managers/", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return response.data
}

export const searchManagers = async (query: string, token: string) => {
    try {
        const response = await axi.get('/api/users/search-manager/', {
            params: { query },
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.managers || [];
    } catch (error) {
        return [];
    }
}
export const deleteManager = async (id: number) => {
    const token = useAuthStore.getState().access

    await axi.delete(`/api/users/delete-manager/${id}/`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}