import {axi} from '../api/useAxios'
import { Register } from '../interfaces'
import { useAuthStore } from '../store/auth'

export const createRegister = async (data: Register) => {
    const token = useAuthStore.getState().access

    const formData = new FormData()
    formData.append("pest_name", data.pest_name)
    if (data.image) {
        formData.append("image", data.image)
    }

    await axi.post(
        '/api/registers/pest-register/',
        formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
}

export const getRegisters = async () => {
    const token = useAuthStore.getState().access

    const response = await axi.get(
        "/api/registers/get-registers/", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return response.data
}

export const getRegister = async (id: number) => {
    const token = useAuthStore.getState().access

    const response = await axi.get(`/api/registers/get-register/${id}/`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return response
}

export const getRegistersLastSevenDays = async () => {
    const token = useAuthStore.getState().access

    const response = await axi.get(`/api/registers/get-last-seven-days-registers/`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return response.data
}

export const getTechnicianRegisters = async () => {
    const token = useAuthStore.getState().access
    const response = await axi.get('/api/registers/get-technician-registers/', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return response.data
}